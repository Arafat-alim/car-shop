"use client";
import Image from "next/image";
import Link from "next/link";

import { Car } from "@/types";

type CarCardProps = {
  car: Car;
};

const CarCard = ({ car }: CarCardProps) => {
  const isValidImage =
    car.image && (car.image.startsWith("http") || car.image.startsWith("/"));

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group block max-w-xs sm:max-w-sm md:max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden rounded-t-2xl">
        {isValidImage ? (
          <Image
            src={car.image}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
          {car.make} {car.model}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          ₹{car.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default CarCard;
