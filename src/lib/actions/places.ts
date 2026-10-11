"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function createPlace(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const distanceKm = Number(formData.get("distanceKm") || 0);
  const mapUrl = String(formData.get("mapUrl") || "").trim();
  const photoUrl = String(formData.get("photoUrl") || "").trim();
  const category = String(formData.get("category") || "Attraction").trim();

  if (!name || !mapUrl || Number.isNaN(distanceKm)) {
    return { success: false, error: "Name, distance aur map link zaroori hai." };
  }

  await sanityClient.create({
    _type: "place",
    name,
    distanceKm,
    mapUrl,
    photoUrl: photoUrl || undefined,
    category,
  });

  await invalidateCache(CACHE_KEYS.places);
  revalidatePath("/admin/places");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deletePlace(placeId: string) {
  await requireAdmin();
  await sanityClient.delete(placeId);
  await invalidateCache(CACHE_KEYS.places);
  revalidatePath("/admin/places");
  revalidatePath("/r/[room]", "page");
}
