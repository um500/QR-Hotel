"use client";

import { MapPin, Clock3, FileText, Navigation, CalendarCheck } from "lucide-react";
import type { Amenity } from "@/lib/sanity/types";
import { amenityIconFor } from "@/components/amenity-icons";
import { BottomSheet, SheetHeader } from "@/components/guest/ui";

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line py-3 last:border-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-ink-faint">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

export default function AmenityDetailSheet({
  amenity,
  onClose,
  onBook,
  isPending,
}: {
  amenity: Amenity | null;
  onClose: () => void;
  onBook: (name: string) => void;
  isPending: boolean;
}) {
  if (!amenity) return null;
  const Icon = amenityIconFor(amenity.name);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${amenity.name} ${amenity.location || ""}`
  )}`;

  return (
    <BottomSheet open={!!amenity} onClose={onClose}>
      <SheetHeader
        icon={<Icon size={24} />}
        tint="bg-brand-soft text-brand"
        title={amenity.name}
        subtitle={amenity.description}
      />
      <div className="mb-5">
        {amenity.location && <Row icon={<MapPin size={15} />} label="Location" value={amenity.location} />}
        {amenity.timing && <Row icon={<Clock3 size={15} />} label="Timing" value={amenity.timing} />}
        {amenity.description && <Row icon={<FileText size={15} />} label="Note" value={amenity.description} />}
      </div>

      {amenity.bookingRequired ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            onBook(amenity.name);
            onClose();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl2 bg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          <CalendarCheck size={16} /> Book Now
        </button>
      ) : (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl2 bg-brand py-3.5 text-sm font-semibold text-white"
        >
          <Navigation size={16} /> Get Directions
        </a>
      )}
      <button
        type="button"
        onClick={onClose}
        className="mt-3 w-full text-center text-sm font-medium text-ink-faint"
      >
        Close
      </button>
    </BottomSheet>
  );
}
