"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/components/SearchBar/SearchContext"; // ✅ Import SearchContext
import LinkWithStyling from "./LinkWithStyling";
import {
  History,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
} from "lucide-react";
import AnimatedBackgroundSlide from "./AnimatedBackgroundSlide";

// ✅ Define navigation routes with corresponding search types
const navigation = [
  { href: "/requests", title: "Requests", icon: ScrollText, type: "requests" },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    type: "dashboard",
  },
  { href: "/history", title: "History", icon: History, type: "history" },
  { href: "/chat", title: "Chat", icon: MessageSquare, type: "chat" },
];

function SlideBar() {
  const { setSearchType } = useSearch(); // ✅ Get `setSearchType`
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ✅ Automatically update `searchType` based on current route
    const currentPath = window.location.pathname;
    const matchedRoute = navigation.find((route) => route.href === currentPath);
    if (matchedRoute) {
      setSearchType(matchedRoute.type);
    }
  }, [setSearchType]);

  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col shadow-xl relative overflow-hidden">
      {/* Background Animation */}
      <AnimatedBackgroundSlide />

      {/* Sidebar Content */}
      <div className="relative z-10">
        <div className="relative px-6 py-6 flex flex-col items-start">
          {/* Logo Text */}
          <h1 className="text-4xl font-extrabold tracking-wider flex items-center space-x-1 font-serif">
            <span
              className={`text-sidebar-text ${
                mounted ? "animate-fade-in" : "opacity-0"
              } transition-opacity duration-500 delay-100 drop-shadow-md`}
            >
              Sh
            </span>
            <span
              className={`text-sidebar-accent ${
                mounted ? "animate-pulse-subtle" : "opacity-0"
              } transition-opacity duration-500 delay-200 drop-shadow-lg`}
            >
              Loan
            </span>
            <span
              className={`text-sidebar-text ${
                mounted ? "animate-fade-in" : "opacity-0"
              } transition-opacity duration-500 delay-300 drop-shadow-md`}
            >
              iK
            </span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <ul className="relative space-y-1">
            {navigation.map((item, index) => (
              <li
                key={item.href}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`${
                  mounted ? "animate-fade-in-right" : "opacity-0 translate-x-4"
                } transition-all duration-500`}
              >
                {/* ✅ Clicking a link updates `searchType` */}
                <LinkWithStyling
                  href={item.href}
                  icon={item.icon}
                  onClick={() => setSearchType(item.type)}
                >
                  {item.title}
                </LinkWithStyling>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SlideBar;
