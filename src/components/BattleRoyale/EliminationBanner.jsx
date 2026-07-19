import React from "react";
import { motion } from "framer-motion";
import { Skull } from "lucide-react";

export default function EliminationBanner({ playerName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#060b1e]/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="text-center max-w-md flex flex-col items-center gap-4 bg-red-950/20 p-8 rounded-3xl border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-inner">
          <Skull className="w-8 h-8 animate-bounce" />
        </div>
        <h2 className="text-xs uppercase tracking-widest font-mono text-red-400 font-bold">
          Arena Elimination
        </h2>
        <h1 className="text-3xl font-light tracking-tight text-neutral-100">
          <span className="font-serif italic text-red-400 font-normal">
            {playerName}
          </span>
          <br />
          has been eliminated.
        </h1>
        <p className="text-neutral-500 text-xs font-light max-w-xs mt-1">
          The field contracts. Matchups are resetting for the upcoming cycle...
        </p>
      </motion.div>
    </motion.div>
  );
}
