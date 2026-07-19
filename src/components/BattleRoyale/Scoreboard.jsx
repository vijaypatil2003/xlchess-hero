import React from "react";
import { PLAYERS } from "../../components/constants/players";
import { Trophy, ShieldAlert } from "lucide-react";

export default function Scoreboard({
  scores,
  eliminatedIds,
  lowestScorerId,
  byePlayerId,
}) {
  const rankedPlayers = [...PLAYERS].sort((a, b) => {
    const isElimA = eliminatedIds.has(a.id);
    const isElimB = eliminatedIds.has(b.id);
    if (isElimA && !isElimB) return 1;
    if (!isElimA && isElimB) return -1;
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });

  return (
    <div className="w-full lg:w-72 shrink-0 bg-[#0a0f24] p-5 rounded-2xl border border-white/5 flex flex-col gap-4 shadow-xl">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <Trophy className="w-4 h-4 text-[#ebd391]" />
        <h3 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold">
          Live Arenas Standings
        </h3>
      </div>

      <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[400px] pr-1">
        {rankedPlayers.map((p) => {
          const isEliminated = eliminatedIds.has(p.id);
          const isAtRisk = p.id === lowestScorerId;
          const hasBye = p.id === byePlayerId;

          return (
            <div
              key={p.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 ${
                isEliminated
                  ? "bg-neutral-900/20 border-transparent opacity-40 line-through text-neutral-500"
                  : isAtRisk
                    ? "bg-red-950/20 border-red-500/40 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.15)]"
                    : "bg-white/[0.02] border-white/5 text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-xs w-4"
                  style={{ color: isEliminated ? "#555" : p.color }}
                >
                  {p.avatar}
                </span>
                <span className="text-xs font-medium tracking-wide truncate max-w-[120px]">
                  {p.name}
                </span>
                {hasBye && (
                  <span className="text-[8px] bg-indigo-950 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    Bye
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold">
                  {scores[p.id] || 0} pts
                </span>
                {isAtRisk && !isEliminated && (
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
