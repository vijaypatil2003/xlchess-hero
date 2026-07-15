// import { useEffect, useMemo, useRef, useState } from "react";
// import { Chess } from "chess.js";
// import {
//   Play,
//   Pause,
//   SkipBack,
//   SkipForward,
//   RotateCcw,
//   Volume2,
//   VolumeX,
//   ChevronDown,
//   Quote,
//   User,
// } from "lucide-react";
// import piecesSprite from "../assets/pieces-sprite.png";

// // Sprite column order: K Q R B N P
// const SPRITE_COL = { k: 0, q: 1, r: 2, b: 3, n: 4, p: 5 };

// const EVERGREEN_SAN = [
//   "e4",
//   "e5",
//   "Nf3",
//   "Nc6",
//   "Bc4",
//   "Bc5",
//   "b4",
//   "Bxb4",
//   "c3",
//   "Ba5",
//   "d4",
//   "exd4",
//   "O-O",
//   "d3",
//   "Qb3",
//   "Qf6",
//   "e5",
//   "Qg6",
//   "Re1",
//   "Nge7",
//   "Ba3",
//   "b5",
//   "Qxb5",
//   "Rb8",
//   "Qa4",
//   "Bb6",
//   "Nbd2",
//   "Bb7",
//   "Ne4",
//   "Qf5",
//   "Bxd3",
//   "Qh5",
//   "Nf6+",
//   "gxf6",
//   "exf6",
//   "Rg8",
//   "Rad1",
//   "Qxf3",
//   "Rxe7+",
//   "Nxe7",
//   "Qxd7+",
//   "Kxd7",
//   "Bf5+",
//   "Ke8",
//   "Bd7+",
//   "Kf8",
//   "Bxe7#",
// ];

// const COMMENTARY = {
//   0: "King's pawn opening — the classical start.",
//   2: "Knight develops, attacking the pawn.",
//   4: "Italian Game: bishop takes aim at f7.",
//   6: "The Evans Gambit — sacrificing a pawn for rapid development.",
//   10: "White strikes in the center with d4.",
//   12: "White castles kingside for safety.",
//   14: "Queen swings to b3, eyeing f7.",
//   16: "Advance in the center to gain space.",
//   18: "Rook lifts to the e-file, adding pressure.",
//   22: "Queen invades on b5 — dangerous initiative.",
//   28: "The knight leaps to e4, threatening tactics.",
//   30: "Bishop recaptures — pieces converging on the king.",
//   32: "Knight sacrifice on f6+! A stunning idea.",
//   34: "The e-file opens up violently.",
//   36: "Rook joins the attack from d1.",
//   38: "Rook sacrifice on e7 — the attack accelerates.",
//   40: "Queen sacrifice on d7!! One of history's greatest moves.",
//   42: "The king is dragged into the open.",
//   44: "Bishop check herds the king to defeat.",
//   46: "Bxe7 — checkmate! The Evergreen Game concludes.",
// };

// // ---- Piece identity tracking (needed for smooth travel animation) ----

// function initialPieces() {
//   const backRank = ["r", "n", "b", "q", "k", "b", "n", "r"];
//   const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
//   const list = [];
//   files.forEach((f, i) => {
//     const letter = backRank[i].toUpperCase();
//     list.push({ id: `b${letter}${f}8`, type: `b${letter}`, square: `${f}8` });
//     list.push({ id: `bP${f}7`, type: "bP", square: `${f}7` });
//     list.push({ id: `wP${f}2`, type: "wP", square: `${f}2` });
//     list.push({ id: `w${letter}${f}1`, type: `w${letter}`, square: `${f}1` });
//   });
//   return list;
// }

// // Applies a chess.js Move object to a piece-identity list, handling
// // captures, en passant, castling (rook follows the king), and promotion.
// function applyMoveToPieces(pieces, move) {
//   let next = pieces.map((p) => ({ ...p }));

