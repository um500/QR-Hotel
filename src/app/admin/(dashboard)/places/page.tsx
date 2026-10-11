import { MapPin, Trash2, Image as ImageIcon } from "lucide-react";
import { getAllPlaces } from "@/lib/sanity/queries";
import { deletePlace } from "@/lib/actions/places";
import AddPlaceModal from "@/components/AddPlaceModal";
import { PageHeader, EmptyState, IconButton } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function PlacesPage() {
  const places = await getAllPlaces();

  return (
    <div>
      <PageHeader
        title="Places"
        subtitle="Manage nearby places and attractions for your guests."
        action={<AddPlaceModal />}
      />

      {places.length === 0 ? (
        <EmptyState
          icon={<MapPin size={24} />}
          title="No places added yet"
          subtitle="Add a nearby attraction for guests to discover."
          action={<AddPlaceModal />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <div
              key={p._id}
              className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] bg-paper">
                {p.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photoUrl} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-faint">
                    <ImageIcon size={28} />
                  </div>
                )}
                <form action={deletePlace.bind(null, p._id)} className="absolute right-2.5 top-2.5">
                  <IconButton
                    tone="danger"
                    type="submit"
                    aria-label={`Delete ${p.name}`}
                    className="bg-white/90 backdrop-blur"
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </form>
              </div>
              <div className="p-4">
                <p className="font-medium text-ink">{p.name}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink-dim">
                    <MapPin size={11} />
                    {p.distanceKm} km
                  </span>
                  <span className="inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
                    {p.category || "Attraction"}
                  </span>
                </div>
                <a
                  href={p.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                >
                  <MapPin size={11} />
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
