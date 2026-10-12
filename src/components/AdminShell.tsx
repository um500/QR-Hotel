"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, User, X } from "lucide-react";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/SidebarNav";

// Below the `lg` breakpoint (phones and most tablets, portrait or
// landscape) the sidebar becomes an off-canvas drawer opened by the
// hamburger button in a slim top bar. At `lg` and up (laptops/desktops)
// the drawer machinery is simply never shown — the sidebar renders
// permanently in the flex row, exactly like the old fixed layout did.
export default function AdminShell({
  email,
  logoutAction,
  children,
}: {
  email: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Tapping a nav link inside the drawer should close it — otherwise the
  // next page loads with the drawer still covering the screen.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll behind the drawer while it's open, same as Modal.tsx.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="min-h-screen bg-paper lg:flex">
      {/* Mobile/tablet top bar — replaced by the permanent sidebar at lg:. */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-navy px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-white/80 active:bg-white/10"
        >
          <Menu size={20} />
        </button>
        <p className="font-display text-sm font-semibold tracking-wide text-white">
          THE GRAND ORCHID
        </p>
        <div className="h-9 w-9" aria-hidden="true" />
      </header>

      {/* Backdrop behind the drawer. */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] shrink-0 flex-col overflow-y-auto bg-navy transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
          <Logo tone="light" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <SidebarNav />

        <div className="border-t border-white/10 px-4 py-4">
          <div className="mb-3 flex items-center gap-2.5 px-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">{email}</p>
              <p className="text-[11px] text-white/45">Administrator</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
