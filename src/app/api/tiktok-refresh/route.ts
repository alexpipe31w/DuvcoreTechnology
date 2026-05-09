import { NextResponse } from "next/server";

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const APIFY_ACTOR_ID = "GdWCkxBtKWOsKjdch";
const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export async function GET() {
  try {
    if (!APIFY_API_TOKEN || !EDGE_CONFIG_ID || !VERCEL_TOKEN) {
      throw new Error("Missing env vars: APIFY_API_TOKEN, EDGE_CONFIG_ID or VERCEL_TOKEN");
    }

    const apifyRes = await fetch(
      `https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profiles: ["@blackcore.07"],
          resultsPerPage: 10,
          shouldDownloadVideos: false,
          shouldDownloadCovers: false,
        }),
      }
    );

    if (!apifyRes.ok) throw new Error(`Apify error ${apifyRes.status}`);

    const results: Record<string, unknown>[] = await apifyRes.json();

    // Fetch oEmbed thumbnails in parallel — shorter URLs that don't expire as fast
    const videos = await Promise.all(
      results.slice(0, 10).map(async (item) => {
        const videoUrl = String(item.webVideoUrl ?? "");
        const id = String(item.id ?? "");

        let thumbnail = "";
        try {
          const oe = await fetch(
            `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`
          );
          if (oe.ok) {
            const data = await oe.json();
            thumbnail = data.thumbnail_url ?? "";
          }
        } catch {
          // thumbnail stays empty — fallback shown in UI
        }

        return {
          id,
          url: videoUrl,
          // trim title to keep payload small
          title: String(item.text ?? "Video").slice(0, 120),
          thumb: thumbnail,
          likes: Number(item.diggCount ?? 0),
          views: Number(item.playCount ?? 0),
          comments: Number(item.commentCount ?? 0),
          date: String(item.createTimeISO ?? ""),
        };
      })
    );

    const payload = { videos, at: new Date().toISOString() };

    const edgeRes = await fetch(
      `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ operation: "upsert", key: "tiktok-videos", value: payload }],
        }),
      }
    );

    if (!edgeRes.ok) {
      const msg = await edgeRes.text();
      throw new Error(`Edge Config error ${edgeRes.status}: ${msg}`);
    }

    return NextResponse.json({ success: true, total: videos.length, at: payload.at });
  } catch (error) {
    console.error("[tiktok-refresh]", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
