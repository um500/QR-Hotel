import { Bell } from "lucide-react";

export default function CtaBanner() {
  return (
    <section
      className="relative overflow-hidden bg-navy px-5 py-14 sm:px-8 lg:px-10"
      style={{
        backgroundImage:
          "radial-gradient(45% 80% at 90% 50%, rgba(184,135,47,0.18), transparent 65%)",
      }}
    >
      <Bell
        size={120}
        className="pointer-events-none absolute -right-4 -top-6 rotate-12 text-white/5"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Ready to Modernize Your Guest Experience?
          </h2>
          <p className="mt-2 text-sm text-white/65">
            Join hotels that are making stays smarter with DeskQR.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a
            href="#pricing"
            className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:bg-gold/90"
          >
            Get Started Free
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
