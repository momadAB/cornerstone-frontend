"use client";

import { usePathname } from "next/navigation";
import { SearchProvider } from "@/components/SearchBar/SearchContext";
import Upbar from "@/components/SearchBar/Upbar";
import SideBar from "@/components/NavBar/SideBar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check for auth pages and chat subpages
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isChatSubPage = pathname.startsWith("/chat/") && pathname !== "/chat";

  // Use minimal layout for auth pages and chat subpages
  if (isAuthPage || isChatSubPage) {
    return (
      <div className="min-h-screen">
        <div className="absolute inset-0 nav-pattern opacity-[0.02]" />
        <div className="relative">{children}</div>
      </div>
    );
  }

  // Full layout for all other pages
  return (
    <SearchProvider>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex flex-col flex-1">
          <Upbar />
          <main className="flex-1 pl-64 pt-16">
            <div className="absolute inset-0 nav-pattern opacity-[0.02]" />
            <div className="relative h-full">{children}</div>
          </main>
        </div>
      </div>
    </SearchProvider>
  );
}
