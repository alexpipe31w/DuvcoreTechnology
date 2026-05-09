export default function NosotrosLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-10 w-56 bg-muted rounded-lg mb-3 animate-pulse" />
      <div className="h-4 w-80 bg-muted rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${85 - i * 8}%` }} />
          ))}
        </div>
        <div className="h-64 bg-muted rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
