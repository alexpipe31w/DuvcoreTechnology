import type {
  Product,
  Cart,
  PaginatedResponse,
  AddToCartPayload,
  UpdateCartPayload,
  CouponValidationResult,
  ServiceRequest,
  StockupError,
} from "@/types";

const BASE_URL = process.env.STOCKUP_API_URL!;
const API_KEY = process.env.STOCKUP_API_KEY!;

class StockupApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "StockupApiError";
  }
}

async function fetchStockup<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({
      error: "Unknown error",
      code: "UNKNOWN",
    }))) as StockupError;
    throw new StockupApiError(
      errorBody.code ?? "UNKNOWN",
      errorBody.error ?? "Request failed",
      res.status
    );
  }

  const json = await res.json();
  return json.data ?? json;
}

// --- Products ---

export interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  isActive?: boolean;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.search) query.set("search", params.search);
  if (params.isActive !== undefined)
    query.set("isActive", String(params.isActive));

  const qs = query.toString();
  return fetchStockup<PaginatedResponse<Product>>(
    `/products${qs ? `?${qs}` : ""}`
  );
}

export async function getProductById(id: string): Promise<Product> {
  return fetchStockup<Product>(`/products/${id}`);
}

// --- Cart ---

export async function getOrCreateCart(sessionId: string): Promise<Cart> {
  return fetchStockup<Cart>(`/cart?sessionId=${encodeURIComponent(sessionId)}`);
}

export async function addToCart(payload: AddToCartPayload): Promise<Cart> {
  // Always verify price before sending to prevent price manipulation
  const product = await getProductById(payload.productId);

  let verifiedPrice: number;
  if (payload.variantId && product.hasVariants) {
    const variant = product.variants.find((v) => v.id === payload.variantId);
    if (!variant) {
      throw new StockupApiError("VARIANT_NOT_FOUND", "Variant not found", 422);
    }
    if (variant.stock < payload.quantity) {
      throw new StockupApiError(
        "INSUFFICIENT_STOCK",
        "Stock insuficiente para esta cantidad",
        422
      );
    }
    verifiedPrice = variant.price;
  } else {
    if (product.stock < payload.quantity) {
      throw new StockupApiError(
        "INSUFFICIENT_STOCK",
        "Stock insuficiente para esta cantidad",
        422
      );
    }
    verifiedPrice = product.price;
  }

  return fetchStockup<Cart>("/cart", {
    method: "POST",
    body: JSON.stringify({ ...payload, price: verifiedPrice }),
  });
}

export async function updateCartItem(payload: UpdateCartPayload): Promise<Cart> {
  return fetchStockup<Cart>("/cart", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function removeCartItem(cartItemId: string): Promise<Cart> {
  return updateCartItem({ cartItemId, quantity: 0 });
}

// --- Coupons ---

export async function validateCoupon(
  code: string,
  subtotal: number,
  productIds?: string[]
): Promise<CouponValidationResult> {
  const body: Record<string, unknown> = { code, subtotal };
  if (productIds?.length) body.productIds = productIds;

  return fetchStockup<CouponValidationResult>("/products/coupons/validate", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// --- Service requests ---

export async function createServiceRequest(
  payload: ServiceRequest
): Promise<{ orderNumber: string; trackingToken: string; status: string }> {
  return fetchStockup("/service-request", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Checkout URL ---

export function getCheckoutUrl(sessionId: string): string {
  const tenantSlug = process.env.STOCKUP_TENANT_SLUG!;
  const baseUrl = process.env.STOCKUP_STORE_URL ?? BASE_URL.replace("/api/public/v1", "");
  return `${baseUrl}/checkout/${tenantSlug}?cartSessionId=${encodeURIComponent(sessionId)}`;
}
