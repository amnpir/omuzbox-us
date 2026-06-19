import type { Lang } from "./translations";
import { currentLanguage, landingCode } from "./analytics-context";

export type TrialPayload = {
  name: string;
  email: string;
  phone: string;
  promo?: string;
  audience: "adult" | "child";
  consent: boolean;
  landing?: string;
  language?: Lang;
  eventId?: string;
};

const SUBMIT_URL = import.meta.env.VITE_SUBMIT_TRIAL_URL as string | undefined;

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function buildTrialPayload(payload: TrialPayload): TrialPayload & {
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  clientUserAgent?: string;
} {
  const lang = payload.language ?? currentLanguage();
  return {
    ...payload,
    language: lang,
    landing: payload.landing ?? landingCode(lang),
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    clientUserAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
  };
}

export async function submitTrial(payload: TrialPayload): Promise<{ ok: boolean; error?: string }> {
  if (!SUBMIT_URL) {
    return {
      ok: false,
      error: "Form API is not configured. Email us at info@omuzbox.com or message on WhatsApp.",
    };
  }

  try {
    const res = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildTrialPayload(payload)),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: (data as { error?: string }).error ?? "Submission failed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
