import { createFileRoute } from "@tanstack/react-router";
import { LegacyLangRedirect } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/privacy-policy")({
  component: () => <LegacyLangRedirect to="/$lang/privacy-policy" />,
});
