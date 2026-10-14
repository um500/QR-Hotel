import { ArrowRight, Check } from "lucide-react";

function GuestMiniMock() {
  return (
    <div className="flex h-full min-h-[240px] items-center justify-center bg-navy p-6">
      <img
        src="/images/landing/guest-portal-phone.webp"
        alt="DeskQR guest portal on a phone showing the Room 101 welcome screen"
        className="h-56 w-auto object-contain drop-shadow-2xl sm:h-64"
      />
    </div>
  );
}

function AdminMiniMock() {
  return (
    <div className="h-full min-h-[240px] overflow-hidden bg-ink">
      <img
        src="/images/landing/admin-dashboard.jpg"
        alt="DeskQR admin dashboard showing room occupancy and live bookings on a laptop"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

const SHOWCASES = [
  {
    mock: GuestMiniMock,
    title: "Guest-Facing Portal",
    description:
      "A beautiful, mobile-friendly experience with WiFi, services, menu, amenities and nearby places.",
    points: [
      "No app download needed",
      "Works on any smartphone",
      "Branded for your hotel",
    ],
    cta: "View Guest Demo",
    solid: false,
  },
  {
    mock: AdminMiniMock,
    title: "Admin Dashboard",
    description:
      "Manage rooms, services, menu, amenities and view live requests in real time.",
    points: [
      "Easy and intuitive interface",
      "Real-time notifications",
      "Works on desktop and tablet",
    ],
    cta: "View Admin Demo",
    solid: true,
  },
];

export default function Showcase() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            See the Experience
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            See <span className="text-gold">DeskQR</span> in Action
          </h2>
          <p className="mt-3 text-[15px] text-ink-dim">
            A seamless experience for your guests, and a powerful dashboard
            for your team.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {SHOWCASES.map(
            ({ mock: Mock, title, description, points, cta, solid }) => (
              <div
                key={title}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:flex"
              >
                <div className="sm:w-1/2">
                  <Mock />
                </div>
                <div className="flex flex-col justify-center p-6 sm:w-1/2 sm:p-7">
                  <p className="text-lg font-semibold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-ink-dim"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-gold"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                      solid
                        ? "bg-gold text-navy hover:bg-gold/90"
                        : "border border-gold text-gold hover:bg-gold-soft"
                    }`}
                  >
                    {cta}
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
