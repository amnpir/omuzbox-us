import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { currentLanguage, langFromPathname, withAnalyticsContext } from "./analytics-context";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

function initMetaPixel() {
  if (!PIXEL_ID || typeof window === "undefined" || initialized) return;
  initialized = true;

  const n = (window.fbq = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n as any).callMethod ? (n as any).callMethod(...args) : (n as any).queue.push(args);
  }) as typeof window.fbq & { queue?: unknown[]; loaded?: boolean; version?: string };
  if (!n.queue) n.queue = [];
  if (!window._fbq) window._fbq = n;
  n.loaded = true;
  n.version = "2.0";
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  window.fbq?.("init", PIXEL_ID);
}

export function trackMetaPageView(pathname?: string, search = "") {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  const path = pathname ?? window.location.pathname;
  const lang = langFromPathname(path);
  window.fbq("track", "PageView", withAnalyticsContext({
    page_path: `${path}${search}`,
  }, lang));
}

export function MetaPixel() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackMetaPageView(pathname, search);
  }, [pathname, search]);

  if (!PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

export function trackMetaEvent(
  event: "Lead" | "Contact" | "InitiateCheckout" | "CompleteRegistration",
  params?: Record<string, unknown>,
) {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, withAnalyticsContext(params));
}

export function trackMetaCustomEvent(event: string, params?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, withAnalyticsContext(params));
}
