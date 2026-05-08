"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();
  const { openCart } = useCartStore();
  const [addedId, setAddedId] = useState<string | null>(null);

  const image = product.images?.[0]?.url;
  const isNew = product.createdAt
    ? Date.now() - new Date(product.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000
    : false;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || product.hasVariants) return;

    try {
      setAddedId(product.id);
      await addToCart(product.id);
      openCart();
    } finally {
      setTimeout(() => setAddedId(null), 1500);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
    >
      <Link href={`/productos/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-surface-elevated overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <Zap className="w-8 h-8 opacity-20" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                NUEVO
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ÚLTIMAS
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                AGOTADO
              </span>
            )}
          </div>

          {/* Add to cart overlay */}
          {!isOutOfStock && !product.hasVariants && (
            <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart && addedId === product.id}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-70"
              >
                <ShoppingCart className="w-4 h-4" />
                {addedId === product.id ? "¡Agregado!" : "Agregar"}
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.hasVariants && (
              <span className="text-xs text-muted-foreground">Ver opciones</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
