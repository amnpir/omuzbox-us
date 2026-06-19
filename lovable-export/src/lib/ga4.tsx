import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { currentLanguage, langFromPathname, withAnalyticsContext } from "./analytics-context";

const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

function initGa4() {
  if (!GA_ID || typeof window === "undefined" || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function Ga4() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });

  useEffect(() => {
    initGa4();
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
    const pagePath = `${pathname}${search}`;
    const lang = langFromPathname(pathname);
    window.gtag("event", "page_view", withAnalyticsContext({
      page_path: pagePath,
      page_location: window.location.origin + pagePath,
      page_title: document.title,
    }, lang));
  }, [pathname, search]);

  return null;
}

export function trackGaEvent(event: string, params?: Record<string, unknown>) {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, withAnalyticsContext(params));
}
