import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getPreferredLangPath } from "@/lib/locale-path";

export const Route = createFileRoute("/")({
  component: RootRedirect,
});

function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: "/$lang",
      params: { lang: getPreferredLangPath() },
      replace: true,
    });
  }, [navigate]);

  return null;
}
