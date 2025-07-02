"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCurrentUser, logout } from "@/lib/auth";
import { adminDashboard, homePath } from "@/path";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const router = useRouter();

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
    <nav>
      <div>
        <Link href="/">Car Listing</Link>
        <div>
          <Link href={homePath()}>Home</Link>
          {user?.role === "admin" && (
            <Link href={adminDashboard()}>Admin Dashboard</Link>
          )}
          {!user ? <Link href="/login">Login</Link> : <button>Logout</button>}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
