"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createRoom } from "@/lib/actions/rooms";
import { initialFormState } from "@/lib/form-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-accent2 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Adding..." : "Add room"}
    </button>
  );
}

export default function AddRoomForm() {
  const [state, formAction] = useFormState(createRoom, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex items-end gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-neutral-400">Room number</label>
        <input
          name="roomNo"
          placeholder="101"
          required
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>
      <SubmitButton />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
