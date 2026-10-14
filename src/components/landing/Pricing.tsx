import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    tagline: "Perfect for small hotels",
    price: "₹999",
    rooms: "Up to 10 rooms",
    features: [
      "Room QR codes",
      "WiFi & basic services",
      "Guest portal (branded)",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "Ideal for growing hotels",
    price: "₹1,999",
    rooms: "Up to 50 rooms",
    features: [
      "Everything in Starter",
      "Food menu & amenities",
      "Nearby places",
      "Live request dashboard",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    tagline: "For large hotels & resorts",
    price: "₹3,999",
    rooms: "Unlimited rooms",
    features: [
      "Everything in Growth",
      "Advanced customization",
      "Multiple staff logins",
      "Detailed reports",
      "Dedicated support",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-paper px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Simple &amp; Transparent Pricing
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            Choose the Right Plan for Your Hotel
          </h2>
          <p className="mt-3 text-[15px] text-ink-dim">
            All plans include free setup and support.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 ${
                plan.highlighted
                  ? "border-gold shadow-pop sm:-translate-y-2"
                  : "border-line shadow-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3.5 py-1 text-[11px] font-semibold text-navy">
                  Most Popular
                </span>
              )}
              <p className="text-base font-semibold text-ink">{plan.name}</p>
              <p className="mt-1 text-xs text-ink-faint">{plan.tagline}</p>
              <p className="mt-5">
                <span className="font-display text-3xl font-semibold text-navy">
                  {plan.price}
                </span>
                <span className="text-sm text-ink-faint"> /month</span>
              </p>
              <p className="mt-1 text-xs text-ink-faint">{plan.rooms}</p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-ink-dim"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-7 rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border border-line text-ink hover:border-gold hover:text-gold"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
