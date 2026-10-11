"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { HOTEL_INFO_DOC_ID, type HotelInfo } from "@/lib/sanity/types";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function updateHotelInfo(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const checkoutTime = String(formData.get("checkoutTime") || "").trim();
  const breakfastTime = String(formData.get("breakfastTime") || "").trim();
  const policies = String(formData.get("policies") || "").trim();
  const receptionPhone = String(formData.get("receptionPhone") || "").trim();
  const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
  const securityPhone = String(formData.get("securityPhone") || "").trim();

  if (!name || !checkoutTime || !breakfastTime) {
    return { success: false, error: "Hotel name, checkout time aur breakfast time zaroori hai." };
  }

  // This is a singleton doc (fixed id) — fetch what's already there first
  // so the legacy `amenities` array (superseded by the separate Amenity
  // documents, but still part of the schema) isn't wiped out on save.
  const existing = await sanityClient
    .getDocument<HotelInfo>(HOTEL_INFO_DOC_ID)
    .catch(() => undefined);

  await sanityClient.createOrReplace({
    _id: HOTEL_INFO_DOC_ID,
    _type: "hotelInfo",
    name,
    checkoutTime,
    breakfastTime,
    amenities: existing?.amenities || [],
    policies: policies || undefined,
    receptionPhone: receptionPhone || undefined,
    whatsappNumber: whatsappNumber || undefined,
    securityPhone: securityPhone || undefined,
  });

  await invalidateCache(CACHE_KEYS.hotelInfo);
  revalidatePath("/admin/hotel-info");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}
