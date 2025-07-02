import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import { searchCars } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; year?: string };
}) {
  const cars = await searchCars(searchParams?.q, searchParams?.year);

  return (
    <div className="animate-slide-up">
      <h1 className="text-3xl font-bold text-primary mb-6">
        {cars?.length ? "Available Cars" : "Search Cars"}
      </h1>

      <FilterBar
        initialSearch={searchParams?.q || ""}
        initialYear={searchParams?.year || ""}
      />

      {!cars || cars?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold mb-2">No Cars Found</h2>
          <p className="text-sm max-w-md">
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
