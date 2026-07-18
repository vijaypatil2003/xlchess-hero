import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Share2,
  Swords,
  Calendar,
  Users,
  Target,
  Zap,
  Flame,
  CheckCircle2,
  Instagram,
  Twitter,
} from "lucide-react";

// Mock Data for Luxury Battle Arenas
const TOURNAMENTS = [
  {
    id: "t1",
    title: "Battle of 64 Grand Championship",
    status: "ongoing",
    prize: "₹64,000",
    firstPrize: "₹15,000",
    time: "Live Now • Ends 9:30 PM",
    players: "48 / 64 Registered",
    type: "Blitz Knockout",
  },
  {
    id: "t2",
    title: "Vanguard Elite Invitational",
    status: "ongoing",
    prize: "₹25,000",
    firstPrize: "₹8,000",
    time: "Live Now • Round 3/5",
    players: "16 Masters Active",
    type: "Classical",
  },
  {
    id: "t3",
    title: "Paladin Stardust Open",
    status: "upcoming",
    prize: "₹40,000",
    firstPrize: "₹12,000",
    time: "Tomorrow • 7:30 PM IST",
    players: "112 Registered",
    type: "Bullet Arena",
  },
];

// Mock Performance Metrics matching your theme
const USER_PERFORMANCE = {
  rank: "Platinum Grandmaster",
  level: "Lvl 12",
  gamesPlayed: "1,284",
  winRate: "68%",
  accuracy: "91%",
  streak: "7 Wins",
  badgeWon: "Golden Citadel Crest", // Could be golden, silver, brass
  badgeIcon: "♛",
  badgeColor: "from-[#d4af37] via-[#ebd391] to-[#b8860b]",
};

