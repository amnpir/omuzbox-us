import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { LocaleProvider } from "@/lib/i18n";
import { langFromPathSegment, isLocalePathSegment, localeAlternateLinks } from "@/lib/locale-path";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLocalePathSegment(params.lang)) {
      throw redirect({ to: "/$lang", params: { lang: "en" }, replace: true });
    }
  },
  head: ({ match }) => {
    const { canonical, alternates } = localeAlternateLinks(match.pathname);
    return {
      links: [
        { rel: "canonical", href: canonical },
        ...alternates.map((alt) => ({
          rel: "alternate" as const,
          hrefLang: alt.hreflang,
          href: alt.href,
        })),
      ],
    };
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang: segment } = Route.useParams();
  const lang = langFromPathSegment(segment);

  return (
    <LocaleProvider lang={lang}>
      <Outlet />
    </LocaleProvider>
  );
}
