"use client";

import { useState } from "react";
import { Wrench, Snowflake, Lightbulb, Droplets, Wifi, MoreHorizontal, Camera } from "lucide-react";
import { FullScreenFlow } from "@/components/guest/ui";

const ISSUES = [
  { key: "ac", label: "AC not working", icon: Snowflake },
  { key: "light", label: "Light issue", icon: Lightbulb },
  { key: "plumbing", label: "Plumbing issue", icon: Droplets },
  { key: "wifi", label: "WiFi not working", icon: Wifi },
  { key: "other", label: "Other", icon: MoreHorizontal },
];

export default function MaintenanceFlow({
  onBack,
  onSend,
  isPending,
}: {
  onBack: () => void;
  onSend: (note: string) => void;
  isPending: boolean;
}) {
  const [issue, setIssue] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);

  const issueLabel = ISSUES.find((i) => i.key === issue)?.label;

  return (
    <FullScreenFlow
      icon={<Wrench size={20} />}
      tint="bg-orange-50 text-orange-600"
      title="Maintenance"
      subtitle="Report an issue in your room"
      onBack={onBack}
      footer={
        <button
          type="button"
          disabled={!issue || isPending}
          onClick={() => {
            onSend(`${issueLabel}${description ? `: ${description}` : ""}`);
            onBack();
          }}
          className="w-full rounded-xl2 bg-success py-3.5 text-center text-sm font-semibold text-white disabled:bg-ink-faint disabled:opacity-60"
        >
          Report Issue
        </button>
      }
    >
      <p className="mb-1 text-sm font-semibold text-ink">What&apos;s the issue?</p>
      <p className="mb-3 text-xs text-ink-dim">Select the issue that best describes the problem.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {ISSUES.map((opt) => {
          const Icon = opt.icon;
          const active = issue === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => setIssue(opt.key)}
              className={`flex items-center gap-2.5 rounded-xl2 border p-3 text-left ${
                active ? "border-success bg-success-soft" : "border-line bg-white"
              }`}
            >
              <Icon size={18} className={active ? "text-success" : "text-ink-dim"} />
              <span className="flex-1 text-sm font-medium text-ink">{opt.label}</span>
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  active ? "border-success" : "border-line"
                }`}
              >
                {active && <span className="h-2 w-2 rounded-full bg-success" />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="mb-1 text-sm font-semibold text-ink">
          Describe the issue <span className="font-normal text-ink-faint">(optional)</span>
        </p>
        <p className="mb-2 text-xs text-ink-dim">Provide more details so we can assist you faster.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 300))}
          rows={3}
          placeholder="e.g. AC is not cooling, strange noise, etc."
          className="w-full resize-none rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <p className="mt-1 text-right text-[10px] text-ink-faint">{description.length}/300</p>
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl2 border border-dashed border-success/50 bg-success-soft/40 p-3.5">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setPhotoName(e.target.files?.[0]?.name || null)}
        />
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
          <Camera size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-success">
            {photoName || "Add photo (optional)"}
          </p>
          <p className="truncate text-xs text-ink-dim">
            {photoName ? "Attached — not uploaded to a server yet" : "Helps us understand the issue better."}
          </p>
        </div>
      </label>
    </FullScreenFlow>
  );
}
