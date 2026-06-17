import { createFileRoute } from "@tanstack/react-router";
import { LegalPageView, getLegalPage } from "@/components/site/LegalPageView";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [{ title: "Documents & Licenses — Omuzbox" }],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { lang } = useLocale();
  return <LegalPageView page={getLegalPage("documents", lang)} />;
}
