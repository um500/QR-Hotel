"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";
import { createPlace } from "@/lib/actions/places";
import { initialFormState } from "@/lib/form-state";
import Modal from "@/components/Modal";
import { Field, TextInput, Select, PrimaryButton, SecondaryButton, FormError } from "@/components/ui";

const CATEGORIES = ["Attraction", "Restaurant", "ATM", "Pharmacy", "Hospital", "Cab"];

export default function AddPlaceModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createPlace, initialFormState);
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
        Add Place
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Place">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <Field label="Name" htmlFor="name">
            <TextInput id="name" name="name" placeholder="e.g. Victoria Memorial" required />
          </Field>
          <Field label="Category" htmlFor="category">
            <Select id="category" name="category" defaultValue="Attraction">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "Attraction" ? "Tourist attraction" : c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Distance (km)" htmlFor="distanceKm">
            <TextInput id="distanceKm" name="distanceKm" type="number" step="0.1" placeholder="e.g. 2.5" required />
          </Field>
          <Field label="Map Link (URL)" htmlFor="mapUrl">
            <TextInput id="mapUrl" name="mapUrl" placeholder="https://www.google.com/maps/..." required />
          </Field>
          <Field label="Photo URL" htmlFor="photoUrl" optional>
            <TextInput id="photoUrl" name="photoUrl" placeholder="https://example.com/image.jpg" />
          </Field>
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
