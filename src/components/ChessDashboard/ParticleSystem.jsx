import { AnimatePresence, motion } from "framer-motion";

export default function ParticleSystem({ particles }) {
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
          // Simulated physics: Starts fast, slows down to an organic, luxurious drift
          animate={{
            x: p.x + p.dx * 0.85,
            y: p.y + p.dy * 0.85,
            opacity: [1, 0.9, 0], // Smooth fade out curve
            scale: [0.2, 1.2, 0.4], // Grows then dissolves delicately
            rotate: p.spin ? p.spin * 240 : 180,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1], // Fluid deceleration physics curve
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, #ffffff 10%, ${p.color || "#ebd391"} 80%)`,
              filter: `drop-shadow(0 0 6px ${p.color || "#ebd391"})`,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// import { AnimatePresence, motion } from "framer-motion";

// export default function ParticleSystem({ particles }) {
//   return (
//     <AnimatePresence>
//       {particles.map((p) => (
//         <motion.div
//           key={p.id}
//           className="pointer-events-none absolute z-50"
//           initial={{
//             x: p.x,
//             y: p.y,
//             opacity: p.opacity || 1,
//             scale: 0.3,
//           }}
//           animate={{
//             x: p.x + p.dx,
//             y: p.y + p.dy,
//             opacity: 0,
//             scale: 1.3,
//             rotate: p.spin ? p.spin * 180 : 360,
//           }}
//           exit={{ opacity: 0 }}
//           transition={{
//             duration: 0.65,
//             ease: [0.16, 1, 0.3, 1], // Custom cinematic exit curve
//           }}
//         >
//           <div
//             style={{
//               width: p.size,
//               height: p.size,
//               borderRadius: "9999px",
//               // Dynamically uses the custom royal colors (Gold, Ivory, Violet) from your utility file!
//               background: `radial-gradient(circle, #ffffff 0%, ${p.color || "#ebd391"} 70%)`,
//               boxShadow: `0 0 8px ${p.color || "#ebd391"}, 0 0 16px ${p.color || "#ebd391"}40`,
//             }}
//           />
//         </motion.div>
//       ))}
//     </AnimatePresence>
//   );
// }

// import { AnimatePresence, motion } from "framer-motion";

// export default function ParticleSystem({ particles }) {
//   return (
//     <AnimatePresence>
//       {particles.map((p) => (
//         <motion.div
//           key={p.id}
//           className="pointer-events-none absolute z-50"
//           initial={{
//             x: p.x,
//             y: p.y,
//             opacity: 1,
//             scale: 0.3,
//           }}
//           animate={{
//             x: p.x + p.dx,
//             y: p.y + p.dy,
//             opacity: 0,
//             scale: 1.2,
//             rotate: 360,
//           }}
//           exit={{ opacity: 0 }}
//           transition={{
//             duration: 0.6,
//             ease: "easeOut",
//           }}
//         >
//           <div
//             style={{
//               width: p.size,
//               height: p.size,
//               borderRadius: "9999px",
//               background: "radial-gradient(circle,#ffffff,#b794f6,#5b5fff)",
//               boxShadow: "0 0 10px #b794f6,0 0 18px #7c5cff",
//             }}
//           />
//         </motion.div>
//       ))}
//     </AnimatePresence>
//   );
// }
