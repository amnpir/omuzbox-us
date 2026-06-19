import { createFileRoute } from "@tanstack/react-router";
import { LegacyLangRedirect } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/documents")({
  component: () => <LegacyLangRedirect to="/$lang/documents" />,
});
