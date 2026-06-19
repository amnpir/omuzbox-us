import { createFileRoute } from "@tanstack/react-router";
import { LegacyLangRedirect } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/sitemap")({
  component: () => <LegacyLangRedirect to="/$lang/sitemap" />,
});
