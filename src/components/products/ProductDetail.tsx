"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Check, ChevronLeft, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/cart.store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, isAddingToCart } = useCart();
  const { openCart } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const variants = product.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.hasVariants && variants.length > 0
      ? (variants.find((v) => v.isActive && v.stock > 0) ?? null)
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeVariants = variants.filter((v) => v.isActive);
  const currentPrice = selectedVariant?.price ?? product.price;
  const currentStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    if (product.hasVariants && !selectedVariant) return;

    try {
      await addToCart(product.id, quantity, selectedVariant?.id);
      setAdded(true);
      openCart();
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // error handled by mutation
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/productos" className="hover:text-primary transition-colors flex items-center gap-1">
          <ChevronLeft className="w-3.5 h-3.5" />
          Productos
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-surface-elevated border border-border"
          >
            {product.images?.[selectedImage]?.url ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Zap className="w-16 h-16 opacity-20" />
              </div>
            )}
          </motion.div>

          {(product.images?.length ?? 0) > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images!.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === i
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={`Vista ${i + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary mt-3">
              {formatPrice(currentPrice)}
            </p>
            <p className={cn("text-sm mt-1", isOutOfStock ? "text-destructive" : "text-green-400")}>
              {isOutOfStock ? "Agotado" : `${currentStock} en stock`}
            </p>
          </div>

          {/* Variants */}
          {product.hasVariants && activeVariants.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Variante: <span className="text-primary">{selectedVariant?.name ?? "Selecciona"}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {activeVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={cn(
                      "px-3 py-1.5 rounded-lg border text-sm font-medium transition-all",
                      selectedVariant?.id === variant.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-foreground",
                      variant.stock === 0 && "opacity-40 cursor-not-allowed line-through"
                    )}
                  >
                    {variant.name}
                    {variant.stock === 0 && " (Agotado)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Cantidad:</span>
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="py-2 px-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Reducir"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="py-2 px-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Aumentar"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAddingToCart || (product.hasVariants && !selectedVariant)}
            className={cn(
              "w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all text-base",
              isOutOfStock || (product.hasVariants && !selectedVariant)
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : added
                ? "bg-green-600 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan-sm"
            )}
          >
            {added ? (
              <><Check className="w-5 h-5" /> ¡Agregado al carrito!</>
            ) : isOutOfStock ? (
              "Agotado"
            ) : (
              <><ShoppingCart className="w-5 h-5" /> Agregar al carrito</>
            )}
          </button>

          {/* Description */}
          {product.description && (
            <div className="pt-4 border-t border-border">
              <h2 className="text-sm font-semibold text-foreground mb-2">Descripción</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
