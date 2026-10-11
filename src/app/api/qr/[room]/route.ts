import { NextResponse, type NextRequest } from "next/server";
import QRCode from "qrcode";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { room: string } }
) {
  try {
    await requireAdmin();
  } catch {
    return new NextResponse("Not signed in.", { status: 401 });
  }

  const roomNo = decodeURIComponent(params.room);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const targetUrl = `${siteUrl}/r/${encodeURIComponent(roomNo)}`;

  const buffer = await QRCode.toBuffer(targetUrl, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 600,
  });

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="room-${roomNo}-qr.png"`,
      "Cache-Control": "no-store",
    },
  });
}
