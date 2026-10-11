"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";
import { createLaundryItem } from "@/lib/actions/laundryItems";
import { initialFormState } from "@/lib/form-state";
import Modal from "@/components/Modal";
import { Field, TextInput, PrimaryButton, SecondaryButton, FormError } from "@/components/ui";

export default function AddLaundryItemModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createLaundryItem, initialFormState);
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
        Add Item
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Laundry Item">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <Field label="Name" htmlFor="name">
            <TextInput id="name" name="name" placeholder="e.g. Shirt" required />
          </Field>
          <Field label="Description" htmlFor="description" optional>
            <TextInput id="description" name="description" placeholder="e.g. Formal or casual shirts" />
          </Field>
          <Field label="Photo URL" htmlFor="photoUrl" optional>
            <TextInput id="photoUrl" name="photoUrl" placeholder="https://example.com/shirt.jpg" />
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
