import { Check } from "lucide-react";

function GuestMiniMock() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-light to-navy p-8">
      <div className="w-36 rounded-[1.6rem] border-4 border-navy-lighter bg-paper p-1 shadow-pop">
        <div className="rounded-[1.3rem] bg-white p-3">
          <p className="text-center text-[8px] font-semibold tracking-wide text-gold">
            ROOM 101
          </p>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-brand-soft p-1.5">
            <span className="h-4 w-4 rounded-full bg-brand" />
            <span className="h-1.5 flex-1 rounded bg-brand/30" />
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-5 rounded bg-paper" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMiniMock() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-paper to-line/40 p-6 sm:p-8">
      <div className="w-full max-w-[300px] overflow-hidden rounded-xl bg-white shadow-pop ring-1 ring-line">
        <div className="flex h-7 items-center gap-1.5 bg-navy px-3">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="flex">
          <div className="w-10 space-y-2 border-r border-line bg-paper p-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded ${i === 0 ? "bg-gold" : "bg-line"}`}
              />
            ))}
          </div>
          <div className="flex-1 p-3">
            <p className="text-[9px] font-semibold text-ink">Live Requests</p>
            <div className="mt-2 space-y-1.5">
              {["Room 102", "Room 108", "Room 203"].map((r) => (
                <div
                  key={r}
                  className="flex items-center justify-between rounded bg-paper px-2 py-1.5"
                >
                  <span className="text-[8px] text-ink-dim">{r}</span>
                  <span className="rounded-full bg-success-soft px-1.5 py-0.5 text-[7px] font-medium text-success">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                    {cta} →
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
