import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Swords,
  Trophy,
  Users,
  Zap,
  Clock,
  ArrowRight,
  Crown,
} from "lucide-react";

const OPEN_CHALLENGES = [
  {
    id: 1,
    player: "Magnus_Ghost",
    rating: 2450,
    timeControl: "3 + 2",
    mode: "Blitz",
    variant: "Rated",
  },
  {
    id: 2,
    player: "Vishy_Fan_99",
    rating: 1980,
    timeControl: "10 + 0",
    mode: "Rapid",
    variant: "Rated",
  },
  {
    id: 3,
    player: "Hikaru_Speedrun",
    rating: 2810,
    timeControl: "1 + 0",
    mode: "Bullet",
    variant: "Casual",
  },
  {
    id: 4,
    player: "Kasparov_AI",
    rating: 2200,
    timeControl: "5 + 3",
    mode: "Blitz",
    variant: "Rated",
  },
];

// Luxury Grandmaster Standings Data
const LEADERBOARD = [
  {
    rank: 1,
    name: "Alireza_Pro",
    rating: 2895,
    winRate: "68.4%",
    color: "text-[#d4af37]",
  }, // Gold
  {
    rank: 2,
    name: "Gukesh_Domination",
    rating: 2845,
    winRate: "64.2%",
    color: "text-neutral-400",
  }, // Silver
  {
    rank: 3,
    name: "Pragg_Chess",
    rating: 2815,
    winRate: "61.9%",
    color: "text-[#cd7f32]",
  }, // Bronze
  {
    rank: 4,
    name: "Nakamura_Fan",
    rating: 2790,
    winRate: "59.5%",
    color: "text-neutral-500",
  },
];

