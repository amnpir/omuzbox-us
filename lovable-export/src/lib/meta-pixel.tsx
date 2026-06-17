import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

export function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID || typeof window === "undefined") return;

    if (!window.fbq) {
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
    }

    window.fbq?.("init", PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, []);

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
  window.fbq("track", event, params);
}
