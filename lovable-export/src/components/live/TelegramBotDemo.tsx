import { useEffect, useRef, useState } from "react";
import { Mic, Send, Loader2, Play, CheckCheck } from "lucide-react";
import { useLocale } from "@/lib/i18n";

const PHASES = ["record", "send", "analyze", "feedback"] as const;
const PHASE_MS = 2600;

function VoiceWave({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <div className={`tg-voice-wave ${className}`}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <span
          key={i}
          className={active ? "tg-voice-bar tg-voice-bar--active" : "tg-voice-bar"}
          style={{ animationDelay: `${i * 0.08}s` }}
        />
      ))}
    </div>
  );
}

export function TelegramBotDemo() {
  const { t } = useLocale();
  const [phase, setPhase] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tg = t.showcase.telegram;
  const current = PHASES[phase];

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const scroll = () => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    };
    scroll();
    const t1 = window.setTimeout(scroll, 120);
    const t2 = window.setTimeout(scroll, 420);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  return (
    <div className="tg-bot-demo flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#2a3847] bg-[#17212b] text-white">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#242f3d] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2AABEE] text-white">
          <Send className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold">{tg.botName}</div>
          <div className="text-xs text-white/55">{tg.stages[current]}</div>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-300">
          bot
        </span>
      </div>

      <div ref={chatRef} className="tg-bot-chat tg-bot-chat--scroll min-h-0 flex-1 px-4 py-4">
        <div className="space-y-3">
          <div className="tg-bubble tg-bubble--bot max-w-[88%]">
            <p className="text-sm leading-relaxed text-white/90">{tg.prompt}</p>
            <span className="tg-bubble-time">10:24</span>
          </div>

          {(current === "send" || current === "analyze" || current === "feedback") && (
            <div className="tg-bubble tg-bubble--user ml-auto max-w-[78%] tg-bubble--enter">
              <div className="flex items-center gap-3">
                <VoiceWave active={current === "send"} />
                <div>
                  <div className="text-xs font-semibold text-white/80">0:14</div>
                  {current !== "send" && (
                    <div className="mt-0.5 flex items-center gap-1 text-[0.65rem] text-white/45">
                      <CheckCheck className="h-3 w-3 text-[#2AABEE]" />
                      {tg.stages.send}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {current === "record" && (
            <div className="tg-record-panel tg-record-panel--active">
              <span className="tg-record-mic">
                <Mic className="h-5 w-5" />
              </span>
              <VoiceWave active />
              <span className="text-xs font-semibold text-white/70">{tg.stages.record}</span>
            </div>
          )}

          {current === "analyze" && (
            <div className="tg-bubble tg-bubble--bot max-w-[72%] tg-bubble--enter">
              <div className="flex items-center gap-2 text-sm text-white/75">
                <Loader2 className="h-4 w-4 animate-spin text-[#2AABEE]" />
                {tg.stages.analyze}
              </div>
            </div>
          )}

          {current === "feedback" && (
            <div className="tg-bubble tg-bubble--bot max-w-[88%] tg-bubble--enter">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2AABEE]/25 text-[#2AABEE]">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                <div className="min-w-0">
                  <VoiceWave active className="mb-2" />
                  <p className="text-sm leading-relaxed text-white/85">{tg.feedback}</p>
                  <div className="mt-1 text-[0.65rem] font-semibold text-[#2AABEE]">{tg.stages.feedback}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} className="h-1" aria-hidden />
      </div>

      <div className="border-t border-white/10 bg-[#242f3d] px-4 py-2.5">
        <div className="flex items-center gap-2">
          {PHASES.map((p, i) => (
            <span
              key={p}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= phase ? "bg-[#2AABEE]" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
