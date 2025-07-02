"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCurrentUser, logout } from "@/lib/auth";
import { adminDashboard, homePath } from "@/path";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={homePath()} className="text-xl font-bold">
          🚘 Car Shop
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={homePath()} className="hover:text-primary-light">
            Home
          </Link>
          {user?.role === "admin" && (
            <Link href={adminDashboard()} className="hover:text-primary-light">
              Admin Dashboard
            </Link>
          )}
          {!user ? (
            <Link href="/login" className="hover:text-primary-light">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:text-primary-light">
              Logout
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
