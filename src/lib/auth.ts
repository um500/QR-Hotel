import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "stayqr_admin";
const SESSION_DAYS = 7;

export interface AdminSession {
  email: string;
}

// jose (not jsonwebtoken) on purpose — it runs on Web Crypto, so the exact
// same verify function works here (Node) and in middleware.ts (Edge
// runtime, which has no Node "crypto" module). jsonwebtoken silently fails
// to verify under Edge and would lock every admin out after login.
export async function signAdminToken(payload: AdminSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey);
}

export async function verifyAdminToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

// Called from the login server action once the email/password check passes.
export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

// Every admin-only server action starts with this. Throwing here stops the
// action before it touches Sanity/Mongo, and Next.js surfaces the thrown
// message to the client as the action's error.
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Not signed in.");
  }
  return session;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
