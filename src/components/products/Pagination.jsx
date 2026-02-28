"use client";

export default function Pagination({
  totalPages,
  currentPage,
  goToPage,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
}) {
  if (totalPages <= 1) return null;

  const safeGo = (page) => {
    if (page < 1 || page > totalPages) return;
    goToPage(page);
  };

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(i - currentPage) <= 1
    ) {
      pages.push(i);
    } else if (
      i === currentPage - 2 ||
      i === currentPage + 2
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
          onClick={() => safeGo(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <button
              key={p}
              onClick={() => safeGo(p)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition shadow
                ${
                  p === currentPage
                    ? "bg-red-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-red-50"
                }`}
            >
              {p}
            </button>
          ) : (
            <span
              key={p + idx}
              className="px-1 text-gray-400 select-none"
            >
              …
            </span>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() => safeGo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition shadow
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          Next
        </button>
      </div>

      {/* INFO TEXT */}
      <div className="text-xs sm:text-sm text-gray-600 text-center">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
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
