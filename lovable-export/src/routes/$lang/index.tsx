import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Check, Star, ArrowRight, MessageCircle,
  GraduationCap, Bot, Rocket, Briefcase, BarChart3, Plane, Globe2,
  BookOpen, Baby, Lightbulb, Target, Headphones,
  ShieldCheck, Heart, Mail, User2, Tag, Zap, Mic2
} from "lucide-react";
import { IMAGES, WarmImg, IMAGE_DIMS } from "@/lib/images";
import { useLocale } from "@/lib/i18n";
import { localeForLang } from "@/lib/translations";
import { submitTrial } from "@/lib/submit-trial";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { trackGaEvent } from "@/lib/ga4";
import { trackCtaClick } from "@/lib/cta";
import { homeSection } from "@/lib/site-links";
import { DEFAULT_PHONE_COUNTRY, isValidPhone, phoneToE164, type PhoneCountry } from "@/lib/phone";
import { PhoneField } from "@/components/site/PhoneField";
import { validateTrialEmail } from "@/lib/email-validation";
import { buildJsonLd, JsonLd } from "@/lib/json-ld";
import { SiteHeader, SiteFooter } from "@/components/site/SiteChrome";
import { MobileStickyCta } from "@/components/site/MobileStickyCta";
import { LiveBackground } from "@/components/live/LiveBackground";
import { HeroCollage } from "@/components/live/HeroCollage";
import { LivingIcon } from "@/components/live/LivingIcon";
import { PhotoMarquee } from "@/components/live/PhotoMarquee";
import { PlatformShowcase } from "@/components/live/PlatformShowcase";
import { ContactSection } from "@/components/live/ContactSection";

export const Route = createFileRoute("/$lang/")({
  head: () => ({
    meta: [
      { title: "Omuzbox — Speak English with Confidence" },
      { name: "description", content: "1-on-1 live English lessons. Certified teachers. Free trial lesson — no card required." },
      { property: "og:title", content: "Omuzbox — Speak English with Confidence" },
      { property: "og:description", content: "From first words to fluent conversation. 10,000+ students trust Omuzbox." },
    ],
  }),
  component: Index,
});

/* -------------------- hooks & helpers -------------------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

function Counter({ to, suffix = "", prefix = "", locale = "en-US" }: { to: number; suffix?: string; prefix?: string; locale?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(to); return; }
    const dur = 1400; const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString(locale)}{suffix}</span>;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  instant = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  instant?: boolean;
}) {
  if (instant) {
    return <div className={className}>{children}</div>;
  }

  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .8s cubic-bezier(.2,.8,.2,1) ${delay}ms, transform .8s cubic-bezier(.2,.8,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------- page -------------------- */

function Index() {
  const { t } = useLocale();
  return (
    <div className="relative overflow-x-clip pb-20 text-[var(--ink)] lg:pb-0">
      <JsonLd data={buildJsonLd(t)} />
      <LiveBackground />
      <SiteHeader />
      <Hero />
      <PhotoMarquee />
      <Metrics />
      <Features />
      <PlatformShowcase />
      <Courses />
      <Levels />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <TrialForm />
      <ContactSection />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
      <MobileStickyCta />
    </div>
  );
}

/* -------------------- hero -------------------- */

