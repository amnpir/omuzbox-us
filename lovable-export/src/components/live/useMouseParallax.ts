import { useEffect, useRef, useState } from "react";

export function useMouseParallax<T extends HTMLElement>(strength = 1) {
  const ref = useRef<T | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const on = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
      const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
      setTilt({ x, y });
    };

    window.addEventListener("mousemove", on, { passive: true });
    return () => window.removeEventListener("mousemove", on);
  }, [strength]);

  const px = (n: number) =>
    `translate3d(${tilt.x * n}px, ${tilt.y * n}px, 0)`;

  const rotate = (deg = 12) =>
    `rotateX(${tilt.y * -deg}deg) rotateY(${tilt.x * deg}deg)`;

  return { ref, tilt, px, rotate };
}
