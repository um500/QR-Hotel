"use client";

import { useState } from "react";
import { AlarmClock } from "lucide-react";
import { BottomSheet, SheetHeader } from "@/components/guest/ui";

export default function WakeUpCallSheet({
  open,
  onClose,
  onSend,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  onSend: (note: string) => void;
  isPending: boolean;
}) {
  const [time, setTime] = useState("07:00");

  return (
    <BottomSheet open={open} onClose={onClose}>
      <SheetHeader
        icon={<AlarmClock size={24} />}
        tint="bg-violet-50 text-violet-600"
        title="Wake-up Call"
        subtitle="What time should we call you?"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mb-6 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-center text-lg font-semibold text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          onSend(`Wake-up call at ${time}`);
          onClose();
        }}
        className="w-full rounded-xl2 bg-success py-3.5 text-center text-sm font-semibold text-white disabled:opacity-60"
      >
        Send Request
      </button>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full text-center text-sm font-medium text-ink-faint"
      >
        Cancel
      </button>
    </BottomSheet>
  );
}
