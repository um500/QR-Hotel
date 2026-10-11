"use server";

import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import {
  ADMIN_REQUESTS_CHANNEL,
  pusherServer,
  roomChannel,
} from "@/lib/pusher/server";
import type { GuestRequest, RequestStatus } from "@/lib/models/request";

// Public — called from the guest room page. No admin check: anyone who
// scanned that room's QR is treated as that room's guest.
export async function createRequest(input: {
  roomNo: string;
  type: string;
  note?: string;
}) {
  const roomNo = input.roomNo.trim();
  const type = input.type.trim();
  if (!roomNo || !type) {
    return { error: "Request type chuno." };
  }

  const db = await getDb();
  const now = new Date().toISOString();
  const doc: Omit<GuestRequest, "_id"> = {
    roomNo,
    type,
    note: input.note?.trim() || undefined,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("requests").insertOne(doc);
  const request: GuestRequest = { _id: result.insertedId.toString(), ...doc };

  // Admin dashboard listens on the shared channel; the guest's own page
  // only listens on its room's channel, so guests never see each other's
  // requests.
  await pusherServer.trigger(ADMIN_REQUESTS_CHANNEL, "new-request", request);
  await pusherServer.trigger(roomChannel(roomNo), "request-created", request);

  return { success: true, request };
}

// Admin-only — marks a request's status and pushes the update both ways.
export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
) {
  const session = await requireAdmin();

  const db = await getDb();
  const updatedAt = new Date().toISOString();
  const completionFields =
    status === "done"
      ? { completedAt: updatedAt, completedBy: session.email }
      : {};

  const result = await db
    .collection("requests")
    .findOneAndUpdate(
      { _id: new ObjectId(requestId) },
      { $set: { status, updatedAt, ...completionFields } },
      { returnDocument: "after" }
    );

  if (!result) {
    throw new Error("Request nahi mila.");
  }

  const request: GuestRequest = {
    _id: result._id.toString(),
    roomNo: result.roomNo,
    type: result.type,
    note: result.note,
    status: result.status,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    completedAt: result.completedAt,
    completedBy: result.completedBy,
  };

  await pusherServer.trigger(
    ADMIN_REQUESTS_CHANNEL,
    "request-updated",
    request
  );
  await pusherServer.trigger(
    roomChannel(request.roomNo),
    "request-updated",
    request
  );

  return request;
}
