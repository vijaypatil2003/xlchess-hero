import { useEffect, useRef } from "react";

const PIECES = ["♜", "♞", "♝", "♛", "♚", "♟", "♜", "♞"];

export default function BackgroundWatermarks() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pieces = container.querySelectorAll(".chess-piece");

    pieces.forEach((piece) => {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let vx = (Math.random() - 0.5) * 0.8;
      let vy = (Math.random() - 0.5) * 0.8;

      piece.style.left = x + "px";
      piece.style.top = y + "px";

      const animate = () => {
        x += vx;
        y += vy;

        if (x < -100) x = window.innerWidth + 100;
        if (x > window.innerWidth + 100) x = -100;
        if (y < -100) y = window.innerHeight + 100;
        if (y > window.innerHeight + 100) y = -100;

        piece.style.left = x + "px";
        piece.style.top = y + "px";

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {PIECES.map((symbol, i) => (
        <div
          key={i}
          className="chess-piece absolute"
          style={{
            fontSize: `${70 + Math.random() * 60}px`,
            opacity: 0.06,
            color: "#4a5fc4",
            filter: "drop-shadow(0 0 12px rgba(99,102,241,0.8))",
            lineHeight: 1,
            position: "absolute",
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
  );
}
