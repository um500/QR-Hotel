import {
  BellRing,
  Dumbbell,
  Info,
  MapPin,
  Phone,
  Utensils,
  Wifi,
} from "lucide-react";

const TILES = [
  { label: "Room Service", icon: Utensils },
  { label: "Hotel Services", icon: BellRing },
  { label: "Amenities", icon: Dumbbell },
  { label: "Nearby Places", icon: MapPin },
  { label: "Hotel Info", icon: Info },
  { label: "Contact Us", icon: Phone },
];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] rounded-[2.5rem] border-[6px] border-navy-lighter bg-navy-lighter p-1.5 shadow-pop sm:w-[280px]">
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-lighter" />
      <div className="overflow-hidden rounded-[2rem] bg-paper">
        <div className="flex items-center justify-between px-4 pb-2 pt-5 text-[10px] text-ink-faint">
          <span>9:41</span>
          <span>English ▾</span>
        </div>

        <div className="px-4 pb-5 pt-1">
          <p className="text-center font-display text-[11px] font-semibold tracking-[0.15em] text-gold">
            THE GRAND ORCHID
          </p>
          <p className="mt-3 text-lg font-semibold text-ink">Welcome to</p>
          <p className="font-display text-2xl font-semibold text-navy">Room 101</p>
          <p className="mt-1 text-xs text-ink-dim">
            We&apos;re glad to have you here!
          </p>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Wifi size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-ink">WiFi Access</p>
              <p className="truncate text-[10px] text-ink-faint">
                GrandOrchid_WiFi
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {TILES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white px-1.5 py-3 text-center shadow-card"
              >
                <Icon size={16} className="text-gold" />
                <span className="text-[8.5px] font-medium leading-tight text-ink-dim">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
