import { Metadata } from "next";
import Image from "next/image";

import { getCarById } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const car = await getCarById(params.slug);
  return {
    title: `${car.make} ${car.model} (${car.year}) | CarShop`,
    description: car.description || `Details for ${car.make} ${car.model}`,
    openGraph: {
      images: [car.image],
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = await getCarById(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.make} ${car.model}`,
    image: car.image,
    description: car.description,
    brand: car.make,
    vehicleModel: car.model,
    modelDate: car.year,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "USD",
    },
  };

  // Validate image URL
  const isValidImage =
    car.image && (car.image.startsWith("http") || car.image.startsWith("/"));

  return (
    <div className="container mx-auto p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-video">
          {isValidImage ? (
            <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {car.make} {car.model}{" "}
            <span className="text-gray-500">({car.year})</span>
          </h1>
          <p className="text-2xl my-4">${car.price.toLocaleString()}</p>

          {car.description && (
            <div className="prose dark:prose-invert">
              <p>{car.description}</p>
            </div>
          )}

          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            <p>
              Posted by:{" "}
              {typeof car.createdBy === "object"
                ? car.createdBy.email
                : "Admin"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
