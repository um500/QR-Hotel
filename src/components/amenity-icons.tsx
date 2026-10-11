import {
  Waves,
  Dumbbell,
  Sparkles,
  Car,
  UtensilsCrossed,
  Martini,
  Baby,
  Presentation,
  Laptop,
  Landmark,
  type LucideIcon,
} from "lucide-react";

// Best-effort icon for a free-text amenity name — admin types "Spa",
// "Swimming Pool", etc. and this picks the closest visual. Falls back to
// a generic landmark glyph for anything unrecognised.
const MAP: Array<{ test: RegExp; icon: LucideIcon }> = [
  { test: /pool/i, icon: Waves },
  { test: /gym|fitness/i, icon: Dumbbell },
  { test: /spa|wellness/i, icon: Sparkles },
  { test: /park/i, icon: Car },
  { test: /restaurant|dining/i, icon: UtensilsCrossed },
  { test: /bar|lounge/i, icon: Martini },
  { test: /kids|play/i, icon: Baby },
  { test: /conference|hall|banquet/i, icon: Presentation },
  { test: /business|computer/i, icon: Laptop },
];

export function amenityIconFor(name: string): LucideIcon {
  return MAP.find((m) => m.test.test(name))?.icon || Landmark;
}
