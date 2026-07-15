import wK from "../../assets/pieces/wK.png";
import wQ from "../../assets/pieces/wQ.png";
import wR from "../../assets/pieces/wR.png";
import wB from "../../assets/pieces/wB.png";
import wN from "../../assets/pieces/wN.png";
import wP from "../../assets/pieces/wP.png";

import bK from "../../assets/pieces/bK.png";
import bQ from "../../assets/pieces/bQ.png";
import bR from "../../assets/pieces/bR.png";
import bB from "../../assets/pieces/bB.png";
import bN from "../../assets/pieces/bN.png";
import bP from "../../assets/pieces/bP.png";

const pieceImages = {
  wK,
  wQ,
  wR,
  wB,
  wN,
  wP,

  bK,
  bQ,
  bR,
  bB,
  bN,
  bP,
};

export default function CustomPieces() {
  const customPieces = {};

  Object.entries(pieceImages).forEach(([piece, image]) => {
    customPieces[piece] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <img
          src={image}
          alt={piece}
          draggable={false}
          style={{
            width: squareWidth * 0.9,
            height: squareWidth * 0.9,
            objectFit: "contain",
            filter: `
              drop-shadow(0 8px 12px rgba(0,0,0,.45))
              drop-shadow(0 0 8px rgba(255,255,255,.08))
            `,
            transition: "all .35s ease",
          }}
        />
      </div>
    );
  });

  return customPieces;
}
