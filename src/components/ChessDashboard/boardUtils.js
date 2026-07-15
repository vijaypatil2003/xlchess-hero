import { Chess } from "chess.js";
import { EVERGREEN_SAN } from "./constants";

export function initialPieces() {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const backRank = ["r", "n", "b", "q", "k", "b", "n", "r"];

  const pieces = [];

  files.forEach((file, i) => {
    const piece = backRank[i].toUpperCase();

    pieces.push({
      id: `b${piece}${file}8`,
      type: `b${piece}`,
      square: `${file}8`,
    });

    pieces.push({
      id: `bP${file}7`,
      type: "bP",
      square: `${file}7`,
    });

    pieces.push({
      id: `wP${file}2`,
      type: "wP",
      square: `${file}2`,
    });

    pieces.push({
      id: `w${piece}${file}1`,
      type: `w${piece}`,
      square: `${file}1`,
    });
  });

  return pieces;
}

export function applyMoveToPieces(pieces, move) {
  let next = pieces.map((piece) => ({ ...piece }));

  // En passant
  if (move.flags.includes("e")) {
    const capturedSquare = move.to[0] + move.from[1];
    next = next.filter((piece) => piece.square !== capturedSquare);
  }

  // Normal capture
  else if (move.captured) {
    next = next.filter((piece) => piece.square !== move.to);
  }

  const movingPiece = next.find(
    (piece) => piece.square === move.from
  );

  let movedId = null;

  if (movingPiece) {
    movedId = movingPiece.id;
    movingPiece.square = move.to;

    if (move.promotion) {
      movingPiece.type =
        movingPiece.type[0] +
        move.promotion.toUpperCase();
    }
  }

  // Kingside castling
  if (move.flags.includes("k")) {
    const rank = move.color === "w" ? "1" : "8";

    const rook = next.find(
      (piece) => piece.square === `h${rank}`
    );

    if (rook) rook.square = `f${rank}`;
  }

  // Queenside castling
  if (move.flags.includes("q")) {
    const rank = move.color === "w" ? "1" : "8";

    const rook = next.find(
      (piece) => piece.square === `a${rank}`
    );

    if (rook) rook.square = `d${rank}`;
  }

  return {
    pieces: next,
    movedId,
  };
}

export function createEvergreenStates() {
  const chess = new Chess();

  let pieces = initialPieces();

  const states = [
    {
      fen: chess.fen(),
      pieces,
      movedId: null,
      eval: 0,
      san: "start",
    },
  ];

  let evaluation = 0;

  for (const san of EVERGREEN_SAN) {
    const move = chess.move(san);

    if (!move) break;

    const result = applyMoveToPieces(
      pieces,
      move
    );

    pieces = result.pieces;

    evaluation = Math.min(
      evaluation + 0.15 + Math.random() * 0.08,
      3.2
    );

    states.push({
      fen: chess.fen(),
      san,
      from: move.from,
      to: move.to,
      pieces,
      movedId: result.movedId,
      eval: Number(evaluation.toFixed(2)),
    });
  }

  return states;
}