/** Home page section anchors — work from any route on this site. */
export const homeSection = (id: string) => `/#${id}`;

export const SITE_ROUTES = {
  home: "/",
  levelTest: "/level-test",
  privacy: "/privacy-policy",
  offer: "/offer",
  documents: "/documents",
  sitemap: "/sitemap",
} as const;
