import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { trackCtaClick } from "@/lib/cta";
import { homeSection, siteRoutes } from "@/lib/site-links";
import {
  MODE_CONFIG,
  type TestMode,
  cefrDescription,
  computeScore,
  pickQuestions,
  scoreToCefr,
  tBi,
} from "@/lib/level-test-data";

type Step = "pick" | "quiz" | "result";

export function LevelTestQuiz() {
  const { lang, t } = useLocale();
  const [step, setStep] = useState<Step>("pick");
  const [mode, setMode] = useState<TestMode>("standard");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const questions = useMemo(() => pickQuestions(mode), [mode]);
  const current = questions[index];
  const progress = step === "quiz" ? ((index + 1) / questions.length) * 100 : 0;

  const result = useMemo(() => {
    const ratio = computeScore(questions, answers);
    const level = scoreToCefr(ratio);
    return { level, ratio, description: cefrDescription(level, lang) };
  }, [questions, answers, lang]);

  function start(selected: TestMode) {
    setMode(selected);
    setStep("quiz");
    setIndex(0);
    setAnswers([]);
    setPicked(null);
  }

  function confirmAnswer() {
    if (picked === null || !current) return;
    const nextAnswers = [...answers, picked];
    setAnswers(nextAnswers);
    setPicked(null);
    if (index + 1 >= questions.length) {
      setStep("result");
      return;
    }
    setIndex((i) => i + 1);
  }

  if (step === "pick") {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {(Object.keys(MODE_CONFIG) as TestMode[]).map((key) => {
          const cfg = MODE_CONFIG[key];
          const card = t.levelTest.cards.find((c) =>
            lang === "RU" ? c.name.includes(cfg.label.ru.slice(0, 4)) : c.name.includes(cfg.label.en.split(" ")[0]),
          );
          return (
            <button
              key={key}
              type="button"
              onClick={() => start(key)}
              className="lift-card rounded-2xl border border-[#EAF0F6] bg-white/90 p-6 text-left shadow-[var(--shadow-soft)] hover:border-[#20AAFD]/40 transition-colors"
            >
              <div className="text-2xl">{card?.level ?? "📋"}</div>
              <div className="mt-3 font-extrabold">{tBi(lang, cfg.label)}</div>
              <div className="mt-1 text-sm text-[var(--ink)]/55">
                {cfg.questions} {lang === "RU" ? "вопросов" : "questions"} · {tBi(lang, cfg.time)}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="lift-card rounded-[2rem] border border-[#EAF0F6] bg-white/90 p-8 sm:p-10 text-center shadow-[var(--shadow-lift)]">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#20AAFD]" />
        <div className="eyebrow mt-6">{lang === "RU" ? "Ваш результат" : "Your result"}</div>
        <div className="mt-3 text-6xl font-black grad-text">{result.level}</div>
        <p className="mt-4 text-[var(--ink)]/70 leading-relaxed max-w-md mx-auto">{result.description}</p>
        <p className="mt-3 text-sm text-[var(--ink)]/50">
          {Math.round(result.ratio * 100)}% {lang === "RU" ? "правильных ответов (взвешено по сложности)" : "weighted score"}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => setStep("pick")} className="btn-ghost">
            {lang === "RU" ? "Пройти снова" : "Take again"}
          </button>
          <a href={homeSection(lang, "trial")} onClick={trackCtaClick} className="btn-primary">
            {t.levelTest.ctaTrial ?? t.contact.cta} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="lift-card rounded-[2rem] border border-[#EAF0F6] bg-white/90 p-6 sm:p-8 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink)]/50">
        <span>
          {lang === "RU" ? "Вопрос" : "Question"} {index + 1}/{questions.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-[#EAF6FF] overflow-hidden">
        <div className="h-full grad-bg transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="mt-8 text-xl sm:text-2xl font-extrabold leading-snug">{current && tBi(lang, current.prompt)}</h2>
      <div className="mt-6 grid gap-3">
        {current?.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPicked(i)}
            className={`rounded-xl border px-4 py-3 text-left font-medium transition-all ${
              picked === i
                ? "border-[#20AAFD] bg-[#EAF6FF] text-[var(--ink)]"
                : "border-[#EAF0F6] bg-white hover:border-[#20AAFD]/40"
            }`}
          >
            {tBi(lang, opt.text)}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between gap-3">
        <Link to={siteRoutes(lang).home} className="btn-ghost text-sm">
          {lang === "RU" ? "На главную" : "Back home"}
        </Link>
        <button type="button" onClick={confirmAnswer} disabled={picked === null} className="btn-primary disabled:opacity-50">
          {index + 1 >= questions.length
            ? lang === "RU"
              ? "Узнать результат"
              : "See result"
            : lang === "RU"
              ? "Далее"
              : "Next"}{" "}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
