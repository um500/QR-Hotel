"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function createAmenity(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const timing = String(formData.get("timing") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const photoUrl = String(formData.get("photoUrl") || "").trim();
  const bookingRequired = formData.get("bookingRequired") === "on";

  if (!name) {
    return { success: false, error: "Amenity name daalo." };
  }

  await sanityClient.create({
    _type: "amenity",
    name,
    description: description || undefined,
    timing: timing || undefined,
    location: location || undefined,
    photoUrl: photoUrl || undefined,
    bookingRequired,
  });

  await invalidateCache(CACHE_KEYS.amenities);
  revalidatePath("/admin/amenities");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function updateAmenity(
  amenityId: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const timing = String(formData.get("timing") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const photoUrl = String(formData.get("photoUrl") || "").trim();
  const bookingRequired = formData.get("bookingRequired") === "on";

  if (!name) {
    return { success: false, error: "Amenity name daalo." };
  }

  await sanityClient
    .patch(amenityId)
    .set({
      name,
      description: description || undefined,
      timing: timing || undefined,
      location: location || undefined,
      photoUrl: photoUrl || undefined,
      bookingRequired,
    })
    .commit();

  await invalidateCache(CACHE_KEYS.amenities);
  revalidatePath("/admin/amenities");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deleteAmenity(amenityId: string) {
  await requireAdmin();
  await sanityClient.delete(amenityId);
  await invalidateCache(CACHE_KEYS.amenities);
  revalidatePath("/admin/amenities");
  revalidatePath("/r/[room]", "page");
}
