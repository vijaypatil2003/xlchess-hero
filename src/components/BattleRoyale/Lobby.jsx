import React from "react";
import { PLAYERS } from "../constants/players";
import { Swords, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Lobby({ onStart }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 py-6 select-none">
      <div className="flex flex-col gap-2 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-[10px] text-purple-300 tracking-widest uppercase font-medium w-fit mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Gladiator Chambers</span>
        </div>
        <h1 className="font-light text-4xl tracking-tight text-neutral-200 leading-tight">
          Systemic{" "}
          <span className="font-serif italic text-purple-400">
            Battle Royale.
          </span>
        </h1>
        <p className="text-neutral-400 text-sm font-light tracking-wide">
          8 tactical contenders. 4 dynamic frontlines. Every 120 seconds, the
          lowest capture score shatters.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PLAYERS.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-[#0a0f24] border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-3 relative overflow-hidden group hover:border-purple-500/30 transition-all"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-3xl font-mono" style={{ color: p.color }}>
              {p.avatar}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-neutral-200 tracking-wide truncate max-w-[140px]">
                {p.name}
              </span>
              <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-500 mt-0.5">
                Ready to Drop
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mx-auto mt-4 px-10 py-4 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 hover:border-[#ebd391]/60 flex items-center justify-center gap-3 text-xs tracking-widest uppercase font-bold transition-all cursor-pointer shadow-xl"
      >
        <Swords className="w-4 h-4 animate-pulse" /> Launch Battle Cluster
      </button>
    </div>
  );
}
