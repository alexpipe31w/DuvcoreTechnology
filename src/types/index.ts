// Stockup API types

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
  attributes?: Record<string, string>;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: string[] | null;
  variants: ProductVariant[] | null;
  categoryId?: string;
  category?: Category;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hasVariants: boolean;
  tags?: string[];
  slug?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  parentId?: string;
  children?: Category[];
}

export interface CartItem {
  id: string;         // cartItemId from Stockup
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product?: Pick<Product, "id" | "name" | "images">;
  variant?: Pick<ProductVariant, "id" | "name">;
}

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
  totalValue: number;
  itemCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface StockupError {
  success: false;
  error: string;
  code: string;
}

export interface AddToCartPayload {
  sessionId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price?: number;
}

export interface UpdateCartPayload {
  cartId: string;
  itemId: string;
  quantity: number;
}

export interface CouponValidationResult {
  valid: boolean;
  discountType?: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue?: number;
  discountAmount?: number;
  totalAfterDiscount?: number;
  reason?: string;
}

export interface ServiceRequest {
  serviceTypeId: string;
  variantId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  description: string;
  quantity?: number;
}

// Simulator types
export type ComponentCategory =
  | "case"
  | "cpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "gpu"
  | "psu"
  | "cooler"
  | "monitor"
  | "keyboard"
  | "mouse";

export interface ComponentCategoryConfig {
  key: ComponentCategory;
  label: string;
  icon: string;
  required: boolean;
  order: number;
}

export const COMPONENT_CATEGORIES: ComponentCategoryConfig[] = [
  { key: "case", label: "Case / Gabinete", icon: "box", required: true, order: 1 },
  { key: "cpu", label: "Procesador (CPU)", icon: "cpu", required: true, order: 2 },
  { key: "motherboard", label: "Tarjeta Madre", icon: "circuit-board", required: true, order: 3 },
  { key: "ram", label: "Memoria RAM", icon: "memory-stick", required: true, order: 4 },
  { key: "storage", label: "Almacenamiento", icon: "hard-drive", required: true, order: 5 },
  { key: "gpu", label: "Tarjeta de Video (GPU)", icon: "monitor", required: false, order: 6 },
  { key: "psu", label: "Fuente de Poder (PSU)", icon: "zap", required: true, order: 7 },
  { key: "cooler", label: "Refrigeración", icon: "wind", required: false, order: 8 },
  { key: "monitor", label: "Monitor", icon: "monitor", required: false, order: 9 },
  { key: "keyboard", label: "Teclado", icon: "keyboard", required: false, order: 10 },
  { key: "mouse", label: "Mouse", icon: "mouse", required: false, order: 11 },
];
