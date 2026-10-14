import type { LucideIcon } from "lucide-react";
import { Crown, Settings, UserCheck, Zap } from "lucide-react";

const POINTS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Zap,
    title: "Faster Service",
    description: "Requests reach staff instantly, no missed calls or confusion.",
  },
  {
    icon: Crown,
    title: "Happier Guests",
    description:
      "Guests get information and services on their own, whenever they need.",
  },
  {
    icon: UserCheck,
    title: "Less Staff Workload",
    description: "Reduce repetitive queries and phone calls.",
  },
  {
    icon: Settings,
    title: "Fully Customizable Branding",
    description:
      "Use your hotel's logo, colors and content for a consistent guest experience.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-navy px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          A Better Experience for Your Guests
        </span>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold text-white sm:text-4xl">
          Why Hotels Choose <span className="text-gold">StayQR</span>
        </h2>
        <p className="mt-3 max-w-lg text-[15px] text-white/65">
          Give your guests a modern, convenient and memorable stay while
          making hotel operations simpler for your team.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div
            className="relative flex min-h-[260px] items-end overflow-hidden rounded-2xl p-5 sm:min-h-[300px]"
            style={{
              backgroundImage:
                "linear-gradient(160deg, #22334f 0%, #182742 55%, #0f1b2e 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(40% 50% at 20% 20%, rgba(184,135,47,0.35), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative rounded-xl bg-navy/80 p-5 text-white ring-1 ring-white/10 backdrop-blur">
              <p className="font-display text-2xl leading-none text-gold/80">
                &ldquo;
              </p>
              <p className="-mt-2 text-sm leading-relaxed text-white/85">
                Our guests love the ease of access. We get fewer calls and
                faster service — StayQR has truly improved our guest
                experience.
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                Rajiv Mehta
              </p>
              <p className="text-xs text-white/55">
                General Manager, The Grand Orchid Hotel
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-1">
            {POINTS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-white">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
