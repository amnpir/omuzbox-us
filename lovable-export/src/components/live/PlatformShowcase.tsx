import { LayoutGrid, BookOpen, BarChart3, Calendar, Send, CheckCircle2, Clock, Flame } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { TelegramBotDemo } from "./TelegramBotDemo";

export function PlatformShowcase() {
  const { t } = useLocale();
  const p = t.showcase.platform;

  return (
    <section id="about" className="relative py-20 px-4">
      <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="lift-card flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EAF0F6] bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#EAF6FF] text-[#20AAFD]">
                <LayoutGrid className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">{p.title}</h3>
                <p className="text-sm text-[var(--ink)]/60">{p.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="platform-mock rounded-2xl border border-[#EAF0F6] bg-[#F4F7FB] p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink)]/50">
                <span>{p.mockLabel}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">{p.liveBadge}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: BookOpen, label: p.items.lessons },
                  { icon: Calendar, label: p.items.schedule },
                  { icon: BarChart3, label: p.items.progress },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white p-3 text-center shadow-sm border border-white animate-[float_8s_ease-in-out_infinite]"
                  >
                    <Icon className="mx-auto h-5 w-5 text-[#20AAFD]" />
                    <div className="mt-2 text-[0.7rem] font-bold text-[var(--ink)]/70">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-white p-3 border border-[#EAF0F6]">
                <div className="flex gap-2">
                  <div className="h-2 flex-1 rounded-full bg-[#EAF6FF]" />
                  <div className="h-2 w-1/3 rounded-full grad-bg" />
                </div>
                <p className="mt-2 text-xs text-[var(--ink)]/55">{p.progressHint}</p>
              </div>
            </div>

            <div className="mt-4 grid flex-1 gap-3">
              <div className="rounded-2xl border border-[#EAF0F6] bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF6FF] text-[#20AAFD]">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/45">
                      {p.upcomingLabel}
                    </div>
                    <div className="mt-1 font-bold text-[var(--ink)]">{p.upcomingLesson}</div>
                    <div className="text-sm text-[var(--ink)]/55">{p.upcomingTeacher}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#EAF0F6] bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/45">{p.homeworkLabel}</div>
                <ul className="mt-3 space-y-2">
                  {p.homework.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--ink)]/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#20AAFD]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#EAF0F6] bg-gradient-to-r from-[#EAF6FF] to-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]/45">{p.weekLabel}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--ink)]/80 shadow-sm">
                    <BookOpen className="h-3.5 w-3.5 text-[#20AAFD]" />
                    {p.weekLessons}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--ink)]/80 shadow-sm">
                    <BarChart3 className="h-3.5 w-3.5 text-[#20AAFD]" />
                    {p.weekSpeaking}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[var(--ink)]/80 shadow-sm">
                    <Flame className="h-3.5 w-3.5 text-[#FCBB00]" />
                    {p.weekStreak}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lift-card flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EAF0F6] bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-sm">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E0F2FE] text-[#2AABEE]">
                <Send className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">{t.showcase.telegram.title}</h3>
                <p className="text-sm text-[var(--ink)]/60">{t.showcase.telegram.subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col px-6 pb-6">
            <TelegramBotDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