export default function Compete() {
  const [inQueue, setInQueue] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState(null);

  const startQueue = (queueName) => {
    setInQueue(true);
    setSelectedQueue(queueName);
    setTimeout(() => {
      setInQueue(false);
      setSelectedQueue(null);
      alert("Match found! Entering Arena...");
    }, 4000);
  };

  return (
    <div className="relative z-10 w-full min-h-screen text-white py-6 flex flex-col gap-16">
      {/* Editorial Header Section */}
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Lounge Arena</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
          Claim Your{" "}
          <span className="font-serif italic text-[#ebd391]">Dominance.</span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Step into high-stakes environments designed for pure tactical
          expression. Join rapid queues or accept premium targeted open wagers.
        </p>
      </div>

      {/* Grid Layout: Quick Actions & Live Open Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Quick Queue Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Quick Pairings
          </h2>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 bg-neutral-950/30 rounded-[22px] border border-white/5 flex items-center justify-between group cursor-pointer"
            onClick={() => !inQueue && startQueue("Super Blitz Arena")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-950/40 border border-[#a78bfa]/20 text-[#a78bfa]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-neutral-200 group-hover:text-[#ebd391] transition-colors">
                  Super Blitz
                </h4>
                <p className="text-[11px] text-neutral-500">
                  3 min • Rated match
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-5 bg-neutral-950/30 rounded-[22px] border border-white/5 flex items-center justify-between group cursor-pointer"
            onClick={() => !inQueue && startQueue("Classical Rapid Arena")}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-[#6366f1]/20 text-[#6366f1]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm text-neutral-200 group-hover:text-[#ebd391] transition-colors">
                  Classical Rapid
                </h4>
                <p className="text-[11px] text-neutral-500">
                  10 min • Rated match
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.div>

          {inQueue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 text-center flex flex-col items-center justify-center gap-2 mt-2"
            >
              <span className="w-4 h-4 rounded-full border-2 border-[#ebd391] border-t-transparent animate-spin" />
              <p className="text-xs font-mono text-[#ebd391] tracking-wider uppercase">
                Searching for grandmasters...
              </p>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
            <Swords className="w-4 h-4" /> Live Open Challenges
          </h2>

          <div className="w-full overflow-hidden rounded-[22px] border border-white/5 bg-neutral-950/10 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light tracking-wide border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 pl-6">Grandmaster</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Time Control</th>
                    <th className="p-4">Variant</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {OPEN_CHALLENGES.map((challenge) => (
                    <tr
                      key={challenge.id}
                      className="hover:bg-white/[0.01] transition-colors duration-200"
                    >
                      <td className="p-4 pl-6 font-medium text-neutral-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                        {challenge.player}
                      </td>
                      <td className="p-4 font-mono text-neutral-400">
                        {challenge.rating}
                      </td>
                      <td className="p-4 text-neutral-300 font-medium">
                        {challenge.timeControl} ({challenge.mode})
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase text-purple-400 bg-purple-950/30 border border-purple-500/10">
                          {challenge.variant}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button className="px-4 py-1.5 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-[#ebd391] font-bold tracking-wider text-[10px] uppercase transition cursor-pointer">
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: Premium Top Standings Leaderboard */}
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
          <Crown className="w-4 h-4" /> Legendary Standings
        </h2>

        <div className="w-full overflow-hidden rounded-[22px] border border-white/5 bg-neutral-950/10 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-light tracking-wide border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
                  <th className="p-4 pl-6 w-20">Rank</th>
                  <th className="p-4">Grandmaster</th>
                  <th className="p-4">Elo Rating</th>
                  <th className="p-4 pr-6 text-right">Win Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LEADERBOARD.map((user) => (
                  <tr
                    key={user.rank}
                    className="hover:bg-white/[0.01] transition-colors duration-200"
                  >
                    <td className="p-4 pl-6 font-mono font-bold">
                      <span className={user.color}>
                        {user.rank <= 3 ? `0${user.rank} ★` : `0${user.rank}`}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-neutral-200">
                      {user.name}
                    </td>
                    <td className="p-4 font-mono text-[#ebd391] font-medium">
                      {user.rating}
                    </td>
                    <td className="p-4 pr-6 font-mono text-neutral-400 text-right">
                      {user.winRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Swords,
//   Trophy,
//   Users,
//   Zap,
//   Clock,
//   ShieldAlert,
//   ArrowRight,
// } from "lucide-react";

// // Mock Active Matchmaking Lobby Challenges
// const OPEN_CHALLENGES = [
//   {
//     id: 1,
//     player: "Magnus_Ghost",
//     rating: 2450,
//     timeControl: "3 + 2",
//     mode: "Blitz",
//     variant: "Rated",
//   },
//   {
//     id: 2,
//     player: "Vishy_Fan_99",
//     rating: 1980,
//     timeControl: "10 + 0",
//     mode: "Rapid",
//     variant: "Rated",
//   },
//   {
//     id: 3,
//     player: "Hikaru_Speedrun",
//     rating: 2810,
//     timeControl: "1 + 0",
//     mode: "Bullet",
//     variant: "Casual",
//   },
//   {
//     id: 4,
//     player: "Kasparov_AI",
//     rating: 2200,
//     timeControl: "5 + 3",
//     mode: "Blitz",
//     variant: "Rated",
//   },
// ];

// export default function Compete() {
//   const [inQueue, setInQueue] = useState(false);
//   const [selectedQueue, setSelectedQueue] = useState(null);

//   const startQueue = (queueName) => {
//     setInQueue(true);
//     setSelectedQueue(queueName);
//     // Mimic real-time matchmaking delay
//     setTimeout(() => {
//       setInQueue(false);
//       setSelectedQueue(null);
//       alert("Match found! Entering Arena...");
//     }, 4000);
//   };

//   return (
//     <div className="relative z-10 w-full min-h-screen text-white py-6">
//       {/* Editorial Header Section */}
//       <div className="mb-12 max-w-xl">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
//           <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
//           <span>Lounge Arena</span>
//         </div>
//         <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
//           Claim Your{" "}
//           <span className="font-serif italic text-[#ebd391]">Dominance.</span>
//         </h1>
//         <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
//           Step into high-stakes environments designed for pure tactical
//           expression. Join rapid queues or accept premium targeted open wagers.
//         </p>
//       </div>

//       {/* Grid Layout: Left is Quick-Actions / Right is Live Table */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* LEFT COLUMN: Premium Quick Queue Cards */}
//         <div className="lg:col-span-4 flex flex-col gap-4">
//           <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
//             <Zap className="w-4 h-4" /> Quick Pairings
//           </h2>

//           {/* 3 min Blitz Card */}
//           <motion.div
//             whileHover={{ y: -4 }}
//             className="p-5 bg-neutral-950/30 rounded-[22px] border border-white/5 flex items-center justify-between group cursor-pointer"
//             onClick={() => !inQueue && startQueue("3 min Bullet Arena")}
//           >
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-xl bg-purple-950/40 border border-[#a78bfa]/20 text-[#a78bfa]">
//                 <Clock className="w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="font-medium text-sm text-neutral-200 group-hover:text-[#ebd391] transition-colors">
//                   Super Blitz
//                 </h4>
//                 <p className="text-[11px] text-neutral-500">
//                   3 min • Rated match
//                 </p>
//               </div>
//             </div>
//             <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
//           </motion.div>

//           {/* 10 min Rapid Card */}
//           <motion.div
//             whileHover={{ y: -4 }}
//             className="p-5 bg-neutral-950/30 rounded-[22px] border border-white/5 flex items-center justify-between group cursor-pointer"
//             onClick={() => !inQueue && startQueue("10 min Rapid Arena")}
//           >
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-xl bg-indigo-950/40 border border-[#6366f1]/20 text-[#6366f1]">
//                 <Users className="w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="font-medium text-sm text-neutral-200 group-hover:text-[#ebd391] transition-colors">
//                   Classical Rapid
//                 </h4>
//                 <p className="text-[11px] text-neutral-500">
//                   10 min • Rated match
//                 </p>
//               </div>
//             </div>
//             <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
//           </motion.div>

//           {/* Live Queue Pulse State Display */}
//           {inQueue && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="p-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 text-center flex flex-col items-center justify-center gap-2 mt-2"
//             >
//               <span className="w-4 h-4 rounded-full border-2 border-[#ebd391] border-t-transparent animate-spin" />
//               <p className="text-xs font-mono text-[#ebd391] tracking-wider uppercase">
//                 Searching for grandmasters in {selectedQueue}...
//               </p>
//             </motion.div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: Interactive Open Open Wagers Table */}
//         <div className="lg:col-span-8 flex flex-col gap-4">
//           <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
//             <Swords className="w-4 h-4" /> Live Open Challenges
//           </h2>

//           <div className="w-full overflow-hidden rounded-[22px] border border-white/5 bg-neutral-950/10 backdrop-blur-md">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-xs font-light tracking-wide border-collapse">
//                 <thead>
//                   <tr className="border-b border-white/5 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase tracking-wider">
//                     <th className="p-4 pl-6">Grandmaster</th>
//                     <th className="p-4">Rating</th>
//                     <th className="p-4">Time Control</th>
//                     <th className="p-4">Variant</th>
//                     <th className="p-4 pr-6 text-right">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5">
//                   {OPEN_CHALLENGES.map((challenge) => (
//                     <tr
//                       key={challenge.id}
//                       className="hover:bg-white/[0.01] transition-colors duration-200"
//                     >
//                       <td className="p-4 pl-6 font-medium text-neutral-200 flex items-center gap-2">
//                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
//                         {challenge.player}
//                       </td>
//                       <td className="p-4 font-mono text-neutral-400">
//                         {challenge.rating}
//                       </td>
//                       <td className="p-4 text-neutral-300 font-medium">
//                         {challenge.timeControl} ({challenge.mode})
//                       </td>
//                       <td className="p-4">
//                         <span
//                           className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
//                             challenge.variant === "Rated"
//                               ? "text-purple-400 bg-purple-950/30 border border-purple-500/10"
//                               : "text-neutral-400 bg-neutral-800"
//                           }`}
//                         >
//                           {challenge.variant}
//                         </span>
//                       </td>
//                       <td className="p-4 pr-6 text-right">
//                         <button className="px-4 py-1.5 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-[#ebd391] font-bold tracking-wider text-[10px] uppercase transition cursor-pointer">
//                           Accept
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
