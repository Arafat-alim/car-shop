"use client";

import { useState } from "react";

import { deleteCar } from "@/lib/api";
import { Car } from "@/types";

import AdminForm from "./AdminForm";

type AdminCarListProps = {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
};

const AdminCarList = ({ cars, setCars }: AdminCarListProps) => {
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete car");
    }
  };
  return (
    <div>
      <h2>Manage Cars</h2>
      {editingCar && (
        <AdminForm
          car={editingCar}
          onSuccess={(updatedCar) => {
            setCars(
              cars.map((car) => (car._id === updatedCar._id ? updatedCar : car))
            );
            setEditingCar(null);
          }}
        />
      )}
      <div className="space-y-4">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-primary">
              {car.make} {car.model} ({car.year})
            </h3>
            <p className="text-secondary">₹{car.price.toLocaleString()}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setEditingCar(car)}
                className="bg-accent text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCarList;
