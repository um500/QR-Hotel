import type { LucideIcon } from "lucide-react";
import { Bell, Info, MapPin, Utensils, Waves, Wifi } from "lucide-react";

const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
  fg: string;
}[] = [
  {
    icon: Wifi,
    title: "Instant WiFi Access",
    description: "No asking staff — password shown the moment they scan.",
    bg: "bg-sky-50",
    fg: "text-sky-600",
  },
  {
    icon: Utensils,
    title: "Room Service & Food Menu",
    description: "Browse and order food straight from their phone.",
    bg: "bg-orange-50",
    fg: "text-orange-600",
  },
  {
    icon: Bell,
    title: "One-Tap Requests",
    description: "Housekeeping, laundry, maintenance, extra towels and more.",
    bg: "bg-gold-soft",
    fg: "text-gold",
  },
  {
    icon: Waves,
    title: "Hotel Amenities",
    description: "Gym, spa, pool timings and booking, all in one place.",
    bg: "bg-rose-50",
    fg: "text-rose-500",
  },
  {
    icon: MapPin,
    title: "Nearby Places",
    description: "Curated tourist spots and distances near the hotel.",
    bg: "bg-emerald-50",
    fg: "text-emerald-600",
  },
  {
    icon: Info,
    title: "Live Hotel Info",
    description: "Checkout time, breakfast hours, contact numbers and more.",
    bg: "bg-amber-50",
    fg: "text-amber-600",
  },
];

export default function Features() {
  return (
    <section
      id="about"
      className="bg-paper px-5 pb-20 pt-24 sm:px-8 sm:pt-20 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Everything Your Guests Need
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            What <span className="text-gold">Guests</span> Get
          </h2>
          <p className="mt-3 text-[15px] text-ink-dim">
            A complete digital concierge experience, right on their phone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, bg, fg }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full ${bg} ${fg}`}
              >
                <Icon size={19} />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-ink">
                {title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
