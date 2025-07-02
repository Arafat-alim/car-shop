"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AdminCarList from "@/components/AdminCarList";
import { getCars } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { Car } from "@/types";

export default function AdminPage() {
  const router = useRouter();
  const [, setUser] = useState<unknown>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser || currentUser.role !== "admin") {
        router.push("/login");
        return;
      }
      setUser(currentUser);

      const fetchedCars = await getCars();
      setCars(fetchedCars);
      setLoading(false);
    };
    init();
  }, [router]);

  if (loading)
    return <p className="text-center mt-10">Loading admin panel...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminCarList cars={cars} setCars={setCars} />
    </div>
  );
}
