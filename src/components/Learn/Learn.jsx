import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Target, PlayCircle, ArrowRight } from "lucide-react";

// Mock data for luxury lesson modules
const LESSONS = [
  {
    id: 1,
    title: "Tactical Foundations",
    desc: "Master pins, forks, and essential motifs.",
    type: "puzzle",
    icon: Target,
    level: "Beginner",
  },
  {
    id: 2,
    title: "The Art of the Opening",
    desc: "Build an elegant, flawless opening repertoire.",
    type: "theory",
    icon: BookOpen,
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Grandmaster Endgames",
    desc: "Convert slight advantages into pure victories.",
    type: "video",
    icon: PlayCircle,
    level: "Advanced",
  },
];

export default function Learn() {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    // FIXED: Changed min-h-screen to h-fit so it dynamically scales without creating huge voids
    <div className="relative z-10 w-full h-fit text-white py-6">
      {/* Editorial Header Section */}
      <div className="mb-12 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Award className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Academy</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-4">
          Sharpen Your{" "}
          <span className="font-serif italic text-[#ebd391]">Intellect.</span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Delve into study architectures engineered to transform classical
          concepts into intuitive grandmaster reactions.
        </p>
      </div>

      {/* Main Study Grid Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LESSONS.map((lesson) => {
          const Icon = lesson.icon;
          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
              onClick={() => setSelectedModule(lesson.id)}
              className="group relative cursor-pointer bg-neutral-950/30 p-6 rounded-[22px] border border-white/5 backdrop-blur-xl flex flex-col justify-between h-52 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-[#a78bfa]/20 text-[#a78bfa]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] tracking-wider font-mono text-neutral-500 uppercase border border-neutral-800 px-2 py-0.5 rounded-md">
                    {lesson.level}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-neutral-200 group-hover:text-[#ebd391] transition-colors duration-300">
                  {lesson.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light tracking-wide mt-1.5 line-clamp-2">
                  {lesson.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs uppercase tracking-widest font-semibold text-neutral-400 group-hover:text-white transition-colors duration-300">
                <span>Start Study</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
