"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterBarProps {
  initialSearch?: string;
  initialYear?: string;
}

const FilterBar = ({
  initialSearch = "",
  initialYear = "",
}: FilterBarProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [year, setYear] = useState(initialYear);
  const router = useRouter();

  // Sync state with URL params on mount
  useEffect(() => {
    setSearch(initialSearch);
    setYear(initialYear);
  }, [initialSearch, initialYear]);

  const handleFilter = useCallback(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }

    if (year.trim()) {
      params.set("year", year.trim());
    } else {
      params.delete("year");
    }

    router.push(`/?${params.toString()}`);
  }, [search, year, router]);

  // Optional: Add debounce for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilter();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, year, handleFilter]);

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 animate-slide-up">
      <input
        type="text"
        placeholder="Search by make, model or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 flex-1"
      />
      <input
        type="number"
        placeholder="Filter by year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 w-32"
        min="1900"
        max={new Date().getFullYear() + 1}
      />
    </div>
  );
};

export default FilterBar;
