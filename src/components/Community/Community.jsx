import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Shield,
  Flame,
  MessageCircle,
  Heart,
  ArrowRight,
} from "lucide-react";

// Mock Data for Premium Forum Threads
const DISCUSSIONS = [
  {
    id: 1,
    title: "Is the Classical Sicilian opening dying at Super-GM levels?",
    author: "Giri_Style",
    replies: 142,
    likes: 389,
    tag: "Theory",
  },
  {
    id: 2,
    title: "Analyzing AlphaZero's positional piece sacrifices in the endgame",
    author: "Stockfish_Breaker",
    replies: 98,
    likes: 512,
    tag: "Analysis",
  },
  {
    id: 3,
    title: "Official Club Tournament: The Obsidian Cup registration open",
    author: "XL_Admin",
    replies: 64,
    likes: 230,
    tag: "Events",
  },
];

// Mock Data for Luxury Chess Factions
const CLUBS = [
  {
    name: "The Vanguard Elite",
    members: "4.2K",
    powerRating: 2750,
    crestColor: "bg-purple-900/40 text-[#a78bfa] border-[#a78bfa]/20",
  },
  {
    name: "Champagne Gambit Club",
    members: "2.8K",
    powerRating: 2610,
    crestColor: "bg-[#d4af37]/15 text-[#ebd391] border-[#d4af37]/20",
  },
];

export default function Community() {
  return (
    <div className="relative z-10 w-full text-white py-6 flex flex-col gap-16">
      {/* Editorial Header Section */}
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Users className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>The Guild</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
          Unite the{" "}
          <span className="font-serif italic text-[#ebd391]">Minds.</span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Engage with factions, debate high-level theoretical opening trends,
          and immerse yourself in the social core of premium competitive
          tactical artistry.
        </p>
      </div>

      {/* Grid Layout: Left Side Forum Threads / Right Side Factions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Hot Discussions (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Live Debates & Insights
          </h2>

          <div className="flex flex-col gap-4">
            {DISCUSSIONS.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ y: -3, bg: "rgba(255,255,255,0.02)" }}
                className="p-5 bg-neutral-950/20 rounded-[22px] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer backdrop-blur-md transition-all duration-300"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                      {topic.tag}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-light">
                      by @{topic.author}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-[#ebd391] transition-colors line-clamp-2">
                    {topic.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 self-end sm:self-center shrink-0">
                  <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" /> {topic.replies}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" /> {topic.likes}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Factions & Guilds (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Elite Factions
          </h2>

          <div className="flex flex-col gap-4">
            {CLUBS.map((club, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-5 bg-neutral-950/30 rounded-[22px] border border-white/5 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-center ${club.crestColor}`}
                  >
                    <Shield className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-neutral-200 group-hover:text-[#ebd391] transition-colors">
                      {club.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                      {club.members} Lords • {club.powerRating} Power
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}

            {/* Premium Call-to-action */}
            <button className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 text-xs tracking-widest uppercase font-bold transition duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-pointer hover:brightness-110">
              Form Custom Faction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
