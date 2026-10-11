"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity/client";
import { invalidateCache, CACHE_KEYS } from "@/lib/redis";
import type { FormState } from "@/lib/form-state";

function parseFoodItemForm(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const priceRaw = String(formData.get("price") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const veg = formData.get("veg") === "on";
  const available = formData.get("available") === "on";
  const price = Number(priceRaw);

  if (!name || !category) {
    return { error: "Item name aur category dono bharo." } as const;
  }
  if (!priceRaw || Number.isNaN(price) || price < 0) {
    return { error: "Sahi price daalo." } as const;
  }

  return {
    data: {
      name,
      category,
      price,
      veg,
      available,
      description: description || undefined,
    },
  } as const;
}

export async function createFoodItem(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = parseFoodItemForm(formData);
  if ("error" in parsed) {
    return { success: false, error: parsed.error };
  }

  await sanityClient.create({ _type: "foodItem", ...parsed.data });

  await invalidateCache(CACHE_KEYS.foodItems);
  revalidatePath("/admin/food-menu");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function updateFoodItem(
  foodItemId: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();

  const parsed = parseFoodItemForm(formData);
  if ("error" in parsed) {
    return { success: false, error: parsed.error };
  }

  await sanityClient.patch(foodItemId).set(parsed.data).commit();

  await invalidateCache(CACHE_KEYS.foodItems);
  revalidatePath("/admin/food-menu");
  revalidatePath("/r/[room]", "page");
  return { success: true };
}

export async function deleteFoodItem(foodItemId: string) {
  await requireAdmin();
  await sanityClient.delete(foodItemId);
  await invalidateCache(CACHE_KEYS.foodItems);
  revalidatePath("/admin/food-menu");
  revalidatePath("/r/[room]", "page");
}
