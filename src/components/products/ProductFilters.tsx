"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCat = searchParams.get("cat") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const setCategory = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      if (slug) {
        params.set("cat", slug);
      } else {
        params.delete("cat");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasFilters = currentCat || currentSearch;

  const activeLabel = PRODUCT_CATEGORIES.find((c) => c.slug === currentCat)?.label;

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
          <button
            onClick={() => setCategory("")}
            className={cn(
              "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
              !currentCat && !currentSearch
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
            )}
          >
            Todos
          </button>
          {PRODUCT_CATEGORIES.map(({ slug, label }) => (
            <button
              key={slug}
              onClick={() => setCategory(slug)}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                currentCat === slug
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Filtros activos
          </p>
          <div className="flex flex-wrap gap-2">
            {currentSearch && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                &ldquo;{currentSearch}&rdquo;
                <button
                  onClick={() => {
                    const p = new URLSearchParams(searchParams.toString());
                    p.delete("search");
                    router.push(`${pathname}?${p.toString()}`, { scroll: false });
                  }}
                  aria-label="Quitar filtro"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentCat && activeLabel && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {activeLabel}
                <button onClick={() => setCategory("")} aria-label="Quitar filtro">
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
