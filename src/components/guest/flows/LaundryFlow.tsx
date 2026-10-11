"use client";

import { useState } from "react";
import { WashingMachine, Shirt, ShoppingBasket, Image as ImageIcon } from "lucide-react";
import type { LaundryItem } from "@/lib/sanity/types";
import { FullScreenFlow, Stepper, Chip } from "@/components/guest/ui";

const SERVICES = ["Wash", "Iron", "Dry-clean"] as const;

// Shows the admin-uploaded photo when there is one, falling back to a
// generic clothing icon if the item has no photo or the image fails to
// load (broken link, host down) — same pattern as Places/Amenities.
function ItemThumb({ item }: { item: LaundryItem }) {
  const [broken, setBroken] = useState(false);

  if (item.photoUrl && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.photoUrl}
        alt={item.name}
        onError={() => setBroken(true)}
        className="h-12 w-12 shrink-0 rounded-lg object-cover"
      />
    );
  }

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
      <Shirt size={20} />
    </span>
  );
}

export default function LaundryFlow({
  items,
  onBack,
  onSend,
  isPending,
}: {
  items: LaundryItem[];
  onBack: () => void;
  onSend: (note: string) => void;
  isPending: boolean;
}) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [services, setServices] = useState<Record<string, Set<string>>>({});

  function setItemQty(key: string, v: number) {
    setQty((prev) => ({ ...prev, [key]: v }));
  }

  function toggleService(key: string, svc: string) {
    setServices((prev) => {
      const current = new Set(prev[key] || []);
      current.has(svc) ? current.delete(svc) : current.add(svc);
      return { ...prev, [key]: current };
    });
  }

  const totalItems = Object.values(qty).reduce((s, n) => s + n, 0);

  function submit() {
    const lines = items
      .filter((i) => (qty[i._id] || 0) > 0)
      .map((i) => {
        const svc = Array.from(services[i._id] || []);
        return `${qty[i._id]}x ${i.name}${svc.length ? ` (${svc.join(", ")})` : ""}`;
      });
    onSend(lines.join(", "));
    onBack();
  }

  return (
    <FullScreenFlow
      icon={<WashingMachine size={20} />}
      tint="bg-amber-50 text-amber-700"
      title="Laundry"
      subtitle="Pickup & delivery service"
      onBack={onBack}
      footer={
        items.length > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-ink-dim">
              <ShoppingBasket size={18} />
              <div>
                <p className="text-sm font-semibold text-ink">{totalItems} items</p>
                <p className="text-[10px]">in your request</p>
              </div>
            </div>
            <button
              type="button"
              disabled={totalItems === 0 || isPending}
              onClick={submit}
              className="flex-1 rounded-xl2 bg-gold py-3.5 text-center text-sm font-semibold text-white disabled:bg-ink-faint disabled:opacity-60"
            >
              Send Request
            </button>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <ImageIcon size={28} className="text-ink-faint" />
          <p className="text-sm text-ink-dim">
            No laundry items set up yet — call the front desk to place an order.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const q = qty[item._id] || 0;
            return (
              <div key={item._id} className="rounded-xl2 border border-line bg-white p-3.5">
                <div className="flex items-center gap-3">
                  <ItemThumb item={item} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{item.name}</p>
                    {item.description && (
                      <p className="truncate text-xs text-ink-dim">{item.description}</p>
                    )}
                  </div>
                  <Stepper value={q} onChange={(v) => setItemQty(item._id, v)} size="sm" />
                </div>
                {q > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                    {SERVICES.map((svc) => (
                      <Chip
                        key={svc}
                        active={(services[item._id] || new Set()).has(svc)}
                        onClick={() => toggleService(item._id, svc)}
                      >
                        {svc}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </FullScreenFlow>
  );
}
