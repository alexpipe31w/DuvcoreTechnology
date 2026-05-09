export default function SimuladorLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="h-6 w-32 bg-muted rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-80 bg-muted rounded mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="h-96 bg-muted rounded-xl animate-pulse" />
          <div className="h-32 bg-muted rounded-xl animate-pulse" />
        </div>
        <div className="lg:col-span-2 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
