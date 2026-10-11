"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function createService(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const availableTime = String(formData.get("availableTime") || "").trim();

  if (!title || !category) {
    return { success: false, error: "Title aur category dono bharo." };
  }

  await sanityClient.create({
    _type: "service",
    title,
    category,
    contact: contact || undefined,
    availableTime: availableTime || undefined,
  });

  await invalidateCache(CACHE_KEYS.services);
  revalidatePath("/admin/services");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function updateService(
  serviceId: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const availableTime = String(formData.get("availableTime") || "").trim();

  if (!title || !category) {
    return { success: false, error: "Title aur category dono bharo." };
  }

  await sanityClient
    .patch(serviceId)
    .set({
      title,
      category,
      contact: contact || undefined,
      availableTime: availableTime || undefined,
    })
    .commit();

  await invalidateCache(CACHE_KEYS.services);
  revalidatePath("/admin/services");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deleteService(serviceId: string) {
  await requireAdmin();
  await sanityClient.delete(serviceId);
  await invalidateCache(CACHE_KEYS.services);
  revalidatePath("/admin/services");
  revalidatePath("/r/[room]", "page");
}