export default function Compete() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      "Check out my XL Chess Wrapped performance status! Join the arena at xlchess.com",
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 w-full h-fit text-white py-6 flex flex-col gap-12">
      {/* Editorial Header Section */}
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Championship Arena</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
          Claim Your{" "}
          <span className="font-serif italic text-[#ebd391]">Dominance.</span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Engage in calculated systemic warfare, win prestigious metal crests,
          and broadcast your tactical supremacy to the factions.
        </p>
      </div>

      {/* Main Structural Twin Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT PANEL: BATTLE SCROLL (Tournaments Stack) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center gap-2 mb-2">
            <Swords className="w-4 h-4 text-[#ebd391]" /> Active Battle Fronts
          </h2>

          {TOURNAMENTS.map((tourney) => (
            <div
              key={tourney.id}
              className={`relative group overflow-hidden bg-neutral-950/30 p-5 rounded-[22px] border backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:border-[#d4af37]/30 ${
                tourney.status === "ongoing"
                  ? "border-white/5"
                  : "border-white/5 opacity-80"
              }`}
            >
              {/* Subtle status indicator bar */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1 ${
                  tourney.status === "ongoing"
                    ? "bg-gradient-to-b from-purple-500 to-indigo-600"
                    : "bg-neutral-700"
                }`}
              />

              <div className="flex flex-col gap-1.5 pl-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                      tourney.status === "ongoing"
                        ? "bg-purple-950/50 border border-purple-500/30 text-purple-300 animate-pulse"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-400"
                    }`}
                  >
                    {tourney.status}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {tourney.type}
                  </span>
                </div>

                <h3 className="text-base font-medium text-neutral-200 group-hover:text-[#ebd391] transition-colors duration-300">
                  {tourney.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 font-light mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />{" "}
                    {tourney.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />{" "}
                    {tourney.players}
                  </span>
                </div>
              </div>

              {/* Reward Information Box */}
              <div className="sm:text-right flex flex-col items-start sm:items-end justify-center shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 pl-2 sm:pl-0">
                <span className="text-[9px] tracking-wider text-neutral-500 font-mono uppercase">
                  Total Prize Pool
                </span>
                <span className="text-xl font-light font-serif text-[#ebd391]">
                  {tourney.prize}
                </span>
                <span className="text-[10px] text-neutral-400 font-light">
                  1st: {tourney.firstPrize}
                </span>

                <button className="mt-2.5 text-[10px] uppercase font-semibold tracking-widest text-[#ebd391] bg-white/5 border border-white/10 hover:border-[#ebd391]/40 px-3 py-1.5 rounded-full transition-all cursor-pointer">
                  {tourney.status === "ongoing"
                    ? "Enter Match"
                    : "Register Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL: PREMIUM PRESTIGE CARD ENGINE (Shareable Card) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center justify-between mb-2">
            <span>Prestige Snapshot</span>
            <span className="text-[10px] lowercase text-neutral-500 font-normal italic">
              click share to export
            </span>
          </h2>

          {/* THE METALLIC CREDIT-CARD TYPE DISPLAYER */}
          <div className="relative w-full aspect-[1.65/1] sm:h-64 sm:w-auto rounded-[24px] overflow-hidden bg-gradient-to-br from-[#120e24] via-[#0b0816] to-[#040308] border border-white/10 p-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between group">
            {/* Dynamic Card Internal Grid Design Texture Layers */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />

            {/* Header Area */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <img
                    src="/xlchess.png"
                    alt="XLChess Logo"
                    className="h-4.5 w-auto object-contain"
                  />
                  <span className="text-[9px] font-mono tracking-widest text-[#ebd391] uppercase opacity-70">
                    Wrapped 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wide">
                  {USER_PERFORMANCE.rank}
                </span>
              </div>

              {/* Golden Micro Chip / Antenna Iconography Simulation */}
              <div className="w-9 h-7 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-600 border border-white/10 opacity-30 flex items-center justify-center text-[10px] text-white">
                )))
              </div>
            </div>

            {/* Central Badge Achievement Grid Display (The Won Badge) */}
            <div className="relative z-10 flex items-center gap-4 my-2">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${USER_PERFORMANCE.badgeColor} p-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]`}
              >
                <div className="w-full h-full rounded-full bg-[#0c0914] flex items-center justify-center text-2xl select-none">
                  {USER_PERFORMANCE.badgeIcon}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-neutral-500 font-mono tracking-wider uppercase">
                  Unlocked Crest
                </span>
                <span className="text-base font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#ebd391] to-[#b8860b] font-medium leading-tight">
                  {USER_PERFORMANCE.badgeWon}
                </span>
                <span className="text-[9px] text-purple-400 font-mono uppercase tracking-widest mt-0.5">
                  {USER_PERFORMANCE.level} Status
                </span>
              </div>
            </div>

            {/* Bottom Metrics Readout Grid */}
            <div className="relative z-10 border-t border-white/5 pt-3 grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                  GAMES
                </span>
                <span className="text-xs font-semibold text-neutral-200 mt-0.5">
                  {USER_PERFORMANCE.gamesPlayed}
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-white/5">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                  WIN RATE
                </span>
                <span className="text-xs font-semibold text-[#ebd391] mt-0.5">
                  {USER_PERFORMANCE.winRate}
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-white/5">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                  ACCURACY
                </span>
                <span className="text-xs font-semibold text-neutral-200 mt-0.5">
                  {USER_PERFORMANCE.accuracy}
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-white/5">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                  STREAK
                </span>
                <span className="text-xs font-semibold text-purple-400 mt-0.5 flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-purple-400/20" />{" "}
                  {USER_PERFORMANCE.streak.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger Row Box */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <button
              onClick={handleShare}
              className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 hover:border-[#ebd391]/60 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-bold transition-all cursor-pointer shadow-lg"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-emerald-400"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Copied Card Info!
                  </motion.span>
                ) : (
                  <motion.span
                    key="share"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Performance Card
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Social Channels Aesthetic Links */}
            <div className="flex gap-2 items-center justify-center px-2 bg-neutral-900/40 rounded-full border border-white/5">
              <button className="p-2.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
