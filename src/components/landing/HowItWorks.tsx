import type { LucideIcon } from "lucide-react";
import { Laptop, QrCode, Smartphone, Users } from "lucide-react";

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Laptop,
    title: "Hotel Sets Up Rooms",
    description:
      "Add rooms, staff, WiFi and menu through a simple dashboard. No technical skill needed.",
  },
  {
    icon: QrCode,
    title: "Each Room Gets a Unique QR",
    description:
      "Generate a printable QR code for every room and place it on a table tent or wall frame.",
  },
  {
    icon: Smartphone,
    title: "Guest Scans & Explores",
    description:
      "Guest scans with their own phone camera and lands directly on their room's personalized portal.",
  },
  {
    icon: Users,
    title: "Requests Reach Staff Instantly",
    description:
      "Any request guests make appears live on the staff dashboard in real time. No missed calls.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Simple Setup. Big Impact.
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            How <span className="text-gold">DeskQR</span> Works
          </h2>
          <p className="mt-3 text-[15px] text-ink-dim">
            From setup to service, it&apos;s simple, fast and hassle-free.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            className="absolute left-0 right-0 top-6 hidden border-t-2 border-dashed border-gold/40 lg:block"
            aria-hidden="true"
          />
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-sm font-semibold text-gold ring-2 ring-gold">
                {i + 1}
              </span>
              <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
                <Icon size={20} />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-ink">
                {title}
              </p>
              <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-ink-dim">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
