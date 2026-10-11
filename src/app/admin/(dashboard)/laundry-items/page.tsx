import { Shirt, Trash2, Image as ImageIcon } from "lucide-react";
import { getAllLaundryItems } from "@/lib/sanity/queries";
import { deleteLaundryItem } from "@/lib/actions/laundryItems";
import AddLaundryItemModal from "@/components/AddLaundryItemModal";
import { PageHeader, EmptyState, IconButton } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function LaundryItemsPage() {
  const items = await getAllLaundryItems();

  return (
    <div>
      <PageHeader
        title="Laundry Items"
        subtitle="The clothing items guests can pick from in the Laundry request flow."
        action={<AddLaundryItemModal />}
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<Shirt size={24} />}
          title="No laundry items added yet"
          subtitle="Add Shirt, Trouser, Saree and so on — with a real photo if you have one."
          action={<AddLaundryItemModal />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] bg-paper">
                {item.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photoUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-faint">
                    <ImageIcon size={28} />
                  </div>
                )}
                <form action={deleteLaundryItem.bind(null, item._id)} className="absolute right-2.5 top-2.5">
                  <IconButton
                    tone="danger"
                    type="submit"
                    aria-label={`Delete ${item.name}`}
                    className="bg-white/90 backdrop-blur"
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </form>
              </div>
              <div className="p-4">
                <p className="font-medium text-ink">{item.name}</p>
                {item.description && (
                  <p className="mt-1 text-xs text-ink-dim">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