//   if (move.flags.includes("e")) {
//     const capSquare = move.to[0] + move.from[1];
//     next = next.filter((p) => p.square !== capSquare);
//   } else if (move.captured) {
//     next = next.filter((p) => p.square !== move.to);
//   }

//   const moving = next.find((p) => p.square === move.from);
//   let movedId = moving ? moving.id : null;
//   if (moving) {
//     moving.square = move.to;
//     if (move.promotion) {
//       moving.type = moving.type[0] + move.promotion.toUpperCase();
//     }
//   }

//   if (move.flags.includes("k")) {
//     const rank = move.color === "w" ? "1" : "8";
//     const rook = next.find((p) => p.square === `h${rank}`);
//     if (rook) rook.square = `f${rank}`;
//   } else if (move.flags.includes("q")) {
//     const rank = move.color === "w" ? "1" : "8";
//     const rook = next.find((p) => p.square === `a${rank}`);
//     if (rook) rook.square = `d${rank}`;
//   }

//   return { pieces: next, movedId };
// }

// function useEvergreen() {
//   return useMemo(() => {
//     const g = new Chess();
//     let pieces = initialPieces();
//     const states = [
//       { fen: g.fen(), san: "start", eval: 0, pieces, movedId: null },
//     ];
//     let ev = 0;
//     for (const san of EVERGREEN_SAN) {
//       const mv = g.move(san);
//       if (!mv) break;
//       const result = applyMoveToPieces(pieces, mv);
//       pieces = result.pieces;
//       ev = Math.min(ev + 0.15 + Math.random() * 0.1, 3.2);
//       states.push({
//         fen: g.fen(),
//         from: mv.from,
//         to: mv.to,
//         san,
//         eval: +ev.toFixed(2),
//         pieces,
//         movedId: result.movedId,
//       });
//     }
//     return states;
//   }, []);
// }

// function playMoveSound() {
//   try {
//     const Ctx = window.AudioContext || window.webkitAudioContext;
//     if (!Ctx) return;
//     const ctx = (playMoveSound._ctx ||= new Ctx());
//     const now = ctx.currentTime;
//     const bufSize = Math.floor(ctx.sampleRate * 0.06);
//     const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
//     const data = buf.getChannelData(0);
//     for (let i = 0; i < bufSize; i++)
//       data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
//     const noise = ctx.createBufferSource();
//     noise.buffer = buf;
//     const nGain = ctx.createGain();
//     nGain.gain.value = 0.35;
//     const bp = ctx.createBiquadFilter();
//     bp.type = "bandpass";
//     bp.frequency.value = 1800;
//     bp.Q.value = 1.2;
//     noise.connect(bp).connect(nGain).connect(ctx.destination);
//     noise.start(now);
//     noise.stop(now + 0.07);

//     const osc = ctx.createOscillator();
//     osc.type = "sine";
//     osc.frequency.setValueAtTime(220, now);
//     osc.frequency.exponentialRampToValueAtTime(90, now + 0.09);
//     const oGain = ctx.createGain();
//     oGain.gain.setValueAtTime(0.28, now);
//     oGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
//     osc.connect(oGain).connect(ctx.destination);
//     osc.start(now);
//     osc.stop(now + 0.11);
//   } catch {}
// }

// export function LiveGameCard() {
//   const states = useEvergreen();
//   const [ply, setPly] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const [speed, setSpeed] = useState(1);
//   const [sound, setSound] = useState(true);
//   const [landed, setLanded] = useState({});
//   const timer = useRef(null);
//   const soundRef = useRef(sound);
//   soundRef.current = sound;
//   const prevPly = useRef(0);

//   useEffect(() => {
//     if (ply !== prevPly.current && ply > 0 && soundRef.current) playMoveSound();
//     prevPly.current = ply;

