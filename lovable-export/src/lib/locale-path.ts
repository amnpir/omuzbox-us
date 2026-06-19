import type { Lang } from "./translations";

export type LocalePath = "en" | "ru";

export const LOCALE_PATHS: LocalePath[] = ["en", "ru"];

export function isLocalePathSegment(value: string): value is LocalePath {
  return LOCALE_PATHS.includes(value as LocalePath);
}

export function langPathSegment(lang: Lang): LocalePath {
  return lang === "RU" ? "ru" : "en";
}

export function langFromPathSegment(segment: string): Lang {
  return segment === "ru" ? "RU" : "EN";
}

export function replaceLangInPath(pathname: string, lang: Lang): string {
  const segment = langPathSegment(lang);
  const suffix = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");
  return `/${segment}${suffix}`;
}

export function getPreferredLangPath(): LocalePath {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("omuzbox-lang");
  if (saved === "RU") return "ru";
  if (saved === "EN") return "en";
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("ru")) return "ru";
  return "en";
}

const SITE_ORIGIN = "https://us.omuzbox.com";

/** Canonical + hreflang links for the current localized path. */
export function localeAlternateLinks(pathname: string) {
  const suffix = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");
  const segment = pathname.match(/^\/(en|ru)(?=\/|$)/)?.[1] ?? "en";
  return {
    canonical: `${SITE_ORIGIN}/${segment}${suffix}`,
    alternates: [
      { hreflang: "en", href: `${SITE_ORIGIN}/en${suffix}` },
      { hreflang: "ru", href: `${SITE_ORIGIN}/ru${suffix}` },
      { hreflang: "x-default", href: `${SITE_ORIGIN}/en${suffix}` },
    ],
  };
}
