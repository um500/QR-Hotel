import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "Segoe UI", "sans-serif"],
      },
      colors: {
        // Legacy tokens — still used by the guest-facing pages (src/app/r/**).
        accent: "#b5781f",
        accent2: "#1f8a79",

        // Admin design system — matches the approved StayQR Admin mockups.
        navy: {
          DEFAULT: "#0f1b2e",
          light: "#182742",
          lighter: "#22334f",
        },
        gold: {
          DEFAULT: "#b8872f",
          soft: "#f6ecd6",
        },
        brand: {
          DEFAULT: "#1d5fd6",
          soft: "#e7eefc",
          hover: "#1750b8",
        },
        success: {
          DEFAULT: "#1f9d6c",
          soft: "#e2f5ec",
        },
        warning: {
          DEFAULT: "#d79a1f",
          soft: "#fbf0dc",
        },
        danger: {
          DEFAULT: "#d6433c",
          soft: "#fbe8e7",
        },
        ink: {
          DEFAULT: "#1b2433",
          dim: "#6b7280",
          faint: "#9aa2b1",
        },
        line: "#e6e3da",
        paper: "#f6f5f1",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 27, 46, 0.04), 0 1px 1px rgba(15, 27, 46, 0.03)",
        pop: "0 12px 32px rgba(15, 27, 46, 0.18)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
