import type { Lang } from "./translations";
import { langPathSegment } from "./locale-path";

export const homeSection = (lang: Lang, id: string) => `/${langPathSegment(lang)}#${id}`;

export function siteRoutes(lang: Lang) {
  const prefix = `/${langPathSegment(lang)}`;
  return {
    home: prefix,
    levelTest: `${prefix}/level-test`,
    privacy: `${prefix}/privacy-policy`,
    offer: `${prefix}/offer`,
    documents: `${prefix}/documents`,
    sitemap: `${prefix}/sitemap`,
  } as const;
}
