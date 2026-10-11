"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Plus, X } from "lucide-react";
import { createRequestType, deleteRequestType } from "@/lib/actions/requestTypes";
import { initialFormState } from "@/lib/form-state";
import type { RequestType } from "@/lib/sanity/types";
import { requestIconFor } from "@/components/request-icons";
import { PrimaryButton, FormError } from "@/components/ui";

// These are the one-tap "Need something?" buttons on the guest app
// (Housekeeping, Laundry, Maintenance, Extra Towels, ...). They live here,
// at the top of the Services page, because they're the guest-facing
// counterpart to the informational service cards below.
export default function RequestTypesPanel({
  requestTypes,
}: {
  requestTypes: RequestType[];
}) {
  const [state, formAction] = useFormState(createRequestType, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <section className="mb-6 rounded-xl2 border border-line bg-white p-5 shadow-card">
      <h2 className="font-display text-base font-semibold text-ink">
        Quick Request Types
      </h2>
      <p className="mt-0.5 text-xs text-ink-dim">
        These show as one-tap request buttons on the guest app. Add or remove what guests can request instantly.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {requestTypes.length === 0 && (
          <p className="text-sm text-ink-faint">
            No quick-request types yet — add the first one below.
          </p>
        )}
        {requestTypes.map((rt) => {
          const { icon: Icon, tint } = requestIconFor(rt.label);
          return (
            <span
              key={rt._id}
              className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-3 pr-2 text-sm font-medium text-ink"
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${tint}`}>
                <Icon size={11} />
              </span>
              {rt.label}
              <form action={deleteRequestType.bind(null, rt._id)}>
                <button
                  type="submit"
                  aria-label={`Remove ${rt.label}`}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-ink-faint transition hover:bg-danger-soft hover:text-danger"
                >
                  <X size={12} />
                </button>
              </form>
            </span>
          );
        })}
      </div>

      <form ref={formRef} action={formAction} className="mt-4 flex items-start gap-2">
        <input
          name="label"
          placeholder="e.g. Pillow Menu"
          className="w-56 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <PrimaryButton pendingLabel="Adding…" className="px-3.5 py-2">
          <Plus size={15} />
          Add
        </PrimaryButton>
      </form>
      <FormError message={state.error} />
    </section>
  );
}
