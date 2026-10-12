import { getAdminSession } from "@/lib/auth";
import { logoutAdmin } from "@/lib/actions/auth";
import AdminShell from "@/components/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <AdminShell email={session?.email || "admin@grandorchid.com"} logoutAction={logoutAdmin}>
      {children}
    </AdminShell>
  );
}
