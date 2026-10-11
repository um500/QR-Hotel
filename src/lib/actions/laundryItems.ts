"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function createLaundryItem(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const photoUrl = String(formData.get("photoUrl") || "").trim();

  if (!name) {
    return { success: false, error: "Item ka naam zaroori hai." };
  }

  // Auto-increment order so new items land at the end of the list,
  // matching the Request Types pattern.
  const highestOrder = await sanityClient.fetch<number | null>(
    `*[_type == "laundryItem"] | order(order desc)[0].order`
  );

  await sanityClient.create({
    _type: "laundryItem",
    name,
    description: description || undefined,
    photoUrl: photoUrl || undefined,
    order: (highestOrder ?? 0) + 1,
  });

  await invalidateCache(CACHE_KEYS.laundryItems);
  revalidatePath("/admin/laundry-items");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deleteLaundryItem(itemId: string) {
  await requireAdmin();
  await sanityClient.delete(itemId);
  await invalidateCache(CACHE_KEYS.laundryItems);
  revalidatePath("/admin/laundry-items");
  revalidatePath("/r/[room]", "page");
}
