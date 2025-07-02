"use client";

import { useState } from "react";

import { createCar, updateCar } from "@/lib/api";
import { Car } from "@/types";

type AdminFormProps = {
  car?: Car;
  onSuccess: (car: Car) => void;
};

export default function AdminForm({ car, onSuccess }: AdminFormProps) {
  const [formData, setFormData] = useState({
    make: car?.make || "",
    model: car?.model || "",
    year: car?.year?.toString() || "",
    price: car?.price?.toString() || "",
    image: car?.image || "",
    description: car?.description || "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const carData = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
      };

      let result;
      if (car) {
        result = await updateCar(car._id, carData);
      } else {
        result = await createCar(carData);
      }

      onSuccess(result);

      if (!car) {
        setFormData({
          make: "",
          model: "",
          year: "",
          price: "",
          image: "",
          description: "",
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to save car");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-primary">
        {car ? "Edit Car" : "Add New Car"}
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      {["make", "model", "year", "price", "image"].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {car ? "Update Car" : "Add Car"}
      </button>
    </form>
  );
}
