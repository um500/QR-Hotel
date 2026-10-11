import "server-only";
import { getDb } from "@/lib/mongodb";
import type { GuestRequest } from "@/lib/models/request";

function toGuestRequest(d: any): GuestRequest {
  return {
    _id: d._id.toString(),
    roomNo: d.roomNo,
    type: d.type,
    note: d.note,
    status: d.status,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    completedAt: d.completedAt,
    completedBy: d.completedBy,
  };
}

// Plain read helper — called directly from server components (admin
// dashboard, requests list), not a server action.
export async function listRequests(
  filter: { status?: GuestRequest["status"] } = {}
): Promise<GuestRequest[]> {
  const db = await getDb();
  const docs = await db
    .collection("requests")
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  return docs.map(toGuestRequest);
}

// Called from the guest room page on load, so a refresh still shows
// requests that are already pending/in progress for that room.
export async function listRoomRequests(
  roomNo: string
): Promise<GuestRequest[]> {
  const db = await getDb();
  const docs = await db
    .collection("requests")
    .find({ roomNo })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  return docs.map(toGuestRequest);
}

// Dashboard's "Avg Response Time" tile — mean minutes between a request
// being created and being marked done, over the last 24 hours of
// completed requests. Falls back gracefully when there's no history yet.
export async function getAvgResponseMinutes(): Promise<number | null> {
  const db = await getDb();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const docs = await db
    .collection("requests")
    .find({ status: "done", completedAt: { $gte: since } })
    .project({ createdAt: 1, completedAt: 1 })
    .limit(200)
    .toArray();

  if (docs.length === 0) return null;

  const totalMinutes = docs.reduce((sum, d) => {
    const created = new Date(d.createdAt).getTime();
    const completed = new Date(d.completedAt).getTime();
    return sum + Math.max(0, completed - created) / 60000;
  }, 0);

  return Math.round(totalMinutes / docs.length);
}
