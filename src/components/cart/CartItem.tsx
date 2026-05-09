"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem, isUpdating } = useCart();

  const image = item.product?.images?.[0];
  const name = item.product?.name ?? "Producto";
  const variantName = item.variant?.name;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-3 py-3 border-b border-border last:border-0"
    >
      {/* Image */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-surface-elevated overflow-hidden">
        <ProductImage
          src={image}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        {variantName && (
          <p className="text-xs text-muted-foreground">{variantName}</p>
        )}
        <p className="text-sm font-semibold text-primary mt-1">
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => {
              if (item.quantity === 1) removeItem(item.id);
              else updateItem(item.id, item.quantity - 1);
            }}
            disabled={isUpdating}
            className="w-6 h-6 rounded flex items-center justify-center bg-surface-elevated hover:bg-border transition-colors disabled:opacity-50"
            aria-label="Reducir cantidad"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateItem(item.id, item.quantity + 1)}
            disabled={isUpdating}
            className="w-6 h-6 rounded flex items-center justify-center bg-surface-elevated hover:bg-border transition-colors disabled:opacity-50"
            aria-label="Aumentar cantidad"
          >
            <Plus className="w-3 h-3" />
          </button>

          <button
            onClick={() => removeItem(item.id)}
            disabled={isUpdating}
            className="ml-auto text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
            aria-label="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
