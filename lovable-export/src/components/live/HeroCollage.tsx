import { WarmImg, IMAGES, IMAGE_DIMS } from "@/lib/images";
import { useMouseParallax } from "./useMouseParallax";

type HeroCollageProps = {
  liveName: string;
  liveStatus: string;
  progressTitle: string;
  progressSub: string;
  ielts: string;
  ieltsSub: string;
};

export function HeroCollage({
  liveName,
  liveStatus,
  progressTitle,
  progressSub,
  ielts,
  ieltsSub,
}: HeroCollageProps) {
  const { ref, px, rotate } = useMouseParallax<HTMLDivElement>(1);

  return (
    <div ref={ref} className="hero-scene relative mx-auto max-w-md">
      <div
        className="hero-collage relative"
        style={{ transform: rotate(10) }}
      >
        {/* back polaroid */}
        <div
          className="polaroid polaroid-back animate-[float_11s_ease-in-out_infinite]"
          style={{ transform: `${px(-6)} rotate(-8deg)` }}
        >
          <WarmImg
            src={IMAGES.hero.secondary}
            alt=""
            width={IMAGE_DIMS.hero.secondary[0]}
            height={IMAGE_DIMS.hero.secondary[1]}
            className="h-full w-full object-cover"
          />
        </div>

        {/* main smiling photo */}
        <div
          className="polaroid polaroid-main shadow-[0_40px_90px_-25px_rgba(32,170,253,0.55)]"
          style={{ transform: px(-10) }}
        >
          <WarmImg
            src={IMAGES.hero.main}
            alt="Happy student learning English online"
            width={IMAGE_DIMS.hero.main[0]}
            height={IMAGE_DIMS.hero.main[1]}
            loading="eager"
            className="aspect-[4/5] w-full object-cover object-[center_15%]"
          />
          <div className="polaroid-caption hand text-lg">Hello! 👋</div>
        </div>

        {/* small accent photo */}
        <div
          className="polaroid polaroid-accent animate-[float_8s_ease-in-out_infinite]"
          style={{ transform: `${px(14)} rotate(6deg)` }}
        >
          <WarmImg
            src={IMAGES.hero.accent}
            alt=""
            width={IMAGE_DIMS.hero.accent[0]}
            height={IMAGE_DIMS.hero.accent[1]}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 3D-style floating stickers */}
        <div className="sticker sticker-sun animate-[float_6s_ease-in-out_infinite]" style={{ transform: px(20) }}>
          ☀️
        </div>
        <div className="sticker sticker-chat animate-[float_7s_ease-in-out_infinite]" style={{ transform: `${px(-16)} rotate(-4deg)` }}>
          <span className="text-xs font-bold text-[#20AAFD]">Let&apos;s talk!</span>
        </div>
        <div className="sticker sticker-flag animate-[float_9s_ease-in-out_infinite]" style={{ transform: px(12) }}>
          🇺🇸
        </div>
      </div>

      {/* glass cards */}
      <div
        className="glass absolute -top-2 -left-4 sm:-left-8 flex items-center gap-3 rounded-2xl px-3 py-2 text-sm animate-[float_7s_ease-in-out_infinite] z-10"
        style={{ transform: px(14) }}
      >
        <WarmImg
          src={IMAGES.hero.liveAvatar}
          alt={liveName}
          width={IMAGE_DIMS.hero.liveAvatar[0]}
          height={IMAGE_DIMS.hero.liveAvatar[1]}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
        />
        <div>
          <div className="font-bold">{liveName}</div>
          <div className="text-xs text-[var(--ink)]/60">
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {liveStatus}
            </span>
          </div>
        </div>
      </div>

      <div
        className="glass absolute top-[42%] -right-4 sm:-right-8 flex items-center gap-3 rounded-2xl px-3 py-2 text-sm animate-[float_9s_ease-in-out_infinite] z-10"
        style={{ transform: px(-18) }}
      >
        <div className="relative grid h-11 w-11 place-items-center">
          <svg viewBox="0 0 36 36" className="h-11 w-11 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(32,170,253,.15)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="url(#g1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="94.2"
              strokeDashoffset="22"
            />
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#20AAFD" />
                <stop offset="1" stopColor="#21EEFC" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-[0.65rem] font-extrabold text-[#20AAFD]">B2</span>
        </div>
        <div>
          <div className="font-bold">{progressTitle}</div>
          <div className="text-xs text-[var(--ink)]/60">{progressSub}</div>
        </div>
      </div>

      <div
        className="glass absolute -bottom-2 left-6 rounded-2xl px-4 py-2 text-sm animate-[float_8s_ease-in-out_infinite] z-10"
        style={{ transform: `${px(10)} rotate(-4deg)` }}
      >
        <div className="font-extrabold text-[#20AAFD]">{ielts}</div>
        <div className="text-xs text-[var(--ink)]/60">{ieltsSub}</div>
      </div>
    </div>
  );
}
