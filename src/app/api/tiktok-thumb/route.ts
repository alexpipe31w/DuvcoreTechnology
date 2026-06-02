import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get("url");

  if (!videoUrl) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const oe = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
      { next: { revalidate: 3600 } }
    );

    if (!oe.ok) throw new Error(`oEmbed ${oe.status}`);

    const data = await oe.json();
    const thumbUrl: string = data.thumbnail_url ?? "";

    if (!thumbUrl) return new NextResponse(null, { status: 404 });

    return NextResponse.redirect(thumbUrl, {
      status: 302,
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
