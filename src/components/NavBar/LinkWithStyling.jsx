"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LinkWithStyling({ href, children, icon: Icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2 px-5 py-3 mb-2 rounded-xl transition-all duration-300 ease-out ${
        isActive
          ? "bg-[#102255] shadow-lg scale-[1.02] before:content-[''] before:w-1 before:h-[80%] before:bg-[#FFD700] before:absolute before:left-0 before:top-[10%] before:rounded-r-md before:animate-slide-in"
          : "bg-[#232D4C] hover:bg-[#1B2A4E] hover:scale-[1.02] hover:shadow-md"
      }`}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-[#FFD700] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-[0.05]" />

      {/* Icon container with animations */}
      <div className="relative flex w-9 justify-center">
        <Icon
          className={`h-6 w-6 transition-all duration-300 ${
            isActive
              ? "text-[#FFD700] scale-110 animate-rotate-hover"
              : "text-[#FFD700] group-hover:scale-110 group-hover:animate-rotate-hover"
          }`}
        />
      </div>

      {/* Animated text */}
      <span
        className={`text-white text-[15px] font-medium tracking-wide transition-all duration-300 ${
          isActive ? "translate-x-1" : "group-hover:translate-x-1"
        }`}
      >
        {children}
      </span>

      {/* Gold Pulse Indicator for Active Link */}
      {isActive && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#FFD700] animate-pulse" />
      )}
    </Link>
  );
}

export default LinkWithStyling;
