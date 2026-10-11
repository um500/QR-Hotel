import { LogOut, User } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { logoutAdmin } from "@/lib/actions/auth";
import Logo from "@/components/Logo";
import SidebarNav from "@/components/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-navy">
        <div className="border-b border-white/10 px-6 py-7">
          <Logo tone="light" />
        </div>

        <SidebarNav />

        <div className="border-t border-white/10 px-4 py-4">
          <div className="mb-3 flex items-center gap-2.5 px-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">
                {session?.email || "admin@grandorchid.com"}
              </p>
              <p className="text-[11px] text-white/45">Administrator</p>
            </div>
          </div>
          <form action={logoutAdmin}>
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

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
