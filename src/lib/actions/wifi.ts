"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { WIFI_DOC_ID } from "@/lib/sanity/types";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

export async function updateWifi(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const ssid = String(formData.get("ssid") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!ssid || !password) {
    return { success: false, error: "SSID aur password dono bharo." };
  }

  // createOrReplace on a fixed id keeps this a singleton document —
  // there is only ever one WiFi record for a single-hotel build.
  await sanityClient.createOrReplace({
    _id: WIFI_DOC_ID,
    _type: "wifi",
    ssid,
    password,
  });

  await invalidateCache(CACHE_KEYS.wifi);
  revalidatePath("/admin/wifi");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}
