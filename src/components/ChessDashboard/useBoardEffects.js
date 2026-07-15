import { useCallback, useState } from "react";

const FILES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export default function useBoardEffects(boardWidth = 420) {
  const [trail, setTrail] = useState(null);

  const squareSize = boardWidth / 8;

  const squareToPixel = useCallback(
    (square) => {
      if (!square) return { x: 0, y: 0 };

      const file = FILES[square[0]];
      const rank = Number(square[1]);

      return {
        x: file * squareSize + squareSize / 2,
        y: (8 - rank) * squareSize + squareSize / 2,
      };
    },
    [squareSize],
  );

  const playMoveEffect = useCallback(
    (from, to) => {
      const start = squareToPixel(from);
      const end = squareToPixel(to);

      setTrail({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      });

      setTimeout(() => {
        setTrail(null);
      }, 350);
    },
    [squareToPixel],
  );

  return {
    trail,
    playMoveEffect,
  };
}
