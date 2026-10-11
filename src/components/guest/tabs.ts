import { Home, ConciergeBell, Compass, Headphones, type LucideIcon } from "lucide-react";
import type { GuestTab } from "@/app/r/[room]/RoomPageClient";

// Single source of truth for the guest app's 4 destinations — used by
// both the pill switcher under the hero header and the fixed bottom tab
// bar, so the two stay in sync.
export const GUEST_TABS: {
  id: GuestTab;
  label: string;
  icon: LucideIcon;
  heroSubtitle: string;
}[] = [
  { id: "stay", label: "Stay", icon: Home, heroSubtitle: "Relax · Recharge · Enjoy Your Stay" },
  { id: "services", label: "Services", icon: ConciergeBell, heroSubtitle: "What would you like today?" },
  { id: "explore", label: "Explore", icon: Compass, heroSubtitle: "Explore · Discover · Experience" },
  { id: "help", label: "Help", icon: Headphones, heroSubtitle: "We're here to help you" },
];
