import React from "react";
import { motion } from "framer-motion";
import { Crown, RotateCcw, Award } from "lucide-react";

export default function WinnerScreen({ winner, scores, onReset }) {
  return (
    <div className="w-full flex items-center justify-center min-h-[70vh] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0f24] border border-[#d4af37]/30 max-w-md w-full p-8 rounded-[32px] text-center shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col items-center gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="w-20 h-20 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#ebd391] relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-md"
          />
          <Crown className="w-10 h-10 relative z-10" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#ebd391] font-semibold">
            Ultimate Survivor
          </h2>
          <h1 className="text-3xl font-light text-neutral-200 tracking-tight">
            {winner?.name === "PawnStormVijay"
              ? "Dominance Claimed."
              : "Victory Secured."}
          </h1>
          <span className="text-2xl font-serif italic text-[#ebd391] font-normal block mt-1">
            {winner?.name}
          </span>
        </div>

        <div className="w-full border-t border-b border-white/5 py-4 my-2 flex justify-around items-center">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase">
              Final Harvest
            </span>
            <span className="text-xl font-bold font-mono text-neutral-200 mt-0.5">
              {scores[winner?.id] || 0} pts
            </span>
          </div>
          <div className="h-6 w-[1px] bg-white/5" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase">
              Token Identity
            </span>
            <span className="text-xl font-mono text-[#ebd391] mt-0.5">
              {winner?.avatar}
            </span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 hover:border-[#ebd391]/60 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-bold transition-all cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-4 h-4" /> Re-Enter Staging Room
        </button>
      </motion.div>
    </div>
  );
}
