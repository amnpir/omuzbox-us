import { useLocale } from "@/lib/i18n";
import { LEGAL_PAGES, type LegalPageContent } from "@/lib/legal-content";
import { companyAddressBlock, COMPANY } from "@/lib/company";
import { SubpageBack, SubpageShell } from "@/components/site/SiteChrome";
import { LiveBackground } from "@/components/live/LiveBackground";

export function LegalPageView({ page }: { page: LegalPageContent }) {
  const { lang, t } = useLocale();
  const address = companyAddressBlock(lang);
  return (
    <>
      <LiveBackground />
      <SubpageShell>
        <SubpageBack label={t.legal.backHome} />
        <article className="lift-card rounded-[2rem] border border-[#EAF0F6] bg-white/90 p-8 sm:p-10 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <h1 className="h-display text-3xl sm:text-4xl">{page.title}</h1>
          <p className="mt-2 text-sm text-[var(--ink)]/50">{page.updated}</p>
          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-extrabold">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-[var(--ink)]/70 leading-relaxed">
                    {p}
                  </p>
                ))}
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
            <p className="mt-3 text-sm text-[var(--ink)]/60">{COMPANY.email}</p>
          </div>
        </article>
      </SubpageShell>
    </>
  );
}

export function getLegalPage(key: keyof typeof LEGAL_PAGES, lang: string) {
  return LEGAL_PAGES[key][lang === "RU" ? "RU" : "EN"];
}
