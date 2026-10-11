"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { getRoomByNo } from "@/lib/sanity/queries";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";
import type { Room } from "@/lib/sanity/types";

export async function createRoom(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const roomNo = String(formData.get("roomNo") || "").trim();
  if (!roomNo) {
    return { success: false, error: "Room number daalo." };
  }

  const existing = await getRoomByNo(roomNo);
  if (existing) {
    return { success: false, error: `Room ${roomNo} pehle se hai.` };
  }

  await sanityClient.create({
    _type: "room",
    roomNo,
    qrToken: randomBytes(8).toString("hex"),
    createdAt: new Date().toISOString(),
  });

  await invalidateCache(CACHE_KEYS.rooms, CACHE_KEYS.room(roomNo));
  revalidatePath("/admin/rooms");
  return { success: true };
}

export async function deleteRoom(roomId: string) {
  await requireAdmin();

  // Fetched before the delete so we know which per-room cache key to
  // clear too — deleteRoom only gets the Sanity document id, not the
  // room number the guest-facing cache is keyed by.
  const room = await sanityClient.getDocument<Room>(roomId);

  await sanityClient.delete(roomId);

  const keys: string[] = [CACHE_KEYS.rooms];
  if (room?.roomNo) keys.push(CACHE_KEYS.room(room.roomNo));
  await invalidateCache(...keys);

  revalidatePath("/admin/rooms");
}
