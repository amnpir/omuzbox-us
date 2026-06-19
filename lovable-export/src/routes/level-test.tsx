import { createFileRoute } from "@tanstack/react-router";
import { LegacyLangRedirect } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/level-test")({
  component: () => <LegacyLangRedirect to="/$lang/level-test" />,
});
