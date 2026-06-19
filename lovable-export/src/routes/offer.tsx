import { createFileRoute } from "@tanstack/react-router";
import { LegacyLangRedirect } from "@/lib/legacy-redirect";

export const Route = createFileRoute("/offer")({
  component: () => <LegacyLangRedirect to="/$lang/offer" />,
});