//     const movedId = states[ply]?.movedId;
//     if (movedId) {
//       setLanded((prev) => ({ ...prev, [movedId]: true }));
//       const t = setTimeout(() => {
//         setLanded((prev) => ({ ...prev, [movedId]: false }));
//       }, 550);
//       return () => clearTimeout(t);
//     }
//   }, [ply, states]);

//   useEffect(() => {
//     if (!playing) return;
//     if (ply >= states.length - 1) {
//       setPlaying(false);
//       return;
//     }
//     timer.current = setTimeout(() => setPly((p) => p + 1), 1400 / speed);
//     return () => {
//       if (timer.current) clearTimeout(timer.current);
//     };
//   }, [ply, playing, speed, states.length]);

//   const cur = states[ply];
//   const totalMoves = EVERGREEN_SAN.length;
//   const moveNum = ply;
//   const whiteToMove = ply % 2 === 0;

//   const counts = useMemo(() => {
//     let w = 0,
//       b = 0;
//     for (const ch of cur.fen.split(" ")[0]) {
//       if (/[PNBRQ]/.test(ch)) w++;
//       else if (/[pnbrq]/.test(ch)) b++;
//     }
//     return { w, b };
//   }, [cur.fen]);

//   const commentary = useMemo(() => {
//     for (let i = ply; i >= 0; i--) if (COMMENTARY[i]) return COMMENTARY[i];
//     return "The game begins.";
//   }, [ply]);

//   return (
//     <section className="glass-card rounded-[28px] p-5 md:p-6 relative">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-full bg-purple/20 border border-purple/40 flex items-center justify-center">
//             <User className="w-5 h-5 text-purple-gradient" />
//           </div>
//           <div>
//             <div className="font-semibold">Anderssen vs Dufresne</div>
//             <div className="text-sm">
//               <span className="text-purple-gradient">Evergreen Game</span>{" "}
//               <span className="text-muted-foreground">· 1852</span>
//             </div>
//           </div>
//         </div>
//         <div className="text-right">
//           <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
//             LIVE
//           </div>
//           <div className="text-xs text-muted-foreground">Autoplay Demo</div>
//         </div>
//       </div>

