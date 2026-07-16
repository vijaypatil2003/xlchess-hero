import { useEffect, useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { motion } from "framer-motion";

// Sub-components
import ChessBoard from "./ChessDashboard/ChessBoard";

import { SHOWCASE_GAME } from "./ChessDashboard/games/evergreenGame";
import useBoardEffects from "./ChessDashboard/useBoardEffects";
import {
  createMoveParticles,
  createCaptureParticles,
  squareToPixel,
} from "./ChessDashboard/animations";

// Luxury Decorative Asset
import heroKingImg from "../assets/hero-king.png";

import HeroLeft from "./HeroSection";

export default function EvergreenGame() {
  const parsedGame = useMemo(() => {
    const chess = new Chess();
    return SHOWCASE_GAME.map((san) => {
      const move = chess.move(san);
      return {
        from: move.from,
        to: move.to,
        san: move.san,
        captured: !!move.captured,
      };
    });
  }, []);

  const [position, setPosition] = useState("start");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [moveIndex, setMoveIndex] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [particles, setParticles] = useState([]);

  const START_TIME = 10 * 60; // 10 minutes
  const [whiteTime, setWhiteTime] = useState(START_TIME);
  const [blackTime, setBlackTime] = useState(START_TIME);
  const timerRef = useRef(null);
  const boardWidth = 460;

  const { trail, playMoveEffect } = useBoardEffects(boardWidth);

  function rebuildBoard(index) {
    const game = new Chess();
    for (let i = 0; i < index; i++) {
      game.move(parsedGame[i]);
    }
    setPosition(game.fen());
    if (index > 0) {
      const move = parsedGame[index - 1];
      setLastMove({ from: move.from, to: move.to });
    } else {
      setLastMove(null);
    }
  }

  // Original Autoplay Engine logic
  useEffect(() => {
    if (!playing) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setMoveIndex((current) => {
        if (current >= parsedGame.length) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            replayGame();
          }, 3000);
          return current;
        }
        const move = parsedGame[current];
        playMoveEffect(move.from, move.to);
        const { x, y } = squareToPixel(move.to, boardWidth);
        setParticles((old) => [
          ...old,
          ...(move.captured
            ? createCaptureParticles(x, y)
            : createMoveParticles(x, y)),
        ]);
        const game = new Chess();
        for (let i = 0; i <= current; i++) {
          game.move(parsedGame[i]);
        }
        setPosition(game.fen());
        setLastMove({ from: move.from, to: move.to });
        setTimeout(() => setParticles([]), 500);
        return current + 1;
      });
    }, 1600 / speed);
    return () => clearInterval(timerRef.current);
  }, [playing, speed, parsedGame, playMoveEffect]);

  useEffect(() => {
    rebuildBoard(0);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPlaying(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      if (moveIndex >= parsedGame.length) return;
      if (moveIndex % 2 === 0) {
        setWhiteTime((t) => Math.max(0, t - 1));
      } else {
        setBlackTime((t) => Math.max(0, t - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, moveIndex, parsedGame.length]);

  function replayGame() {
    clearInterval(timerRef.current);
    setMoveIndex(0);
    setParticles([]);
    rebuildBoard(0);
    setPlaying(true);
  }

  const isWhiteTurn = moveIndex % 2 === 0;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return (
    <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* 1. LEFT SIDE COLUMN */}
      <div className="lg:col-span-5 flex items-center justify-start">
        <HeroLeft />
      </div>

      {/* 2. RIGHT SIDE COLUMN */}
      <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end pr-0 lg:pr-16 xl:pr-24">
        {/* 
          Clean Board & Clock Stack Layout Wrapper 
          - Background, border, blur, and outer shadow stripped out.
          - Pure transparent layout structure.
        */}
        <div className="relative flex items-center gap-4 p-4 pr-6">
          <ChessBoard
            position={position}
            lastMove={lastMove}
            boardWidth={boardWidth}
            trail={trail}
            particles={particles}
          />

          {/* Premium Vertical Clocks Panel */}
          <div
            className="flex flex-col gap-20 justify-between items-center"
            style={{ height: boardWidth }}
          >
            {/* Black Timer */}
            <div className="rotate-90 origin-center whitespace-nowrap min-w-[90px] flex items-center justify-center">
              <span
                className={`font-mono text-lg tracking-widest transition-all duration-500 ${
                  !isWhiteTurn && playing
                    ? "text-[#a78bfa] font-extrabold drop-shadow-[0_0_12px_rgba(167,139,250,0.65)]"
                    : "text-neutral-500 font-medium"
                }`}
              >
                {formatTime(blackTime)}
              </span>
            </div>

            {/* White Timer */}
            <div className="rotate-90 origin-center whitespace-nowrap min-w-[90px] flex items-center justify-center">
              <span
                className={`font-mono text-lg tracking-widest transition-all duration-500 ${
                  isWhiteTurn && playing
                    ? "text-[#a78bfa] font-extrabold drop-shadow-[0_0_12px_rgba(167,139,250,0.65)]"
                    : "text-neutral-500 font-medium"
                }`}
              >
                {formatTime(whiteTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Premium Floating King Piece */}
        <div className="absolute bottom-0 -right-60 w-[500px] h-[800px] flex items-end justify-center z-50 pointer-events-none hidden xl:flex">
          <motion.img
            src={heroKingImg}
            alt="Decorative King Piece"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1.2, ease: "easeOut" },
              y: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 4.5,
                ease: "easeInOut",
              },
              scale: { duration: 1, ease: "easeOut" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Chess } from "chess.js";

// import { SHOWCASE_GAME } from "./ChessDashboard/games/evergreenGame";

// // import Header from "./ChessDashboard/Header";
// import ChessBoard from "./ChessDashboard/ChessBoard";
// // import Sidebar from "./ChessDashboard/Sidebar";

// import useBoardEffects from "./ChessDashboard/useBoardEffects";
// import {
//   createMoveParticles,
//   createCaptureParticles,
//   squareToPixel,
// } from "./ChessDashboard/animations";

// import heroKingImg from "../assets/hero-king.png";

// export default function EvergreenGame() {
//   const parsedGame = useMemo(() => {
//     const chess = new Chess();

//     return SHOWCASE_GAME.map((san) => {
//       const move = chess.move(san);

//       return {
//         from: move.from,
//         to: move.to,
//         san: move.san,
//         captured: !!move.captured,
//       };
//     });
//   }, []);
//   const [position, setPosition] = useState("start");
//   const [playing, setPlaying] = useState(false);
//   const [sound, setSound] = useState(true);
//   const [speed, setSpeed] = useState(1);

//   const [moveIndex, setMoveIndex] = useState(0);
//   const [lastMove, setLastMove] = useState(null);

//   const [particles, setParticles] = useState([]);

//   const START_TIME = 10 * 60; // 10 minutes

//   const [whiteTime, setWhiteTime] = useState(START_TIME);
//   const [blackTime, setBlackTime] = useState(START_TIME);

//   const timerRef = useRef(null);

//   const boardWidth = 500;

//   const { trail, playMoveEffect } = useBoardEffects(boardWidth);

//   function rebuildBoard(index) {
//     const game = new Chess();

//     for (let i = 0; i < index; i++) {
//       game.move(parsedGame[i]);
//     }

//     setPosition(game.fen());

//     if (index > 0) {
//       const move = parsedGame[index - 1];

//       setLastMove({
//         from: move.from,
//         to: move.to,
//       });
//     } else {
//       setLastMove(null);
//     }
//   }

//   function nextMove() {
//     if (moveIndex >= parsedGame.length) {
//       setPlaying(false);
//       return;
//     }

//     const move = parsedGame[moveIndex];

//     playMoveEffect(move.from, move.to);
//     console.log(move);
//     const { x, y } = squareToPixel(move.to, boardWidth);

//     setParticles((old) => [
//       ...old,
//       ...(move.captured
//         ? createCaptureParticles(x, y)
//         : createMoveParticles(x, y)),
//     ]);

//     const nextIndex = moveIndex + 1;

//     setMoveIndex(nextIndex);

//     rebuildBoard(nextIndex);

//     setTimeout(() => {
//       setParticles([]);
//     }, 700);
//   }

//   function previousMove() {
//     if (moveIndex === 0) return;

//     const previous = moveIndex - 1;

//     setMoveIndex(previous);

//     rebuildBoard(previous);
//   }

//   function replayGame() {
//     clearInterval(timerRef.current);

//     setMoveIndex(0);

//     setParticles([]);

//     rebuildBoard(0);

//     setPlaying(true);
//   }

//   function formatTime(seconds) {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;

//     return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
//   }

//   useEffect(() => {
//     if (!playing) return;

//     clearInterval(timerRef.current);

//     timerRef.current = setInterval(() => {
//       setMoveIndex((current) => {
//         if (current >= parsedGame.length) {
//           clearInterval(timerRef.current);

//           setTimeout(() => {
//             replayGame();
//           }, 3000);

//           return current;
//         }

//         const move = parsedGame[current];

//         // Trail Animation
//         playMoveEffect(move.from, move.to);
//         console.log(move);
//         // Particle Animation
//         const { x, y } = squareToPixel(move.to, boardWidth);

//         setParticles((old) => [
//           ...old,
//           ...(move.captured
//             ? createCaptureParticles(x, y)
//             : createMoveParticles(x, y)),
//         ]);

//         const game = new Chess();

//         for (let i = 0; i <= current; i++) {
//           game.move(parsedGame[i]);
//         }

//         setPosition(game.fen());

//         setLastMove({
//           from: move.from,
//           to: move.to,
//         });

//         setTimeout(() => {
//           setParticles([]);
//         }, 500);

//         return current + 1;
//       });
//     }, 1600 / speed);

//     return () => clearInterval(timerRef.current);
//   }, [playing, speed, parsedGame, playMoveEffect]);
//   useEffect(() => {
//     rebuildBoard(0);

//     return () => clearInterval(timerRef.current);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setPlaying(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!playing) return;

//     const interval = setInterval(() => {
//       if (moveIndex >= parsedGame.length) return;

//       // Even move index => White to move
//       if (moveIndex % 2 === 0) {
//         setWhiteTime((t) => Math.max(0, t - 1));
//       } else {
//         setBlackTime((t) => Math.max(0, t - 1));
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [playing, moveIndex, parsedGame.length]);

//   return (
//     <>
//       {/* Changing relative to absolute/flex viewport configuration to guarantee position layout */}
//       <section className="relative w-full min-h-[90vh] flex items-center justify-between px-8 lg:px-16 overflow-visible">
//         <div className="absolute inset-0 rounded-[30px] bg-[#7C5CFF]/8 blur-[70px] pointer-events-none" />

//         {/* Left Side: Chessboard & Clocks Stack (Pushed Left, reserving space for king on the right) */}
//         <div className="relative flex items-center gap-0 justify-start mr-auto lg:mr-[260px] xl:mr-[300px]">
//           {/* Chess Board Container */}
//           <ChessBoard
//             position={position}
//             lastMove={lastMove}
//             boardWidth={boardWidth}
//             trail={trail}
//             particles={particles}
//           />

//           {/* Vertical Clocks Panel */}
//           <div
//             className="flex flex-col gap-16 justify-between items-center -ml-3"
//             style={{ height: boardWidth }}
//           >
//             {/* Black Timer */}
//             <div className="rotate-90 origin-center whitespace-nowrap min-w-[80px] flex items-center justify-center">
//               <span className="font-mono text-xl font-bold text-white">
//                 {formatTime(blackTime)}
//               </span>
//             </div>

//             {/* White Timer */}
//             <div className="rotate-90 origin-center whitespace-nowrap min-w-[80px] flex items-center justify-center">
//               <span className="font-mono text-xl font-bold text-white">
//                 {formatTime(whiteTime)}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/*
//         Guaranteed King Position Placement
//         Anchored to the absolute right side of the main section container wrapper.
//         Space for this box is now reserved by the mr-[300px] on the board block above,
//         so it can never overlap the board regardless of section width.
//       */}
//         <div className="absolute bottom-0 -right-80 w-[320] h-[370px] flex items-end justify-center z-50 pointer-events-none">
//           {" "}
//           <motion.img
//             src={heroKingImg}
//             alt="Decorative King Piece"
//             className="w-full h-full object-contain filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)]"
//             initial={{ opacity: 0, y: 120, scale: 0.9 }}
//             animate={{
//               opacity: 1,
//               y: [0, -10, 0],
//               scale: 1,
//             }}
//             transition={{
//               opacity: { duration: 0.9, ease: "easeOut" },
//               scale: { duration: 0.9, ease: "easeOut" },
//               y: {
//                 delay: 0.9,
//                 repeat: Infinity,
//                 repeatType: "mirror",
//                 duration: 4,
//                 ease: "easeInOut",
//               },
//             }}
//           />
//         </div>
//       </section>
//     </>
//   );
// }
