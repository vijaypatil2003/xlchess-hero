import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LocalParticleSystem({ particles }) {
  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute z-50"
          initial={{
            x: p.x,
            y: p.y,
            opacity: p.opacity || 1,
            scale: 0.2,
          }}
          // Dynamic fluid deceleration: shoots out fast, cushions to a beautiful float
          animate={{
            x: p.x + p.dx * 0.85,
            y: p.y + p.dy * 0.85,
            opacity: [1, 0.9, 0],
            scale: [0.2, 1.2, 0.4],
            rotate: p.spin ? p.spin * 240 : 180,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1], // Cinematic deceleration easing
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              // Uses royal gold (#ebd391), deep violet (#a78bfa), or ivory dynamically from the generator script
              background: `radial-gradient(circle, #ffffff 10%, ${p.color || "#ebd391"} 80%)`,
              filter: `drop-shadow(0 0 6px ${p.color || "#ebd391"})`,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
