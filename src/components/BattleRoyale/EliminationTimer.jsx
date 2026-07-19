import React from "react";
import { Timer } from "lucide-react";

export default function EliminationTimer({ timeRemaining }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const getColorClass = () => {
    if (timeRemaining <= 10) return "text-red-500 animate-ping duration-1000";
    if (timeRemaining <= 30) return "text-orange-400 font-bold";
    return "text-neutral-200";
  };

  return (
    <div className="flex items-center gap-2.5 bg-[#0a0f24] border border-white/5 px-4 py-2 rounded-full shadow-lg">
      <Timer
        className={`w-4 h-4 ${timeRemaining <= 30 ? "text-red-400 animate-pulse" : "text-neutral-400"}`}
      />
      <span className={`font-mono text-sm tracking-widest ${getColorClass()}`}>
        {formattedTime}
      </span>
    </div>
  );
}
