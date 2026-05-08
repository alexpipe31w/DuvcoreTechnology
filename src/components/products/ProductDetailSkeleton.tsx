export function ProductDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 animate-pulse">
      <div className="aspect-square rounded-2xl bg-surface-elevated" />
      <div className="space-y-4 pt-2">
        <div className="h-8 bg-surface-elevated rounded w-3/4" />
        <div className="h-6 bg-surface-elevated rounded w-1/4" />
        <div className="space-y-2 pt-4">
          <div className="h-4 bg-surface-elevated rounded w-full" />
          <div className="h-4 bg-surface-elevated rounded w-full" />
          <div className="h-4 bg-surface-elevated rounded w-2/3" />
        </div>
        <div className="h-12 bg-surface-elevated rounded-xl mt-6" />
      </div>
    </div>
  );
}
