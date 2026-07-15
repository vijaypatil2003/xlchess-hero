import { motion } from "framer-motion";

const pieces = [
  {
    src: "/pieces/knight.png",
    className:
      "top-[8%] right-[6%] w-40 opacity-70 rotate-[18deg]",
    duration: 7,
    y: 25,
  },
  {
    src: "/pieces/queen.png",
    className:
      "bottom-[12%] left-[2%] w-32 opacity-60 -rotate-12",
    duration: 8,
    y: 20,
  },
  {
    src: "/pieces/pawn.png",
    className:
      "top-[58%] right-[2%] w-24 opacity-40 rotate-12",
    duration: 6,
    y: 16,
  },
];

export default function FloatingPieces() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {pieces.map((piece, i) => (
        <motion.img
          key={i}
          src={piece.src}
          className={`absolute select-none ${piece.className}`}
          animate={{
            y: [0, -piece.y, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: piece.duration,
            ease: "easeInOut",
          }}
          draggable={false}
        />
      ))}

    </div>
  );
}