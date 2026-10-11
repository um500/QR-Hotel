import { listRequests, getAvgResponseMinutes } from "@/lib/requests-data";
import { getAllRooms } from "@/lib/sanity/queries";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [requests, rooms, avgResponseMinutes] = await Promise.all([
    listRequests(),
    getAllRooms(),
    getAvgResponseMinutes(),
  ]);

  return (
    <DashboardClient
      initialRequests={requests}
      roomsCount={rooms.length}
      avgResponseMinutes={avgResponseMinutes}
    />
  );
}
