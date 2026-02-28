"use client";

export default function ProductFilters({ filters, setFilters, onClose }) {
  const clearFilters = () => {
    setFilters({
      gender: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });
  };

  return (
    <div className="space-y-8 text-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium underline"
          >
            Clear
          </button>

          {/* ✅ MOBILE CLOSE BUTTON */}
          {onClose && (
            <button
              onClick={onClose}
              className="text-xl font-bold text-gray-500 hover:text-gray-800"
              aria-label="Close filters"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* GENDER */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-gray-600 mb-3">
          Gender
        </h3>
        <div className="space-y-2">
          {["", "male", "female", "unisex"].map((g) => (
            <label key={g} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={filters.gender === g}
                onChange={() => setFilters((p) => ({ ...p, gender: g }))}
                className="w-4 h-4 accent-red-600"
              />
              <span>{g === "" ? "All" : g[0].toUpperCase() + g.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-gray-600 mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {[
            "",
            "Eau de Parfum",
            "Eau de Toilette",
            "Cologne",
            "Body Mist",
            "Attar",
          ].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={filters.category === cat}
                onChange={() => setFilters((p) => ({ ...p, category: cat }))}
                className="w-4 h-4 accent-red-600"
              />
              <span>{cat === "" ? "All" : cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-gray-600 mb-3">
          Price Range (৳)
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                minPrice: e.target.value.replace(/\D/g, ""),
              }))
            }
            className="w-full border rounded-xl px-3 py-2"
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                maxPrice: e.target.value.replace(/\D/g, ""),
              }))
            }
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
      </div>

      {/* SORT */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-gray-600 mb-3">
          Sort By
        </h3>
        <div className="space-y-2">
          {[
            { value: "", label: "Featured" },
            { value: "price-asc", label: "Price: Low → High" },
            { value: "price-desc", label: "Price: High → Low" },
            { value: "discount-desc", label: "Best Discount" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                checked={filters.sort === opt.value}
                onChange={() => setFilters((p) => ({ ...p, sort: opt.value }))}
                className="w-4 h-4 accent-red-600"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
