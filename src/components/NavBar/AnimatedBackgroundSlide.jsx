"use client";

import { useEffect, useState } from "react";

export function AnimatedBackgroundSlide() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const newShapes = Array(30)
      .fill(null)
      .map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 40 + 10,
        opacity: Math.random() * 0.08 + 0.02,
        rotate: Math.random() * 360,
        animationType:
          Math.random() < 0.33
            ? "horizontal-float"
            : Math.random() < 0.66
            ? "vertical-float"
            : "diagonal-float",
        animationDuration: `${Math.random() * 10 + 15}s`,
        animationDelay: `${Math.random() * 5}s`,
      }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,221,68,0.15),rgba(0,0,0,0))]" />
      <div className="absolute inset-0">
        {shapes.map((shape, i) => (
          <div
            key={i}
            className={`absolute animate-${shape.animationType}`}
            style={{
              top: `${shape.top}%`,
              left: `${shape.left}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              opacity: shape.opacity,
              transform: `rotate(${shape.rotate}deg)`,
              animationDuration: shape.animationDuration,
              animationDelay: shape.animationDelay,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              background:
                "linear-gradient(45deg, rgba(255,221,68,0.3), rgba(255,221,68,0.1))",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AnimatedBackgroundSlide;
