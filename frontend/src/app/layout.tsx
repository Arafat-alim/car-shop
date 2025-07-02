import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Car Listing App",
  description: "Browse and manage used cars with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
