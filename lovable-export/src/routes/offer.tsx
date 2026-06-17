import { createFileRoute } from "@tanstack/react-router";
import { LegalPageView, getLegalPage } from "@/components/site/LegalPageView";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [{ title: "Public Offer Agreement — Omuzbox" }],
  }),
  component: OfferPage,
});

function OfferPage() {
  const { lang } = useLocale();
  return <LegalPageView page={getLegalPage("offer", lang)} />;
}
