/** Real Unsplash photos — each URL used only once across the site */
import { useEffect, useState, type ImgHTMLAttributes } from "react";

export const IMAGES = {
  hero: {
    main: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=1100&fit=crop&q=80",
    secondary: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&q=80",
    accent: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop&q=80",
    liveAvatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=120&h=120&fit=crop&q=80",
  },
  socialProof: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  ],
  marquee: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&q=80",
  ],
  features: [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80",
  ],
  courses: [
    "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop&q=80",
  ],
} as const;

export const IMAGE_DIMS = {
  hero: { main: [900, 1100], secondary: [600, 750], accent: [400, 500], liveAvatar: [120, 120] },
  avatar: [120, 120],
  feature: [200, 200],
  course: [400, 200],
} as const;

const FALLBACK =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop&q=80";

export function WarmImg({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height" | "loading">) {
  const [url, setUrl] = useState(src);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    setUrl(src);
    setUsedFallback(false);
  }, [src]);

  return (
    <img
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={`photo-warm ${className}`}
      loading={loading}
      decoding="async"
      fetchPriority={loading === "eager" ? "high" : undefined}
      onError={() => {
        if (!usedFallback) {
          setUsedFallback(true);
          setUrl(FALLBACK);
        }
      }}
      {...props}
    />
  );
}
