import { createFileRoute } from "@tanstack/react-router";
import { LegalPageView, getLegalPage } from "@/components/site/LegalPageView";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Omuzbox" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useLocale();
  return <LegalPageView page={getLegalPage("privacy", lang)} />;
}
