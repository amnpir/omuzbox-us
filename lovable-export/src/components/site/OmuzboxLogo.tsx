type OmuzboxLogoProps = {
  className?: string;
  size?: "sm" | "md";
  /** Black cube for light backgrounds; white cube for dark backgrounds (footer). */
  variant?: "dark" | "light";
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
} as const;

export function OmuzboxLogo({ className = "", size = "sm", variant = "dark" }: OmuzboxLogoProps) {
  return (
    <span
      className={`grid shrink-0 place-items-center ${sizes[size]} ${className}`}
      aria-hidden
    >
      <img
        src="/omuzbox-cube.png"
        alt=""
        width={36}
        height={36}
        className={`h-full w-full object-contain ${variant === "light" ? "invert" : ""}`}
        decoding="async"
      />
    </span>
  );
}
