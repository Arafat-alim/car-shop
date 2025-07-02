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
  const [isAdding, setIsAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete car");
    }
  };

  const handleSuccess = (newCar: Car) => {
    if (editingCar) {
      setCars(cars.map((c) => (c._id === newCar._id ? newCar : c)));
    } else {
      setCars([newCar, ...cars]);
    }
    setEditingCar(null);
    setIsAdding(false);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Cars</h2>
        {!editingCar && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Car
          </button>
        )}
      </div>

      {(editingCar || isAdding) && (
        <div className="mb-6 border p-4 rounded-md">
          <AdminForm car={editingCar || undefined} onSuccess={handleSuccess} />
          <button
            onClick={() => {
              setEditingCar(null);
              setIsAdding(false);
            }}
            className="mt-4 text-sm text-gray-600 underline"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-primary mb-1">
              {car.make} {car.model} ({car.year})
            </h3>
            <p className="text-secondary mb-2">₹{car.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              {car.description}
            </p>
            {car.image && (
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingCar(car)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(car)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Delete {deleteTarget.make} {deleteTarget.model}?
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarList;
