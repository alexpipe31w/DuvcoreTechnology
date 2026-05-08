"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, Laptop, Monitor, Cpu, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";

const CATEGORIES = [
  { key: null, label: "Todos", icon: Monitor },
  { key: "celulares", label: "Celulares", icon: Smartphone },
  { key: "portatiles", label: "Portátiles", icon: Laptop },
  { key: "pc", label: "PC", icon: Monitor },
  { key: "componentes", label: "Componentes", icon: Cpu },
  { key: "descuentos", label: "Descuentos", icon: Tag },
];

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Explorar por categoría
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(key)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0",
                activeCategory === key
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
            >
              {activeCategory === key && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 bg-primary rounded-lg"
                />
              )}
              <Icon className="relative w-4 h-4" />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <ProductGrid
          filters={activeCategory ? { categoryId: activeCategory } : {}}
        />
      </div>
    </section>
  );
}
