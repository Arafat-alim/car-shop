"use client";
import Image from "next/image";
import Link from "next/link";

import { Car } from "@/types";

type CarCardProps = {
  car: Car;
};

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Link href={`/cars/${car.slug}`} className="block animate-slide-up">
      <div>
        <Image
          className="w-full h-48 object-cover rounded-lg mb-4"
          src={car.image}
          alt={`${car.make} ${car.model}`}
        />
        <h2 className="text-xl font-semibold text-primary">
          {car.make} {car.model} ({car.year})
        </h2>
        <p className="text-secondary">₹{car.price.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CarCard;
