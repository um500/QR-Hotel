import { Landmark, Trash2, Clock, MapPin } from "lucide-react";
import { getAllAmenities } from "@/lib/sanity/queries";
import { deleteAmenity } from "@/lib/actions/amenities";
import { AddAmenityModal, EditAmenityModal } from "@/components/AmenityModal";
import { PageHeader, EmptyState, IconButton } from "@/components/ui";
import { amenityIconFor } from "@/components/amenity-icons";

export const dynamic = "force-dynamic";

export default async function AmenitiesPage() {
  const amenities = await getAllAmenities();

  return (
    <div>
      <PageHeader
        title="Amenities"
        subtitle="Manage hotel amenities and facilities for your guests."
        action={<AddAmenityModal />}
      />

      {amenities.length === 0 ? (
        <EmptyState
          icon={<Landmark size={24} />}
          title="No amenities added yet"
          subtitle="Add a facility like the pool, gym or spa."
          action={<AddAmenityModal />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => {
            const Icon = amenityIconFor(a.name);
            return (
              <div
                key={a._id}
                className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
              >
                <div className="relative aspect-[4/3] bg-paper">
                  {a.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.photoUrl} alt={a.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-ink-faint">
                      <Icon size={28} />
                    </div>
                  )}
                  {a.bookingRequired && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                      Booking
                    </span>
                  )}
                  <div className="absolute right-2.5 top-2.5 flex gap-1.5">
                    <EditAmenityModal amenity={a} />
                    <form action={deleteAmenity.bind(null, a._id)}>
                      <IconButton
                        tone="danger"
                        type="submit"
                        aria-label={`Delete ${a.name}`}
                        className="bg-white/90 backdrop-blur"
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </form>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-ink">{a.name}</p>
                  <div className="mt-2 flex flex-col gap-1 text-xs text-ink-dim">
                    {a.timing && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={12} />
                        {a.timing}
                      </span>
                    )}
                    {a.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={12} />
                        {a.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
