"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterBar = () => {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    // Correctly set or remove 'year'
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }

    // Push updated params to the URL
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-slide-up">
      <input
        type="text"
        placeholder="Search by make or model"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
      />
      <input
        type="number"
        placeholder="Filter by year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
      />
      <button
        onClick={handleFilter}
        className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterBar;
