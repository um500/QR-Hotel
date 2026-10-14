import type { LucideIcon } from "lucide-react";
import { Bell, Clock, Infinity as InfinityIcon, Play, Smartphone, Zap } from "lucide-react";
import LandingNavbar from "./LandingNavbar";
import PhoneMockup from "./PhoneMockup";

const STATS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Zap, label: "Setup in", value: "10 Minutes" },
  { icon: Smartphone, label: "Zero", value: "App Downloads" },
  { icon: Bell, label: "Real-time", value: "Request Alerts" },
  { icon: InfinityIcon, label: "Unlimited", value: "Rooms" },
  { icon: Clock, label: "24/7", value: "Guest Access" },
];

export default function Hero() {
  return (
    <section
      className="relative bg-navy"
      style={{
        backgroundImage:
          "radial-gradient(60% 55% at 85% 20%, rgba(184,135,47,0.20), transparent 60%), radial-gradient(45% 50% at 95% 70%, rgba(184,135,47,0.12), transparent 65%), radial-gradient(70% 70% at 0% 100%, rgba(23,38,66,0.9), transparent 60%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
        aria-hidden="true"
      />

      <LandingNavbar />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:pb-28">
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Digital Concierge for Modern Hotels
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
            One Scan.
            <br />
            Every Hotel Service,
            <br />
            <span className="text-gold">Instantly.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
            Guests scan a room QR code to access WiFi, hotel services, food
            menu, amenities and nearby places — no app download needed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-gold/90"
            >
              Get Started Free
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Play size={14} className="fill-current" />
              See How It Works
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center pt-4 lg:pt-0">
          <div className="absolute z-0 hidden w-44 translate-x-20 translate-y-28 -rotate-3 rounded-2xl bg-white/95 p-3.5 shadow-pop sm:block lg:translate-x-24">
            <p className="font-display text-[10px] font-semibold tracking-[0.1em] text-navy">
              THE GRAND ORCHID
            </p>
            <p className="text-[8px] tracking-[0.2em] text-ink-faint">HOTEL</p>
            <div
              className="my-2.5 aspect-square w-full rounded-md bg-navy"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #0f1b2e 0 4px, #f6f5f1 4px 8px), repeating-linear-gradient(0deg, #0f1b2e 0 4px, transparent 4px 8px)",
              }}
              aria-hidden="true"
            />
            <p className="text-center text-[8px] font-medium leading-tight text-ink-dim">
              SCAN TO EXPLORE
              <br />
              OUR SERVICES
            </p>
          </div>

          <div className="relative z-10">
            <PhoneMockup />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mb-10 hidden max-w-5xl px-5 sm:block lg:-mb-12">
        <div className="grid grid-cols-5 divide-x divide-line rounded-2xl bg-white px-4 py-6 shadow-pop">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={16} />
              </span>
              <p className="text-xs leading-tight text-ink-dim">
                {label}
                <br />
                <span className="font-semibold text-ink">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stats: stacked 2-up grid instead of the floating 5-col strip */}
      <div className="relative z-20 mx-auto -mb-8 max-w-5xl px-5 sm:hidden">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-pop">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={14} />
              </span>
              <p className="text-[11px] leading-tight text-ink-dim">
                {label}
                <br />
                <span className="font-semibold text-ink">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
