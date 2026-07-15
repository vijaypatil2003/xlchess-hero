import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function Controls({
  playing,
  sound,
  speed,
  onPlayPause,
  onPrevious,
  onNext,
  onReplay,
  onSound,
  onSpeedChange,
}) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-5">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <IconButton onClick={onPrevious}>
            <SkipBack size={18} />
          </IconButton>

          <button
            onClick={onPlayPause}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#6F5BFF] to-[#9A7DFF] text-white shadow-[0_15px_40px_rgba(111,91,255,.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {playing ? (
              <Pause size={20} fill="white" />
            ) : (
              <Play size={20} fill="white" />
            )}
          </button>

          <IconButton onClick={onNext}>
            <SkipForward size={18} />
          </IconButton>

          <IconButton onClick={onReplay}>
            <RotateCcw size={18} />
          </IconButton>
        </div>

        {/* Right Controls */}

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onSound}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 transition hover:border-[#7C5CFF]/40 hover:bg-white/[0.06]"
          >
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}

            {sound ? "Sound On" : "Muted"}
          </button>

          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 outline-none transition hover:border-[#7C5CFF]/40"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:border-[#7C5CFF]/40 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </button>
  );
}
