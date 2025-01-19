"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [shapes, setShapes] = useState<
    Array<{
      top: number;
      left: number;
      size: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newShapes = Array(20)
      .fill(null)
      .map(() => ({
        top: Math.random() * 100,
        left: Math.random() * -20, // Start off-screen
        size: Math.random() * 100 + 50,
        duration: Math.random() * 10 + 10,
      }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),rgba(0,0,0,0.4))]"></div>
      <div className="absolute inset-0">
        {shapes.map((shape, i) => (
          <div
            key={i}
            className="absolute bg-gold-400/20 backdrop-blur-sm animate-move-right-rotate"
            style={{
              top: `${shape.top}%`,
              left: `${shape.left}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              animationDuration: `${shape.duration}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
