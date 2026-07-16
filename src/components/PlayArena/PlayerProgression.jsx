import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Medal } from "lucide-react";

export default function PlayerProgression({ triggerWin, triggerCapture }) {
  const [xp, setXp] = useState(65); // Default starting at 65% for preview
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Define luxury tiers matching the grandmaster theme
  const getBadgeTier = (lvl) => {
    if (lvl >= 10)
      return {
        name: "Paladin Strategist",
        icon: "♛",
        color: "text-purple-400 border-purple-500/30 bg-purple-950/40",
      };
    if (lvl >= 5)
      return {
        name: "Tactical Vanguard",
        icon: "♘",
        color: "text-[#a78bfa] border-[#a78bfa]/30 bg-indigo-950/40",
      };
    return {
      name: "Apprentice Initiate",
      icon: "♟",
      color: "text-[#ebd391] border-[#d4af37]/20 bg-[#d4af37]/5",
    };
  };

  const tier = getBadgeTier(level);

  // Monitor match actions passed from the parent board engine
  useEffect(() => {
    if (triggerCapture) {
      gainXp(15); // 15 XP for cutting down an asset
    }
  }, [triggerCapture]);

  useEffect(() => {
    if (triggerWin) {
      gainXp(50); // 50 XP for absolute dominance
    }
  }, [triggerWin]);

  const gainXp = (amount) => {
    setXp((prevXp) => {
      const newXp = prevXp + amount;
      if (newXp >= 100) {
        setLevel((prevLvl) => prevLvl + 1);
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
        return newXp - 100; // Carry over excess XP
      }
      return newXp;
    });
  };

  return (
    <div className="flex flex-col gap-4 pt-4 border-t border-white/5 relative">
      {/* Dynamic Floating Level Up Alert */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-[#0c0914]/95 z-20 flex flex-col items-center justify-center rounded-xl border border-[#d4af37]/30 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-[#ebd391] animate-pulse mb-1" />
            <span className="text-[10px] tracking-widest text-[#ebd391] font-mono uppercase">
              Rank Ascended
            </span>
            <span className="font-serif italic text-lg text-white">
              Level {level} Reached
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Header */}
      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
        <Medal className="w-3.5 h-3.5 text-neutral-400" /> Progression &
        Prestige
      </span>

      {/* The Dynamic Badges Badge Box */}
      <div
        className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${tier.color} transition-all duration-500`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {tier.icon}
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-neutral-200 tracking-wide">
              {tier.name}
            </span>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-wider">
              Tier Status
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[11px] font-mono font-bold text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            LVL {level}
          </span>
        </div>
      </div>

      {/* Core Premium Gold Micro-Progress Bar Layout */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
          <span>XP PROGRESS</span>
          <span className="text-neutral-300 font-medium">{xp}%</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#ebd391]"
            style={{ width: `${xp}%` }}
            animate={{ width: `${xp}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          />
        </div>
      </div>
    </div>
  );
}
