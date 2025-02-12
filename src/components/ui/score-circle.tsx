"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

export function ScoreCircle({
  score,
  size = "md",
  className,
}: ScoreCircleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const animateScore = (timestamp: number) => {
      if (!animationRef.current) {
        animationRef.current = timestamp;
      }

      const progress = timestamp - animationRef.current;
      const duration = 1500; // Animation duration in milliseconds

      if (progress < duration) {
        const newScore = easeOutQuad(progress, 0, score, duration);
        setDisplayScore(newScore);
        requestAnimationFrame(animateScore);
      } else {
        setDisplayScore(score);
      }
    };

    requestAnimationFrame(animateScore);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score]);

  // Easing function for smooth animation
  const easeOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  // Calculate the stroke dash offset based on the score (0-10)
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (displayScore / 10) * circumference;

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg
        className={cn(
          "w-full h-full transition-all duration-1000 ease-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="#FFD700"
          strokeWidth="6"
          strokeOpacity="0.2"
        />
        {/* Animated progress circle */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="#FFD700"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{
            transition: "stroke-dashoffset 0.1s linear",
          }}
        />
      </svg>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-700",
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-2"
        )}
      >
        <span
          className={cn(
            "font-bold text-white",
            size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"
          )}
        >
          {displayScore.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