//       {/* Meta row */}
//       <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
//         <div>
//           <div className="font-semibold">Italian Game</div>
//           <div className="text-muted-foreground text-xs">Giuoco Piano</div>
//         </div>
//         <div>
//           <div className="text-muted-foreground text-xs">Move</div>
//           <div className="font-semibold">
//             {moveNum} / {totalMoves}
//           </div>
//         </div>
//         <div>
//           <div className="text-muted-foreground text-xs">Turn</div>
//           <div className="font-semibold flex items-center gap-2">
//             {whiteToMove ? "White to Move" : "Black to Move"}
//             <span
//               className={`w-3 h-3 rounded-full ${whiteToMove ? "bg-white" : "bg-black border border-white/30"}`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Board + sidebar */}
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4">
//         <Board
//           pieces={cur.pieces}
//           lastFrom={cur.from}
//           lastTo={cur.to}
//           landed={landed}
//         />
//         <div className="flex flex-col gap-3">
//           <SidePanel title="Evaluation">
//             <div className="text-2xl font-bold">
//               {cur.eval >= 0 ? "+" : ""}
//               {cur.eval.toFixed(2)}
//             </div>
//             <EvalChart data={states.slice(0, ply + 1).map((s) => s.eval)} />
//           </SidePanel>
//           <SidePanel title="Pieces Left">
//             <div className="flex items-center gap-4 mt-1">
//               <div className="flex items-center gap-1.5 text-lg">
//                 <span>♙</span>
//                 <span className="font-semibold text-base">{counts.w}</span>
//               </div>
//               <div className="flex items-center gap-1.5 text-lg">
//                 <span className="text-black/80">♟</span>
//                 <span className="font-semibold text-base">{counts.b}</span>
//               </div>
//             </div>
//           </SidePanel>
//           <SidePanel
//             title={
//               <span className="flex items-center gap-1.5">
//                 <Quote className="w-3.5 h-3.5" /> Commentary
//               </span>
//             }
//           >
//             <p className="text-xs leading-relaxed text-muted-foreground mt-1">
//               {commentary}
//             </p>
//           </SidePanel>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
//         <button
//           onClick={() => setSound((s) => !s)}
//           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
//         >
//           {sound ? (
//             <Volume2 className="w-4 h-4" />
//           ) : (
//             <VolumeX className="w-4 h-4" />
//           )}{" "}
//           Sound {sound ? "On" : "Off"}
//         </button>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setPly((p) => Math.max(0, p - 1))}
//             className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center"
//           >
//             <SkipBack className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setPlaying((p) => !p)}
//             className="w-11 h-11 rounded-full purple-gradient flex items-center justify-center shadow-[0_10px_30px_-8px_var(--purple)]"
//           >
//             {playing ? (
//               <Pause className="w-4 h-4" fill="white" />
//             ) : (
//               <Play className="w-4 h-4" fill="white" />
//             )}
//           </button>
//           <button
//             onClick={() => setPly((p) => Math.min(states.length - 1, p + 1))}
//             className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center"
//           >
//             <SkipForward className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <select
//               value={speed}
//               onChange={(e) => setSpeed(parseFloat(e.target.value))}
//               className="appearance-none bg-white/5 border border-border/60 rounded-lg pl-3 pr-8 py-1.5 text-sm hover:bg-white/10"
//             >
//               {[0.5, 1, 1.5, 2, 3].map((s) => (
//                 <option key={s} value={s}>
//                   Speed: {s.toFixed(1)}x
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
//           </div>
//           <button
//             onClick={() => {
//               setPly(0);
//               setPlaying(true);
//             }}
//             className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center"
//           >
//             <RotateCcw className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SidePanel({ title, children }) {
//   return (
//     <div className="rounded-2xl p-3 bg-white/[0.03] border border-border/50">
//       <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
//         {title}
//       </div>
//       <div>{children}</div>
//     </div>
//   );
// }

// // ---- Premium board: gold trim, marble squares, animated piece travel ----

// function Board({ pieces, lastFrom, lastTo, landed }) {
//   const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

//   return (
//     <div
//       className="w-full rounded-[16px] relative"
//       style={{
//         padding: "12px",
//         background: "linear-gradient(155deg, #3a2a12, #1a1206)",
//         boxShadow:
//           "0 0 0 1px rgba(212,175,55,0.35), inset 0 0 0 1px rgba(255,223,140,0.15), 0 25px 70px -20px rgba(0,0,0,0.75)",
//       }}
//     >
//       {/* gold corner ornaments */}
//       {[
//         { top: "3px", left: "3px" },
//         { top: "3px", right: "3px" },
//         { bottom: "3px", left: "3px" },
//         { bottom: "3px", right: "3px" },
//       ].map((pos, i) => (
//         <span
//           key={i}
//           className="absolute w-2.5 h-2.5"
//           style={{
//             transform: "rotate(45deg)",
//             background: "linear-gradient(145deg, #f4e2a1, #b8912f)",
//             boxShadow: "0 0 6px rgba(244,226,161,0.6)",
//             ...pos,
//           }}
//         />
//       ))}

