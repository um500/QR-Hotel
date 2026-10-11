"use client";

import { useMemo, useState } from "react";
import { ConciergeBell, Minus, Plus, ShoppingBag } from "lucide-react";
import type { FoodItem } from "@/lib/sanity/types";
import { FullScreenFlow } from "@/components/guest/ui";

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
        veg ? "border-success" : "border-danger"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-success" : "bg-danger"}`} />
    </span>
  );
}

export default function RoomServiceFlow({
  foodItems,
  cart,
  onAdd,
  onRemove,
  onBack,
  onPlaceOrder,
  isPending,
}: {
  foodItems: FoodItem[];
  cart: Record<string, number>;
  onAdd: (item: FoodItem) => void;
  onRemove: (itemId: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPending: boolean;
}) {
  const categories = useMemo(
    () => Array.from(new Set(foodItems.map((f) => f.category))),
    [foodItems]
  );
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  const items = foodItems.filter((f) => f.category === activeCategory);
  const cartItems = foodItems.filter((f) => cart[f._id] > 0);
  const totalItems = cartItems.reduce((sum, f) => sum + cart[f._id], 0);
  const totalPrice = cartItems.reduce((sum, f) => sum + cart[f._id] * f.price, 0);

  if (foodItems.length === 0) {
    return (
      <FullScreenFlow
        icon={<ConciergeBell size={20} />}
        tint="bg-rose-50 text-rose-600"
        title="Room Service"
        subtitle="Delicious meals, delivered to your room"
        onBack={onBack}
      >
        <p className="text-center text-sm text-ink-dim">
          Menu isn&apos;t available yet — call the front desk to order.
        </p>
      </FullScreenFlow>
    );
  }

  return (
    <FullScreenFlow
      icon={<ConciergeBell size={20} />}
      tint="bg-rose-50 text-rose-600"
      title="Room Service"
      subtitle="Delicious meals, delivered to your room"
      onBack={onBack}
      footer={
        totalItems > 0 ? (
          <button
            type="button"
            disabled={isPending}
            onClick={onPlaceOrder}
            className="flex w-full items-center justify-between rounded-xl2 bg-rose-600 px-4 py-3.5 text-white disabled:opacity-60"
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              <ShoppingBag size={16} />
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </span>
            <span className="tnum text-sm font-semibold">
              Place Order · ₹{totalPrice}
            </span>
          </button>
        ) : undefined
      }
    >
      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              activeCategory === cat
                ? "bg-rose-600 text-white"
                : "border border-line bg-white text-ink-dim"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className="flex flex-col divide-y divide-line">
        {items.map((item) => {
          const qty = cart[item._id] || 0;
          return (
            <li key={item._id} className="flex items-center gap-3 py-3">
              <VegDot veg={item.veg} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                  {!item.available && (
                    <span className="shrink-0 rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-medium text-danger">
                      Unavailable
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="truncate text-xs text-ink-faint">{item.description}</p>
                )}
                <p className="tnum mt-0.5 text-xs font-semibold text-ink-dim">₹{item.price}</p>
              </div>

              {item.available &&
                (qty === 0 ? (
                  <button
                    type="button"
                    onClick={() => onAdd(item)}
                    className="shrink-0 rounded-lg border border-rose-600 px-3 py-1.5 text-xs font-semibold text-rose-600"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex shrink-0 items-center gap-2 rounded-lg bg-rose-600 px-1.5 py-1.5">
                    <button
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => onRemove(item._id)}
                      className="flex h-5 w-5 items-center justify-center text-white"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="tnum w-4 text-center text-xs font-semibold text-white">{qty}</span>
                    <button
                      type="button"
                      aria-label={`Add one more ${item.name}`}
                      onClick={() => onAdd(item)}
                      className="flex h-5 w-5 items-center justify-center text-white"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                ))}
            </li>
          );
        })}
      </ul>
    </FullScreenFlow>
  );
}
