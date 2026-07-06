import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

export default function ChessDashboard({
  fenString,
  movesRemaining,
  gameOver,
  currentTurn,
  onReset,
  onReplay,
}) {
  const [boardWidth, setBoardWidth] = useState(420);

  useEffect(() => {
    const updateBoardSize = () => {
      const width = window.innerWidth;

      if (width < 380) {
        setBoardWidth(260);
      } else if (width < 480) {
        setBoardWidth(300);
      } else if (width < 768) {
        setBoardWidth(340);
      } else if (width < 1024) {
        setBoardWidth(380);
      } else {
        setBoardWidth(400);
      }
    };

    updateBoardSize();
    window.addEventListener("resize", updateBoardSize);

    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

  return (
    <div className="lg:col-span-7 flex justify-center w-full">
      <div className="w-full max-w-[430px] bg-[#0c122b] border border-gray-800/70 rounded-b-2xl shadow-2xl shadow-black/60 flex flex-col space-y-3 p-3">
        {/* Board */}
        <div className="w-full overflow-hidden relative flex justify-center">
          <div
            className={`transition-all duration-500 ${
              gameOver ? "blur-md brightness-75" : ""
            }`}
          >
            <Chessboard
              position={fenString}
              arePiecesDraggable={false}
              animationDuration={400}
              boardWidth={boardWidth}
              customDarkSquareStyle={{
                backgroundColor: "#769656",
              }}
              customLightSquareStyle={{
                backgroundColor: "#eeeed2",
              }}
              customBoardStyle={{
                borderRadius: "0px",
              }}
            />
          </div>

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center px-3">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl sm:text-5xl text-white mb-2">♔</div>

                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                  Checkmate!
                </h1>

                <p className="text-lg sm:text-xl font-bold text-emerald-400 mb-5">
                  White wins 🏆
                </p>

                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <button
                    onClick={onReset}
                    className="bg-[#13193a] hover:bg-[#1b224e] border border-gray-700 text-white font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    ↺ Reset
                  </button>

                  <button
                    onClick={onReplay}
                    className="bg-[#13193a] hover:bg-[#1b224e] border border-gray-700 text-white font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    ↺ Replay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-3">
          {/* Status */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.12em] text-gray-400 uppercase">
                {gameOver ? "Game Over" : "CAN YOU FINISH THE EVERGREEN GAME?"}
              </span>

              <h3 className="text-sm sm:text-base font-bold text-white">
                {gameOver ? "White wins! 🏆" : `${currentTurn} to move.`}
              </h3>
            </div>

            <div className="bg-[#12163f] border border-[#232763] px-3 py-2 rounded-xl flex flex-col items-center justify-center min-w-[75px] text-center">
              <span className="text-xl font-bold text-[#7779ff] leading-none">
                {movesRemaining}
              </span>

              <span className="text-[7px] font-bold tracking-wider text-gray-400 uppercase mt-1">
                Moves Left
              </span>
            </div>
          </div>

          {/* Autoplay */}
          {!gameOver && (
            <div className="w-full bg-[#070b20] border border-gray-900 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-[11px] font-semibold text-gray-400">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>

              <span className="animate-pulse">Autoplay in Progress...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Chessboard } from "react-chessboard";

// export default function ChessDashboard({
//   fenString,
//   movesRemaining,
//   gameOver,
//   currentTurn,
//   onReset,
//   onReplay,
// }) {
//   const [boardWidth, setBoardWidth] = useState(460);

//   useEffect(() => {
//     const updateBoardSize = () => {
//       const width = window.innerWidth;

//       if (width < 380) {
//         setBoardWidth(280); // very small phones
//       } else if (width < 480) {
//         setBoardWidth(320); // normal phones
//       } else if (width < 768) {
//         setBoardWidth(380); // tablets
//       } else {
//         setBoardWidth(460); // desktop
//       }
//     };

//     updateBoardSize();
//     window.addEventListener("resize", updateBoardSize);

//     return () => window.removeEventListener("resize", updateBoardSize);
//   }, []);

//   return (
//     <div className="lg:col-span-7 flex justify-center w-full lg:translate-x-10">
//       <div className="w-full max-w-[490px] bg-[#0c122b] border border-gray-800/70 rounded-b-2xl shadow-2xl shadow-black/60 flex flex-col space-y-4 p-3 sm:p-5">
//         {/* Board */}
//         <div className="w-full overflow-hidden relative flex justify-center">
//           {/* Blur board after game over */}
//           <div
//             className={`transition-all duration-500 ${
//               gameOver ? "blur-md brightness-75" : ""
//             }`}
//           >
//             <Chessboard
//               position={fenString}
//               arePiecesDraggable={false}
//               animationDuration={400}
//               boardWidth={boardWidth}
//               customDarkSquareStyle={{
//                 backgroundColor: "#769656",
//               }}
//               customLightSquareStyle={{
//                 backgroundColor: "#eeeed2",
//               }}
//               customBoardStyle={{
//                 borderRadius: "0px",
//               }}
//             />
//           </div>

//           {/* Checkmate Popup */}
//           {gameOver && (
//             <div className="absolute inset-0 flex items-center justify-center px-3">
//               <div className="flex flex-col items-center text-center">
//                 <div className="text-4xl sm:text-6xl text-white mb-3">♔</div>

//                 <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
//                   Checkmate!
//                 </h1>

//                 <p className="text-lg sm:text-2xl font-bold text-emerald-400 mb-6">
//                   White wins 🏆
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-3 w-full">
//                   <button
//                     onClick={onReset}
//                     className="bg-[#13193a] hover:bg-[#1b224e] border border-gray-700 text-white font-semibold px-5 py-3 rounded-xl transition-all"
//                   >
//                     ↺ Reset Puzzle
//                   </button>

//                   <button
//                     onClick={onReplay}
//                     className="bg-[#13193a] hover:bg-[#1b224e] border border-gray-700 text-white font-semibold px-5 py-3 rounded-xl transition-all"
//                   >
//                     ↺ Replay Full Game
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex flex-col space-y-4 pt-1">
//           {/* Status */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
//             <div className="flex flex-col space-y-1">
//               <span className="text-[10px] font-bold tracking-[0.12em] text-gray-400 uppercase">
//                 {gameOver ? "Game Over" : "CAN YOU FINISH THE EVERGREEN GAME?"}
//               </span>

//               <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
//                 {gameOver
//                   ? "White wins! Checkmate 🏆"
//                   : `${currentTurn} to move.`}
//               </h3>
//             </div>

//             <div className="bg-[#12163f] border border-[#232763] px-4 py-2 rounded-xl flex flex-col items-center justify-center min-w-[90px] text-center shadow-md self-start sm:self-auto">
//               <span className="text-2xl font-bold text-[#7779ff] leading-none tracking-tight">
//                 {movesRemaining}
//               </span>

//               <span className="text-[8px] font-bold tracking-wider text-gray-400 uppercase mt-1 whitespace-nowrap">
//                 Moves Left
//               </span>
//             </div>
//           </div>

//           {/* Autoplay */}
//           {!gameOver && (
//             <div className="w-full bg-[#070b20] border border-gray-900 rounded-xl py-3 px-4 flex items-center justify-center gap-2.5 text-xs font-semibold text-gray-400 tracking-wide shadow-inner">
//               <div className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </div>

//               <span className="animate-pulse tracking-wide text-center">
//                 Autoplay in Progress...
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
