import CarCard from "@/components/CarCard";
import FilterBar from "@/components/FilterBar";
import { getCars } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; year?: string };
}) {
  const cars = await getCars(searchParams.search, searchParams.year);

  return (
    <div className="animate-slide-up">
      <h1 className="text-3xl font-bold text-black mb=6">Used Cars</h1>
      <FilterBar />
      <div>
        {cars?.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}
