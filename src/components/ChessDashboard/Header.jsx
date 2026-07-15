import { Radio, Crown, Clock3 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C5CFF] via-[#6A5AF9] to-[#A67DFF] flex items-center justify-center shadow-[0_10px_30px_rgba(124,92,255,.35)]">
            <Crown className="text-white" size={24} strokeWidth={2.2} />
          </div>

          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0B0F1A]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">
              Anderssen vs Dufresne
            </h2>

            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
              LIVE
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Evergreen Game • Berlin • 1852
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <Clock3 size={15} className="text-slate-400" />

          <span className="text-sm font-medium text-slate-300">
            Autoplay Demo
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <Radio size={14} className="text-emerald-400 animate-pulse" />

          <span className="text-sm font-semibold text-emerald-400">Live</span>
        </div>
      </div>
    </header>
  );
}
