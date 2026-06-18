import { Mail, MessageCircle, Send, Clock } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { COMPANY } from "@/lib/company";
import { homeSection } from "@/lib/site-links";

export function ContactSection() {
  const { t } = useLocale();

  const channels = [
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: "info@omuzbox.com",
      href: "mailto:info@omuzbox.com",
    },
    {
      icon: MessageCircle,
      label: t.contact.whatsappLabel,
      value: t.contact.whatsappValue,
      href: COMPANY.whatsappWaMe,
    },
    {
      icon: Send,
      label: t.contact.telegramLabel,
      value: t.contact.telegramValue,
      href: "https://t.me/omuzboxss",
    },
  ];

  return (
    <section id="contact" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="eyebrow">{t.contact.eyebrow}</div>
            <h2 className="h-display mt-3 text-4xl sm:text-5xl">
              {t.contact.title}
              <span className="grad-text">{t.contact.titleAccent}</span>
            </h2>
            <p className="mt-5 text-[var(--ink)]/65 leading-relaxed max-w-lg">{t.contact.subtitle}</p>
            <p className="mt-4 inline-flex items-start gap-2 rounded-2xl bg-[#EAF6FF]/80 px-4 py-3 text-sm text-[var(--ink)]/70 max-w-lg">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#20AAFD]" aria-hidden />
              {t.contact.timezone}
            </p>
            <a href={homeSection("trial")} className="btn-primary mt-8 inline-flex">
              {t.contact.cta}
            </a>
          </div>
          <div className="grid gap-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="lift-card flex items-center gap-4 rounded-2xl border border-[#EAF0F6] bg-white/90 p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-colors hover:border-[#20AAFD]/40"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF6FF] text-[#20AAFD]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/45">{label}</div>
                  <div className="font-bold text-[var(--ink)]">{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
