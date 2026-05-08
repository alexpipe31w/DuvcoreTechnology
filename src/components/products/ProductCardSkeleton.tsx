export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface-elevated" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-surface-elevated rounded w-3/4" />
        <div className="h-3 bg-surface-elevated rounded w-1/2" />
        <div className="h-4 bg-surface-elevated rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}
