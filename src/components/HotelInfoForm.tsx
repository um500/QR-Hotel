"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Hotel, Save, CheckCircle2 } from "lucide-react";
import { updateHotelInfo } from "@/lib/actions/hotelInfo";
import { initialFormState } from "@/lib/form-state";
import type { HotelInfo } from "@/lib/sanity/types";
import { Field, TextInput, TextArea, PrimaryButton } from "@/components/ui";

export default function HotelInfoForm({ hotelInfo }: { hotelInfo: HotelInfo | null }) {
  const [state, formAction] = useFormState(updateHotelInfo, initialFormState);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!state.success) return;
    setToast(true);
    const t = setTimeout(() => setToast(false), 3500);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className="relative flex flex-col gap-5">
      {toast && (
        <div className="fixed right-6 top-6 z-40 flex items-start gap-3 rounded-xl2 border border-line bg-white px-4 py-3 shadow-pop">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success" />
          <div>
            <p className="text-sm font-medium text-ink">Hotel info updated</p>
            <p className="text-xs text-ink-dim">Guests will see the new details right away.</p>
          </div>
        </div>
      )}

      <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Hotel size={18} />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Hotel Details
            </h2>
            <p className="text-xs text-ink-dim">
              Shown on the guest app&apos;s Stay tab.
            </p>
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <Field label="Hotel Name" htmlFor="name">
            <TextInput
              id="name"
              name="name"
              defaultValue={hotelInfo?.name || ""}
              placeholder="The Grand Orchid Hotel"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Checkout Time" htmlFor="checkoutTime">
              <TextInput
                id="checkoutTime"
                name="checkoutTime"
                defaultValue={hotelInfo?.checkoutTime || ""}
                placeholder="11:00 AM"
                required
              />
            </Field>
            <Field label="Breakfast Hours" htmlFor="breakfastTime">
              <TextInput
                id="breakfastTime"
                name="breakfastTime"
                defaultValue={hotelInfo?.breakfastTime || ""}
                placeholder="7:00 AM – 10:30 AM"
                required
              />
            </Field>
          </div>
          <Field label="House Rules / Policies" htmlFor="policies" optional>
            <TextArea
              id="policies"
              name="policies"
              defaultValue={hotelInfo?.policies || ""}
              placeholder="No smoking in rooms. Quiet hours 10 PM–7 AM. ..."
              rows={3}
            />
          </Field>

          <div className="mt-2 border-t border-line pt-4">
            <p className="mb-3 text-sm font-semibold text-ink">
              Help Tab Contact Numbers
            </p>
            <div className="flex flex-col gap-4">
              <Field label="Reception Phone" htmlFor="receptionPhone" optional>
                <TextInput
                  id="receptionPhone"
                  name="receptionPhone"
                  defaultValue={hotelInfo?.receptionPhone || ""}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="WhatsApp Number" htmlFor="whatsappNumber" optional>
                <TextInput
                  id="whatsappNumber"
                  name="whatsappNumber"
                  defaultValue={hotelInfo?.whatsappNumber || ""}
                  placeholder="919876543210 (with country code, no + or spaces)"
                />
              </Field>
              <Field label="Hotel Security Phone" htmlFor="securityPhone" optional>
                <TextInput
                  id="securityPhone"
                  name="securityPhone"
                  defaultValue={hotelInfo?.securityPhone || ""}
                  placeholder="+91 98765 43211"
                />
              </Field>
            </div>
          </div>

          {state.error && <p className="text-sm text-danger">{state.error}</p>}
          <PrimaryButton pendingLabel="Saving…" className="mt-1">
            <Save size={15} />
            Save Changes
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
