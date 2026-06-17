import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, HelpCircle, Sparkles } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { SITE_ROUTES } from "@/lib/site-links";

export function LevelTestSection() {
  const { t } = useLocale();

  return (
    <section id="level-test" className="relative px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="lift-card overflow-hidden rounded-[2rem] border border-[#EAF0F6] bg-white/90 shadow-[var(--shadow-lift)] backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <div className="eyebrow">{t.levelTest.eyebrow}</div>
              <h2 className="h-display mt-3 text-3xl sm:text-4xl">
                {t.levelTest.title}
                <span className="grad-text">{t.levelTest.titleAccent}</span>
              </h2>
              <p className="mt-4 text-[var(--ink)]/65 leading-relaxed">{t.levelTest.subtitle}</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--ink)]/70">
                {t.levelTest.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 shrink-0 text-[#20AAFD] mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to={SITE_ROUTES.levelTest} className="btn-primary mt-8">
                {t.levelTest.cta} <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-[var(--ink)]/50">{t.levelTest.note}</p>
            </div>
            <div
              className="relative flex flex-col justify-center gap-4 p-8 sm:p-12"
              style={{ background: "linear-gradient(160deg,#EAF6FF 0%, #FFFFFF 100%)" }}
            >
              {t.levelTest.cards.map((card, i) => (
                <div
                  key={card.name}
                  className="glass flex items-center gap-4 rounded-2xl px-5 py-4"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white font-extrabold text-[#20AAFD] shadow-sm">
                    {card.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">{card.name}</div>
                    <div className="text-xs text-[var(--ink)]/55">{card.desc}</div>
                  </div>
                  <div className="text-right text-xs text-[var(--ink)]/50 shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <Clock className="h-3 w-3" /> {card.time}
                    </div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <HelpCircle className="h-3 w-3" /> {card.questions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
