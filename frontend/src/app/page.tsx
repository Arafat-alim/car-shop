import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import { getCars } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; year?: string };
}) {
  const cars = await getCars(searchParams.search, searchParams.year);

  if (!cars || cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-xl font-semibold mb-2">No Cars Found</h2>
        <p className="text-sm max-w-md">
          We couldn’t find any cars matching your criteria. Try adjusting your
          filters or check back later.
        </p>
      </div>
    );
  }
  return (
    <div className="animate-slide-up">
      <h1 className="text-3xl font-bold text-primary mb-6">Available Cars</h1>
      <FilterBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}
