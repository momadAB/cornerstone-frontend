"use client";

import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import SlideBar from "@/components/NavBar/SlideBar";
import Upbar from "@/components/SearchBar/Upbar";
import { SearchProvider } from "@/components/SearchBar/SearchContext"; // ✅ Import SearchProvider
import "./globals.css";
import type React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#0B1638] text-white antialiased">
        <SearchProvider>
          {/* ✅ Wrap only the part that needs SearchProvider */}
          <div className="flex min-h-screen">
            <SlideBar />
            <main className="flex-1 relative">
              <Upbar />
              <div className="absolute inset-0 nav-pattern opacity-[0.02]" />
              <div className="relative">{children}</div>
            </main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
