import axios from "axios";

import { Car, User } from "@/types";
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

export const searchCars = async (
  query?: string,
  year?: string
): Promise<Car[]> => {
  const params = new URLSearchParams();
  if (query) params.append("q", query);
  if (year) params.append("year", year);

  const response = await api.get("/cars/search", { params });
  return response?.data?.data;
};

export const getCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await api.get(`/car/${id}`);
    return response?.data?.data || null;
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    return null;
  }
};

export const createCar = async (data: Omit<Car, "_id">): Promise<Car> => {
  const response = await api.post("/car", data);
  return response?.data?.data;
};

export const updateCar = async (
  id: string,
  data: Partial<Car>
): Promise<Car> => {
  const response = await api.put(`/car/${id}`, data);
  return response?.data?.data;
};

export const deleteCar = async (id: string): Promise<void> => {
  await api.delete(`/car/${id}`);
};

//! users
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.data;
};
