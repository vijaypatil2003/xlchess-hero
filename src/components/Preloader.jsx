import React from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  // Generate coordinates for premium mini sparkling stars
  const stars = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: `${20 + Math.random() * 60}%`,
    left: `${20 + Math.random() * 60}%`,
    delay: Math.random() * 1.5,
    scale: 0.4 + Math.random() * 0.6,
  }));

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07050d]">
      {/* Background Ambient Depth */}
      <div className="absolute h-[350px] w-[350px] rounded-full bg-[#7C5CFF]/10 blur-[120px] pointer-events-none" />

      {/* Premium Tiny Sparkling Stars Array */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1.5 h-1.5 bg-[#ebd391] rounded-full"
          style={{
            top: star.top,
            left: star.left,
            filter: "drop-shadow(0 0 6px #d4af37)",
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [star.scale * 0.5, star.scale * 1.3, star.scale * 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Royal Chess Piece Indicator */}
      <div className="relative mb-6">
        <motion.div
          animate={{
            rotateY: 360,
            filter: [
              "drop-shadow(0 4px 10px rgba(212,175,55,0.2))",
              "drop-shadow(0 4px 20px rgba(212,175,55,0.4))",
              "drop-shadow(0 4px 10px rgba(212,175,55,0.2))",
            ],
          }}
          transition={{
            rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-5xl sm:text-6xl text-[#ebd391] select-none font-serif"
        >
          ♔
        </motion.div>
      </div>

      {/* Brand Label with Golden Shimmer Sweep Line */}
      <div className="relative overflow-hidden px-4 py-1">
        <h1 className="text-2xl sm:text-3xl font-light tracking-[0.3em] text-[#ebd391] uppercase font-serif select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          XL Chess
        </h1>

        {/* The Golden Shine Line Asset Layer */}
        <motion.div
          className="absolute top-0 bottom-0 w-12 skew-x-[-25deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(235,211,145,0.6) 50%, rgba(255,255,255,0.1) 80%, transparent)",
          }}
          animate={{
            left: ["-40%", "140%"],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.25, 1, 0.5, 1], // Fluid cinematic ease
            repeatDelay: 0.4,
          }}
        />
      </div>

      {/* Subtitle Accent */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-[9px] tracking-[0.4em] uppercase font-mono text-neutral-400 mt-3 pl-1"
      >
        Initializing Board Room
      </motion.p>
    </div>
  );
}
