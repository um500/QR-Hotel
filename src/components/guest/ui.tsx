"use client";

// Shared presentational bits for the guest app — mirrors the admin's
// src/components/ui.tsx so both halves of DeskQR read as one product.

import { useEffect } from "react";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";

export function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl2 border border-line bg-white p-4 shadow-card ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2.5">
        {icon}
        <div>
          <h2 className="font-display text-[15px] font-semibold text-ink">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-ink-dim">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

// Transient top-of-screen banner for "request sent" / error feedback.
export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+12px)] z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
      <div className="flex items-center justify-center rounded-full bg-navy px-4 py-2.5 text-center text-xs font-medium text-white shadow-pop">
        {message}
      </div>
    </div>
  );
}

// +/- quantity control, reused by Extra Towels, Laundry and Room Service.
export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`flex ${dim} items-center justify-center rounded-full bg-brand-soft text-brand disabled:opacity-40`}
      >
        <Minus size={size === "sm" ? 12 : 14} />
      </button>
      <span className="tnum w-4 text-center text-sm font-semibold text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`flex ${dim} items-center justify-center rounded-full bg-brand text-white disabled:opacity-40`}
      >
        <Plus size={size === "sm" ? 12 : 14} />
      </button>
    </div>
  );
}

// A small filled/unfilled pill toggle — used for Laundry's Wash/Iron/
// Dry-clean chips and Maintenance's issue-type cards.
export function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-gold bg-gold text-white"
          : "border-line bg-white text-ink-dim"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

// Bottom-sheet overlay — used for amenity details and the lighter-weight
// quick requests (Extra Towels, Wake-up Call). Dimmed backdrop, drag
// handle, optional icon/title/subtitle header, free-form body, and a
// sticky primary action + Close link at the bottom.
export function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50"
      />
      <div className="relative z-10 w-full max-w-md rounded-t-[28px] bg-white px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] pt-3 shadow-pop">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({
  icon,
  tint,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  tint: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 flex flex-col items-center gap-2.5 text-center">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full ${tint}`}>
        {icon}
      </span>
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        {subtitle && <p className="text-sm text-ink-dim">{subtitle}</p>}
      </div>
    </div>
  );
}

// Full-screen flow overlay — used for Housekeeping, Laundry, Maintenance
// and Room Service: back arrow + icon + title header, scrollable body,
// and an optional sticky bottom action bar. Covers the bottom nav too,
// matching the reference screens (no tab bar while a flow is open).
export function FullScreenFlow({
  icon,
  tint,
  title,
  subtitle,
  onBack,
  children,
  footer,
}: {
  icon: React.ReactNode;
  tint: string;
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <header className="flex items-center gap-3 border-b border-line bg-white px-4 pb-4 pt-[calc(env(safe-area-inset-top,0px)+16px)]">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-dim hover:bg-paper"
        >
          <ArrowLeft size={19} />
        </button>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tint}`}>
          {icon}
        </span>
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl font-semibold text-ink">
            {title}
          </h1>
          {subtitle && <p className="truncate text-xs text-ink-dim">{subtitle}</p>}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>

      {footer && (
        <div className="border-t border-line bg-white px-4 pb-[calc(env(safe-area-inset-bottom,0px)+14px)] pt-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export function CloseX({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClose}
      className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 hover:text-white"
    >
      <X size={16} />
    </button>
  );
}
