import { Brush, UtensilsCrossed, WashingMachine, ConciergeBell, Layers, type LucideIcon } from "lucide-react";

const MAP: Record<string, { icon: LucideIcon; tint: string; desc: string }> = {
  housekeeping: {
    icon: Brush,
    tint: "bg-brand-soft text-brand",
    desc: "Room cleaning, extra supplies and housekeeping services.",
  },
  "food & beverage": {
    icon: UtensilsCrossed,
    tint: "bg-warning-soft text-warning",
    desc: "In-room dining, restaurant bookings and food services.",
  },
  laundry: {
    icon: WashingMachine,
    tint: "bg-gold-soft text-gold",
    desc: "Laundry, dry cleaning and ironing services.",
  },
  concierge: {
    icon: ConciergeBell,
    tint: "bg-success-soft text-success",
    desc: "Travel assistance, local bookings and guest support.",
  },
};

export function categoryMeta(category: string) {
  return (
    MAP[category.toLowerCase()] || {
      icon: Layers,
      tint: "bg-paper text-ink-dim",
      desc: "",
    }
  );
}
