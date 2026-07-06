import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import ChessDashboard from "./ChessDashboard";

const EVERGREEN_MOVES = [
  "e4",
  "e5",
  "Nf3",
  "Nc6",
  "Bc4",
  "Bc5",
  "b4",
  "Bxb4",
  "c3",
  "Ba5",
  "d4",
  "exd4",
  "O-O",
  "d3",
  "Qb3",
  "Qf6",
  "e5",
  "Qg6",
  "Re1",
  "Nge7",
  "Ba3",
  "b5",
  "Qxb5",
  "Rb8",
  "Qa4",
  "Bb6",
  "Nbd2",
  "Bb7",
  "Ne4",
  "Qf5",
  "Bxd3",
  "Qh5",
  "Nf6+",
  "gxf6",
  "exf6",
  "Rg8",
  "Rad1",
  "Qxf3",
  "Rxe7+",
  "Nxe7",
  "Qxd7+",
  "Kxd7",
  "Bf5+",
  "Ke8",
  "Bd7+",
  "Kf8",
  "Bxe7#",
];

export default function EvergreenGame() {
  const chessRef = useRef(new Chess());
  const timerRef = useRef(null);

  const [fen, setFen] = useState(new Chess().fen());
  const [moveIndex, setMoveIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    clearTimeout(timerRef.current);

    chessRef.current = new Chess();

    setFen(chessRef.current.fen());
    setMoveIndex(0);
    setGameOver(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (gameOver) return;

    if (moveIndex >= EVERGREEN_MOVES.length) {
      setGameOver(true);
      return;
    }

    timerRef.current = setTimeout(() => {
      try {
        const move = chessRef.current.move(EVERGREEN_MOVES[moveIndex]);

        if (move) {
          setFen(chessRef.current.fen());

          const isCheckmate = chessRef.current.isCheckmate();

          setMoveIndex((prev) => prev + 1);

          if (isCheckmate) {
            setGameOver(true);
          }
        } else {
          setMoveIndex((prev) => prev + 1);
        }
      } catch {
        setMoveIndex((prev) => prev + 1);
      }
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [moveIndex, gameOver]);

  return (
    <ChessDashboard
      fenString={fen}
      movesRemaining={Math.max(0, EVERGREEN_MOVES.length - moveIndex)}
      gameOver={gameOver}
      currentTurn={moveIndex % 2 === 0 ? "White" : "Black"}
      onReset={startGame}
      onReplay={startGame}
    />
  );
}
