import React, { useState, useEffect, useRef, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const POINT_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

export default function PlayerBoard({
  player,
  opponent,
  isAtRisk,
  isThumbnail = false,
  boardWidth,
  onCapture,
  phantomFen,
}) {
  const [game, setGame] = useState(
    () => new Chess(isThumbnail ? phantomFen : undefined),
  );
  const [gameFen, setGameFen] = useState(() => game.fen());
  const botIntervalRef = useRef(null);

  useEffect(() => {
    if (isThumbnail && phantomFen) {
      setGameFen(phantomFen);
    }
  }, [isThumbnail, phantomFen]);

  const executeBotMove = useCallback(() => {
    if (isThumbnail || game.isGameOver() || game.turn() !== "b") return;

    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return;

    const captureMoves = moves.filter((m) => m.captured);
    let chosenMove = null;

    if (captureMoves.length > 0 && Math.random() < 0.7) {
      chosenMove =
        captureMoves[Math.floor(Math.random() * captureMoves.length)];
    } else {
      chosenMove = moves[Math.floor(Math.random() * moves.length)];
    }

    if (chosenMove) {
      if (chosenMove.captured) {
        const points = POINT_VALUES[chosenMove.captured.toLowerCase()] || 1;
        onCapture(opponent.id, points);
      }
      game.move({ from: chosenMove.from, to: chosenMove.to });
      setGameFen(game.fen());

      if (game.isGameOver()) {
        setTimeout(() => {
          game.reset();
          setGameFen(game.fen());
        }, 5000);
      }
    }
  }, [game, isThumbnail, opponent.id, onCapture]);

  useEffect(() => {
    if (isThumbnail) return;
    botIntervalRef.current = setInterval(() => {
      if (game.turn() === "b") executeBotMove();
    }, 3500);

    return () => {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    };
  }, [gameFen, isThumbnail, executeBotMove, game]);

  function onDrop(sourceSquare, targetSquare) {
    if (isThumbnail || game.turn() !== "w") return false;
    try {
      const result = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (result === null) return false;

      if (result.captured) {
        const points = POINT_VALUES[result.captured.toLowerCase()] || 1;
        onCapture(player.id, points);
      }
      setGameFen(game.fen());
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-2xl bg-[#0b132b]/80 border transition-all duration-300 ${
        isAtRisk
          ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          : "border-white/5 shadow-2xl"
      }`}
      style={{ width: boardWidth + 24 }}
    >
      <div className="w-full flex justify-between items-center mb-2 px-1 text-xs">
        <span
          className="font-semibold tracking-wide"
          style={{ color: player.color }}
        >
          {player.name} {isThumbnail && "• Live"}
        </span>
        <span className="font-mono text-neutral-400">vs {opponent.name}</span>
      </div>
      <div
        className="rounded-xl overflow-hidden shadow-inner bg-neutral-900"
        style={{ width: boardWidth, height: boardWidth }}
      >
        <Chessboard
          position={gameFen}
          onPieceDrop={onDrop}
          boardWidth={boardWidth}
          arePiecesDraggable={!isThumbnail && game.turn() === "w"}
          customDarkSquareStyle={{ backgroundColor: "#1e293b" }}
          customLightSquareStyle={{ backgroundColor: "#475569" }}
        />
      </div>
    </div>
  );
}
