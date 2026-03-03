export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="h-12 w-72 max-w-full mx-auto rounded skeleton" />
          <div className="h-4 w-96 max-w-full mx-auto mt-5 rounded skeleton" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[3/4] skeleton" />
              <div className="p-4">
                <div className="h-4 w-3/4 rounded skeleton" />
                <div className="h-4 w-1/2 rounded skeleton mt-3" />
                <div className="h-9 w-full rounded skeleton mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
