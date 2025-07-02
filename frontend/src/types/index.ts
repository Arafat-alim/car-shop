export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description?: string;
  slug: string;
  createdBy: { _id: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;
