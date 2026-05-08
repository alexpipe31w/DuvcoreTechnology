"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Share2, Loader2, CheckCircle } from "lucide-react";
import { useSimulator } from "@/hooks/useSimulator";
import { formatPrice } from "@/lib/utils";
import { COMPONENT_CATEGORIES } from "@/types";

export function BuildSummary() {
  const { selectedComponents, totalPrice, selectedCount, buyAll, clearAll, getShareableUrl, removeComponent } =
    useSimulator();
  const [isBuying, setIsBuying] = useState(false);
  const [bought, setBought] = useState(false);

  const handleBuyAll = async () => {
    setIsBuying(true);
    try {
      await buyAll();
      setBought(true);
      setTimeout(() => setBought(false), 3000);
    } finally {
      setIsBuying(false);
    }
  };

  const handleShare = async () => {
    const url = getShareableUrl();
    await navigator.clipboard.writeText(url).catch(() => {});
    window.location.href = url;
  };

  if (selectedCount === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center mx-auto mb-3">
          <ShoppingCart className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-foreground font-medium">Tu build está vacío</p>
        <p className="text-sm text-muted-foreground mt-1">
          Selecciona componentes para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Resumen del build
          <span className="ml-2 text-sm text-muted-foreground font-normal">
            ({selectedCount} componentes)
          </span>
        </h3>
        <button
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Limpiar
        </button>
      </div>

      <div className="px-5 py-3 space-y-2 max-h-72 overflow-y-auto">
        {COMPONENT_CATEGORIES.filter(
          (cat) => selectedComponents[cat.key]
        ).map((cat) => {
          const product = selectedComponents[cat.key]!;
          const image = product.images?.[0]?.url;
          return (
            <div key={cat.key} className="flex items-center gap-3 py-1">
              <div className="w-8 h-8 rounded-md bg-surface-elevated flex-shrink-0 overflow-hidden">
                {image && (
                  <Image
                    src={image}
                    alt={product.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground">{cat.label}</p>
                <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => removeComponent(cat.key)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Quitar"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total estimado</span>
          <span className="text-xl font-bold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <button
          onClick={handleBuyAll}
          disabled={isBuying || bought}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-70 text-primary-foreground font-semibold py-3 rounded-lg transition-colors glow-cyan-sm"
        >
          {isBuying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Agregando al carrito...
            </>
          ) : bought ? (
            <>
              <CheckCircle className="w-4 h-4" />
              ¡Agregado al carrito!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Comprar todo
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-surface-elevated hover:bg-border text-foreground-muted text-sm py-2 rounded-lg transition-colors border border-border"
        >
          <Share2 className="w-3.5 h-3.5" />
          Compartir build
        </button>
      </div>
    </div>
  );
}
