"use client";

import { GUEST_TABS } from "@/components/guest/tabs";
import type { GuestTab } from "@/app/r/[room]/RoomPageClient";

export default function BottomNav({
  active,
  onChange,
}: {
  active: GuestTab;
  onChange: (tab: GuestTab) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {GUEST_TABS.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.3 : 1.8}
                className={isActive ? "text-success" : "text-ink-faint"}
              />
              <span className={isActive ? "text-success" : "text-ink-faint"}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 h-0.5 w-6 rounded-full bg-success" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
