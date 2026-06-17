import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { trackCtaClick } from "@/lib/cta";
import { homeSection } from "@/lib/site-links";

export function MobileStickyCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trial = document.getElementById("trial");
    const footer = document.querySelector("footer");
    if (!trial) return;

    const onScroll = () => {
      const y = window.scrollY;
      const trialTop = trial.getBoundingClientRect().top + y;
      const footerTop = footer?.getBoundingClientRect().top
        ? footer.getBoundingClientRect().top + y
        : Infinity;
      const show = y > 480 && y + window.innerHeight < trialTop - 80 && y + 100 < footerTop;
      setVisible(show);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="region"
      aria-label={t.stickyCta.aria}
    >
      <a
        href={homeSection("trial")}
        onClick={trackCtaClick}
        className="btn-primary !w-full !py-3.5 text-base shadow-[0_12px_40px_-12px_rgba(32,170,253,.65)]"
      >
        {t.stickyCta.label} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
