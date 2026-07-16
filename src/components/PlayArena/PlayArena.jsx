import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { motion } from "framer-motion";
import { Swords, RotateCcw, AlertCircle, Crown } from "lucide-react";

import LocalParticleSystem from "./LocalParticleSystem";
import {
  createCaptureParticles,
  createMoveParticles,
} from "../ChessDashboard/animations";

// FIX (board color option): named theme presets for the board squares.
// "midnight" uses the exact same hex values the board already had, so
// nothing visually changes unless the user actively picks a different one.
const BOARD_THEMES = {
  midnight: { name: "Midnight Violet", light: "#251f38", dark: "#161224" },
  onyxGold: { name: "Onyx Gold", light: "#2a2118", dark: "#171310" },
  emerald: { name: "Emerald Noir", light: "#16241f", dark: "#0e1613" },
  crimson: { name: "Crimson Dusk", light: "#2a1620", dark: "#180d13" },
};

const START_TIME_SECONDS = 10 * 60; // 10 minute clock per side

export default function PlayArena() {
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(() => game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState("w");
  const [gameStatus, setGameStatus] = useState("");
  const [winner, setWinner] = useState(null); // 'w' | 'b' | null (null = draw)

  // Track captured pieces
  const [capturedByWhite, setCapturedByWhite] = useState([]);
  const [capturedByBlack, setCapturedByBlack] = useState([]);

  // Live premium physics particles system state
  const [particles, setParticles] = useState([]);

  // FIX (board color option): which square theme is active
  const [boardTheme, setBoardTheme] = useState("midnight");

  // FIX (clock): per-side countdown clock state
  const [whiteTime, setWhiteTime] = useState(START_TIME_SECONDS);
  const [blackTime, setBlackTime] = useState(START_TIME_SECONDS);
  const [timeUp, setTimeUp] = useState(false);

  // Premium Glyph Map matching your exact royal look
  // FIX: shapes were previously swapped — the gold/black side was using the
  // outlined unicode glyphs and the white side was using the filled unicode
  // glyphs, which fought against the color styling below (most visible on
  // the pawn). Filled glyphs now go with the gold/black side, outlined
  // glyphs go with the white side, matching how each side is colored.
  //
  // FIX (pawn color mismatch): the filled pawn glyph (♟) specifically gets
  // rendered by some browsers/fonts as a colored "emoji-style" symbol that
  // ignores the text-color CSS below, while the other piece glyphs don't
  // have this problem. Appending the U+FE0E "text presentation selector"
  // forces it to render as a plain monochrome glyph like the rest, so it
  // follows the same gold color as every other black piece.
  const PIECE_GLYPHS = {
    p: "♟\uFE0E",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚", // Gold Side (Black pieces internally)
    P: "♙\uFE0E",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔", // White/Violet Side (White pieces internally)
  };

  // Synthesized HTML5 Audio Engine for zero-asset tactile feedback
  const playChessSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === "capture") {
        // --- DESTRUCTIVE CAPTURE SOUND ---
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(120, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(800, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(
          150,
          ctx.currentTime + 0.25,
        );

        gain1.gain.setValueAtTime(0.3, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.3);
        osc2.stop(ctx.currentTime + 0.25);
      } else {
        // --- ORGANIC WOODY MOVE THUD ---
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);

        gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + 0.12,
        );

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (err) {
      console.warn("Audio Context block muted by browser configuration:", err);
    }
  };

  // FIX (clock): format seconds as m:ss
  const formatTime = (totalSeconds) => {
    const clamped = Math.max(0, totalSeconds);
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // FIX (clock): ticks down whichever side's turn it currently is, once per
  // second, and stops automatically once the game has ended for any reason
  // (checkmate, draw, or a side running out of time).
  useEffect(() => {
    if (gameStatus || timeUp) return;

    const interval = setInterval(() => {
      if (turn === "w") {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            setTimeUp(true);
            setWinner("b");
            setGameStatus("White ran out of time. Black wins on the clock.");
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            setTimeUp(true);
            setWinner("w");
            setGameStatus("Black ran out of time. White wins on the clock.");
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, gameStatus, timeUp]);

  const handleSquareClick = (e, row, col) => {
    if (game.isGameOver() || timeUp) return;

    const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

    // 1. If no piece is selected, pick up current turn's piece
    if (!selectedSquare) {
      const piece = game.get(squareName);
      if (piece && piece.color === turn) {
        setSelectedSquare(squareName);
      }
      return;
    }

    // 2. Try executing the move
    try {
      const sourcePiece = game.get(selectedSquare);
      const targetPiece = game.get(squareName);

      // Rule correction check for proper piece lifecycle progression
      const isPawn = sourcePiece.type === "p";
      const isPromotingRow = row === 0 || row === 7;
      const moveConfig = {
        from: selectedSquare,
        to: squareName,
      };

      if (isPawn && isPromotingRow) {
        moveConfig.promotion = "q";
      }

      const move = game.move(moveConfig);

      if (move) {
        // Find center pixel of the target square to explode particles from it
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect =
          e.currentTarget.parentElement.getBoundingClientRect();
        const targetX = rect.left - parentRect.left + rect.width / 2;
        const targetY = rect.top - parentRect.top + rect.height / 2;

        // Check if a piece was captured
        if (move.captured) {
          // Add to lists
          if (turn === "w") {
            setCapturedByWhite((prev) => [
              ...prev,
              move.captured.toUpperCase(),
            ]);
          } else {
            setCapturedByBlack((prev) => [
              ...prev,
              move.captured.toLowerCase(),
            ]);
          }

          // Trigger capture sound & explosive royal cosmic burst animation
          playChessSound("capture");
          const newParticles = createCaptureParticles(targetX, targetY);
          setParticles(newParticles);
        } else {
          // Trigger move sound & regular elegant move drift
          playChessSound("move");
          const newParticles = createMoveParticles(targetX, targetY);
          setParticles(newParticles);
        }

        // Update states
        setBoard(game.board());
        setTurn(game.turn());
        setSelectedSquare(null);

        if (game.isCheckmate()) {
          setWinner(turn);
          setGameStatus(
            `Checkmate! ${turn === "w" ? "White" : "Black"} claims ultimate victory.`,
          );
        } else if (game.isDraw()) {
          setWinner(null);
          setGameStatus("The battle ends in an honorable Draw.");
        }
      } else {
        // Change selection if clicking another piece of their own color
        const piece = game.get(squareName);
        if (piece && piece.color === turn) {
          setSelectedSquare(squareName);
        } else {
          setSelectedSquare(null);
        }
      }
    } catch (error) {
      setSelectedSquare(null);
    }
  };

  const resetMatch = () => {
    const freshGame = new Chess();
    setGame(freshGame);
    setBoard(freshGame.board());
    setSelectedSquare(null);
    setTurn("w");
    setGameStatus("");
    setWinner(null);
    setCapturedByWhite([]);
    setCapturedByBlack([]);
    setParticles([]);
    setWhiteTime(START_TIME_SECONDS);
    setBlackTime(START_TIME_SECONDS);
    setTimeUp(false);
  };

  const theme = BOARD_THEMES[boardTheme];

  return (
    // FIX #1: h-screen + overflow-hidden so this section never triggers page scroll.
    // Padding/gap trimmed slightly (values only, not colors/fonts) to help everything
    // fit inside one viewport on shorter screens.
    <div className="relative z-10 w-full h-screen max-h-screen overflow-hidden text-white py-4 flex flex-col gap-6">
      {/* Editorial Header */}
      <div className="max-w-xl shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
          <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Combat Theatre</span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-3">
          Local{" "}
          <span className="font-serif italic text-[#ebd391]">
            Versus Arena.
          </span>
        </h1>
        <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
          Two players. One screen. An uncompromising battle of pure strategy
          completely isolated from systemic simulation.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center flex-1 min-h-0">
        {/* INTERACTIVE CHESSBOARD CONTAINER */}
        <div className="relative border border-[#d4af37]/20 p-3 bg-[#0c0914] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Mount the Particle System layered directly on the board container */}
          <LocalParticleSystem particles={particles} />

          {/*
            FIX (clock): Black's clock, shown above the board — mirrors a
            real chess clock's layout since Black's pieces sit on top of
            this board. No background box, just glowing small mono text.
            Pulses gently while it's actually Black's turn.
          */}
          <div className="relative z-10 flex items-center justify-between px-1 mb-1.5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
              Black
            </span>
            <span
              className={`font-mono text-xs tracking-widest drop-shadow-[0_0_6px_rgba(212,175,55,0.55)] ${
                turn === "b" && !gameStatus
                  ? "text-[#ebd391] animate-pulse"
                  : "text-[#ebd391]/50"
              }`}
            >
              {formatTime(blackTime)}
            </span>
          </div>

          {/*
            FIX #2 (also fixes FIX #3): the board now uses an explicit
            8x8 grid template (equal fr units for both rows AND columns)
            instead of only grid-cols-8. Previously rows with no piece
            content had no height driver and collapsed thin, while rows
            with pieces stayed tall — making the board look sliced and,
            as more squares emptied out during play, making later-game
            squares too thin to click accurately (this is why play
            appeared to "stop" after a handful of moves). Square size is
            unchanged (still maxes out at 480px like the original) but is
            now also capped by viewport height so it never forces a scroll.
          */}
          <div
            className="grid w-[min(65vh,320px)] h-[min(65vh,320px)] sm:w-[min(58vh,480px)] sm:h-[min(58vh,480px)] border border-neutral-800 relative z-10"
            style={{
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "repeat(8, 1fr)",
            }}
          >
            {board.map((rowArr, rowIndex) =>
              rowArr.map((piece, colIndex) => {
                const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
                const isDark = (rowIndex + colIndex) % 2 === 1;
                const isSelected = selectedSquare === squareName;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={(e) => handleSquareClick(e, rowIndex, colIndex)}
                    // FIX (board color option): square color now comes from
                    // the selected theme via inline style instead of a fixed
                    // Tailwind class, so it can be swapped live. The default
                    // "midnight" theme uses these exact same hex values, so
                    // nothing looks different until another swatch is picked.
                    style={{
                      backgroundColor: isDark ? theme.dark : theme.light,
                    }}
                    className={`relative flex items-center justify-center cursor-pointer select-none text-2xl sm:text-4xl transition-all duration-150 ${
                      isSelected
                        ? "ring-2 ring-inset ring-[#ebd391] bg-[#ebd391]/10"
                        : ""
                    }`}
                  >
                    {piece && (
                      <span
                        className={`transform active:scale-95 transition-transform ${
                          piece.color === "w"
                            ? "text-neutral-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            : "text-[#ebd391]"
                        }`}
                      >
                        {
                          PIECE_GLYPHS[
                            piece.color === "w"
                              ? piece.type.toUpperCase()
                              : piece.type
                          ]
                        }
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          {/*
            FIX (clock): White's clock, shown below the board — mirrors a
            real chess clock's layout since White's pieces sit at the
            bottom of this board.
          */}
          <div className="relative z-10 flex items-center justify-between px-1 mt-1.5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
              White
            </span>
            <span
              className={`font-mono text-xs tracking-widest drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] ${
                turn === "w" && !gameStatus
                  ? "text-neutral-100 animate-pulse"
                  : "text-neutral-100/50"
              }`}
            >
              {formatTime(whiteTime)}
            </span>
          </div>

          {/*
            FIX: prominent end-of-game overlay. The old side-panel status
            line is still there (kept, unchanged) but was easy to miss —
            this sits directly over the board so a checkmate/draw can't be
            forgotten, using the same dark/gold styling as the rest of the UI.
          */}
          {gameStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-3 z-30 flex items-center justify-center bg-[#0c0914]/90 backdrop-blur-sm rounded-xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center text-center gap-4 px-6"
              >
                <Crown className="w-8 h-8 text-[#d4af37]" />
                <h2 className="font-light text-3xl sm:text-4xl tracking-tight text-neutral-100 leading-tight">
                  {winner ? (
                    <>
                      {game.isCheckmate() ? "Checkmate." : "Time's Up."}{" "}
                      <span className="font-serif italic text-[#ebd391]">
                        {winner === "w" ? "White" : "Black"} Wins.
                      </span>
                    </>
                  ) : (
                    <span className="font-serif italic text-[#ebd391]">
                      Draw.
                    </span>
                  )}
                </h2>
                <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide max-w-xs">
                  {gameStatus}
                </p>
                <button
                  onClick={resetMatch}
                  className="mt-2 px-6 py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Play Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* PREMIUM CONTROLS PANEL */}
        <div className="w-full lg:w-80 flex flex-col gap-6 bg-neutral-950/20 p-6 rounded-[22px] border border-white/5 backdrop-blur-md h-fit justify-between">
          {" "}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold border-b border-white/5 pb-2">
              Match Status
            </h3>

            <div className="flex items-center justify-between text-sm font-light">
              <span className="text-neutral-400">Current Turn:</span>
              <span
                className={`px-3 py-1 rounded-full font-mono text-xs uppercase ${
                  turn === "w"
                    ? "bg-white text-black font-bold"
                    : "bg-[#d4af37]/15 text-[#ebd391] border border-[#d4af37]/30"
                }`}
              >
                {turn === "w" ? "White To Move" : "Black To Move"}
              </span>
            </div>

            {/* TROPHY CASE: CAPTURED PIECES DISPLAY */}
            <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                Captured War Assets
              </span>

              {/* Captured by White (Shows dead gold pieces) */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-neutral-400 font-light">
                  White's Loot:
                </span>
                <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-[#ebd391]">
                  {capturedByWhite.map((p, i) => (
                    <span key={i} className="select-none">
                      {PIECE_GLYPHS[p.toLowerCase()]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Captured by Black (Shows dead white pieces) */}
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] text-neutral-400 font-light">
                  Black's Loot:
                </span>
                <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-neutral-100">
                  {capturedByBlack.map((p, i) => (
                    <span key={i} className="select-none">
                      {PIECE_GLYPHS[p.toUpperCase()]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* FIX (board color option): theme swatch picker */}
            <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                Board Theme
              </span>
              <div className="flex items-center gap-2">
                {Object.entries(BOARD_THEMES).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setBoardTheme(key)}
                    title={t.name}
                    className={`w-6 h-6 rounded-full overflow-hidden border transition-all cursor-pointer ${
                      boardTheme === key
                        ? "border-[#ebd391] scale-110"
                        : "border-white/15 hover:border-white/40"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${t.light} 50%, ${t.dark} 50%)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {gameStatus && (
              <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl flex items-start gap-2 text-xs text-purple-200 mt-2">
                <AlertCircle className="w-4 h-4 text-[#ebd391] shrink-0 mt-0.5" />
                <span>{gameStatus}</span>
              </div>
            )}
          </div>
          <button
            onClick={resetMatch}
            className="w-full py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Battlefield
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================

// import React, { useState } from "react";
// import { Chess } from "chess.js";
// import { motion } from "framer-motion";
// import { Swords, RotateCcw, AlertCircle, Crown } from "lucide-react";

// import LocalParticleSystem from "./LocalParticleSystem";
// import {
// createCaptureParticles,
// createMoveParticles,
// } from "../ChessDashboard/animations";

// export default function PlayArena() {
// const [game, setGame] = useState(() => new Chess());
// const [board, setBoard] = useState(() => game.board());
// const [selectedSquare, setSelectedSquare] = useState(null);
// const [turn, setTurn] = useState("w");
// const [gameStatus, setGameStatus] = useState("");

// // Track captured pieces
// const [capturedByWhite, setCapturedByWhite] = useState([]);
// const [capturedByBlack, setCapturedByBlack] = useState([]);

// // Live premium physics particles system state
// const [particles, setParticles] = useState([]);

// // Premium Glyph Map matching your exact royal look
// // FIX: shapes were previously swapped — the gold/black side was using the
// // outlined unicode glyphs and the white side was using the filled unicode
// // glyphs, which fought against the color styling below (most visible on
// // the pawn). Filled glyphs now go with the gold/black side, outlined
// // glyphs go with the white side, matching how each side is colored.
// const PIECE_GLYPHS = {
//     p: "♟",
//     r: "♜",
//     n: "♞",
//     b: "♝",
//     q: "♛",
//     k: "♚", // Gold Side (Black pieces internally)
//     P: "♙",
//     R: "♖",
//     N: "♘",
//     B: "♗",
//     Q: "♕",
//     K: "♔", // White/Violet Side (White pieces internally)
// };

// // Synthesized HTML5 Audio Engine for zero-asset tactile feedback
// const playChessSound = (type) => {
//     try {
//     const AudioContext = window.AudioContext || window.webkitAudioContext;
//     if (!AudioContext) return;
//     const ctx = new AudioContext();

//     if (type === "capture") {
//         // --- DESTRUCTIVE CAPTURE SOUND ---
//         const osc1 = ctx.createOscillator();
//         const gain1 = ctx.createGain();
//         osc1.type = "triangle";
//         osc1.frequency.setValueAtTime(120, ctx.currentTime);
//         osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

//         const osc2 = ctx.createOscillator();
//         const gain2 = ctx.createGain();
//         osc2.type = "sine";
//         osc2.frequency.setValueAtTime(800, ctx.currentTime);
//         osc2.frequency.exponentialRampToValueAtTime(
//         150,
//         ctx.currentTime + 0.25,
//         );

//         gain1.gain.setValueAtTime(0.3, ctx.currentTime);
//         gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

//         gain2.gain.setValueAtTime(0.15, ctx.currentTime);
//         gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

//         osc1.connect(gain1);
//         gain1.connect(ctx.destination);
//         osc2.connect(gain2);
//         gain2.connect(ctx.destination);

//         osc1.start();
//         osc2.start();
//         osc1.stop(ctx.currentTime + 0.3);
//         osc2.stop(ctx.currentTime + 0.25);
//     } else {
//         // --- ORGANIC WOODY MOVE THUD ---
//         const osc = ctx.createOscillator();
//         const gainNode = ctx.createGain();

//         osc.type = "sine";
//         osc.frequency.setValueAtTime(320, ctx.currentTime);
//         osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);

//         gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(
//         0.001,
//         ctx.currentTime + 0.12,
//         );

//         osc.connect(gainNode);
//         gainNode.connect(ctx.destination);

//         osc.start();
//         osc.stop(ctx.currentTime + 0.12);
//     }
//     } catch (err) {
//     console.warn("Audio Context block muted by browser configuration:", err);
//     }
// };

// const handleSquareClick = (e, row, col) => {
//     if (game.isGameOver()) return;

//     const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

//     // 1. If no piece is selected, pick up current turn's piece
//     if (!selectedSquare) {
//     const piece = game.get(squareName);
//     if (piece && piece.color === turn) {
//         setSelectedSquare(squareName);
//     }
//     return;
//     }

//     // 2. Try executing the move
//     try {
//     const sourcePiece = game.get(selectedSquare);
//     const targetPiece = game.get(squareName);

//     // Rule correction check for proper piece lifecycle progression
//     const isPawn = sourcePiece.type === "p";
//     const isPromotingRow = row === 0 || row === 7;
//     const moveConfig = {
//         from: selectedSquare,
//         to: squareName,
//     };

//     if (isPawn && isPromotingRow) {
//         moveConfig.promotion = "q";
//     }

//     const move = game.move(moveConfig);

//     if (move) {
//         // Find center pixel of the target square to explode particles from it
//         const rect = e.currentTarget.getBoundingClientRect();
//         const parentRect =
//         e.currentTarget.parentElement.getBoundingClientRect();
//         const targetX = rect.left - parentRect.left + rect.width / 2;
//         const targetY = rect.top - parentRect.top + rect.height / 2;

//         // Check if a piece was captured
//         if (move.captured) {
//         // Add to lists
//         if (turn === "w") {
//             setCapturedByWhite((prev) => [
//             ...prev,
//             move.captured.toUpperCase(),
//             ]);
//         } else {
//             setCapturedByBlack((prev) => [
//             ...prev,
//             move.captured.toLowerCase(),
//             ]);
//         }

//         // Trigger capture sound & explosive royal cosmic burst animation
//         playChessSound("capture");
//         const newParticles = createCaptureParticles(targetX, targetY);
//         setParticles(newParticles);
//         } else {
//         // Trigger move sound & regular elegant move drift
//         playChessSound("move");
//         const newParticles = createMoveParticles(targetX, targetY);
//         setParticles(newParticles);
//         }

//         // Update states
//         setBoard(game.board());
//         setTurn(game.turn());
//         setSelectedSquare(null);

//         if (game.isCheckmate()) {
//         setGameStatus(
//             `Checkmate! ${turn === "w" ? "White" : "Black"} claims ultimate victory.`,
//         );
//         } else if (game.isDraw()) {
//         setGameStatus("The battle ends in an honorable Draw.");
//         }
//     } else {
//         // Change selection if clicking another piece of their own color
//         const piece = game.get(squareName);
//         if (piece && piece.color === turn) {
//         setSelectedSquare(squareName);
//         } else {
//         setSelectedSquare(null);
//         }
//     }
//     } catch (error) {
//     setSelectedSquare(null);
//     }
// };

// const resetMatch = () => {
//     const freshGame = new Chess();
//     setGame(freshGame);
//     setBoard(freshGame.board());
//     setSelectedSquare(null);
//     setTurn("w");
//     setGameStatus("");
//     setCapturedByWhite([]);
//     setCapturedByBlack([]);
//     setParticles([]);
// };

// return (
//     // FIX #1: h-screen + overflow-hidden so this section never triggers page scroll.
//     // Padding/gap trimmed slightly (values only, not colors/fonts) to help everything
//     // fit inside one viewport on shorter screens.
//     <div className="relative z-10 w-full h-screen max-h-screen overflow-hidden text-white py-4 flex flex-col gap-6">
//     {/* Editorial Header */}
//     <div className="max-w-xl shrink-0">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
//         <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
//         <span>Combat Theatre</span>
//         </div>
//         <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-3">
//         Local{" "}
//         <span className="font-serif italic text-[#ebd391]">
//             Versus Arena.
//         </span>
//         </h1>
//         <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
//         Two players. One screen. An uncompromising battle of pure strategy
//         completely isolated from systemic simulation.
//         </p>
//     </div>

//     {/* Main Layout Grid */}
//     <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center flex-1 min-h-0">
//         {/* INTERACTIVE CHESSBOARD CONTAINER */}
//         <div className="relative border border-[#d4af37]/20 p-3 bg-[#0c0914] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
//         {/* Mount the Particle System layered directly on the board container */}
//         <LocalParticleSystem particles={particles} />

//         {/*
//             FIX #2 (also fixes FIX #3): the board now uses an explicit
//             8x8 grid template (equal fr units for both rows AND columns)
//             instead of only grid-cols-8. Previously rows with no piece
//             content had no height driver and collapsed thin, while rows
//             with pieces stayed tall — making the board look sliced and,
//             as more squares emptied out during play, making later-game
//             squares too thin to click accurately (this is why play
//             appeared to "stop" after a handful of moves). Square size is
//             unchanged (still maxes out at 480px like the original) but is
//             now also capped by viewport height so it never forces a scroll.
//         */}
//         <div
//             className="grid w-[min(70vh,320px)] h-[min(70vh,320px)] sm:w-[min(65vh,480px)] sm:h-[min(65vh,480px)] border border-neutral-800 relative z-10"
//             style={{
//             gridTemplateColumns: "repeat(8, 1fr)",
//             gridTemplateRows: "repeat(8, 1fr)",
//             }}
//         >
//             {board.map((rowArr, rowIndex) =>
//             rowArr.map((piece, colIndex) => {
//                 const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
//                 const isDark = (rowIndex + colIndex) % 2 === 1;
//                 const isSelected = selectedSquare === squareName;

//                 return (
//                 <div
//                     key={`${rowIndex}-${colIndex}`}
//                     onClick={(e) => handleSquareClick(e, rowIndex, colIndex)}
//                     className={`relative flex items-center justify-center cursor-pointer select-none text-2xl sm:text-4xl transition-all duration-150 ${
//                     isDark ? "bg-[#161224]" : "bg-[#251f38]"
//                     } ${isSelected ? "ring-2 ring-inset ring-[#ebd391] bg-[#ebd391]/10" : ""}`}
//                 >
//                     {piece && (
//                     <span
//                         className={`transform active:scale-95 transition-transform ${
//                         piece.color === "w"
//                             ? "text-neutral-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
//                             : "text-[#ebd391]"
//                         }`}
//                     >
//                         {
//                         PIECE_GLYPHS[
//                             piece.color === "w"
//                             ? piece.type.toUpperCase()
//                             : piece.type
//                         ]
//                         }
//                     </span>
//                     )}
//                 </div>
//                 );
//             }),
//             )}
//         </div>

//         {/*
//             FIX: prominent end-of-game overlay. The old side-panel status
//             line is still there (kept, unchanged) but was easy to miss —
//             this sits directly over the board so a checkmate/draw can't be
//             forgotten, using the same dark/gold styling as the rest of the UI.
//         */}
//         {gameStatus && (
//             <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4 }}
//             className="absolute inset-3 z-30 flex items-center justify-center bg-[#0c0914]/90 backdrop-blur-sm rounded-xl"
//             >
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.1 }}
//                 className="flex flex-col items-center text-center gap-4 px-6"
//             >
//                 <Crown className="w-8 h-8 text-[#d4af37]" />
//                 <h2 className="font-light text-3xl sm:text-4xl tracking-tight text-neutral-100 leading-tight">
//                 {game.isCheckmate() ? (
//                     <>
//                     Checkmate.{" "}
//                     <span className="font-serif italic text-[#ebd391]">
//                         {turn === "w" ? "White" : "Black"} Wins.
//                     </span>
//                     </>
//                 ) : (
//                     <span className="font-serif italic text-[#ebd391]">
//                     Draw.
//                     </span>
//                 )}
//                 </h2>
//                 <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide max-w-xs">
//                 {gameStatus}
//                 </p>
//                 <button
//                 onClick={resetMatch}
//                 className="mt-2 px-6 py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
//                 >
//                 <RotateCcw className="w-3.5 h-3.5" /> Play Again
//                 </button>
//             </motion.div>
//             </motion.div>
//         )}
//         </div>

//         {/* PREMIUM CONTROLS PANEL */}
//         <div className="w-full lg:w-80 flex flex-col gap-6 bg-neutral-950/20 p-6 rounded-[22px] border border-white/5 backdrop-blur-md self-stretch justify-between overflow-y-auto">
//         <div className="flex flex-col gap-5">
//             <h3 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold border-b border-white/5 pb-2">
//             Match Status
//             </h3>

//             <div className="flex items-center justify-between text-sm font-light">
//             <span className="text-neutral-400">Current Turn:</span>
//             <span
//                 className={`px-3 py-1 rounded-full font-mono text-xs uppercase ${
//                 turn === "w"
//                     ? "bg-white text-black font-bold"
//                     : "bg-[#d4af37]/15 text-[#ebd391] border border-[#d4af37]/30"
//                 }`}
//             >
//                 {turn === "w" ? "White To Move" : "Black To Move"}
//             </span>
//             </div>

//             {/* TROPHY CASE: CAPTURED PIECES DISPLAY */}
//             <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-white/5">
//             <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
//                 Captured War Assets
//             </span>

//             {/* Captured by White (Shows dead gold pieces) */}
//             <div className="flex flex-col gap-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                 White's Loot:
//                 </span>
//                 {/*
//                 FIX #4: removed `line-through opacity-70` — captured
//                 pieces are now shown plainly, exactly as they looked
//                 on the board, with no cross/strike styling.
//                 */}
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-[#ebd391]">
//                 {capturedByWhite.map((p, i) => (
//                     <span key={i} className="select-none">
//                     {PIECE_GLYPHS[p.toLowerCase()]}
//                     </span>
//                 ))}
//                 </div>
//             </div>

//             {/* Captured by Black (Shows dead white pieces) */}
//             <div className="flex flex-col gap-1 mt-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                 Black's Loot:
//                 </span>
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-neutral-100">
//                 {capturedByBlack.map((p, i) => (
//                     <span key={i} className="select-none">
//                     {PIECE_GLYPHS[p.toUpperCase()]}
//                     </span>
//                 ))}
//                 </div>
//             </div>
//             </div>

//             {gameStatus && (
//             <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl flex items-start gap-2 text-xs text-purple-200 mt-2">
//                 <AlertCircle className="w-4 h-4 text-[#ebd391] shrink-0 mt-0.5" />
//                 <span>{gameStatus}</span>
//             </div>
//             )}
//         </div>

//         <button
//             onClick={resetMatch}
//             className="w-full py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
//         >
//             <RotateCcw className="w-3.5 h-3.5" /> Reset Battlefield
//         </button>
//         </div>

//     </div>
//     </div>
// );
// }

// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================

// import React, { useState } from "react";
// import { Chess } from "chess.js";
// import { motion } from "framer-motion";
// import { Swords, RotateCcw, AlertCircle } from "lucide-react";
// import LocalParticleSystem from "./LocalParticleSystem";
// import { createMoveParticles } from "../ChessDashboard/animations";
// // import {
// //   createCaptureParticles,
// //   createMoveParticles,
// // } from "../utils/animations";

// export default function PlayArena() {
//   const [game, setGame] = useState(() => new Chess());
//   const [board, setBoard] = useState(() => game.board());
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [turn, setTurn] = useState("w");
//   const [gameStatus, setGameStatus] = useState("");
//   const [capturedByWhite, setCapturedByWhite] = useState([]);
//   const [capturedByBlack, setCapturedByBlack] = useState([]);
//   const [particles, setParticles] = useState([]);

//   const PIECE_GLYPHS = {
//     p: "♙",
//     r: "♖",
//     n: "♘",
//     b: "♗",
//     q: "♕",
//     k: "♔",
//     P: "♟",
//     R: "♜",
//     N: "♞",
//     B: "♝",
//     Q: "♛",
//     K: "♚",
//   };

//   // =========================================================================
//   // LUXURY PROCEDURAL AUDIO AUDIO ENGINE (HTML5 Web Audio Synthesizer)
//   // =========================================================================
//   const playChessSound = (type) => {
//     try {
//       // Initialize browser sound architecture context securely
//       const AudioContext = window.AudioContext || window.webkitAudioContext;
//       if (!AudioContext) return;
//       const ctx = new AudioContext();

//       if (type === "capture") {
//         // --- EXPLOSIVE CAPTURE CRASH AUDIO ---
//         // Tone 1: Deep Impact
//         const osc1 = ctx.createOscillator();
//         const gain1 = ctx.createGain();
//         osc1.type = "triangle";
//         osc1.frequency.setValueAtTime(120, ctx.currentTime);
//         osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);

//         // Tone 2: Sharp Metallic Ring (Simulating Shattering Glass/Fractions)
//         const osc2 = ctx.createOscillator();
//         const gain2 = ctx.createGain();
//         osc2.type = "sine";
//         osc2.frequency.setValueAtTime(800, ctx.currentTime);
//         osc2.frequency.exponentialRampToValueAtTime(
//           150,
//           ctx.currentTime + 0.25,
//         );

//         // Dynamic Volume Envelopes
//         gain1.gain.setValueAtTime(0.3, ctx.currentTime);
//         gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

//         gain2.gain.setValueAtTime(0.15, ctx.currentTime);
//         gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

//         // Connections and Fire
//         osc1.connect(gain1);
//         gain1.connect(ctx.destination);
//         osc2.connect(gain2);
//         gain2.connect(ctx.destination);

//         osc1.start();
//         osc2.start();
//         osc1.stop(ctx.currentTime + 0.3);
//         osc2.stop(ctx.currentTime + 0.25);
//       } else {
//         // --- ELEGANT STANDARD MOVE KNOCK AUDIO ---
//         const osc = ctx.createOscillator();
//         const gainNode = ctx.createGain();

//         // Simulating the organic woody "thud" frequency response of premium wood
//         osc.type = "sine";
//         osc.frequency.setValueAtTime(320, ctx.currentTime);
//         osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);

//         gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
//         gainNode.gain.exponentialRampToValueAtTime(
//           0.001,
//           ctx.currentTime + 0.12,
//         );

//         osc.connect(gainNode);
//         gainNode.connect(ctx.destination);

//         osc.start();
//         osc.stop(ctx.currentTime + 0.12);
//       }
//     } catch (err) {
//       console.warn("Audio context ecosystem failed to warm up:", err);
//     }
//   };
//   // =========================================================================

//   const handleSquareClick = (e, row, col) => {
//     if (game.isGameOver()) return;

//     const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

//     if (!selectedSquare) {
//       const piece = game.get(squareName);
//       if (piece && piece.color === turn) {
//         setSelectedSquare(squareName);
//       }
//       return;
//     }

//     try {
//       const sourcePiece = game.get(selectedSquare);

//       const isPawn = sourcePiece.type === "p";
//       const isPromotingRow = row === 0 || row === 7;
//       const moveConfig = { from: selectedSquare, to: squareName };

//       if (isPawn && isPromotingRow) {
//         moveConfig.promotion = "q";
//       }

//       const move = game.move(moveConfig);

//       if (move) {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const parentRect =
//           e.currentTarget.parentElement.getBoundingClientRect();
//         const targetX = rect.left - parentRect.left + rect.width / 2;
//         const targetY = rect.top - parentRect.top + rect.height / 2;

//         if (move.captured) {
//           if (turn === "w") {
//             setCapturedByWhite((prev) => [
//               ...prev,
//               move.captured.toUpperCase(),
//             ]);
//           } else {
//             setCapturedByBlack((prev) => [
//               ...prev,
//               move.captured.toLowerCase(),
//             ]);
//           }

//           // 1. Play Capture Audio & Trigger Massive Spark Particles
//           playChessSound("capture");
//           setParticles(createCaptureParticles(targetX, targetY));
//         } else {
//           // 2. Play Standard Move Audio & Trigger Slide Particles
//           playChessSound("move");
//           setParticles(createMoveParticles(targetX, targetY));
//         }

//         setBoard(game.board());
//         setTurn(game.turn());
//         setSelectedSquare(null);

//         if (game.isCheckmate()) {
//           setGameStatus(
//             `Checkmate! ${turn === "w" ? "White" : "Black"} claims ultimate victory.`,
//           );
//         } else if (game.isDraw()) {
//           setGameStatus("The battle ends in an honorable Draw.");
//         }
//       } else {
//         const piece = game.get(squareName);
//         if (piece && piece.color === turn) {
//           setSelectedSquare(squareName);
//         } else {
//           setSelectedSquare(null);
//         }
//       }
//     } catch (error) {
//       setSelectedSquare(null);
//     }
//   };

//   const resetMatch = () => {
//     const freshGame = new Chess();
//     setGame(freshGame);
//     setBoard(freshGame.board());
//     setSelectedSquare(null);
//     setTurn("w");
//     setGameStatus("");
//     setCapturedByWhite([]);
//     setCapturedByBlack([]);
//     setParticles([]);
//   };

//   return (
//     <div className="relative z-10 w-full text-white py-6 flex flex-col gap-10">
//       <div className="max-w-xl">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
//           <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
//           <span>Combat Theatre</span>
//         </div>
//         <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-3">
//           Local{" "}
//           <span className="font-serif italic text-[#ebd391]">
//             Versus Arena.
//           </span>
//         </h1>
//         <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
//           Two players. One screen. Fully engineered with synthesized wood
//           percussions and capture frequencies.
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">
//         {/* INTERACTIVE CHESSBOARD */}
//         <div className="relative border border-[#d4af37]/20 p-3 bg-[#0c0914] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
//           <LocalParticleSystem particles={particles} />

//           <div className="grid grid-cols-8 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] border border-neutral-800 relative z-10">
//             {board.map((rowArr, rowIndex) =>
//               rowArr.map((piece, colIndex) => {
//                 const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
//                 const isDark = (rowIndex + colIndex) % 2 === 1;
//                 const isSelected = selectedSquare === squareName;

//                 return (
//                   <div
//                     key={`${rowIndex}-${colIndex}`}
//                     onClick={(e) => handleSquareClick(e, rowIndex, colIndex)}
//                     className={`relative flex items-center justify-center cursor-pointer select-none text-2xl sm:text-4xl transition-all duration-150 ${
//                       isDark ? "bg-[#161224]" : "bg-[#251f38]"
//                     } ${isSelected ? "ring-2 ring-inset ring-[#ebd391] bg-[#ebd391]/10" : ""}`}
//                   >
//                     {piece && (
//                       <span
//                         className={`transform active:scale-95 transition-transform ${
//                           piece.color === "w"
//                             ? "text-neutral-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
//                             : "text-[#ebd391]"
//                         }`}
//                       >
//                         {
//                           PIECE_GLYPHS[
//                             piece.color === "w"
//                               ? piece.type.toUpperCase()
//                               : piece.type
//                           ]
//                         }
//                       </span>
//                     )}
//                   </div>
//                 );
//               }),
//             )}
//           </div>
//         </div>

//         {/* CONTROLS & STATUS PANEL */}
//         <div className="w-full lg:w-80 flex flex-col gap-6 bg-neutral-950/20 p-6 rounded-[22px] border border-white/5 backdrop-blur-md self-stretch justify-between">
//           <div className="flex flex-col gap-5">
//             <h3 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold border-b border-white/5 pb-2">
//               Match Status
//             </h3>

//             <div className="flex items-center justify-between text-sm font-light">
//               <span className="text-neutral-400">Current Turn:</span>
//               <span
//                 className={`px-3 py-1 rounded-full font-mono text-xs uppercase ${
//                   turn === "w"
//                     ? "bg-white text-black font-bold"
//                     : "bg-[#d4af37]/15 text-[#ebd391] border border-[#d4af37]/30"
//                 }`}
//               >
//                 {turn === "w" ? "White To Move" : "Black To Move"}
//               </span>
//             </div>

//             {/* TROPHY CASE */}
//             <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-white/5">
//               <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
//                 Captured War Assets
//               </span>

//               <div className="flex flex-col gap-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                   White's Loot:
//                 </span>
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-[#ebd391]">
//                   {capturedByWhite.map((p, i) => (
//                     <span key={i} className="line-through opacity-70">
//                       {PIECE_GLYPHS[p.toLowerCase()]}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex flex-col gap-1 mt-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                   Black's Loot:
//                 </span>
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-neutral-100">
//                   {capturedByBlack.map((p, i) => (
//                     <span key={i} className="line-through opacity-70">
//                       {PIECE_GLYPHS[p.toUpperCase()]}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {gameStatus && (
//               <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl flex items-start gap-2 text-xs text-purple-200 mt-2">
//                 <AlertCircle className="w-4 h-4 text-[#ebd391] shrink-0 mt-0.5" />
//                 <span>{gameStatus}</span>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={resetMatch}
//             className="w-full py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
//           >
//             <RotateCcw className="w-3.5 h-3.5" /> Reset Battlefield
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================
// ======================================================================================================================================

// import React, { useState } from "react";
// import { Chess } from "chess.js";
// import { motion } from "framer-motion";
// import { Swords, RotateCcw, AlertCircle } from "lucide-react";

// import LocalParticleSystem from "./LocalParticleSystem";
// import {
//   createCaptureParticles,
//   createMoveParticles,
// } from "../ChessDashboard/animations";

// export default function PlayArena() {
//   const [game, setGame] = useState(() => new Chess());
//   const [board, setBoard] = useState(() => game.board());
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [turn, setTurn] = useState("w");
//   const [gameStatus, setGameStatus] = useState("");

//   // Track captured pieces
//   const [capturedByWhite, setCapturedByWhite] = useState([]);
//   const [capturedByBlack, setCapturedByBlack] = useState([]);

//   // Live premium physics particles system state
//   const [particles, setParticles] = useState([]);

//   // Premium Glyph Map matching your exact royal look
//   const PIECE_GLYPHS = {
//     p: "♙",
//     r: "♖",
//     n: "♘",
//     b: "♗",
//     q: "♕",
//     k: "♔", // Gold Side (Black pieces internally)
//     P: "♟",
//     R: "♜",
//     N: "♞",
//     B: "♝",
//     Q: "♛",
//     K: "♚", // White/Violet Side (White pieces internally)
//   };

//   const handleSquareClick = (e, row, col) => {
//     if (game.isGameOver()) return;

//     const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

//     // 1. If no piece is selected, pick up current turn's piece
//     if (!selectedSquare) {
//       const piece = game.get(squareName);
//       if (piece && piece.color === turn) {
//         setSelectedSquare(squareName);
//       }
//       return;
//     }

//     // 2. Try executing the move
//     try {
//       const sourcePiece = game.get(selectedSquare);
//       const targetPiece = game.get(squareName);

//       const move = game.move({
//         from: selectedSquare,
//         to: squareName,
//         promotion: "q",
//       });

//       if (move) {
//         // Find center pixel of the target square to explode particles from it
//         const rect = e.currentTarget.getBoundingClientRect();
//         const parentRect =
//           e.currentTarget.parentElement.getBoundingClientRect();
//         const targetX = rect.left - parentRect.left + rect.width / 2;
//         const targetY = rect.top - parentRect.top + rect.height / 2;

//         // Check if a piece was captured
//         if (move.captured) {
//           // Add to lists
//           if (turn === "w") {
//             setCapturedByWhite((prev) => [
//               ...prev,
//               move.captured.toUpperCase(),
//             ]);
//           } else {
//             setCapturedByBlack((prev) => [
//               ...prev,
//               move.captured.toLowerCase(),
//             ]);
//           }

//           // Trigger explosive royal cosmic burst animation on capture
//           const newParticles = createCaptureParticles(targetX, targetY);
//           setParticles(newParticles);
//         } else {
//           // Regular elegant move drift
//           const newParticles = createMoveParticles(targetX, targetY);
//           setParticles(newParticles);
//         }

//         // Update states
//         setBoard(game.board());
//         setTurn(game.turn());
//         setSelectedSquare(null);

//         if (game.isCheckmate()) {
//           setGameStatus(
//             `Checkmate! ${turn === "w" ? "White" : "Black"} claims ultimate victory.`,
//           );
//         } else if (game.isDraw()) {
//           setGameStatus("The battle ends in an honorable Draw.");
//         }
//       } else {
//         // Change selection if clicking another piece of their own color
//         const piece = game.get(squareName);
//         if (piece && piece.color === turn) {
//           setSelectedSquare(squareName);
//         } else {
//           setSelectedSquare(null);
//         }
//       }
//     } catch (error) {
//       setSelectedSquare(null);
//     }
//   };

//   const resetMatch = () => {
//     const freshGame = new Chess();
//     setGame(freshGame);
//     setBoard(freshGame.board());
//     setSelectedSquare(null);
//     setTurn("w");
//     setGameStatus("");
//     setCapturedByWhite([]);
//     setCapturedByBlack([]);
//     setParticles([]);
//   };

//   return (
//     // FIX #1: h-screen + overflow-hidden so this section never triggers page scroll.
//     // Padding/gap trimmed slightly (values only, not colors/fonts) to help everything
//     // fit inside one viewport on shorter screens.
//     <div className="relative z-10 w-full h-screen max-h-screen overflow-hidden text-white py-4 flex flex-col gap-6">
//       {/* Editorial Header */}
//       <div className="max-w-xl shrink-0">
//         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] text-[#ebd391] tracking-widest uppercase font-medium mb-4">
//           <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
//           <span>Combat Theatre</span>
//         </div>
//         <h1 className="font-light text-4xl sm:text-5xl tracking-tight text-neutral-200 leading-tight mb-3">
//           Local{" "}
//           <span className="font-serif italic text-[#ebd391]">
//             Versus Arena.
//           </span>
//         </h1>
//         <p className="text-neutral-400 text-sm font-light leading-relaxed tracking-wide">
//           Two players. One screen. An uncompromising battle of pure strategy
//           completely isolated from systemic simulation.
//         </p>
//       </div>

//       {/* Main Layout Grid */}
//       <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center flex-1 min-h-0">
//         {/* INTERACTIVE CHESSBOARD CONTAINER */}
//         <div className="relative border border-[#d4af37]/20 p-3 bg-[#0c0914] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
//           {/* Mount the Particle System layered directly on the board container */}
//           <LocalParticleSystem particles={particles} />

//           {/*
//             FIX #2 (also fixes FIX #3): the board now uses an explicit
//             8x8 grid template (equal fr units for both rows AND columns)
//             instead of only grid-cols-8. Previously rows with no piece
//             content had no height driver and collapsed thin, while rows
//             with pieces stayed tall — making the board look sliced and,
//             as more squares emptied out during play, making later-game
//             squares too thin to click accurately (this is why play
//             appeared to "stop" after a handful of moves). Square size is
//             unchanged (still maxes out at 480px like the original) but is
//             now also capped by viewport height so it never forces a scroll.
//           */}
//           <div
//             className="grid w-[min(70vh,320px)] h-[min(70vh,320px)] sm:w-[min(65vh,480px)] sm:h-[min(65vh,480px)] border border-neutral-800 relative z-10"
//             style={{
//               gridTemplateColumns: "repeat(8, 1fr)",
//               gridTemplateRows: "repeat(8, 1fr)",
//             }}
//           >
//             {board.map((rowArr, rowIndex) =>
//               rowArr.map((piece, colIndex) => {
//                 const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
//                 const isDark = (rowIndex + colIndex) % 2 === 1;
//                 const isSelected = selectedSquare === squareName;

//                 return (
//                   <div
//                     key={`${rowIndex}-${colIndex}`}
//                     onClick={(e) => handleSquareClick(e, rowIndex, colIndex)}
//                     className={`relative flex items-center justify-center cursor-pointer select-none text-2xl sm:text-4xl transition-all duration-150 ${
//                       isDark ? "bg-[#161224]" : "bg-[#251f38]"
//                     } ${isSelected ? "ring-2 ring-inset ring-[#ebd391] bg-[#ebd391]/10" : ""}`}
//                   >
//                     {piece && (
//                       <span
//                         className={`transform active:scale-95 transition-transform ${
//                           piece.color === "w"
//                             ? "text-neutral-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
//                             : "text-[#ebd391]"
//                         }`}
//                       >
//                         {
//                           PIECE_GLYPHS[
//                             piece.color === "w"
//                               ? piece.type.toUpperCase()
//                               : piece.type
//                           ]
//                         }
//                       </span>
//                     )}
//                   </div>
//                 );
//               }),
//             )}
//           </div>
//         </div>

//         {/* PREMIUM CONTROLS PANEL */}
//         <div className="w-full lg:w-80 flex flex-col gap-6 bg-neutral-950/20 p-6 rounded-[22px] border border-white/5 backdrop-blur-md self-stretch justify-between overflow-y-auto">
//           <div className="flex flex-col gap-5">
//             <h3 className="text-xs uppercase tracking-widest text-[#ebd391] font-semibold border-b border-white/5 pb-2">
//               Match Status
//             </h3>

//             <div className="flex items-center justify-between text-sm font-light">
//               <span className="text-neutral-400">Current Turn:</span>
//               <span
//                 className={`px-3 py-1 rounded-full font-mono text-xs uppercase ${
//                   turn === "w"
//                     ? "bg-white text-black font-bold"
//                     : "bg-[#d4af37]/15 text-[#ebd391] border border-[#d4af37]/30"
//                 }`}
//               >
//                 {turn === "w" ? "White To Move" : "Black To Move"}
//               </span>
//             </div>

//             {/* TROPHY CASE: CAPTURED PIECES DISPLAY */}
//             <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-white/5">
//               <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
//                 Captured War Assets
//               </span>

//               {/* Captured by White (Shows dead gold pieces) */}
//               <div className="flex flex-col gap-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                   White's Loot:
//                 </span>
//                 {/*
//                   FIX #4: removed `line-through opacity-70` — captured
//                   pieces are now shown plainly, exactly as they looked
//                   on the board, with no cross/strike styling.
//                 */}
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-[#ebd391]">
//                   {capturedByWhite.map((p, i) => (
//                     <span key={i}>{PIECE_GLYPHS[p.toLowerCase()]}</span>
//                   ))}
//                 </div>
//               </div>

//               {/* Captured by Black (Shows dead white pieces) */}
//               <div className="flex flex-col gap-1 mt-1">
//                 <span className="text-[10px] text-neutral-400 font-light">
//                   Black's Loot:
//                 </span>
//                 <div className="flex flex-wrap gap-1 min-h-[24px] p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-lg text-neutral-100">
//                   {capturedByBlack.map((p, i) => (
//                     <span key={i}>{PIECE_GLYPHS[p.toUpperCase()]}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {gameStatus && (
//               <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl flex items-start gap-2 text-xs text-purple-200 mt-2">
//                 <AlertCircle className="w-4 h-4 text-[#ebd391] shrink-0 mt-0.5" />
//                 <span>{gameStatus}</span>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={resetMatch}
//             className="w-full py-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-semibold transition-all cursor-pointer"
//           >
//             <RotateCcw className="w-3.5 h-3.5" /> Reset Battlefield
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
