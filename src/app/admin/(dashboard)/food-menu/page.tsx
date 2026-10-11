import { ChevronDown, UtensilsCrossed, Trash2 } from "lucide-react";
import { getAllFoodItems } from "@/lib/sanity/queries";
import { deleteFoodItem } from "@/lib/actions/foodItems";
import { AddFoodItemModal, EditFoodItemModal } from "@/components/FoodItemModal";
import { PageHeader, EmptyState, IconButton } from "@/components/ui";
import type { FoodItem } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

function groupByCategory(items: FoodItem[]) {
  const groups = new Map<string, FoodItem[]>();
  for (const item of items) {
    const list = groups.get(item.category) || [];
    list.push(item);
    groups.set(item.category, list);
  }
  return Array.from(groups.entries());
}

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
        veg ? "border-success" : "border-danger"
      }`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-success" : "bg-danger"}`} />
    </span>
  );
}

export default async function FoodMenuPage() {
  const items = await getAllFoodItems();
  const groups = groupByCategory(items);

  return (
    <div>
      <PageHeader
        title="Food Menu"
        subtitle="Manage the room-service menu guests can order from."
        action={<AddFoodItemModal />}
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<UtensilsCrossed size={24} />}
          title="No food items yet"
          subtitle="Add your first room-service menu item."
          action={<AddFoodItemModal />}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(([category, categoryItems]) => (
            <details
              key={category}
              open
              className="group overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warning-soft text-warning">
                    <UtensilsCrossed size={18} />
                  </span>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base font-semibold text-ink">{category}</h2>
                    <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-ink-dim">
                      {categoryItems.length}
                    </span>
                  </div>
                </div>
                <ChevronDown size={18} className="text-ink-faint transition-transform group-open:rotate-180" />
              </summary>

              <div className="border-t border-line">
                {categoryItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0 hover:bg-paper/60"
                  >
                    <VegMark veg={item.veg} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink">{item.name}</p>
                        {!item.available && (
                          <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-medium text-danger">
                            Unavailable
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="truncate text-xs text-ink-faint">{item.description}</p>
                      )}
                    </div>
                    <p className="tnum shrink-0 text-sm font-semibold text-ink">₹{item.price}</p>
                    <EditFoodItemModal item={item} />
                    <form action={deleteFoodItem.bind(null, item._id)}>
                      <IconButton tone="danger" type="submit" aria-label={`Delete ${item.name}`}>
                        <Trash2 size={14} />
                      </IconButton>
                    </form>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
