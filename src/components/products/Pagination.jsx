"use client";

export default function Pagination({
  totalPages,
  currentPage,
  goToPage,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
}) {
  const safeTotalPages = totalPages || 0;
  const safeCurrentPage = currentPage || 1;

  // always show at least this many page slots, even with 0-1 real pages
  const minVisiblePages = 5;
  const displayTotalPages = Math.max(safeTotalPages, minVisiblePages);

  const safeGo = (page) => {
    if (page < 1 || page > safeTotalPages) return; // only real pages are navigable
    goToPage(page);
  };

  const pages = [];
  const siblingCount = 2;

  for (let i = 1; i <= displayTotalPages; i++) {
    if (
      i === 1 ||
      i === displayTotalPages ||
      Math.abs(i - safeCurrentPage) <= siblingCount
    ) {
      pages.push(i);
    } else if (
      i === safeCurrentPage - (siblingCount + 1) ||
      i === safeCurrentPage + (siblingCount + 1)
    ) {
      pages.push("dots-" + i);
    }
  }

  return (
    <div className="mt-14 mb-12 flex flex-col items-center gap-4">

      {/* PAGINATION BUTTONS */}
      <div className="flex items-center gap-2 flex-wrap justify-center">

        {/* PREVIOUS */}
        <button
          onClick={() => safeGo(safeCurrentPage - 1)}
          disabled={safeCurrentPage <= 1}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow
            ${
              safeCurrentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[var(--color-primary)] text-white hover:opacity-90"
            }`}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((p, idx) => {
          if (typeof p !== "number") {
            return (
              <span key={p + idx} className="px-1 text-gray-400 select-none">
                …
              </span>
            );
          }

          const isDisabled = p > safeTotalPages;
          const isActive = p === safeCurrentPage && !isDisabled;

          return (
            <button
              key={p}
              onClick={() => safeGo(p)}
              disabled={isDisabled}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition shadow
                ${
                  isDisabled
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
                    : isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border border-[var(--color-primary)]/20 text-gray-700 hover:bg-[var(--color-primary)]/10"
                }`}
            >
              {p}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          onClick={() => safeGo(safeCurrentPage + 1)}
          disabled={safeCurrentPage >= safeTotalPages}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow
            ${
              safeCurrentPage >= safeTotalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[var(--color-primary)] text-white hover:opacity-90"
            }`}
        >
          Next
        </button>
      </div>

      {/* INFO TEXT */}
      <div className="text-xs sm:text-sm text-gray-600 text-center">
        Page <span className="font-semibold">{safeCurrentPage}</span> of{" "}
        <span className="font-semibold">{safeTotalPages || 1}</span>
        {totalItems > 0 && (
          <>
            {" "}• Showing{" "}
            <span className="font-semibold">
              {startIndex + 1}-{Math.min(endIndex, totalItems)}
            </span>{" "}
            of <span className="font-semibold">{totalItems}</span>
          </>
        )}
      </div>
    </div>
  );
}