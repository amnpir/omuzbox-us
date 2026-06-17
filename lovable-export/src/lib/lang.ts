import type { Lang } from "./translations";

/** US landing: EN + RU only */
export const LANG_OPTIONS: Lang[] = ["EN", "RU"];

export function isLang(value: string): value is Lang {
  return LANG_OPTIONS.includes(value as Lang);
}
