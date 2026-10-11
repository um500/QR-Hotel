// Lotus mark + wordmark, reused on the sidebar and the login screen at two
// sizes. Pure inline SVG — no image asset to ship or fail to load.

export default function Logo({
  size = "md",
  tone = "dark",
}: {
  size?: "md" | "lg";
  tone?: "dark" | "light";
}) {
  const markSize = size === "lg" ? 56 : 34;
  const nameSize = size === "lg" ? "text-xl" : "text-sm";
  const subSize = size === "lg" ? "text-[11px]" : "text-[8px]";
  const goldColor = tone === "dark" ? "#b8872f" : "#e9c879";
  const nameColor = tone === "dark" ? "text-ink" : "text-white";
  const subColor = tone === "dark" ? "text-ink-faint" : "text-white/50";

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 30 C24 18 18 12 12 8 C14 18 17 26 24 30 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 30 C24 18 30 12 36 8 C34 18 31 26 24 30 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 30 C24 16 22 10 18 4 C22 10 24 18 24 30 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 30 C24 16 26 10 30 4 C26 10 24 18 24 30 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 30 C24 14 24 8 24 2 C24 8 24 20 24 30 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M6 32 C12 40 36 40 42 32 C34 36 14 36 6 32 Z"
          stroke={goldColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <p
          className={`font-display font-semibold tracking-[0.04em] ${nameSize} ${nameColor}`}
        >
          THE GRAND ORCHID
        </p>
        <p
          className={`mt-0.5 font-sans tracking-[0.35em] ${subSize} ${subColor}`}
        >
          HOTEL
        </p>
      </div>
    </div>
  );
}
