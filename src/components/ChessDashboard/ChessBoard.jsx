import { Chessboard } from "react-chessboard";
import PremiumBoardFrame from "./PremiumBoardFrame";
import CustomPieces from "./CustomPieces";
import MoveTrail from "./MoveTrail";
import ParticleSystem from "./ParticleSystem";

export default function ChessBoard({
  position,
  lastMove,
  boardWidth = 420,
  trail = null,
  particles = [],
}) {
  const customPieces = CustomPieces();

  return (
    <div className="relative flex justify-center w-full">
      <PremiumBoardFrame>
        <div className="relative p-4">
          {/* Premium Effects */}
          <MoveTrail trail={trail} />
          <ParticleSystem particles={particles} />

          <Chessboard
            id="xlchess-board"
            position={position}
            customPieces={customPieces}
            arePiecesDraggable={false}
            animationDuration={420}
            boardWidth={boardWidth}
            boardOrientation="white"
            showBoardNotation={false}
            // 1. Royal Obsidian/Onyx Marble Dark Squares
            customDarkSquareStyle={{
              background: "linear-gradient(135deg, #1c1a22 0%, #0f0e13 100%)",
            }}
            // 2. Polished Champagne/Ivory Light Squares
            customLightSquareStyle={{
              background: "linear-gradient(135deg, #fdfbf7 0%, #ebd391 100%)",
            }}
            // 3. Gold-Rimmed Outer Board Shadow
            customBoardStyle={{
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: `
                inset 0 0 35px rgba(212, 175, 55, 0.15),
                0 25px 80px rgba(0,0,0,0.65),
                0 0 0 1px rgba(212, 175, 55, 0.25)
              `,
            }}
            // 4. Warm Golden Aura for Move Highlights
            customSquareStyles={
              lastMove
                ? {
                    [lastMove.from]: {
                      background:
                        "radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent)",
                    },
                    [lastMove.to]: {
                      background:
                        "radial-gradient(circle, rgba(212, 175, 55, 0.7), rgba(212, 175, 55, 0.15))",
                    },
                  }
                : {}
            }
          />

          {/* Thin Royal Gold Inner Bezel Reflection */}
          <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-[#d4af37]/20" />

          {/* Glass Overlay */}
          <div
            className="pointer-events-none absolute inset-4 rounded-[18px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), transparent 30%, transparent 70%, rgba(0,0,0,0.20))",
            }}
          />
        </div>
      </PremiumBoardFrame>
    </div>
  );
}

// import { Chessboard } from "react-chessboard";
// import PremiumBoardFrame from "./PremiumBoardFrame";
// import CustomPieces from "./CustomPieces";
// import MoveTrail from "./MoveTrail";
// import ParticleSystem from "./ParticleSystem";

// export default function ChessBoard({
//   position,
//   lastMove,
//   boardWidth = 420,
//   trail = null,
//   particles = [],
// }) {
//   const customPieces = CustomPieces();

//   return (
//     <div className="relative flex justify-center w-full">
//       <PremiumBoardFrame>
//         <div className="relative p-4">
//           {/* Premium Effects */}
//           <MoveTrail trail={trail} />
//           <ParticleSystem particles={particles} />

//           <Chessboard
//             id="xlchess-board"
//             position={position}
//             customPieces={customPieces}
//             arePiecesDraggable={false}
//             animationDuration={420}
//             boardWidth={boardWidth}
//             boardOrientation="white"
//             showBoardNotation={false}
//             customDarkSquareStyle={{
//               background:
//                 "linear-gradient(135deg,#2F2216 0%,#1D140C 45%,#120B07 100%)",
//             }}
//             customLightSquareStyle={{
//               background:
//                 "linear-gradient(135deg,#F4E9CF 0%,#E7D6AE 50%,#D7C094 100%)",
//             }}
//             customBoardStyle={{
//               borderRadius: "18px",
//               overflow: "hidden",
//               boxShadow: `
//                 inset 0 0 30px rgba(255,255,255,.08),
//                 0 20px 80px rgba(0,0,0,.45),
//                 0 0 0 1px rgba(255,255,255,.08)
//               `,
//             }}
//             customSquareStyles={
//               lastMove
//                 ? {
//                     [lastMove.from]: {
//                       background:
//                         "radial-gradient(circle, rgba(124,92,255,.40), transparent)",
//                     },

//                     [lastMove.to]: {
//                       background:
//                         "radial-gradient(circle, rgba(124,92,255,.65), rgba(124,92,255,.15))",
//                     },
//                   }
//                 : {}
//             }
//           />

//           {/* Reflection */}
//           <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-white/5" />

//           {/* Glass Overlay */}
//           <div
//             className="pointer-events-none absolute inset-4 rounded-[18px]"
//             style={{
//               background:
//                 "linear-gradient(180deg,rgba(255,255,255,.05),transparent 30%,transparent 70%,rgba(0,0,0,.10))",
//             }}
//           />
//         </div>
//       </PremiumBoardFrame>
//     </div>
//   );
// }
