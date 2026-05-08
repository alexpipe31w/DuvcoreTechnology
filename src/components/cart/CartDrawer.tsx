"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, totalValue, itemCount } = useCartStore();
  const { sessionId } = useCart();

  const handleCheckout = () => {
    if (!sessionId) return;
    const slug = process.env.NEXT_PUBLIC_STOCKUP_TENANT_SLUG ?? "";
    const storeUrl = process.env.NEXT_PUBLIC_STOCKUP_STORE_URL ?? "https://stock-up-ashy.vercel.app";
    const url = `${storeUrl}/checkout/${slug}?cartSessionId=${encodeURIComponent(sessionId)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">
                  Carrito
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground font-normal">
                      ({itemCount} {itemCount === 1 ? "producto" : "productos"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                  <div>
                    <p className="text-foreground font-medium">
                      Tu carrito está vacío
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Agrega productos para continuar
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(totalValue)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors glow-cyan-sm"
                >
                  Finalizar compra
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Serás redirigido a StockUp para completar el pago
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
