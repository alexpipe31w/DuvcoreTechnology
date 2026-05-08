import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Computadores, portátiles, celulares, componentes y periféricos al mejor precio en Colombia.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    page?: string;
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
            : params.categoryId
            ? "Productos por categoría"
            : "Todos los productos"}
        </h1>
        <p className="text-muted-foreground mt-2">
          Encuentra la tecnología que necesitas al mejor precio
        </p>
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
  );
}
