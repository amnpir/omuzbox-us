import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import { LANG_OPTIONS } from "@/lib/lang";
import { useLocale } from "@/lib/i18n";
import { trackCtaClick } from "@/lib/cta";
import { homeSection, SITE_ROUTES } from "@/lib/site-links";
import { companyAddressBlock } from "@/lib/company";
import { OmuzboxLogo } from "@/components/site/OmuzboxLogo";

function Logo() {
  return (
    <Link to={SITE_ROUTES.home} className="flex items-center gap-2.5 group" aria-label="Omuzbox">
      <OmuzboxLogo className="transition-transform group-hover:rotate-[-6deg]" />
      <span className="text-sm font-bold tracking-tight lowercase">omuzbox</span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLocale();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const nav = [
    [t.nav.courses, homeSection("courses")],
    [t.nav.how, homeSection("how")],
    [t.nav.pricing, homeSection("pricing")],
    [t.nav.reviews, homeSection("reviews")],
    [t.nav.faq, homeSection("faq")],
    [t.nav.contact, homeSection("contact")],
  ] as const;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`glass flex items-center justify-between gap-2 rounded-full px-3 sm:px-5 transition-all ${scrolled ? "py-2" : "py-2.5"}`}
          >
            <Logo />

            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--ink)]/80" aria-label="Main">
              {nav.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="relative transition-colors hover:text-[#20AAFD] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-[#20AAFD] after:transition-all hover:after:w-full"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center rounded-full bg-white/60 p-0.5 text-xs font-semibold border border-white/70">
                {LANG_OPTIONS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-full transition-all ${lang === l ? "text-white shadow-sm" : "text-[var(--ink)]/60 hover:text-[var(--ink)]"}`}
                    style={lang === l ? { background: "var(--grad-brand)" } : {}}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <a
                href={homeSection("trial")}
                onClick={trackCtaClick}
                className="btn-primary text-sm py-2.5 px-3 sm:px-5 shrink-0"
              >
                <span className="hidden sm:inline">{t.nav.cta}</span>
                <span className="sm:hidden">{lang === "RU" ? "Пробный" : "Trial"}</span>
              </a>

              <button
                type="button"
                className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/60 text-[var(--ink)] transition-colors hover:bg-white"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" id="mobile-nav">
          <button
            type="button"
            className="absolute inset-0 bg-[#0F0F19]/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div className="absolute inset-x-4 top-[5.5rem] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.75rem] border border-white/70 bg-white/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-[var(--ink)] transition-colors hover:bg-[#EAF6FF] hover:text-[#20AAFD]"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F8F9FC] px-4 py-3">
              <span className="text-sm font-semibold text-[var(--ink)]/60">Language</span>
              <div className="inline-flex items-center rounded-full bg-white p-0.5 text-xs font-semibold border border-[#EAF0F6]">
                {LANG_OPTIONS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-full transition-all ${lang === l ? "text-white shadow-sm" : "text-[var(--ink)]/60"}`}
                    style={lang === l ? { background: "var(--grad-brand)" } : {}}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={homeSection("trial")}
              onClick={(e) => {
                trackCtaClick(e);
                closeMenu();
              }}
              className="btn-primary !w-full mt-5"
            >
              {t.nav.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function FooterCol({ title, links, hrefs }: { title: string; links: string[]; hrefs?: string[] }) {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <div className="text-sm font-extrabold text-white">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm text-white/55">
        {links.map((l, i) => {
          const href = hrefs?.[i] ?? "#";
          const external = href.startsWith("http") || href.startsWith("mailto");
          const isRoute = href.startsWith("/") && !href.includes("#");
          return (
            <li key={l}>
              {isRoute ? (
                <Link to={href} className="hover:text-white transition-colors">{l}</Link>
              ) : (
                <a
                  href={href}
                  className="hover:text-white transition-colors"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { lang, setLang, t } = useLocale();
  const contactLinks = [
    { label: "info@omuzbox.com", href: "mailto:info@omuzbox.com" },
    { label: "WhatsApp", href: "https://wa.me/48576541989" },
    { label: "Telegram", href: "https://t.me/omuzboxss" },
  ];
  const schoolHrefs = [homeSection("about"), homeSection("reviews")];
  const courseHrefs = [
    homeSection("courses"),
    homeSection("courses"),
    homeSection("courses"),
    homeSection("courses"),
  ];
  const legalLinks = [
    { label: t.footer.privacy, href: SITE_ROUTES.privacy },
    { label: t.footer.terms, href: SITE_ROUTES.offer },
    { label: t.footer.documents, href: SITE_ROUTES.documents },
    { label: t.footer.sitemap, href: SITE_ROUTES.sitemap },
  ];
  const addressLines = companyAddressBlock(lang);

  return (
    <footer
      className="relative pt-20 pb-10 px-4 text-white/80"
      style={{ background: "linear-gradient(180deg,#0F0F19 0%, #020618 100%)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <OmuzboxLogo variant="light" />
              <span className="text-sm font-bold tracking-tight text-white lowercase">omuzbox</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{t.footer.desc}</p>
            <address className="mt-4 max-w-sm not-italic text-xs leading-relaxed text-white/45">
              <span className="block font-semibold text-white/55">{t.footer.addressLabel}</span>
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-6 inline-flex items-center rounded-full bg-white/5 p-0.5 text-xs font-semibold border border-white/10">
              {LANG_OPTIONS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full transition-all ${lang === l ? "text-white bg-white/10" : "text-white/50 hover:text-white"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <FooterCol title={t.footer.courses} links={t.footer.links.courses} hrefs={courseHrefs} />
          <FooterCol title={t.footer.school} links={t.footer.links.school} hrefs={schoolHrefs} />
          <FooterCol
            title={t.footer.contacts}
            links={contactLinks.map((c) => c.label)}
            hrefs={contactLinks.map((c) => c.href)}
          />
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <div>{t.footer.copyright}</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SubpageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip text-[var(--ink)]">
      <SiteHeader />
      <main className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function SubpageBack({ label }: { label: string }) {
  return (
    <Link
      to={SITE_ROUTES.home}
      className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]/60 hover:text-[#20AAFD] transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function SubpageCta({ label }: { label: string }) {
  return (
    <a href={homeSection("trial")} onClick={trackCtaClick} className="btn-primary mt-10 inline-flex">
      {label} <ArrowRight className="h-4 w-4" />
    </a>
  );
}
