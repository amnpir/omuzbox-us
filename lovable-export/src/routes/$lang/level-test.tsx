import { createFileRoute } from "@tanstack/react-router";
import { LiveBackground } from "@/components/live/LiveBackground";
import { LevelTestQuiz } from "@/components/level-test/LevelTestQuiz";
import { SubpageBack, SubpageShell } from "@/components/site/SiteChrome";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/level-test")({
  head: () => ({
    meta: [
      { title: "Free English Level Test — Omuzbox" },
      {
        name: "description",
        content: "Find your CEFR English level in minutes. Free adaptive test — grammar, vocabulary, and more.",
      },
    ],
  }),
  component: LevelTestPage,
});

function LevelTestPage() {
  const { t } = useLocale();
  return (
    <>
      <LiveBackground />
      <SubpageShell>
        <SubpageBack label={t.legal.backHome} />
        <div className="mb-8">
          <div className="eyebrow">{t.levelTest.eyebrow}</div>
          <h1 className="h-display mt-3 text-3xl sm:text-4xl">
            {t.levelTest.title}
            <span className="grad-text">{t.levelTest.titleAccent}</span>
          </h1>
          <p className="mt-4 text-[var(--ink)]/65 leading-relaxed">{t.levelTest.subtitle}</p>
        </div>
        <LevelTestQuiz />
      </SubpageShell>
    </>
  );
}
