"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const { data, isLoading } = useProducts({ limit: 8, isActive: true });
  const products = data?.data ?? [];

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [products]);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-foreground leading-tight">
              Más vendidos
            </h2>
            <p className="text-xs text-muted-foreground">Los favoritos de nuestros clientes</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Siguiente"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-52 sm:w-56 flex-shrink-0">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="w-52 sm:w-56 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
