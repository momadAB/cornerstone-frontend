"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Clock,
  History,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
} from "lucide-react";
import SearchBar from "../ChatComponents/ChatSidebar/SearchBar";
import { getUser } from "@/lib/token";

const ICONS = {
  requests: ScrollText,
  dashboard: LayoutDashboard,
  history: History,
  chat: MessageSquare,
  notifications: Bell,
  clock: Clock,
};

const PAGE_DETAILS: Record<
  string,
  { title: string; icon: keyof typeof ICONS }
> = {
  "/dashboard": { title: "Dashboard", icon: "dashboard" },
  "/history": { title: "Recent History", icon: "history" },
  "/requests": { title: "Requests", icon: "requests" },
  "/chat": { title: "Chat", icon: "chat" },
};

export default function Upbar() {
  const [bank, setBank] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    const loadUserBank = async () => {
      const user = await getUser();
      setBank(user?.bank);
      // console.log("user:", user);
    };
    loadUserBank();
  });

  // ✅ Memoize page title and icon lookup
  const { title, icon } = useMemo(
    () => PAGE_DETAILS[pathname] || { title: "Dashboard", icon: "dashboard" },
    [pathname]
  );

  const IconComponent = ICONS[icon]; // Dynamically select the icon

  return (
    <header className="flex justify-between items-center px-6 py-4  bg-[#0B1638] shadow-sm fixed w-screen z-10 pl-72 ">
      {/* 🔹 Page Title with Icon */}
      <h1 className="text-xl font-semibold flex items-center gap-2 text-white">
        <IconComponent className="w-5 h-5 text-white/70" /> {title}
      </h1>

      {/* 🔍 SearchBar & 🔔 Notifications */}
      <div className="flex items-center gap-4">
        {/* <SearchBar /> */}
        <h1 className="text-xl font-semibold flex items-center gap-2 text-white">
          {bank}
        </h1>

        {/* 🔔 Notification Button with Consistent Icon Handling */}
        <button
          className="relative p-2 hover:bg-white/10 rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          aria-label="Notifications"
        >
          <ICONS.notifications className="w-5 h-5 text-white/70" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFD700] rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
