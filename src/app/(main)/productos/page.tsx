import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { ProductFilters } from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Computadores, portátiles, celulares, componentes y periféricos al mejor precio en Colombia.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {params.search
            ? `Resultados para "${params.search}"`
            : "Todos los productos"}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tecnología original al mejor precio
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <Suspense>
            <ProductFilters />
          </Suspense>
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile filters */}
          <div className="lg:hidden mb-4">
            <Suspense>
              <ProductFilters />
            </Suspense>
          </div>

          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid
              filters={{
                search: params.search,
                categoryId: params.categoryId,
                isActive: true,
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
