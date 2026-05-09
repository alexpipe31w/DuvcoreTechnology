import { type NextRequest, NextResponse } from "next/server";
import {
  getOrCreateCart,
  addToCart,
  updateCartItem,
} from "@/lib/stockup/client";
import { z } from "zod";

const addSchema = z.object({
  sessionId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1).max(99),
});

const updateSchema = z.object({
  cartId: z.string().uuid(),
  cartItemId: z.string().uuid(),
  quantity: z.number().int().min(0).max(99),
});

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId requerido" }, { status: 400 });
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(sessionId)) {
    return NextResponse.json({ error: "sessionId inválido" }, { status: 400 });
  }

  try {
    const cart = await getOrCreateCart(sessionId);
    return NextResponse.json(cart);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    // price verification happens inside addToCart
    const cart = await addToCart(parsed.data);
    return NextResponse.json(cart);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    const status = message.includes("Stock") ? 422 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const cart = await updateCartItem({
      cartId: parsed.data.cartId,
      itemId: parsed.data.cartItemId,
      quantity: parsed.data.quantity,
    });
    return NextResponse.json(cart);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
