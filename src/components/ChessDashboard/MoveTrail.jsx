import { motion, AnimatePresence } from "framer-motion";

export default function MoveTrail({ trail }) {
  if (!trail) return null;

  const { x1, y1, x2, y2 } = trail;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <AnimatePresence>
      <motion.div
        key={`${x1}-${y1}-${x2}-${y2}`}
        className="pointer-events-none absolute inset-0 z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main Fluid Trail */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: x1,
            top: y1,
            width: length,
            height: 4, // Sleeker line height for a sharper, premium vector look
            transformOrigin: "0 50%",
            transform: `rotate(${angle}deg)`,
            background:
              "linear-gradient(90deg, #fdfbf7 10%, #ebd391 40%, #a78bfa 80%, transparent 100%)",
            filter: "blur(1.5px) drop-shadow(0 0 12px rgba(235,211,145,0.5))",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0.8, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1], // Cinematic snap-to-glide easing
          }}
        />

        {/* Liquid Gold Target Splash */}
        <motion.div
          className="absolute h-6 w-6 rounded-full"
          style={{
            left: x2 - 12,
            top: y2 - 12,
            background:
              "radial-gradient(circle, #ffffff 20%, #ebd391 60%, transparent 100%)",
            boxShadow: "0 0 25px #ebd391, 0 0 50px #a78bfa",
          }}
          initial={{
            scale: 0.2,
            opacity: 1,
          }}
          animate={{
            scale: 1.8,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.1, 0.8, 0.2, 1],
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// import { motion, AnimatePresence } from "framer-motion";

// export default function MoveTrail({ trail }) {
//   if (!trail) return null;

//   const { x1, y1, x2, y2 } = trail;

//   const dx = x2 - x1;
//   const dy = y2 - y1;

//   const length = Math.sqrt(dx * dx + dy * dy);
//   const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//   return (
//     <AnimatePresence>
//       <motion.div
//         key={`${x1}-${y1}-${x2}-${y2}`}
//         className="pointer-events-none absolute inset-0 z-40"
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Royal Gold into Midnight Violet Trail Line */}
//         <motion.div
//           className="absolute rounded-full"
//           style={{
//             left: x1,
//             top: y1,
//             width: length,
//             height: 6, // Slightly thinner line for a more elegant look
//             transformOrigin: "0 50%",
//             transform: `rotate(${angle}deg)`,
//             background:
//               "linear-gradient(90deg, #fdfbf7, #ebd391, #a78bfa, transparent)",
//             filter: "blur(2px) drop-shadow(0 0 10px rgba(235,211,145,0.4))",
//           }}
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           exit={{ scaleX: 0 }}
//           transition={{
//             duration: 0.25,
//             ease: "easeOut",
//           }}
//         />

//         {/* Champagne-Gold Target Head Flash */}
//         <motion.div
//           className="absolute h-5 w-5 rounded-full"
//           style={{
//             left: x2 - 10,
//             top: y2 - 10,
//             background: "#fdfbf7",
//             boxShadow: "0 0 20px #ebd391, 0 0 40px #a78bfa",
//           }}
//           initial={{
//             scale: 0,
//             opacity: 1,
//           }}
//           animate={{
//             scale: 1.5,
//             opacity: 0,
//           }}
//           transition={{
//             duration: 0.4,
//           }}
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// import { motion, AnimatePresence } from "framer-motion";

// export default function MoveTrail({ trail }) {
//   if (!trail) return null;

//   const { x1, y1, x2, y2 } = trail;

//   const dx = x2 - x1;
//   const dy = y2 - y1;

//   const length = Math.sqrt(dx * dx + dy * dy);

//   const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//   return (
//     <AnimatePresence>
//       <motion.div
//         key={`${x1}-${y1}-${x2}-${y2}`}
//         className="pointer-events-none absolute inset-0 z-40"
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 0 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.45 }}
//       >
//         {/* Main Trail */}
//         <motion.div
//           className="absolute rounded-full"
//           style={{
//             left: x1,
//             top: y1,
//             width: length,
//             height: 10,
//             transformOrigin: "0 50%",
//             transform: `rotate(${angle}deg)`,
//             background:
//               "linear-gradient(90deg,#b794f6,#8b5cf6,#5b5fff,transparent)",
//             filter: "blur(3px) drop-shadow(0 0 12px rgba(139,92,246,.8))",
//           }}
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           exit={{ scaleX: 0 }}
//           transition={{
//             duration: 0.22,
//             ease: "easeOut",
//           }}
//         />

//         {/* Head Glow */}
//         <motion.div
//           className="absolute h-6 w-6 rounded-full"
//           style={{
//             left: x2 - 12,
//             top: y2 - 12,
//             background: "#b794f6",
//             boxShadow: "0 0 30px #8b5cf6,0 0 50px #5b5fff",
//           }}
//           initial={{
//             scale: 0,
//             opacity: 1,
//           }}
//           animate={{
//             scale: 1.4,
//             opacity: 0,
//           }}
//           transition={{
//             duration: 0.35,
//           }}
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// }
