import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Carousel skeleton */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1.5">
            <div className="h-5 w-32 bg-surface-elevated rounded animate-pulse" />
            <div className="h-3 w-48 bg-surface-elevated rounded animate-pulse" />
          </div>
          <div className="flex gap-1.5">
            <div className="w-8 h-8 bg-surface-elevated rounded-lg animate-pulse" />
            <div className="w-8 h-8 bg-surface-elevated rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-52 sm:w-56 flex-shrink-0 aspect-square rounded-xl bg-surface-elevated animate-pulse" />
          ))}
        </div>
      </div>

      <div className="h-8 w-64 bg-surface-elevated rounded animate-pulse mb-2" />
      <div className="h-4 w-40 bg-surface-elevated rounded animate-pulse mb-8" />

      <div className="flex gap-8">
        <div className="hidden lg:block w-52 flex-shrink-0 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-surface-elevated rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="flex-1">
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
}
