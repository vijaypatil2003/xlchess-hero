import { motion } from "framer-motion";

export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Top Glow */}
      <motion.div
        className="absolute left-1/2 top-[-220px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#6F5BFF]/18 blur-[180px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.25, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left Glow */}
      <motion.div
        className="absolute left-[-180px] top-[28%] h-[450px] w-[450px] rounded-full bg-[#7C5CFF]/14 blur-[150px]"
        animate={{
          x: [0, 30, 0],
          opacity: [0.14, 0.22, 0.14],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right Glow */}
      <motion.div
        className="absolute right-[-180px] bottom-[8%] h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/14 blur-[170px]"
        animate={{
          x: [0, -25, 0],
          opacity: [0.12, 0.20, 0.12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small Accent */}
      <motion.div
        className="absolute right-[18%] top-[18%] h-44 w-44 rounded-full bg-[#B794F6]/10 blur-[100px]"
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}