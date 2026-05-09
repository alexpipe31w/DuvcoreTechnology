import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { ProductFilters } from "@/components/products/ProductFilters";
import { FeaturedCarousel } from "@/components/products/FeaturedCarousel";
import { getCategoryBySlug } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Computadores, portátiles, celulares, componentes y periféricos al mejor precio en Colombia.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    cat?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  // Resolve category slug → search term for the API
  const catDef = params.cat ? getCategoryBySlug(params.cat) : undefined;
  const resolvedSearch = params.search ?? catDef?.search;
  const pageTitle = params.search
    ? `Resultados para "${params.search}"`
    : catDef
    ? catDef.label
    : "Todos los productos";

  const isFiltered = !!(params.search || params.cat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {!isFiltered && <FeaturedCarousel />}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{pageTitle}</h1>
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
                search: resolvedSearch,
                isActive: true,
              }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
