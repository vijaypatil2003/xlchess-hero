import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Share2,
  Swords,
  Calendar,
  Users,
  Flame,
  CheckCircle2,
  Globe,
  MessageSquare,
  TrendingUp,
  Crown,
  Target,
} from "lucide-react";

// Mock Data for Luxury Battle Arenas
const TOURNAMENTS = [
  {
    id: "t1",
    title: "XL Chess Grand Championship",
    status: "ongoing",
    prize: "Double Crown Crest",
    firstPrize: "Golden Seal",
    time: "Live Now • Finals",
    players: "48 / 64 Registered",
    type: "Blitz Knockout",
  },
  {
    id: "t2",
    title: "Vanguard Elite Invitational",
    status: "ongoing",
    prize: "Silver Bastion",
    firstPrize: "Elite Emblem",
    time: "Live Now • Round 3/5",
    players: "16 Masters Active",
    type: "Classical",
  },
  {
    id: "t3",
    title: "Paladin Stardust Open",
    status: "upcoming",
    prize: "Brass Vanguard",
    firstPrize: "Bronze Seal",
    time: "Tomorrow • 7:30 PM",
    players: "112 Registered",
    type: "Bullet Arena",
  },
];

// Mock Performance Metrics matching your theme
const USER_PERFORMANCE = {
  playerName: "PawnStormVijay",
  rank: "Platinum Grandmaster",
  nextRank: "Diamond Warlord",
  progressToNextRank: 68,
  level: "Lvl 12",
  gamesPlayed: "1,284",
  winRate: "68%",
  accuracy: "91%",
  streak: "7 Wins",
  badgeWon: "Golden Citadel Crest",
  badgeIcon: "♛",
  recentForm: ["W", "W", "L", "W", "W", "D", "W"],
};

// Mock Leaderboard Preview for the season panel
const LEADERBOARD_PREVIEW = [
  { rank: 1, name: "IronRookXeno", score: "3,412" },
  { rank: 2, name: "QueensGambitLia", score: "3,290" },
  { rank: 3, name: "PawnStormVijay", score: "3,104", isUser: true },
];

const FORM_STYLES = {
  W: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  L: "bg-red-500/10 text-red-400 border-red-500/25",
  D: "bg-neutral-500/10 text-neutral-400 border-neutral-500/25",
};

