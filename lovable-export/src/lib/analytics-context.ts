import type { Lang } from "./translations";
import { langFromPathSegment } from "./locale-path";

export const LANDING_BASE = "us-55";

export function landingCode(lang: Lang): string {
  return `${LANDING_BASE}-${lang.toLowerCase()}`;
}

/** GA4 / Meta custom dimension value */
export function analyticsLanguage(lang: Lang): string {
  return lang.toLowerCase();
}

export function langFromPathname(pathname: string): Lang {
  const segment = pathname.match(/^\/(en|ru)(?=\/|$)/)?.[1];
  return segment ? langFromPathSegment(segment) : "EN";
}

export function currentLanguage(): Lang {
  if (typeof window === "undefined") return "EN";
  return langFromPathname(window.location.pathname);
}

export function withAnalyticsContext(
  params?: Record<string, unknown>,
  lang: Lang = currentLanguage(),
): Record<string, unknown> {
  return {
    language: analyticsLanguage(lang),
    ...params,
  };
}