function Hero() {
  const { t, lang } = useLocale();

  return (
    <section className="relative pt-6 pb-20 sm:pb-32">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <Reveal instant className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-[var(--ink)]/80">
            <Star className="h-3.5 w-3.5 fill-[#FCBB00] text-[#FCBB00] icon-alive" />
            {t.hero.badge}
          </span>
          <h1 className="h-display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.3rem]">
            {t.hero.title}
            <span className="grad-text">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--ink)]/65 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <p className="mt-4 max-w-xl text-sm text-[var(--ink)]/55 leading-relaxed">
            {t.hero.timezone}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href={homeSection(lang, "trial")} onClick={trackCtaClick} className="btn-primary">
              {t.hero.cta} <ArrowRight className="h-4 w-4" />
            </a>
            <div className="text-sm">
              <div className="text-[var(--ink)]/60">{t.hero.levelHint}</div>
              <a href={homeSection(lang, "levels")} className="btn-ghost">
                {t.hero.levelLink} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {IMAGES.socialProof.map((src, i) => (
                <WarmImg
                  key={i}
                  src={src}
                  alt=""
                  width={IMAGE_DIMS.avatar[0]}
                  height={IMAGE_DIMS.avatar[1]}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-md"
                />
              ))}
            </div>
            <p className="max-w-xs text-sm text-[var(--ink)]/70">{t.hero.social}</p>
          </div>
          <div className="relative mt-2 hidden lg:block">
            <span className="hand absolute -top-2 left-72 text-2xl rotate-[-6deg] animate-[float_5s_ease-in-out_infinite]">{t.hero.handNote}</span>
            <svg className="absolute -top-12 left-60" width="60" height="50" viewBox="0 0 60 50" fill="none">
              <path d="M55 5 Q 40 25, 15 38" stroke="#20AAFD" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
              <path d="M15 38 L22 32 M15 38 L20 44" stroke="#20AAFD" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </Reveal>

        <Reveal instant delay={120} className="lg:col-span-5">
          <HeroCollage
            liveName={t.hero.liveName}
            liveStatus={t.hero.liveStatus}
            progressTitle={t.hero.progressTitle}
            progressSub={t.hero.progressSub}
            ielts={t.hero.ielts}
            ieltsSub={t.hero.ieltsSub}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- metrics -------------------- */

