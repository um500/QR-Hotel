"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { GuestRequest } from "@/lib/models/request";
import type { RequestType } from "@/lib/sanity/types";
import { requestIconFor } from "@/components/request-icons";
import StatusPill from "@/components/StatusPill";
import { formatRelativeTime } from "@/lib/format";
import { SectionCard } from "@/components/guest/ui";
import type { FlowKey } from "@/app/r/[room]/RoomPageClient";

// The six request types below have their own purpose-built flow (a
// checklist, an item picker, a qty stepper…) so they're fixed tiles
// rather than driven by the admin-managed request-type list. Anything
// the hotel adds beyond these six (admin → Services) still shows up as
// a simple tap-to-send tile underneath.
const FIXED_TILES: { label: string; desc: string; flow: FlowKey }[] = [
  { label: "Extra Towels", desc: "Fresh towels to your room", flow: "extra-towels" },
  { label: "Housekeeping", desc: "Room cleaning service", flow: "housekeeping" },
  { label: "Room Service", desc: "Food & beverages to your room", flow: "room-service" },
  { label: "Laundry", desc: "Pickup & delivery service", flow: "laundry" },
  { label: "Wake-up Call", desc: "We'll call you at your time", flow: "wake-up-call" },
  { label: "Maintenance", desc: "Report an issue in your room", flow: "maintenance" },
];
const FIXED_LABELS = new Set(FIXED_TILES.map((t) => t.label.toLowerCase()));

export default function ServicesTab({
  requestTypes,
  requests,
  note,
  onNoteChange,
  onOpenFlow,
  onQuickSend,
  isPending,
}: {
  requestTypes: RequestType[];
  requests: GuestRequest[];
  note: string;
  onNoteChange: (v: string) => void;
  onOpenFlow: (flow: FlowKey) => void;
  onQuickSend: (type: string) => void;
  isPending: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const extraTypes = requestTypes.filter(
    (rt) => !FIXED_LABELS.has(rt.label.toLowerCase())
  );
  const visibleRequests = showAll ? requests : requests.slice(0, 4);

  return (
    <div className="flex flex-col gap-4 px-4 pb-24 pt-1">
      <div className="grid grid-cols-2 gap-3">
        {FIXED_TILES.map((tile) => {
          const { icon: Icon, tint } = requestIconFor(tile.label);
          return (
            <button
              key={tile.label}
              type="button"
              onClick={() => onOpenFlow(tile.flow)}
              className={`flex items-center gap-3 rounded-xl2 px-3.5 py-3.5 text-left transition active:scale-[0.98] ${tint}`}
            >
              <Icon size={20} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{tile.label}</p>
                <p className="truncate text-[11px] text-ink-dim">{tile.desc}</p>
              </div>
              <ChevronRight size={15} className="shrink-0 text-ink-faint" />
            </button>
          );
        })}
      </div>

      {extraTypes.length > 0 && (
        <SectionCard>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            More from the hotel
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {extraTypes.map((rt) => {
              const { icon: Icon, tint } = requestIconFor(rt.label);
              return (
                <button
                  key={rt._id}
                  type="button"
                  disabled={isPending}
                  onClick={() => onQuickSend(rt.label)}
                  className="flex flex-col items-center gap-1.5 rounded-xl2 border border-line bg-white px-2 py-3 text-center transition hover:border-brand/40 disabled:opacity-50"
                >
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tint}`}>
                    <Icon size={16} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-ink">
                    {rt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionCard>
      )}

      <SectionCard>
        <button
          type="button"
          onClick={() => setNoteOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left"
        >
          <div>
            <p className="text-sm font-semibold text-ink">Add a note (optional)</p>
            <p className="text-xs text-ink-dim">Special requests, timing, or any details</p>
          </div>
          <ChevronRight size={16} className={`shrink-0 text-ink-faint transition ${noteOpen ? "rotate-90" : ""}`} />
        </button>
        {noteOpen && (
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            rows={2}
            placeholder="e.g. please knock softly, baby sleeping"
            className="mt-3 w-full resize-none rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
          />
        )}
      </SectionCard>

      <div>
        <div className="mb-2.5 flex items-center justify-between px-0.5">
          <h2 className="font-display text-[15px] font-semibold text-ink">Your Requests</h2>
          {requests.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="flex items-center gap-0.5 text-xs font-semibold text-success"
            >
              {showAll ? "Show Less" : "View All"} <ChevronRight size={13} />
            </button>
          )}
        </div>

        {requests.length === 0 ? (
          <SectionCard>
            <p className="text-center text-sm text-ink-dim">
              No requests yet — tap a tile above to send one.
            </p>
          </SectionCard>
        ) : (
          <SectionCard>
            <ul className="flex flex-col divide-y divide-line">
              {visibleRequests.map((r) => {
                const { icon: Icon, tint } = requestIconFor(r.type);
                return (
                  <li key={r._id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tint}`}>
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{r.type}</p>
                      <p className="truncate text-xs text-ink-faint">
                        {r.note ? r.note : formatRelativeTime(r.createdAt)}
                      </p>
                    </div>
                    <StatusPill status={r.status} />
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
