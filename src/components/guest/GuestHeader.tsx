"use client";

import Logo from "@/components/Logo";
import { GUEST_TABS } from "@/components/guest/tabs";
import type { GuestTab } from "@/app/r/[room]/RoomPageClient";

// Light hero header — hotel name eyebrow, big room number, tab-specific
// subtitle, and the logo mark top-right — followed by a pill-style tab
// switcher that mirrors the fixed bottom nav. Matches the reference: a
// white/cream header, not a dark navy block.
export default function GuestHeader({
  roomNo,
  hotelName,
  activeTab,
  onChangeTab,
}: {
  roomNo: string;
  hotelName?: string;
  activeTab: GuestTab;
  onChangeTab: (tab: GuestTab) => void;
}) {
  const subtitle =
    GUEST_TABS.find((t) => t.id === activeTab)?.heroSubtitle || "";

  return (
    <header className="bg-paper pb-4 pt-[calc(env(safe-area-inset-top,0px)+20px)]">
      <div className="mx-auto flex max-w-md items-start justify-between gap-3 px-5">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            {hotelName || "The Grand Orchid Hotel"}
          </p>
          <h1 className="mt-0.5 font-display text-[28px] font-bold leading-none text-navy">
            Room {roomNo}
          </h1>
          <p className="mt-1.5 text-sm text-ink-dim">{subtitle}</p>
        </div>
        <div className="shrink-0 pt-0.5">
          <Logo size="md" tone="dark" />
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-md px-5">
        <div className="flex items-stretch justify-around gap-1 rounded-xl2 bg-ink/5 p-1.5">
          {GUEST_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeTab(tab.id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[11px] font-medium transition ${
                  isActive ? "bg-white text-success shadow-card" : "text-ink-faint"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.3 : 1.8} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
