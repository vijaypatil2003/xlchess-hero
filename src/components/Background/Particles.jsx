import { motion } from "framer-motion";

const particles = [
  { x: "8%", y: "15%", size: 5, delay: 0 },
  { x: "22%", y: "72%", size: 4, delay: 1 },
  { x: "35%", y: "30%", size: 6, delay: 2 },
  { x: "52%", y: "82%", size: 4, delay: 0.5 },
  { x: "64%", y: "18%", size: 5, delay: 1.5 },
  { x: "76%", y: "58%", size: 7, delay: 2.5 },
  { x: "88%", y: "38%", size: 5, delay: 1 },
  { x: "92%", y: "74%", size: 6, delay: 2 },
];

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle,#ffffff,#b794f6 60%,transparent)",
            boxShadow: "0 0 12px rgba(183,148,246,.8)",
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 6, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}