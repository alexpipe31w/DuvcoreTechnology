import { type NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/stockup/client";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/products/[id]">
) {
  const { id } = await ctx.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  try {
    const product = await getProductById(id);
    return NextResponse.json(product, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    const status = message.includes("no encontrado") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
