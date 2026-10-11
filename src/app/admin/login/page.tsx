"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/form-state";
import Logo from "@/components/Logo";
import { PrimaryButton } from "@/components/ui";

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAdmin, initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-16">
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      <div className="w-full max-w-sm rounded-xl2 border border-line bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Admin Sign In
        </h1>
        <p className="mt-1 text-sm text-ink-dim">
          Access your hotel administration panel
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-dim">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@grandorchid.com"
                required
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink-dim">
              Password
            </label>
            <div className="relative">
              <Lock
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-dim"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {state.error && (
            <p className="flex items-center gap-2 text-sm text-danger">
              <AlertCircle size={16} />
              {state.error}
            </p>
          )}

          <PrimaryButton pendingLabel="Signing in…" className="mt-1 w-full py-3">
            Sign In
            <ArrowRight size={16} />
          </PrimaryButton>
        </form>
      </div>
    </main>
  );
}
