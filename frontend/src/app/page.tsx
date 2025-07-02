import Link from "next/link";

import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import { searchCars } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; year?: string };
}) {
  const cars = await searchCars(searchParams?.q, searchParams?.year);
  const user = await getCurrentUser();

  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          {cars?.length ? "Available Cars" : "Search Cars"}
        </h1>
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Car
          </Link>
        )}
      </div>

      <FilterBar
        initialSearch={searchParams?.q || ""}
        initialYear={searchParams?.year || ""}
      />

      {!cars || cars?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold mb-2">No Cars Found</h2>
          <p className="text-sm max-w-md">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We couldn't find any cars matching your criteria. Try adjusting your
            filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
