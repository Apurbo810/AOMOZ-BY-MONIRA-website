export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <div className="w-full h-[420px] md:h-[520px] rounded-3xl skeleton" />
            <div className="flex gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-2xl skeleton" />
              ))}
            </div>
          </div>

          <div>
            <div className="h-14 w-3/4 rounded skeleton" />
            <div className="h-10 w-1/3 rounded skeleton mt-8" />
            <div className="h-4 w-full rounded skeleton mt-8" />
            <div className="h-4 w-11/12 rounded skeleton mt-3" />
            <div className="h-4 w-5/6 rounded skeleton mt-3" />
            <div className="h-14 w-full rounded-3xl skeleton mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