//       <div
//         className="aspect-square w-full relative rounded-[6px] overflow-hidden"
//         style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.5)" }}
//       >
//         {/* static square grid */}
//         <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
//           {Array.from({ length: 64 }).map((_, i) => {
//             const rIdx = Math.floor(i / 8);
//             const file = i % 8;
//             const rank = 8 - rIdx;
//             const sq = files[file] + rank;
//             const isLight = (rIdx + file) % 2 === 0;
//             const highlight = sq === lastFrom || sq === lastTo;
//             return (
//               <div
//                 key={sq}
//                 className="relative"
//                 style={{
//                   background: isLight
//                     ? "linear-gradient(155deg, #f4ecd8 0%, #e3d5b3 55%, #d8c69c 100%)"
//                     : "linear-gradient(155deg, #2b2116 0%, #1a130c 55%, #100c07 100%)",
//                   boxShadow: isLight
//                     ? "inset 0 0 12px rgba(255,255,255,0.25)"
//                     : "inset 0 0 12px rgba(0,0,0,0.5)",
//                 }}
//               >
//                 {highlight && (
//                   <div
//                     className="absolute inset-0"
//                     style={{
//                       background: "rgba(139,92,246,0.5)",
//                       mixBlendMode: "screen",
//                     }}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* animated pieces layer */}
//         {pieces.map((p) => {
//           const file = p.square.charCodeAt(0) - 97;
//           const rank = parseInt(p.square[1], 10);
//           const row = 8 - rank;
//           const col = file;
//           const isWhite = p.type[0] === "w";
//           const spriteCol = SPRITE_COL[p.type[1].toLowerCase()];
//           const spriteRow = isWhite ? 0 : 1;
//           const isLanded = !!landed[p.id];

//           return (
//             <div
//               key={p.id}
//               className="absolute top-0 left-0"
//               style={{
//                 width: "12.5%",
//                 height: "12.5%",
//                 transform: `translate(${col * 100}%, ${row * 100}%)`,
//                 transition: "transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)",
//                 pointerEvents: "none",
//               }}
//             >
//               <div
//                 className="w-full h-full flex items-center justify-center"
//                 style={{
//                   transform: isLanded
//                     ? "translateY(-8%) scale(1.08)"
//                     : "translateY(0) scale(1)",
//                   transition:
//                     "transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
//                 }}
//               >
//                 <div
//                   aria-label={p.type}
//                   className="w-[85%] h-[85%]"
//                   style={{
//                     backgroundImage: `url(${piecesSprite})`,
//                     backgroundSize: "600% 200%",
//                     backgroundPosition: `${(spriteCol / 5) * 100}% ${spriteRow * 100}%`,
//                     backgroundRepeat: "no-repeat",
//                     filter: isLanded
//                       ? "drop-shadow(0 10px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 8px rgba(244,226,161,0.55))"
//                       : "drop-shadow(0 4px 5px rgba(0,0,0,0.6))",
//                     transition: "filter 0.32s ease",
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* subtle sheen */}
//       <div className="pointer-events-none absolute inset-[12px] bg-gradient-to-b from-white/[0.06] via-transparent to-black/25 mix-blend-overlay" />
//     </div>
//   );
// }

// function EvalChart({ data }) {
//   const w = 140,
//     h = 44;
//   const max = 3.5,
//     min = -1;
//   const pts = data.length < 2 ? [0, ...data] : data;
//   const path = pts
//     .map((v, i) => {
//       const x = (i / Math.max(1, pts.length - 1)) * w;
//       const y = h - ((v - min) / (max - min)) * h;
//       return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
//     })
//     .join(" ");
//   const areaPath = `${path} L${w},${h} L0,${h} Z`;
//   return (
//     <svg viewBox={`0 0 ${w} ${h}`} className="mt-1 w-full h-11">
//       <defs>
//         <linearGradient id="evalFill" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%" stopColor="oklch(0.7 0.22 295)" stopOpacity="0.5" />
//           <stop offset="100%" stopColor="oklch(0.7 0.22 295)" stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <path d={areaPath} fill="url(#evalFill)" />
//       <path
//         d={path}
//         fill="none"
//         stroke="oklch(0.75 0.22 300)"
//         strokeWidth="1.5"
//       />
//       <circle
//         cx={w}
//         cy={h - ((pts[pts.length - 1] - min) / (max - min)) * h}
//         r="2.5"
//         fill="oklch(0.8 0.2 300)"
//       />
//     </svg>
//   );
// }

// export default LiveGameCard;
// export { LiveGameCard as ChessDashboard };
