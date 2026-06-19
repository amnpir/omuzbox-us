import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getPreferredLangPath } from "./locale-path";

export function LegacyLangRedirect({ to }: { to: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    const lang = getPreferredLangPath();
    navigate({ to, params: { lang }, replace: true });
  }, [navigate, to]);

  return null;
}
