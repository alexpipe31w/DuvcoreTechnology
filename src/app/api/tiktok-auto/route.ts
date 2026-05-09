import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET() {
  try {
    const data = await get("tiktok-videos");

    if (!data) {
      return NextResponse.json(
        { success: false, videos: [], error: "No hay videos aún. El cron corre los domingos." },
        { status: 404 }
      );
    }

    const d = data as Record<string, unknown>;
    return NextResponse.json({ success: true, videos: d.videos ?? [], at: d.at });
  } catch (error) {
    console.error("[tiktok-auto]", error);
    return NextResponse.json(
      { success: false, videos: [], error: "Error al obtener videos" },
      { status: 500 }
    );
  }
}
