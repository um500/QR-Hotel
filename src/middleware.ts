import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "stayqr_admin";
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET as string);

// Middleware runs on the Edge runtime, which has no Node "crypto" module —
// jose verifies over Web Crypto instead, so the same secret/algorithm the
// login action signs with (src/lib/auth.ts) actually verifies here. This
// route only gatekeeps page navigation; server actions re-check the
// session themselves via requireAdmin().
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await isValidToken(token))) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

async function isValidToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
