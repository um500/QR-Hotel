"use client";

import { useState } from "react";
import { Brush, SprayCan, BedDouble, Trash2, Droplets, Clock3, Calendar } from "lucide-react";
import { FullScreenFlow } from "@/components/guest/ui";

const TASKS = [
  { key: "clean", label: "Clean my room now", desc: "General cleaning, make the room fresh and tidy.", icon: SprayCan },
  { key: "bedsheets", label: "Change bedsheets", desc: "Replace bed linens with fresh, clean sheets.", icon: BedDouble },
  { key: "trash", label: "Empty trash", desc: "Remove and replace trash bags.", icon: Trash2 },
  { key: "toiletries", label: "Restock toiletries", desc: "Toilet paper, soap, shampoo and other essentials.", icon: Droplets },
];

type When = "now" | "30min" | "later";

export default function HousekeepingFlow({
  onBack,
  onSend,
  isPending,
}: {
  onBack: () => void;
  onSend: (note: string) => void;
  isPending: boolean;
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [when, setWhen] = useState<When>("now");

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const whenLabel = when === "now" ? "Now" : when === "30min" ? "In 30 minutes" : "Later";
  const canSend = checked.size > 0;

  return (
    <FullScreenFlow
      icon={<Brush size={20} />}
      tint="bg-emerald-50 text-emerald-600"
      title="Housekeeping"
      subtitle="Let us know how we can help"
      onBack={onBack}
      footer={
        <button
          type="button"
          disabled={!canSend || isPending}
          onClick={() => {
            const items = TASKS.filter((t) => checked.has(t.key)).map((t) => t.label);
            onSend(`${items.join(", ")} — ${whenLabel}`);
            onBack();
          }}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl2 bg-success py-3.5 text-sm font-semibold text-white disabled:bg-ink-faint disabled:opacity-60"
        >
          Send Request
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        {TASKS.map((task) => {
          const Icon = task.icon;
          const active = checked.has(task.key);
          return (
            <button
              key={task.key}
              type="button"
              onClick={() => toggle(task.key)}
              className={`flex items-center gap-3 rounded-xl2 border bg-white p-3.5 text-left transition ${
                active ? "border-success ring-1 ring-success" : "border-line"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                  active ? "border-success bg-success text-white" : "border-line"
                }`}
              >
                {active && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{task.label}</p>
                <p className="text-xs text-ink-dim">{task.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Clock3 size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">When?</p>
            <p className="text-xs text-ink-dim">Let us know when you&apos;d like this service.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { key: "now", label: "Now", desc: "As soon as possible", icon: Clock3 },
              { key: "30min", label: "In 30 min", desc: "Within 30 minutes", icon: Clock3 },
              { key: "later", label: "Later", desc: "Choose a time", icon: Calendar },
            ] as const
          ).map((opt) => {
            const Icon = opt.icon;
            const active = when === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setWhen(opt.key)}
                className={`flex flex-col items-start gap-1 rounded-xl2 p-3 text-left ${
                  active ? "bg-success text-white" : "border border-line bg-white text-ink"
                }`}
              >
                <Icon size={15} />
                <span className="text-xs font-semibold">{opt.label}</span>
                <span className={`text-[10px] ${active ? "text-white/80" : "text-ink-faint"}`}>
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </FullScreenFlow>
  );
}
