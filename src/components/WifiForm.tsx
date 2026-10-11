"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Wifi as WifiIcon, Copy, Check, Save, CheckCircle2 } from "lucide-react";
import { updateWifi } from "@/lib/actions/wifi";
import { initialFormState } from "@/lib/form-state";
import type { Wifi } from "@/lib/sanity/types";
import { Field, TextInput, PrimaryButton } from "@/components/ui";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API can be unavailable (older browsers, insecure
      // context) — the value is still visible to copy by hand.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-dim hover:bg-paper"
    >
      {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function WifiForm({ wifi }: { wifi: Wifi | null }) {
  const [state, formAction] = useFormState(updateWifi, initialFormState);
  const [ssid, setSsid] = useState(wifi?.ssid || "");
  const [password, setPassword] = useState(wifi?.password || "");
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
            <p className="text-sm font-medium text-ink">WiFi updated</p>
            <p className="text-xs text-ink-dim">All rooms now show the new network.</p>
          </div>
        </div>
      )}

      <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
            <WifiIcon size={18} />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-ink">
              Hotel WiFi Details
            </h2>
            <p className="text-xs text-ink-dim">
              This network will be shown to guests in all rooms.
            </p>
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <Field label="Network Name (SSID)" htmlFor="ssid">
            <TextInput
              id="ssid"
              name="ssid"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              required
            />
          </Field>
          <Field label="Password" htmlFor="password">
            <TextInput
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {state.error && <p className="text-sm text-danger">{state.error}</p>}
          <PrimaryButton pendingLabel="Saving…" className="mt-1">
            <Save size={15} />
            Save Changes
          </PrimaryButton>
        </form>
      </div>

      <div className="flex items-center gap-3 px-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
        <span className="h-px flex-1 bg-line" />
        Guest View Preview
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-soft text-success">
            <WifiIcon size={18} />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-ink">WiFi</h3>
            <p className="text-xs text-ink-dim">Stay connected during your stay</p>
          </div>
        </div>
        <div className="divide-y divide-line rounded-lg bg-paper px-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-xs text-ink-faint">Network Name</p>
              <p className="font-mono text-sm font-medium text-ink">{ssid || "—"}</p>
            </div>
            <CopyButton value={ssid} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-xs text-ink-faint">Password</p>
              <p className="font-mono text-sm font-medium text-ink">{password || "—"}</p>
            </div>
            <CopyButton value={password} />
          </div>
        </div>
      </div>
    </div>
  );
}
