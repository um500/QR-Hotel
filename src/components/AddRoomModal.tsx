"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus } from "lucide-react";
import { createRoom } from "@/lib/actions/rooms";
import { initialFormState } from "@/lib/form-state";
import Modal from "@/components/Modal";
import { Field, TextInput, PrimaryButton, SecondaryButton, FormError } from "@/components/ui";

export default function AddRoomModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createRoom, initialFormState);
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
        Add Room
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Room">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <Field label="Room Number" htmlFor="roomNo">
            <TextInput id="roomNo" name="roomNo" placeholder="Enter room number" required />
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
