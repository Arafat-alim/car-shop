import { useState } from "react";

import { createCar, updateCar } from "@/lib/api";
import { Car } from "@/types";

type AdminFormProps = {
  car: Car;
  onSuccess: (car: Car) => void;
};

const AdminForm = ({ car, onSuccess }: AdminFormProps) => {
  const [formData, setFormData] = useState({
    make: car?.make || "",
    model: car?.model || "",
    year: car?.year?.toString() || "",
    price: car?.price?.toString() || "",
    image: car?.image || "",
    description: car?.description || "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("make", formData.make);
      data.append("model", formData.model);
      data.append("year", formData.year);
      data.append("price", formData.price);
      data.append("image", formData.image);
      data.append("description", formData.description);

      let updatedCar;

      if (car) {
        updatedCar = await updateCar(car._id, data);
      } else {
        updatedCar = await createCar(data);
      }
      onSuccess(updatedCar);
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
    <div className="mb-6 animate-slide-up">
      <h2 className="text-2xl font-bold text-primary mb-4">
        {car ? "Edit Car" : "Add New Car"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="">Make</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Model</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Year</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Price</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Image Link</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>
        <button
          type="submit"
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors animate-bounce"
        >
          {car ? "Update Car" : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
