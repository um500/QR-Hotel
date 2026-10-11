import {
  Wrench,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
  Sparkles,
  AlarmClock,
  Layers,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

// Maps a free-text request type to an icon + tint, used across the admin
// dashboard and the guest app's Services grid / request-status list.
// Tints match the reference design: blue/teal/rose/amber/violet/orange.
const MAP: Record<string, { icon: LucideIcon; tint: string }> = {
  "maintenance issue": { icon: Wrench, tint: "bg-orange-50 text-orange-600" },
  maintenance: { icon: Wrench, tint: "bg-orange-50 text-orange-600" },
  "room service": { icon: UtensilsCrossed, tint: "bg-rose-50 text-rose-600" },
  laundry: { icon: WashingMachine, tint: "bg-amber-50 text-amber-700" },
  "wifi issue": { icon: Wifi, tint: "bg-brand-soft text-brand" },
  spa: { icon: Sparkles, tint: "bg-rose-50 text-rose-600" },
  "wake-up call": { icon: AlarmClock, tint: "bg-violet-50 text-violet-600" },
  "extra towels": { icon: Layers, tint: "bg-blue-50 text-blue-600" },
  housekeeping: { icon: Sparkles, tint: "bg-emerald-50 text-emerald-600" },
  feedback: { icon: Sparkles, tint: "bg-gold-soft text-gold" },
};

export function requestIconFor(type: string) {
  return MAP[type.toLowerCase()] || { icon: HelpCircle, tint: "bg-paper text-ink-dim" };
}