function Metrics() {
  const { t, lang } = useLocale();
  const loc = localeForLang(lang);
  const items = [
    { v: <Counter to={10000} suffix="+" locale={loc} />, l: t.metrics.students },
    { v: <><Counter to={50} locale={loc} /> {lang === "RU" ? "мин" : "min"}</>, l: t.metrics.duration },
    { v: <>{lang === "RU" ? "до " : "up to "}<Counter to={80} suffix="%" locale={loc} /></>, l: t.metrics.practice },
    { v: <Counter to={100} suffix="%" locale={loc} />, l: t.metrics.certified },
  ];
  return (
    <section className="relative -mt-24 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal instant>
          <div className="glass rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10 text-center">
              {items.map((it, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="grad-text text-3xl sm:text-4xl font-extrabold tracking-tight">{it.v}</div>
                  <div className="mt-2 text-sm text-[var(--ink)]/60 max-w-[14ch]">{it.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- features bento -------------------- */

function Features() {
  const { t } = useLocale();
  const items = [
    { emoji: "🎯", tint: "#EAF6FF", photo: IMAGES.features[0] },
    { emoji: "💬", tint: "#FEF3C7", photo: IMAGES.features[1] },
    { emoji: "🗣️", tint: "#DCFCE7", photo: IMAGES.features[2] },
    { emoji: "📲", tint: "#E0F2FE", icon: "telegram" as const },
  ];
  const spans = [
    "md:col-span-4 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2",
    "md:col-span-4",
  ];
  return (
    <section className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.features.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.features.title}<span className="grad-text">{t.features.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60">{t.features.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-2">
          {t.features.items.map((item, i) => (
            <FeatureCard
              key={item.title}
              className={spans[i]}
              emoji={items[i].emoji}
              tint={items[i].tint}
              photo={"photo" in items[i] ? items[i].photo : undefined}
              icon={"icon" in items[i] ? items[i].icon : undefined}
              title={item.title}
              text={item.text}
              big={i === 0 || i === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  emoji, title, text, className = "", tint = "#EAF6FF", photo, icon, big = false,
}: {
  emoji: string; title: string; text: string; className?: string; tint?: string; photo?: string; icon?: "telegram"; big?: boolean;
}) {
  return (
    <Reveal className={className}>
      <div className="lift-card group h-full rounded-[1.75rem] bg-white/85 border border-[#EAF0F6] p-7 shadow-[var(--shadow-soft)] backdrop-blur-sm">
        <LivingIcon emoji={emoji} tint={tint} photo={photo} icon={icon} size={big ? "lg" : "md"} />
        <h3 className={`mt-5 font-extrabold tracking-tight ${big ? "text-2xl" : "text-xl"}`}>{title}</h3>
        <p className="mt-2 text-[var(--ink)]/60 leading-relaxed">{text}</p>
      </div>
    </Reveal>
  );
}

/* -------------------- courses -------------------- */

function Courses() {
  const { t, lang } = useLocale();
  const emojis = ["🚀", "💼", "📊", "✈️", "🌎", "🎓", "🧒", "💡"];
  const tints = ["#E0F2FE", "#FEF3C7", "#EAF6FF", "#DCFCE7", "#FCE7F3", "#FEF3C7", "#FCE7F3", "#DCFCE7"];
  return (
    <section id="courses" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.courses.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.courses.title}<span className="grad-text">{t.courses.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60">{t.courses.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.courses.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <article className="lift-card group relative h-full overflow-hidden rounded-[1.75rem] bg-white/90 border border-[#EAF0F6] shadow-[var(--shadow-soft)] backdrop-blur-sm">
                <div className="course-photo-strip">
                  <WarmImg
                    src={IMAGES.courses[i]}
                    alt=""
                    width={IMAGE_DIMS.course[0]}
                    height={IMAGE_DIMS.course[1]}
                  />
                </div>
                <div className="p-7 pt-5">
                  <div className="flex items-start justify-between">
                    <LivingIcon emoji={emojis[i]} tint={tints[i]} />
                    {it.badge && (
                      <span className="rounded-full bg-[#FCBB00]/15 text-[#8a6a00] text-xs font-bold px-3 py-1 rotate-2">
                        {it.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">{it.t}</h3>
                  <p className="mt-2 text-[var(--ink)]/60">{it.d}</p>
                  <div className="mt-5 rounded-2xl bg-[#F4F7FB] px-4 py-3 text-sm font-semibold text-[var(--ink)]/80">
                    {it.r}
                  </div>
                  <a href={homeSection(lang, "trial")} onClick={trackCtaClick} className="btn-ghost mt-5 text-sm">{t.courses.more} <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- levels -------------------- */

function Levels() {
  const { t } = useLocale();
  return (
    <section id="levels" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.levels.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.levels.title}<span className="grad-text">{t.levels.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60">{t.levels.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.levels.items.map((l, i) => (
              <Reveal key={l.c} delay={i * 70}>
                <div className="lift-card h-full rounded-3xl bg-white border border-[#EAF0F6] p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex items-baseline gap-2">
                    <div className="grad-text text-3xl font-black">{l.c}</div>
                    <div className="text-sm font-bold text-[var(--ink)]/80">{l.e}</div>
                  </div>
                  <p className="mt-3 text-sm text-[var(--ink)]/65 leading-relaxed">{l.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
}

/* -------------------- how it works -------------------- */

function HowItWorks() {
  const { t } = useLocale();
  return (
    <section id="how" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl glass rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.how.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.how.title}<span className="grad-text">{t.how.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60">{t.how.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="glass h-full rounded-[1.75rem] p-7">
                <div className="grid h-10 w-10 place-items-center rounded-xl text-white font-extrabold shadow-[0_8px_18px_-6px_rgba(32,170,253,.6)]" style={{ background: "var(--grad-brand)" }}>
                  {i + 1}
                </div>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-[var(--ink)]/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="glass mt-10 rounded-[2rem] p-7 sm:p-10">
            <h3 className="text-center text-xl font-extrabold tracking-tight sm:text-2xl">{t.how.timelineTitle}</h3>
            <div className="mt-8 grid gap-5">
              {t.how.timeline.map((item, i) => (
                <div key={i} className="grid grid-cols-[80px_1fr] gap-5 items-start sm:grid-cols-[120px_1fr]">
                  <div className="grad-text text-sm sm:text-base font-extrabold">{item.m}</div>
                  <div className="border-b border-dashed border-[#cfe3f3] pb-5 last:border-0 last:pb-0">
                    <div className="font-bold">{item.t}</div>
                    <div className="text-sm text-[var(--ink)]/60 mt-1">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- pricing -------------------- */

function Pricing() {
  const { t, lang } = useLocale();
  return (
    <section id="pricing" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.pricing.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.pricing.title}<span className="grad-text">{t.pricing.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60">{t.pricing.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.pricing.plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`lift-card relative h-full overflow-hidden rounded-[1.75rem] p-7 border ${p.dark ? "text-white border-transparent" : "bg-white border-[#EAF0F6] shadow-[var(--shadow-soft)]"}`}
                style={p.dark ? { background: "linear-gradient(160deg,#0F0F19 0%, #020618 100%)" } : {}}
              >
                {p.dark && (
                  <>
                    <div className="absolute -top-20 -right-16 h-60 w-60 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(33,238,252,.3), transparent)" }} />
                    <div className="absolute -bottom-24 -left-10 h-60 w-60 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(32,170,253,.35), transparent)" }} />
                  </>
                )}
                {p.badge && (
                  <span
                    className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-bold text-[#0F0F19]"
                    style={{ background: p.dark ? "var(--grad-brand)" : "#FCBB00" }}
                  >
                    {p.badge}
                  </span>
                )}
                <div className="relative">
                  <div className={`text-sm font-bold ${p.dark ? "text-white/60" : "text-[var(--ink)]/50"} uppercase tracking-widest`}>{p.name}</div>
                  <div className="mt-2 text-xl font-extrabold tracking-tight">{p.count}</div>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className={`text-5xl font-black tracking-tight ${p.dark ? "" : "grad-text"}`}>{p.price}</span>
                    <span className={`${p.dark ? "text-white/60" : "text-[var(--ink)]/55"}`}>{t.pricing.perLesson}</span>
                  </div>
                  <p className={`mt-2 text-sm ${p.dark ? "text-white/60" : "text-[var(--ink)]/55"}`}>{p.perk} · {p.total}</p>
                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full ${p.dark ? "bg-white/10" : "bg-[#EAF6FF]"}`}>
                          <Check className="h-3 w-3 text-[#20AAFD]" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={homeSection(lang, "trial")}
                    onClick={trackCtaClick}
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-full py-3 font-bold transition-all ${
                      p.dark
                        ? "bg-white text-[#0F0F19] hover:bg-white/90"
                        : "btn-primary !w-full"
                    }`}
                  >
                    {t.pricing.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- reviews -------------------- */

function Reviews() {
  const { t } = useLocale();
  return (
    <section id="reviews" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl glass rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{t.reviews.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.reviews.title}<span className="grad-text">{t.reviews.titleAccent}</span>
          </h2>
          <p className="mt-5 text-[var(--ink)]/60 leading-relaxed">{t.reviews.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.reviews.items.map((r, i) => (
            <Reveal key={r.n} delay={i * 100}>
              <div className="glass h-full rounded-[1.75rem] p-7 flex flex-col">
                <div className="flex items-center gap-1 text-[#FCBB00]">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-[var(--ink)]/80 leading-relaxed flex-1">«{r.q}»</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-bold">{r.n}</div>
                    <div className="text-sm text-[var(--ink)]/55">{r.p}</div>
                  </div>
                  <span className="rounded-full bg-[#EAF6FF] px-3 py-1 text-xs font-bold text-[#20AAFD]">{r.badge}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- trial form -------------------- */

function TrialForm() {
  const { t, lang } = useLocale();
  const [tab, setTab] = useState<"adult" | "kid">("adult");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountry>(DEFAULT_PHONE_COUNTRY);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successFading, setSuccessFading] = useState(false);
  const [promo, setPromo] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const bulletIcons = [Target, User2, BookOpen, Headphones];

  useEffect(() => {
    if (status !== "success") return;
    setSuccessFading(false);
    const fadeTimer = window.setTimeout(() => setSuccessFading(true), 8000);
    const resetTimer = window.setTimeout(() => {
      setStatus("idle");
      setSuccessFading(false);
    }, 10000);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(resetTimer);
    };
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setPhoneError("");
    setEmailError("");
    setConsentError("");
    if (!consent) {
      setConsentError(t.trial.consentError);
      return;
    }
    if (!isValidPhone(phone, phoneCountry)) {
      setPhoneError(t.trial.phoneError);
      return;
    }
    const emailCheck = validateTrialEmail(email);
    if (!emailCheck.ok) {
      setEmailError(
        emailCheck.reason === "disposable" ? t.trial.emailDisposableError : t.trial.emailError,
      );
      return;
    }
    setStatus("sending");
    const eventId = crypto.randomUUID();
    const result = await submitTrial({
      name,
      email,
      phone: phoneToE164(phone, phoneCountry),
      promo: promo || undefined,
      audience: tab === "kid" ? "child" : "adult",
      consent: true,
      landing: "us-55",
      eventId,
    });
    if (result.ok) {
      setStatus("success");
      trackMetaEvent("Lead", { eventID: eventId });
      trackGaEvent("generate_lead", { method: "trial_form", audience: tab });
      setName("");
      setEmail("");
      setPhone("");
      setPhoneCountry(DEFAULT_PHONE_COUNTRY);
      setPromo("");
      setConsent(false);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? t.trial.errorGeneric);
    }
  }

  return (
    <section id="trial" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-[#EAF0F6] shadow-[var(--shadow-lift)] md:grid-cols-2">
            <div className="relative p-8 sm:p-12 text-white" style={{ background: "linear-gradient(160deg,#0F0F19 0%, #020618 100%)" }}>
              <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(32,170,253,.4), transparent)" }} />
              <div className="absolute -top-20 -right-10 h-60 w-60 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(33,238,252,.3), transparent)" }} />
              <div className="relative">
                <div className="eyebrow !text-[#21EEFC]">{t.trial.eyebrow}</div>
                <h2 className="h-display mt-3 text-3xl sm:text-4xl">
                  {t.trial.title}<span className="grad-text">{t.trial.titleAccent}</span>
                </h2>
                <p className="mt-4 text-white/65">{t.trial.subtitle}</p>
                <ul className="mt-8 space-y-4">
                  {t.trial.bullets.map((label, i) => {
                    const Icon = bulletIcons[i];
                    return (
                      <li key={label} className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                          <Icon className="h-4 w-4 text-[#21EEFC] icon-alive" />
                        </span>
                        <span className="font-semibold">{label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="relative p-8 sm:p-12" style={{ background: "linear-gradient(180deg,#F8F9FC 0%, #EAF6FF 100%)" }}>
              <div className="glass rounded-[1.5rem] p-1 inline-flex text-sm font-bold">
                {(["adult", "kid"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTab(k)}
                    className={`px-5 py-2 rounded-xl transition-all ${tab === k ? "text-white shadow-md" : "text-[var(--ink)]/60"}`}
                    style={tab === k ? { background: "var(--grad-brand)" } : {}}
                  >
                    {k === "adult" ? t.trial.adult : t.trial.kid}
                  </button>
                ))}
              </div>

              {status === "success" ? (
                <div
                  className={`mt-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-800 transition-opacity duration-[2000ms] ${
                    successFading ? "opacity-0" : "opacity-100"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <Check className="h-6 w-6 mb-2" />
                  <p className="font-semibold">{t.trial.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
                  <Field
                    id="trial-name"
                    icon={<User2 className="h-4 w-4" />}
                    type="text"
                    name="name"
                    label={tab === "adult" ? t.trial.nameAdult : t.trial.nameKid}
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tab === "adult" ? t.trial.nameAdult : t.trial.nameKid}
                  />
                  <Field
                    id="trial-email"
                    icon={<Mail className="h-4 w-4" />}
                    type="email"
                    name="email"
                    label={t.trial.email}
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder={t.trial.email}
                    error={emailError}
                    aria-describedby={emailError ? "trial-email-error" : undefined}
                  />
                  <PhoneField
                    id="trial-phone"
                    label={t.trial.phone}
                    value={phone}
                    country={phoneCountry}
                    locale={localeForLang(lang)}
                    onCountryChange={(country) => {
                      setPhoneCountry(country);
                      setPhoneError("");
                    }}
                    onChange={(value) => {
                      setPhone(value);
                      setPhoneError("");
                    }}
                    error={phoneError}
                  />
                  <Field
                    id="trial-promo"
                    icon={<Tag className="h-4 w-4" />}
                    type="text"
                    name="promo"
                    label={t.trial.promo}
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder={t.trial.promo}
                  />
                  <label className="flex items-start gap-2.5 text-xs text-[var(--ink)]/60 pt-1">
                    <input
                      type="checkbox"
                      id="trial-consent"
                      name="consent"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setConsentError("");
                      }}
                      className="mt-0.5 h-4 w-4 accent-[#20AAFD]"
                      aria-label={t.trial.consentLabel}
                      aria-invalid={consentError ? true : undefined}
                      aria-describedby={consentError ? "trial-consent-error" : undefined}
                    />
                    <span>{t.trial.consent}</span>
                  </label>
                  {consentError && (
                    <p id="trial-consent-error" className="text-sm text-red-600">
                      {consentError}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600">{errorMsg}</p>
                  )}
                  <button type="submit" disabled={status === "sending"} className="btn-primary !w-full mt-2 disabled:opacity-70">
                    {status === "sending" ? t.trial.sending : t.trial.submit} <ArrowRight className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2 text-xs text-[var(--ink)]/55 pt-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> {t.trial.spam}
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  id,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  label: string;
  id: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="group flex items-center gap-3 rounded-2xl bg-white border border-[#EAF0F6] px-4 py-3.5 focus-within:border-[#20AAFD] focus-within:ring-4 focus-within:ring-[#20AAFD]/15 transition-all"
      >
        <span className="text-[var(--ink)]/40 group-focus-within:text-[#20AAFD] transition-colors" aria-hidden>
          {icon}
        </span>
        <span className="sr-only">{label}</span>
        <input
          id={id}
          aria-label={label}
          aria-invalid={error ? true : undefined}
          {...props}
          className="w-full bg-transparent text-sm placeholder:text-[var(--ink)]/40 focus:outline-none"
        />
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 px-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------- FAQ -------------------- */

function FAQ() {
  const { t } = useLocale();
  return (
    <section id="faq" className="relative py-28 px-4">
      <div className="mx-auto max-w-3xl glass rounded-[2.5rem] px-6 py-10 sm:px-10 sm:py-14">
        <Reveal className="text-center">
          <div className="eyebrow">{t.faq.eyebrow}</div>
          <h2 className="h-display mt-3 text-4xl sm:text-5xl">
            {t.faq.title}<span className="grad-text">{t.faq.titleAccent}</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {t.faq.items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group glass rounded-2xl px-6 py-5 open:shadow-[var(--shadow-lift)] transition-shadow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-extrabold text-[var(--ink)]">{it.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EAF6FF] text-[#20AAFD] transition-transform group-open:rotate-45">
                    <span className="block h-3 w-3">
                      <svg viewBox="0 0 12 12" fill="currentColor"><path d="M5 0h2v5h5v2H7v5H5V7H0V5h5z"/></svg>
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-[var(--ink)]/65 leading-relaxed">{it.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- final CTA -------------------- */

function FinalCTA() {
  const { t, lang } = useLocale();
  return (
    <section className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] p-12 sm:p-20 text-center text-white" style={{ background: "linear-gradient(135deg,#20AAFD 0%, #21EEFC 100%)" }}>
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/20 blur-3xl animate-[blob_18s_ease-in-out_infinite]" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/15 blur-3xl animate-[blob_22s_ease-in-out_infinite]" />
            <div className="relative">
              <Heart className="mx-auto h-7 w-7 opacity-80 icon-alive" />
              <h2 className="h-display mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
                {t.finalCta.title}<span className="text-white">{t.finalCta.titleAccent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/90">{t.finalCta.subtitle}</p>
              <a href={homeSection(lang, "trial")} onClick={trackCtaClick} className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F0F19] px-7 py-4 font-bold text-white shadow-[0_20px_50px_-10px_rgba(15,15,25,.5)] hover:-translate-y-1 transition-transform">
                {t.finalCta.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
