"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus, Pencil } from "lucide-react";
import { createAmenity, updateAmenity } from "@/lib/actions/amenities";
import { initialFormState } from "@/lib/form-state";
import type { Amenity } from "@/lib/sanity/types";
import Modal from "@/components/Modal";
import { Field, TextInput, TextArea, PrimaryButton, SecondaryButton, FormError, IconButton } from "@/components/ui";

function AmenityFields({ amenity }: { amenity?: Amenity }) {
  const [bookingRequired, setBookingRequired] = useState(amenity?.bookingRequired ?? false);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Field label="Name" htmlFor="name">
        <TextInput id="name" name="name" placeholder="e.g. Spa" defaultValue={amenity?.name} required />
      </Field>
      <Field label="Description" htmlFor="description" optional>
        <TextArea
          id="description"
          name="description"
          rows={2}
          placeholder="e.g. Unwind with a relaxing treatment."
          defaultValue={amenity?.description}
        />
      </Field>
      <Field label="Timing" htmlFor="timing" optional>
        <TextInput id="timing" name="timing" placeholder="e.g. 6:00 AM – 10:00 PM" defaultValue={amenity?.timing} />
      </Field>
      <Field label="Location" htmlFor="location" optional>
        <TextInput id="location" name="location" placeholder="e.g. 2nd Floor" defaultValue={amenity?.location} />
      </Field>
      <Field label="Photo URL" htmlFor="photoUrl" optional>
        <TextInput id="photoUrl" name="photoUrl" placeholder="https://example.com/image.jpg" defaultValue={amenity?.photoUrl} />
      </Field>

      <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3.5 py-3">
        <div>
          <p className="text-sm font-medium text-ink">Booking required?</p>
          <p className="text-xs text-ink-dim">Guest sees &quot;Book Now&quot; instead of &quot;Get Directions&quot;.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={bookingRequired}
          onClick={() => setBookingRequired((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            bookingRequired ? "bg-brand" : "bg-line"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              bookingRequired ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
        <input type="hidden" name="bookingRequired" value={bookingRequired ? "on" : "off"} />
      </div>
    </div>
  );
}

export function AddAmenityModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createAmenity, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
      >
        <Plus size={16} />
        Add Amenity
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Amenity">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <AmenityFields />
          <FormError message={state.error} />
          <div className="mt-1 flex justify-end gap-2">
            <SecondaryButton onClick={() => setOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton pendingLabel="Adding…">Add</PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function EditAmenityModal({ amenity }: { amenity: Amenity }) {
  const [open, setOpen] = useState(false);
  const boundAction = updateAmenity.bind(null, amenity._id);
  const [state, formAction] = useFormState(boundAction, initialFormState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state]);

  return (
    <>
      <IconButton
        aria-label={`Edit ${amenity.name}`}
        onClick={() => setOpen(true)}
        className="bg-white/90 backdrop-blur"
      >
        <Pencil size={14} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Amenity">
        <form action={formAction} className="flex flex-col gap-4">
          <AmenityFields amenity={amenity} />
          <FormError message={state.error} />
          <div className="mt-1 flex justify-end gap-2">
            <SecondaryButton onClick={() => setOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton pendingLabel="Saving…">Save</PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
