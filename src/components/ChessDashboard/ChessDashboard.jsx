import { useMemo, useState } from "react";
import { Chess } from "chess.js";

import Header from "./Header";
import ChessBoard from "./ChessBoard";
import Sidebar from "./Sidebar";
import Controls from "./Controls";

export default function ChessDashboard() {
  const chess = useMemo(() => new Chess(), []);

  const [position, setPosition] = useState(chess.fen());

  const [playing, setPlaying] = useState(false);

  const [sound, setSound] = useState(true);

  const [speed, setSpeed] = useState(1);

  const [lastMove, setLastMove] = useState(null);

  const playDemoMove = () => {
    if (chess.isGameOver()) return;

    const moves = chess.moves({ verbose: true });

    if (!moves.length) return;

    const move = moves[Math.floor(Math.random() * moves.length)];

    chess.move(move);

    setPosition(chess.fen());

    setLastMove({
      from: move.from,
      to: move.to,
    });
  };

  return (
    <section className="relative w-full">
      {/* Background Glow */}

      <div className="absolute inset-0 rounded-[40px] bg-[#7C5CFF]/10 blur-[120px]" />

      <div className="relative rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,.45)] p-6">
        <Header />

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          <ChessBoard position={position} lastMove={lastMove} />

          <Sidebar
            evaluation="+1.42"
            move="12 / 47"
            turn="White to Move"
            commentary="The Evans Gambit gives White rapid development and attacking chances."
          />
        </div>

        <Controls
          playing={playing}
          sound={sound}
          speed={speed}
          onPlayPause={() => {
            setPlaying(!playing);

            if (!playing) {
              playDemoMove();
            }
          }}
          onPrevious={() => {}}
          onNext={() => playDemoMove()}
          onReplay={() => {
            chess.reset();
            setPosition(chess.fen());
            setLastMove(null);
          }}
          onSound={() => setSound(!sound)}
          onSpeedChange={(v) => setSpeed(v)}
        />
      </div>
    </section>
  );
}
