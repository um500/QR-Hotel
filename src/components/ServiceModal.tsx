"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus, Pencil } from "lucide-react";
import { createService, updateService } from "@/lib/actions/services";
import { initialFormState } from "@/lib/form-state";
import type { Service } from "@/lib/sanity/types";
import Modal from "@/components/Modal";
import { IconButton } from "@/components/ui";
import { Field, TextInput, PrimaryButton, SecondaryButton, FormError } from "@/components/ui";

const CATEGORIES = ["Housekeeping", "Food & Beverage", "Laundry", "Concierge"];

function ServiceFields({ service }: { service?: Service }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Field label="Title" htmlFor="title">
        <TextInput id="title" name="title" placeholder="e.g. Room Cleaning" defaultValue={service?.title} required />
      </Field>
      <Field label="Category" htmlFor="category">
        <TextInput
          id="category"
          name="category"
          list="service-categories"
          placeholder="Housekeeping"
          defaultValue={service?.category}
          required
        />
        <datalist id="service-categories">
          {CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>
      <Field label="Contact" htmlFor="contact" optional>
        <TextInput
          id="contact"
          name="contact"
          placeholder="e.g. Ext. 101 or +91 98765 43210"
          defaultValue={service?.contact}
        />
      </Field>
      <Field label="Available Time" htmlFor="availableTime" optional>
        <TextInput
          id="availableTime"
          name="availableTime"
          placeholder="e.g. 8:00 AM – 10:00 PM"
          defaultValue={service?.availableTime}
        />
      </Field>
    </div>
  );
}

export function AddServiceModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createService, initialFormState);
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
        Add Service
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Service">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <ServiceFields />
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

export function EditServiceModal({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const boundAction = updateService.bind(null, service._id);
  const [state, formAction] = useFormState(boundAction, initialFormState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state]);

  return (
    <>
      <IconButton aria-label={`Edit ${service.title}`} onClick={() => setOpen(true)}>
        <Pencil size={14} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Service">
        <form action={formAction} className="flex flex-col gap-4">
          <ServiceFields service={service} />
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
