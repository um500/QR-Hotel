"use client";

import { useFormStatus } from "react-dom";
import { todayLong } from "@/lib/format";

// Small shared primitives so every admin page/form reads the same way
// instead of re-deriving Tailwind classes each time.

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-[26px] font-semibold text-ink">
          {title}
        </h1>
        <p className="mt-1 text-sm text-ink-dim">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function TodayStamp() {
  return <span className="text-xs text-ink-faint">{todayLong()}</span>;
}

export function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-ink-dim">
        {label}
        {optional && <span className="text-ink-faint"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className || ""}`} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea {...props} className={`${inputBase} resize-none ${props.className || ""}`} />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className || ""}`} />;
}

export function PrimaryButton({
  children,
  pendingLabel,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      type={rest.type || "submit"}
      disabled={pending || rest.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60 ${rest.className || ""}`}
    >
      {pending ? pendingLabel || "Saving…" : children}
    </button>
  );
}

export function SecondaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-paper ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export function IconButton({
  children,
  tone = "default",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "default" | "danger";
}) {
  const toneClass =
    tone === "danger"
      ? "text-danger hover:bg-danger-soft"
      : "text-ink-dim hover:bg-paper hover:text-ink";
  return (
    <button
      {...rest}
      type={rest.type || "button"}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-line ${toneClass} ${rest.className || ""}`}
    >
      {children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-danger">{message}</p>;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-line bg-white py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink-faint">
        {icon}
      </div>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-dim">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
