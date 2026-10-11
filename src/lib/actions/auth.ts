"use server";

import bcrypt from "bcryptjs";
import { clearAdminCookie, setAdminCookie, signAdminToken } from "@/lib/auth";
import type { FormState } from "@/lib/form-state";

export async function loginAdmin(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const adminHash = process.env.ADMIN_PASSWORD_HASH || "";

  if (!email || !password) {
    return { success: false, error: "Enter both email and password." };
  }
  if (email !== adminEmail) {
    return { success: false, error: "Invalid email or password. Please try again." };
  }

  const ok = await bcrypt.compare(password, adminHash);
  if (!ok) {
    return { success: false, error: "Invalid email or password. Please try again." };
  }

  const token = await signAdminToken({ email });
  setAdminCookie(token);
  return { success: true };
}

export async function logoutAdmin() {
  clearAdminCookie();
}
