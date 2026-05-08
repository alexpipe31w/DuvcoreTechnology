"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "", label: "Todos" },
  { id: "celulares", label: "Celulares" },
  { id: "portatiles", label: "Portátiles" },
  { id: "pc", label: "PC" },
  { id: "componentes", label: "Componentes" },
  { id: "descuentos", label: "Descuentos" },
];

const SORT_OPTIONS = [
  { value: "", label: "Más relevantes" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoryId") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasFilters = currentCategory || currentSearch;

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Filtros
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Categoría
        </p>
        <div className="space-y-1">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => updateParam("categoryId", id)}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                currentCategory === id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters display */}
      {hasFilters && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Filtros activos
          </p>
          <div className="flex flex-wrap gap-2">
            {currentSearch && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                "{currentSearch}"
                <button onClick={() => updateParam("search", "")} aria-label="Quitar filtro">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentCategory && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {CATEGORIES.find((c) => c.id === currentCategory)?.label}
                <button onClick={() => updateParam("categoryId", "")} aria-label="Quitar filtro">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
