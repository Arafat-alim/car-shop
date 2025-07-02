import axios from "axios";

import { Car } from "@/types";
import { getbaseUrl } from "@/utils/url";

const API_URL = getbaseUrl();

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        return api(error.config);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
  }
);

export const getCars = async (
  search?: string,
  year?: string
): Promise<Car[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (year) params.append("year", year);
  const response = await api.get("/cars", { params });
  return response?.data?.data;
};

export const getCarById = async (slug: string): Promise<Car> => {
  const cars = await getCars();
  const car = cars.find((c) => c.slug === slug);
  if (!car) throw new Error("Car not found");
  return car;
};

export const createCar = async (data: FormData): Promise<Car> => {
  const response = await api.post("/cars", data);
  return response?.data?.data;
};

export const updateCar = async (id: string, data: FormData): Promise<Car> => {
  const response = await api.put(`/cars/${id}`, data);
  return response?.data?.data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await api.delete(`/cars/${id}`);
};
