import { Quote, BarChart3, Layers3 } from "lucide-react";

export default function Sidebar({
  evaluation = "+1.35",
  move = "23 / 47",
  turn = "White to Move",
  commentary = "The Evans Gambit creates long-term attacking chances by sacrificing a pawn for rapid development and initiative.",
}) {
  return (
    <aside className="w-[220px] flex-shrink-0 flex flex-col gap-3">
      {/* Evaluation */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 size={16} className="text-[#8B73FF]" />

          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Evaluation
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white">{evaluation}</h3>

        <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#A77DFF]"
            style={{ width: "72%" }}
          />
        </div>
      </div>

      {/* Game Status */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Layers3 size={16} className="text-[#8B73FF]" />

          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Game Status
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Move</span>
            <span className="font-semibold text-white">{move}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Turn</span>
            <span className="font-semibold text-[#8B73FF] text-right">
              {turn}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Opening</span>
            <span className="font-semibold text-white text-right">
              Evans Gambit
            </span>
          </div>
        </div>
      </div>

      {/* Commentary */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Quote size={16} className="text-[#8B73FF]" />

          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Commentary
          </span>
        </div>

        <p className="text-[13px] leading-6 text-slate-300">{commentary}</p>
      </div>
    </aside>
  );
}
