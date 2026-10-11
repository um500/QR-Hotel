"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { BottomSheet, SheetHeader, Stepper } from "@/components/guest/ui";

export default function ExtraTowelsSheet({
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
  const [qty, setQty] = useState(2);

  return (
    <BottomSheet open={open} onClose={onClose}>
      <SheetHeader
        icon={<Layers size={24} />}
        tint="bg-blue-50 text-blue-600"
        title="Extra Towels"
        subtitle="How many do you need?"
      />
      <div className="mb-6 flex items-center justify-center">
        <Stepper value={qty} onChange={setQty} min={1} max={10} />
      </div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          onSend(`Qty: ${qty}`);
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
