"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, X, Search } from "lucide-react";
import { ProductImage } from "@/components/ui/product-image";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useSimulatorStore } from "@/store/simulator.store";
import { formatPrice, cn } from "@/lib/utils";
import type { ComponentCategory, ComponentCategoryConfig, Product } from "@/types";

// Map each component category to a StockUp search term matching the real catalog
const CATEGORY_FILTERS: Record<ComponentCategory, { categoryId?: string; search?: string }> = {
  motherboard: { search: "B550" },
  storage:     { search: "disco" },
  monitor:     { search: "monitor" },
  mouse:       { search: "logitech m" },
  cpu:         { search: "procesador" },
  ram:         { search: "memoria" },
  gpu:         { search: "tarjeta video" },
  psu:         { search: "fuente poder" },
  cooler:      { search: "cooler" },
  case:        { search: "gabinete" },
  keyboard:    { search: "teclado" },
};

interface ComponentSelectorProps {
  categoryConfig: ComponentCategoryConfig;
}

export function ComponentSelector({ categoryConfig }: ComponentSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");

  const { selectedComponents, addComponent, removeComponent } = useSimulatorStore();
  const selectedProduct = selectedComponents[categoryConfig.key];

  const baseFilter = CATEGORY_FILTERS[categoryConfig.key] ?? {};
  const queryFilter = search
    ? { search, isActive: true, limit: 20 }
    : { ...baseFilter, isActive: true, limit: 20 };

  const { data, isLoading } = useProducts(queryFilter);
  const products = data?.data ?? [];

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsExpanded(!isExpanded); } }}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer",
          isExpanded ? "bg-surface-elevated" : "bg-surface hover:bg-surface-elevated"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
            selectedProduct
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {categoryConfig.order}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{categoryConfig.label}</span>
            {!categoryConfig.required && (
              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                opcional
              </span>
            )}
          </div>
          {selectedProduct ? (
            <p className="text-xs text-primary truncate mt-0.5">
              {selectedProduct.name} — {formatPrice(selectedProduct.price)}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-0.5">Sin seleccionar</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {selectedProduct && (
            <button
              onClick={(e) => { e.stopPropagation(); removeComponent(categoryConfig.key); }}
              className="p-1 rounded hover:bg-border text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Quitar componente"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Products list */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-background border-t border-border p-3 space-y-2 max-h-64 overflow-y-auto">
              {/* Search override */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar otro producto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-surface rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No se encontraron productos
                </p>
              ) : (
                products.map((product: Product) => (
                  <ProductOption
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onSelect={() => {
                      addComponent(categoryConfig.key as ComponentCategory, product);
                      setIsExpanded(false);
                    }}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductOption({
  product,
  isSelected,
  onSelect,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors",
        isSelected
          ? "bg-primary/10 border border-primary/30"
          : "hover:bg-surface border border-transparent"
      )}
    >
      <div className="w-10 h-10 rounded-md bg-surface-elevated flex-shrink-0 overflow-hidden">
        <ProductImage
          src={product.images?.[0]}
          alt={product.name}
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
        <p className="text-xs text-primary font-semibold">{formatPrice(product.price)}</p>
      </div>
      {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
    </button>
  );
}
