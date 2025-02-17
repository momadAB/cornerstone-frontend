"use client";
import { useEffect, useState } from "react";
import { useSearch } from "@/components/SearchBar/SearchContext";
import LinkWithStyling from "./LinkWithStyling";
import {
  History,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  LogOut,
} from "lucide-react";
import AnimatedBackgroundSlide from "./AnimatedBackgroundSlide";
import { deleteToken } from "@/lib/token";
import { useRouter } from "next/navigation";

const navigation = [
  // { href: "/requests", title: "Requests", icon: ScrollText, type: "requests" },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    type: "dashboard",
  },
  { href: "/history", title: "History", icon: History, type: "history" },
  { href: "/chat", title: "Chat", icon: MessageSquare, type: "chat" },
];

function SideBar() {
  const { setSearchType } = useSearch();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const currentPath = window.location.pathname;
    const matchedRoute = navigation.find((route) => route.href === currentPath);
    if (matchedRoute) {
      setSearchType(matchedRoute.type);
    }
  }, [setSearchType]);

  const handleLogout = async () => {
    await deleteToken();
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col shadow-xl overflow-hidden fixed z-20 border-r border-gray-300">
      {/* Background Animation */}
      <AnimatedBackgroundSlide />
      {/* Sidebar Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative px-6 py-6 flex flex-col items-start">
          {/* Logo Text */}
          <h1 className="text-4xl font-extrabold tracking-wider flex items-center space-x-1 text-center self-center font-maven">
            <span
              className={`text-sidebar-text ${
                mounted ? "animate-fade-in" : "opacity-0"
              } transition-opacity duration-500 delay-100 drop-shadow-md`}
            >
              $h
            </span>
            <span
              className={`text-sidebar-accent ml-0 ${
                mounted ? "" : "opacity-0"
              } transition-opacity duration-500 delay-200 drop-shadow-lg`}
              style={{ marginLeft: 0 }}
            >
              loan
            </span>
            <span
              className={`text-sidebar-text ${
                mounted ? "animate-fade-in" : "opacity-0"
              } transition-opacity duration-500 delay-300 drop-shadow-md`}
              style={{ marginLeft: 0 }}
            >
              ik
            </span>
          </h1>
        </div>
        {/* Navigation Links */}
        <nav className="flex-1 mt-4 px-4 flex flex-col justify-between">
          <ul className="relative">
            {navigation.map((item, index) => (
              <li
                key={item.href}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`${
                  mounted ? "animate-fade-in-right" : "opacity-0 translate-x-4"
                } transition-all duration-500`}
              >
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

          {/* Logout Button */}
          <div
            className={`mb-8 ${
              mounted ? "animate-fade-in-right" : "opacity-0 translate-x-4"
            } transition-all duration-500`}
            style={{ animationDelay: `${navigation.length * 100}ms` }}
          >
            <button
              onClick={handleLogout}
              className="w-full group relative flex items-center gap-x-3 px-4 py-2 text-base font-semibold leading-7 text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-accent transition-all duration-200 rounded-lg"
            >
              <LogOut className="h-5 w-5 shrink-0 text-sidebar-text group-hover:text-sidebar-accent transition-colors duration-200" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
