"use client";

import {
  Navigation,
  MapPin,
  Image as ImageIcon,
  UtensilsCrossed,
  CreditCard,
  Pill,
  Hospital,
  Car,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import type { Place, PlaceCategory } from "@/lib/sanity/types";
import { SectionCard } from "@/components/guest/ui";

const ESSENTIAL_META: Record<Exclude<PlaceCategory, "Attraction">, { icon: LucideIcon; tint: string }> = {
  Restaurant: { icon: UtensilsCrossed, tint: "bg-rose-50 text-rose-600" },
  ATM: { icon: CreditCard, tint: "bg-brand-soft text-brand" },
  Pharmacy: { icon: Pill, tint: "bg-emerald-50 text-emerald-600" },
  Hospital: { icon: Hospital, tint: "bg-rose-50 text-rose-600" },
  Cab: { icon: Car, tint: "bg-amber-50 text-amber-700" },
};

export default function ExploreTab({ places }: { places: Place[] }) {
  const attractions = places.filter((p) => !p.category || p.category === "Attraction");
  const essentials = places.filter((p) => p.category && p.category !== "Attraction");

  if (places.length === 0) {
    return (
      <div className="px-4 pb-24 pt-1">
        <SectionCard>
          <p className="text-center text-sm text-ink-dim">Nothing to explore yet.</p>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-4 pb-24 pt-1">
      {attractions.length > 0 && (
        <div>
          <div className="mb-2.5 flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-soft text-success">
                <MapPin size={15} />
              </span>
              <div>
                <h2 className="font-display text-[15px] font-semibold text-ink">
                  Tourist Places
                </h2>
                <p className="text-xs text-ink-dim">Popular attractions near your stay</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {attractions.map((p) => (
              <a
                key={p._id}
                href={p.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
              >
                <div className="relative aspect-[16/9] w-full bg-paper">
                  {p.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.photoUrl} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-ink-faint">
                      <ImageIcon size={24} />
                    </div>
                  )}
                  <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                    <MapPin size={10} /> {p.distanceKm} km
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                  <Navigation size={14} className="shrink-0 text-brand" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {essentials.length > 0 && (
        <div>
          <div className="mb-2.5 flex items-center gap-2 px-0.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink-dim">
              <Landmark size={15} />
            </span>
            <div>
              <h2 className="font-display text-[15px] font-semibold text-ink">
                Nearby Essentials
              </h2>
              <p className="text-xs text-ink-dim">Restaurants, ATMs, pharmacies, hospitals and more</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {essentials.map((p) => {
              const meta = ESSENTIAL_META[p.category as Exclude<PlaceCategory, "Attraction">];
              const Icon = meta.icon;
              return (
                <a
                  key={p._id}
                  href={p.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 overflow-hidden rounded-xl2 border border-line bg-white p-2.5 shadow-card"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-paper">
                    {p.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photoUrl} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon size={18} className="text-ink-faint" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                    <p className="text-xs text-ink-faint">{p.distanceKm} km away</p>
                    <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${meta.tint}`}>
                      <Icon size={10} /> {p.category}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
