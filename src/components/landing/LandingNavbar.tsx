"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

function MarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="18" y="3" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="3" y="18" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="7" y="7" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="22" y="7" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="7" y="22" width="3" height="3" rx="0.5" fill="currentColor" />
      <path
        d="M19 20h4v4h-4v-4Zm6 0h4v4h-4v-4Zm-6 6h4v4h-4v-4Zm6 0h4v4h-4v-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <MarkIcon className="h-7 w-7 text-gold" />
          <span className="font-display text-xl font-semibold tracking-wide text-white">
            Stay<span className="text-gold">QR</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition hover:text-gold ${
                i === 0 ? "text-gold" : "text-white/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/admin/login"
            className="rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Login
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold/90"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col bg-navy-light px-6 py-6 shadow-2xl transition-transform duration-200 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-white">
            Stay<span className="text-gold">QR</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium transition ${
                i === 0 ? "text-gold" : "text-white/80 hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <a
            href="/admin/login"
            className="rounded-lg border border-white/25 px-5 py-3 text-center text-sm font-medium text-white"
          >
            Login
          </a>
          <a
            href="#pricing"
            className="rounded-lg bg-gold px-5 py-3 text-center text-sm font-semibold text-navy"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
