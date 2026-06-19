import { createFileRoute, Link } from "@tanstack/react-router";
import { LiveBackground } from "@/components/live/LiveBackground";
import { SubpageBack, SubpageShell } from "@/components/site/SiteChrome";
import { useLocale } from "@/lib/i18n";
import { getSitemapContent } from "@/lib/sitemap-content";
import { companyAddressBlock } from "@/lib/company";

export const Route = createFileRoute("/$lang/sitemap")({
  head: () => ({
    meta: [{ title: "Sitemap — Omuzbox" }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  const { lang, t } = useLocale();
  const page = getSitemapContent(lang);
  const address = companyAddressBlock(lang);

  return (
    <>
      <LiveBackground />
      <SubpageShell>
        <SubpageBack label={t.legal.backHome} />
        <article className="lift-card rounded-[2rem] border border-[#EAF0F6] bg-white/90 p-8 sm:p-10 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <h1 className="h-display text-3xl sm:text-4xl">{page.title}</h1>
          <p className="mt-3 text-[var(--ink)]/65 leading-relaxed">{page.intro}</p>

          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-extrabold">{section.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.href.includes("#") ? (
                        <a href={link.href} className="text-[#20AAFD] font-semibold hover:underline">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-[#20AAFD] font-semibold hover:underline">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[#F4F7FB] border border-[#EAF0F6] p-5">
            <div className="text-sm font-extrabold">{t.footer.addressLabel}</div>
            <address className="mt-2 not-italic text-sm text-[var(--ink)]/70 leading-relaxed">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </article>
      </SubpageShell>
    </>
  );
}
