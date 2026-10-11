"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function createRequestType(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const label = String(formData.get("label") || "").trim();
  if (!label) {
    return { success: false, error: "Request type ka naam daalo." };
  }

  // New chips go to the end of the guest's tap-to-request row.
  const lastOrder = await sanityClient.fetch<number | null>(
    `*[_type == "requestType"] | order(order desc)[0].order`
  );

  await sanityClient.create({
    _type: "requestType",
    label,
    order: (lastOrder ?? -1) + 1,
  });

  await invalidateCache(CACHE_KEYS.requestTypes);
  revalidatePath("/admin/services");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deleteRequestType(requestTypeId: string) {
  await requireAdmin();
  await sanityClient.delete(requestTypeId);
  await invalidateCache(CACHE_KEYS.requestTypes);
  revalidatePath("/admin/services");
  revalidatePath("/r/[room]", "page");
}
