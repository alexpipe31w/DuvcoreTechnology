"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor, MousePointer2, Headphones, CircuitBoard,
  HardDrive, Printer, Laptop, Wifi, LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

const ICON_MAP: Record<string, React.ElementType> = {
  monitores:      Monitor,
  mouse:          MousePointer2,
  diademas:       Headphones,
  motherboards:   CircuitBoard,
  almacenamiento: HardDrive,
  impresoras:     Printer,
  hp:             Laptop,
  asus:           Laptop,
  tplink:         Wifi,
};

export function CategoryTabs() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeSearch = PRODUCT_CATEGORIES.find((c) => c.slug === activeSlug)?.search;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Explorar por categoría
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {/* "Todos" tab */}
          <button
            onClick={() => setActiveSlug(null)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
              activeSlug === null
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-surface"
            )}
          >
            {activeSlug === null && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 bg-primary rounded-lg"
              />
            )}
            <LayoutGrid className="relative w-4 h-4" />
            <span className="relative">Todos</span>
          </button>

          {PRODUCT_CATEGORIES.map(({ slug, label }) => {
            const Icon = ICON_MAP[slug] ?? LayoutGrid;
            return (
              <button
                key={slug}
                onClick={() => setActiveSlug(slug)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
                  activeSlug === slug
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                )}
              >
                {activeSlug === slug && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 bg-primary rounded-lg"
                  />
                )}
                <Icon className="relative w-4 h-4" />
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <ProductGrid
          filters={activeSearch ? { search: activeSearch, isActive: true } : { isActive: true }}
        />
      </div>
    </section>
  );
}