export default function Compete() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `Check out my XL Chess Wrapped performance status! Player: ${USER_PERFORMANCE.playerName}. Join the arena at xlchess.com`,
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative z-10 w-full h-fit text-white py-6 flex flex-col gap-10 select-none">
      {/* Editorial Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>XL Chess Championship</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
          Claim Your{" "}
          <span className="font-serif italic text-[#ebd391]">Dominance.</span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Engage in calculated systemic warfare, win prestigious metal crests,
          and broadcast your tactical supremacy to the factions.
        </p>
      </motion.div>

      {/* PRESTIGE BANNER — hero identity strip, replaces the old credit-card mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative w-full rounded-[28px] border border-white/5 bg-gradient-to-br from-neutral-950/70 to-[#0c0914] overflow-hidden p-6 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Ambient rotating glow, tucked behind content */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/3 -right-1/4 w-[420px] h-[420px] bg-gradient-to-br from-[#d4af37]/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        {/* Faint grid texture, consistent with your existing card texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Share action, pinned top-right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            title="Copy Share Link"
          >
            <Globe className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            title="Direct Message"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShare}
            className="pl-3 pr-4 py-2 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 hover:border-[#ebd391]/60 flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold transition-all cursor-pointer shadow-lg"
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
                  <CheckCircle2 className="w-3.5 h-3.5" /> Copied
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 pr-0 lg:pr-40">
          {/* Identity block: progress-ring crest + name/rank */}
          <div className="flex items-center gap-5 shrink-0">
            <div className="relative shrink-0">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[#d4af37]/30 blur-md"
              />
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px]"
                style={{
                  background: `conic-gradient(#d4af37 ${USER_PERFORMANCE.progressToNextRank}%, rgba(255,255,255,0.08) ${USER_PERFORMANCE.progressToNextRank}%)`,
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0812] border border-white/5 flex items-center justify-center text-3xl sm:text-4xl text-[#ebd391]">
                  {USER_PERFORMANCE.badgeIcon}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-wide text-neutral-100">
                {USER_PERFORMANCE.playerName}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ebd391]">
                {USER_PERFORMANCE.rank} · {USER_PERFORMANCE.level}
              </span>
              <span className="text-[10px] text-neutral-500 font-light flex items-center gap-1">
                <Target className="w-3 h-3" />
                {USER_PERFORMANCE.progressToNextRank}% to{" "}
                {USER_PERFORMANCE.nextRank}
              </span>
              <span className="text-[10px] text-purple-300/80 font-mono uppercase tracking-widest mt-0.5">
                {USER_PERFORMANCE.badgeWon}
              </span>
            </div>
          </div>

          {/* Stat strip */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 sm:border-l sm:border-white/5 sm:pl-8">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                Games
              </span>
              <span className="text-lg font-semibold text-neutral-200">
                {USER_PERFORMANCE.gamesPlayed}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                Win Rate
              </span>
              <span className="text-lg font-semibold text-[#ebd391]">
                {USER_PERFORMANCE.winRate}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                Accuracy
              </span>
              <span className="text-lg font-semibold text-neutral-200">
                {USER_PERFORMANCE.accuracy}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                Streak
              </span>
              <span className="text-lg font-semibold text-purple-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-purple-400/20" />
                {USER_PERFORMANCE.streak.split(" ")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Recent form trail */}
        <div className="relative z-10 flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono shrink-0">
            Recent Form
          </span>
          <div className="flex gap-1.5">
            {USER_PERFORMANCE.recentForm.map((result, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded-md border flex items-center justify-center text-[10px] font-mono font-bold ${FORM_STYLES[result]}`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MAIN BODY: tournament list + season panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Active Battle Fronts */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-8 flex flex-col gap-4"
        >
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center gap-2">
            <Swords className="w-4 h-4 text-[#ebd391]" /> Active Battle Fronts
          </h2>

          {TOURNAMENTS.map((tourney) => (
            <div
              key={tourney.id}
              className={`relative group overflow-hidden bg-neutral-950/30 rounded-[20px] border backdrop-blur-xl grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-6 p-5 transition-all duration-300 hover:border-[#d4af37]/30 ${
                tourney.status === "ongoing"
                  ? "border-white/5"
                  : "border-white/5 opacity-80"
              }`}
            >
              <div
                className={`absolute top-0 bottom-0 left-0 w-1 ${
                  tourney.status === "ongoing"
                    ? "bg-gradient-to-b from-purple-500 to-indigo-600"
                    : "bg-neutral-700"
                }`}
              />

              <div className="flex flex-col gap-1.5 pl-3">
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
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    {tourney.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-neutral-500" />
                    {tourney.players}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 pl-3 sm:pl-0 sm:min-w-[160px] sm:text-right">
                <div className="flex flex-col sm:items-end">
                  <span className="text-[9px] tracking-wider text-neutral-500 font-mono uppercase">
                    Prestige Reward
                  </span>
                  <span className="text-base font-light font-serif text-[#ebd391]">
                    {tourney.prize}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-light">
                    Target: {tourney.firstPrize}
                  </span>
                </div>

                <button className="shrink-0 text-[10px] uppercase font-semibold tracking-widest text-[#ebd391] bg-white/5 border border-white/10 hover:border-[#ebd391]/40 px-3 py-1.5 rounded-full transition-all cursor-pointer">
                  {tourney.status === "ongoing"
                    ? "Enter Match"
                    : "Register Now"}
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT: Season panel — leaderboard preview + next milestone */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#ebd391]" /> Season Standings
          </h2>

          <div className="bg-neutral-950/30 rounded-[20px] border border-white/5 backdrop-blur-xl p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2.5">
              {LEADERBOARD_PREVIEW.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 border ${
                    entry.isUser
                      ? "bg-[#d4af37]/5 border-[#d4af37]/30"
                      : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                        entry.rank === 1
                          ? "bg-[#d4af37]/20 text-[#ebd391] border border-[#d4af37]/40"
                          : "bg-white/5 text-neutral-400 border border-white/10"
                      }`}
                    >
                      {entry.rank}
                    </span>
                    <span
                      className={`text-xs font-mono ${entry.isUser ? "text-[#ebd391] font-semibold" : "text-neutral-300"}`}
                    >
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {entry.score}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer">
              View Full Leaderboard
            </button>
          </div>

          {/* Next milestone callout */}
          <div className="bg-gradient-to-br from-purple-950/40 to-neutral-950/30 rounded-[20px] border border-purple-500/20 backdrop-blur-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
              <Crown className="w-4.5 h-4.5 text-[#ebd391]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                Next Milestone
              </span>
              <span className="text-xs text-neutral-300 font-light leading-relaxed">
                {USER_PERFORMANCE.progressToNextRank}% toward{" "}
                <span className="text-[#ebd391] font-medium">
                  {USER_PERFORMANCE.nextRank}
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Trophy,
//   Share2,
//   Swords,
//   Calendar,
//   Users,
//   Flame,
//   CheckCircle2,
//   Globe,
//   MessageSquare,
// } from "lucide-react";

// // Mock Data for Luxury Battle Arenas
// const TOURNAMENTS = [
//   {
//     id: "t1",
//     title: "XL Chess Grand Championship",
//     status: "ongoing",
//     prize: "Double Crown Crest",
//     firstPrize: "Golden Seal",
//     time: "Live Now • Finals",
//     players: "48 / 64 Registered",
//     type: "Blitz Knockout",
//   },
//   {
//     id: "t2",
//     title: "Vanguard Elite Invitational",
//     status: "ongoing",
//     prize: "Silver Bastion",
//     firstPrize: "Elite Emblem",
//     time: "Live Now • Round 3/5",
//     players: "16 Masters Active",
//     type: "Classical",
//   },
//   {
//     id: "t3",
//     title: "Paladin Stardust Open",
//     status: "upcoming",
//     prize: "Brass Vanguard",
//     firstPrize: "Bronze Seal",
//     time: "Tomorrow • 7:30 PM",
//     players: "112 Registered",
//     type: "Bullet Arena",
//   },
// ];

// // Mock Performance Metrics matching your theme
// const USER_PERFORMANCE = {
//   playerName: "PawnStormVijay",
//   rank: "Platinum Grandmaster",
//   level: "Lvl 12",
//   gamesPlayed: "1,284",
//   winRate: "68%",
//   accuracy: "91%",
//   streak: "7 Wins",
//   badgeWon: "Golden Citadel Crest",
//   badgeIcon: "♛",
// };

// export default function Compete() {
//   const [copied, setCopied] = useState(false);

//   const handleShare = () => {
//     setCopied(true);
//     navigator.clipboard.writeText(
//       `Check out my XL Chess Wrapped performance status! Player: ${USER_PERFORMANCE.playerName}. Join the arena at xlchess.com`,
//     );
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative z-10 w-full h-fit text-white py-6 flex flex-col gap-12 select-none">
//       {/* Editorial Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-xl"
//       >
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
//           <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
//           <span>XL Chess Championship</span>
//         </div>
//         <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
//           Claim Your{" "}
//           <span className="font-serif italic text-[#ebd391]">Dominance.</span>
//         </h1>
//         <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
//           Engage in calculated systemic warfare, win prestigious metal crests,
//           and broadcast your tactical supremacy to the factions.
//         </p>
//       </motion.div>

//       {/* Main Structural Twin Layout Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//         {/* LEFT PANEL: BATTLE SCROLL (Tournaments Stack) */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="lg:col-span-7 flex flex-col gap-5"
//         >
//           <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center gap-2 mb-2">
//             <Swords className="w-4 h-4 text-[#ebd391]" /> Active Battle Fronts
//           </h2>

//           {TOURNAMENTS.map((tourney) => (
//             <div
//               key={tourney.id}
//               className={`relative group overflow-hidden bg-neutral-950/30 p-5 rounded-[22px] border backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:border-[#d4af37]/30 ${
//                 tourney.status === "ongoing"
//                   ? "border-white/5"
//                   : "border-white/5 opacity-80"
//               }`}
//             >
//               <div
//                 className={`absolute top-0 bottom-0 left-0 w-1 ${
//                   tourney.status === "ongoing"
//                     ? "bg-gradient-to-b from-purple-500 to-indigo-600"
//                     : "bg-neutral-700"
//                 }`}
//               />

//               <div className="flex flex-col gap-1.5 pl-2">
//                 <div className="flex items-center gap-2.5">
//                   <span
//                     className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${
//                       tourney.status === "ongoing"
//                         ? "bg-purple-950/50 border border-purple-500/30 text-purple-300 animate-pulse"
//                         : "bg-neutral-900 border border-neutral-800 text-neutral-400"
//                     }`}
//                   >
//                     {tourney.status}
//                   </span>
//                   <span className="text-[10px] text-neutral-500 font-mono">
//                     {tourney.type}
//                   </span>
//                 </div>

//                 <h3 className="text-base font-medium text-neutral-200 group-hover:text-[#ebd391] transition-colors duration-300">
//                   {tourney.title}
//                 </h3>

//                 <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 font-light mt-1">
//                   <span className="flex items-center gap-1">
//                     <Calendar className="w-3.5 h-3.5 text-neutral-500" />{" "}
//                     {tourney.time}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Users className="w-3.5 h-3.5 text-neutral-500" />{" "}
//                     {tourney.players}
//                   </span>
//                 </div>
//               </div>

//               <div className="sm:text-right flex flex-col items-start sm:items-end justify-center shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 pl-2 sm:pl-0">
//                 <span className="text-[9px] tracking-wider text-neutral-500 font-mono uppercase">
//                   Prestige Reward
//                 </span>
//                 <span className="text-base font-light font-serif text-[#ebd391]">
//                   {tourney.prize}
//                 </span>
//                 <span className="text-[10px] text-neutral-400 font-light">
//                   Target: {tourney.firstPrize}
//                 </span>

//                 <button className="mt-2.5 text-[10px] uppercase font-semibold tracking-widest text-[#ebd391] bg-white/5 border border-white/10 hover:border-[#ebd391]/40 px-3 py-1.5 rounded-full transition-all cursor-pointer">
//                   {tourney.status === "ongoing"
//                     ? "Enter Match"
//                     : "Register Now"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         {/* RIGHT PANEL: ANIMATED PRESTIGE CARD ENGINE */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="lg:col-span-5 flex flex-col gap-5"
//         >
//           <h2 className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold flex items-center justify-between mb-2">
//             <span>Prestige Snapshot</span>
//             <span className="text-[10px] lowercase text-neutral-500 font-normal italic">
//               click share to export
//             </span>
//           </h2>

//           {/* CARD CONTAINER WITH ANIMATED SHIFTING GRADIENT BORDER */}
//           <motion.div
//             whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
//             style={{ transformStyle: "preserve-3d" }}
//             className="relative w-full aspect-[1.63/1] rounded-[24px] p-[1px] overflow-hidden bg-gradient-to-br from-white/10 to-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-center"
//           >
//             {/* Shifting Animated Core Background Ring */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//               className="absolute w-[150%] h-[150%] bg-gradient-to-r from-[#d4af37]/30 via-purple-500/20 to-[#ebd391]/30 pointer-events-none"
//             />

//             {/* True Card Body Inner Layer */}
//             <div className="relative w-full h-full rounded-[23px] bg-gradient-to-br from-[#110e22] via-[#090712] to-[#040307] p-5 flex flex-col justify-between">
//               {/* Grid Background Texture Overlay Layer */}
//               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] rounded-[23px] pointer-events-none" />

//               {/* Top Row Block */}
//               <div className="relative z-10 flex items-start justify-between">
//                 <div className="flex flex-col">
//                   <span className="text-lg font-mono font-bold tracking-wider text-neutral-100 uppercase">
//                     {USER_PERFORMANCE.playerName}
//                   </span>
//                   <span className="text-[10px] font-mono text-[#ebd391] mt-0.5 uppercase tracking-widest">
//                     {USER_PERFORMANCE.rank}
//                   </span>
//                 </div>

//                 {/* Shiny Gold Metallic Chip Graphic Mock */}
//                 <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#d4af37]/40 to-[#ebd391]/20 border border-[#d4af37]/30 relative overflow-hidden flex items-center justify-center">
//                   <motion.div
//                     animate={{ x: ["-100%", "200%"] }}
//                     transition={{
//                       duration: 2.5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                     className="absolute top-0 bottom-0 w-2 bg-white/20 transform -skew-x-12"
//                   />
//                   <span className="text-[8px] opacity-40 font-mono">XL</span>
//                 </div>
//               </div>

//               {/* Center Unlocked Crest Section with Cosmic Pulsing Aura */}
//               <div className="relative z-10 flex items-center gap-4 my-1">
//                 <div className="relative flex items-center justify-center">
//                   <motion.div
//                     animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     }}
//                     className="absolute w-16 h-16 rounded-full bg-[#d4af37]/30 blur-md"
//                   />
//                   <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] via-[#ebd391] to-[#b8860b] p-[1px] flex items-center justify-center shadow-lg relative z-10">
//                     <div className="w-full h-full rounded-full bg-[#0a0812] flex items-center justify-center text-2xl select-none text-[#ebd391]">
//                       {USER_PERFORMANCE.badgeIcon}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col">
//                   <span className="text-[8px] text-neutral-500 font-mono tracking-widest uppercase">
//                     Unlocked Crest
//                   </span>
//                   <span className="text-base font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#ebd391] to-[#d4af37] font-medium leading-tight">
//                     {USER_PERFORMANCE.badgeWon}
//                   </span>
//                   <span className="text-[9px] text-purple-400 font-mono uppercase tracking-widest mt-0.5">
//                     {USER_PERFORMANCE.level} Active Status
//                   </span>
//                 </div>
//               </div>

//               {/* Bottom Metrics Readout Grid */}
//               <div className="relative z-10 border-t border-white/5 pt-3 grid grid-cols-4 gap-2 text-center">
//                 <div className="flex flex-col items-center">
//                   <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wide">
//                     GAMES
//                   </span>
//                   <span className="text-xs font-semibold text-neutral-200 mt-0.5">
//                     {USER_PERFORMANCE.gamesPlayed}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center border-l border-white/5">
//                   <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wide">
//                     WIN RATE
//                   </span>
//                   <span className="text-xs font-semibold text-[#ebd391] mt-0.5">
//                     {USER_PERFORMANCE.winRate}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center border-l border-white/5">
//                   <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wide">
//                     ACCURACY
//                   </span>
//                   <span className="text-xs font-semibold text-neutral-200 mt-0.5">
//                     {USER_PERFORMANCE.accuracy}
//                   </span>
//                 </div>
//                 <div className="flex flex-col items-center border-l border-white/5">
//                   <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-wide">
//                     STREAK
//                   </span>
//                   <span className="text-xs font-semibold text-purple-400 mt-0.5 flex items-center gap-0.5">
//                     <Flame className="w-3 h-3 fill-purple-400/20" />{" "}
//                     {USER_PERFORMANCE.streak.split(" ")[0]}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Action Trigger Row Box */}
//           <div className="flex flex-col sm:flex-row gap-3 mt-1">
//             <button
//               onClick={handleShare}
//               className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 hover:border-[#ebd391]/60 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-bold transition-all cursor-pointer shadow-lg"
//             >
//               <AnimatePresence mode="wait">
//                 {copied ? (
//                   <motion.span
//                     key="copied"
//                     initial={{ opacity: 0, y: 4 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-1.5 text-emerald-400"
//                   >
//                     <CheckCircle2 className="w-3.5 h-3.5" /> Copied Info!
//                   </motion.span>
//                 ) : (
//                   <motion.span
//                     key="share"
//                     initial={{ opacity: 0, y: -4 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-1.5"
//                   >
//                     <Share2 className="w-3.5 h-3.5" /> Share Performance Card
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </button>

//             {/* Social Channels Aesthetic Links Block */}
//             <div className="flex gap-2 items-center justify-center px-2 bg-neutral-900/40 rounded-full border border-white/5">
//               <button
//                 onClick={handleShare}
//                 className="p-2.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
//                 title="Share Link"
//               >
//                 <Globe className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="p-2.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
//                 title="Direct Message"
//               >
//                 <MessageSquare className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
