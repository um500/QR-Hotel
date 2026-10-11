"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Wifi as WifiIcon,
  Clock3,
  Coffee,
  ConciergeBell,
  Phone,
  ChevronRight,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import type { GuestRequest } from "@/lib/models/request";
import type { Amenity, HotelInfo, Wifi } from "@/lib/sanity/types";
import { requestIconFor } from "@/components/request-icons";
import { amenityIconFor } from "@/components/amenity-icons";
import StatusPill from "@/components/StatusPill";
import { formatRelativeTime } from "@/lib/format";
import { SectionCard, SectionTitle } from "@/components/guest/ui";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable — the value is still on screen.
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-paper px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="text-[11px] text-ink-faint">{label}</p>
        <p className="truncate font-mono text-sm font-medium text-ink">{value}</p>
      </div>
      <button
        onClick={copy}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1.5 text-xs font-medium text-ink-dim transition hover:bg-paper"
      >
        {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

const QUICK_ACTIONS = [
  { key: "room-service" as const, label: "Room Service", icon: requestIconFor("room service") },
  { key: "housekeeping" as const, label: "Housekeeping", icon: requestIconFor("housekeeping") },
  { key: "extra-towels" as const, label: "Extra Towels", icon: requestIconFor("extra towels") },
];

export default function StayTab({
  wifi,
  hotelInfo,
  amenities,
  activeRequests,
  onOpenFlow,
  onOpenAmenity,
  onGoToServices,
}: {
  wifi: Wifi | null;
  hotelInfo: HotelInfo | null;
  amenities: Amenity[];
  activeRequests: GuestRequest[];
  onOpenFlow: (flow: "room-service" | "housekeeping" | "extra-towels") => void;
  onOpenAmenity: (a: Amenity) => void;
  onGoToServices: () => void;
}) {
  const [rulesOpen, setRulesOpen] = useState(false);
  const liveRequest = activeRequests[0];

  return (
    <div className="flex flex-col gap-4 px-4 pb-24 pt-1">
      {liveRequest && (
        <button
          type="button"
          onClick={onGoToServices}
          className="flex items-center gap-3 rounded-xl2 bg-warning-soft px-4 py-3.5 text-left transition active:scale-[0.99]"
        >
          <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-warning" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {liveRequest.type} Request
            </p>
            <p className="truncate text-xs text-ink-dim">
              {liveRequest.status === "in_progress"
                ? "Your request is on the way."
                : "Request received — we'll be there soon."}
            </p>
          </div>
          <span className="shrink-0 text-xs font-semibold text-warning">
            {liveRequest.status === "in_progress" ? "ETA 5–7 mins" : "Pending"}
          </span>
          <ChevronRight size={16} className="shrink-0 text-ink-faint" />
        </button>
      )}

      {wifi && (
        <SectionCard>
          <SectionTitle
            icon={
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft text-success">
                <WifiIcon size={16} />
              </span>
            }
            title="Hotel WiFi"
            subtitle="Stay connected during your stay"
          />
          <div className="flex flex-col gap-2">
            <CopyField label="Network Name" value={wifi.ssid} />
            <CopyField label="Password" value={wifi.password} />
          </div>
        </SectionCard>
      )}

      <div>
        <div className="mb-2.5 flex items-center justify-between px-0.5">
          <h2 className="font-display text-[15px] font-semibold text-ink">
            Quick Actions
          </h2>
          <button
            type="button"
            onClick={onGoToServices}
            className="flex items-center gap-0.5 text-xs font-semibold text-success"
          >
            View All <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon.icon;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => onOpenFlow(a.key)}
                className={`flex flex-col items-center gap-1.5 rounded-xl2 px-1.5 py-3 text-center transition active:scale-[0.97] ${a.icon.tint}`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium leading-tight text-ink">
                  {a.label}
                </span>
              </button>
            );
          })}
          <a
            href={hotelInfo?.receptionPhone ? `tel:${hotelInfo.receptionPhone}` : undefined}
            onClick={(e) => {
              if (!hotelInfo?.receptionPhone) {
                e.preventDefault();
                onGoToServices();
              }
            }}
            className="flex flex-col items-center gap-1.5 rounded-xl2 bg-violet-50 px-1.5 py-3 text-center text-violet-600 transition active:scale-[0.97]"
          >
            <Phone size={18} />
            <span className="text-[10px] font-medium leading-tight text-ink">
              Call Reception
            </span>
          </a>
        </div>
      </div>

      {hotelInfo && (
        <SectionCard>
          <SectionTitle title="Checkout & Breakfast" subtitle="Plan your day with ease" />
          <div className="grid grid-cols-2 divide-x divide-line">
            <div className="flex items-center gap-2.5 pr-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Clock3 size={16} />
              </span>
              <div>
                <p className="text-[11px] text-ink-faint">Checkout Time</p>
                <p className="text-sm font-semibold text-ink">{hotelInfo.checkoutTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pl-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Coffee size={16} />
              </span>
              <div>
                <p className="text-[11px] text-ink-faint">Breakfast Hours</p>
                <p className="text-sm font-semibold text-ink">{hotelInfo.breakfastTime}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {amenities.length > 0 && (
        <div>
          <div className="mb-2.5 px-0.5">
            <h2 className="font-display text-[15px] font-semibold text-ink">Amenities</h2>
            <p className="text-xs text-ink-dim">Make the most of your stay</p>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {amenities.map((a) => {
              const Icon = amenityIconFor(a.name);
              return (
                <button
                  key={a._id}
                  type="button"
                  onClick={() => onOpenAmenity(a)}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink shadow-card"
                >
                  <Icon size={15} className="text-brand" />
                  {a.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <SectionCard>
        <button
          type="button"
          onClick={() => setRulesOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink-dim">
            <ConciergeBell size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">House Rules</p>
            <p className="text-xs text-ink-dim">For a safe and pleasant stay</p>
          </div>
          <ChevronDown
            size={16}
            className={`shrink-0 text-ink-faint transition ${rulesOpen ? "rotate-180" : ""}`}
          />
        </button>
        {rulesOpen && (
          <p className="mt-3 whitespace-pre-line border-t border-line pt-3 text-sm text-ink-dim">
            {hotelInfo?.policies ||
              "No smoking in rooms · Quiet hours 10 PM–7 AM · Outside visitors must register at the front desk · Pets not allowed."}
          </p>
        )}
      </SectionCard>

      <button
        type="button"
        onClick={() => setRulesOpen(true)}
        className="flex items-center gap-3 overflow-hidden rounded-xl2 bg-gradient-to-br from-navy to-navy-light px-5 py-5 text-left shadow-card"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
          <BookOpen size={18} />
        </span>
        <p className="flex-1 font-display text-base font-semibold text-white">
          Make the most of your stay
        </p>
        <ChevronRight size={18} className="shrink-0 text-white/60" />
      </button>

      {activeRequests.length > 1 && (
        <SectionCard>
          <SectionTitle title="Your Requests" subtitle="Live status for this room" />
          <ul className="flex flex-col gap-2.5">
            {activeRequests.map((r) => {
              const { icon: Icon, tint } = requestIconFor(r.type);
              return (
                <li key={r._id} className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tint}`}>
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{r.type}</p>
                    <p className="text-xs text-ink-faint">{formatRelativeTime(r.createdAt)}</p>
                  </div>
                  <StatusPill status={r.status} />
                </li>
              );
            })}
          </ul>
        </SectionCard>
      )}
    </div>
  );
}
