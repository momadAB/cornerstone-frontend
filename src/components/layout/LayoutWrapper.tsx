"use client";

// components/layout/LayoutWrapper.tsx
import { usePathname } from "next/navigation";
import { SearchProvider } from "@/components/SearchBar/SearchContext";
import Upbar from "@/components/SearchBar/Upbar";
import SideBar from "@/components/NavBar/SideBar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <div className="absolute inset-0 nav-pattern opacity-[0.02]" />
        <div className="relative">{children}</div>
      </div>
    );
  }

  return (
    <SearchProvider>
      <div className="flex min-h-screen">
        <SideBar />
        <Upbar />
        <main className="pl-64 pt-16">
          <div className="absolute inset-0 nav-pattern opacity-[0.02]" />
          <div className="relative px-1">{children}</div>
        </main>
      </div>
    </SearchProvider>
  );
}
