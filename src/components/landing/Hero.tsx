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
          "radial-gradient(60% 55% at 85% 20%, rgba(184,135,47,0.22), transparent 60%), linear-gradient(100deg, rgba(10,16,30,0.94) 0%, rgba(12,20,36,0.82) 38%, rgba(15,27,46,0.55) 62%, rgba(15,27,46,0.35) 100%), url('/images/landing/hero-bedroom.jpg')",
        backgroundSize: "auto, auto, cover",
        backgroundPosition: "center, center, center",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
      }}
    >
      <LandingNavbar />
      {/* Spacer: LandingNavbar is fixed, so this reserves its height in normal flow */}
      <div className="h-[81px] lg:h-[83px]" aria-hidden="true" />

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
          <div
            className="absolute z-0 hidden aspect-[4/5] w-40 translate-x-20 translate-y-28 -rotate-3 overflow-hidden rounded-2xl bg-white shadow-pop sm:block lg:translate-x-24"
            aria-hidden="true"
          >
            <img
              src="/images/landing/qr-stand.jpg"
              alt=""
              className="h-full w-full scale-[1.7] object-cover object-[60%_45%]"
            />
          </div>

          <div className="relative z-10">
            <PhoneMockup />
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mb-[46px] hidden max-w-5xl px-5 sm:block lg:-mb-[42px]">
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
      <div className="relative z-20 mx-auto -mb-[76px] max-w-5xl px-5 sm:hidden">
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
