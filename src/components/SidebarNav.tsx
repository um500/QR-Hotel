"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  Wifi,
  ConciergeBell,
  UtensilsCrossed,
  Shirt,
  MapPin,
  Landmark,
  Hotel,
} from "lucide-react";

// Icon components can't cross the server→client boundary as props (they're
// function references, not serializable data), so the nav list — icons
// included — lives entirely in this client component instead of being
// built in the server layout and passed down.
const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/wifi", label: "WiFi", icon: Wifi },
  { href: "/admin/services", label: "Services", icon: ConciergeBell },
  { href: "/admin/food-menu", label: "Food Menu", icon: UtensilsCrossed },
  { href: "/admin/laundry-items", label: "Laundry Items", icon: Shirt },
  { href: "/admin/places", label: "Places", icon: MapPin },
  { href: "/admin/amenities", label: "Amenities", icon: Landmark },
  { href: "/admin/hotel-info", label: "Hotel Info", icon: Hotel },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-5">
      {NAV.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-brand text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={17} strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
