import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Chess } from "chess.js";
import { PLAYERS } from "../components/constants/players";

// Piece point configuration values
const POINT_VALUES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

export function useBattleGame() {
  const [gameState, setGameState] = useState("LOBBY"); // LOBBY | PLAYING | ELIMINATION | WINNER
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState({});
  const [eliminatedIds, setEliminatedIds] = useState(new Set());
  const [activePairings, setActivePairings] = useState([]);
  const [byePlayerId, setByePlayerId] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes per round
  const [recentEliminatedPlayer, setRecentEliminatedPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  // Keep live fen strings for passive background bot-only boards inside a mutable ref
  // to avoid causing heavy parent re-renders on every intermediate piece shuffle.
  const phantomBoardsRef = useRef({});

  // Initialize fresh metadata values for the tournament lifecycle
  const initTournament = useCallback(() => {
    const initialScores = {};
    PLAYERS.forEach((p) => {
      initialScores[p.id] = 0;
    });
    setScores(initialScores);
    setEliminatedIds(new Set());
    setCurrentRound(1);
    setRecentEliminatedPlayer(null);
    setWinner(null);
    setTimeRemaining(120);
    phantomBoardsRef.current = {};
    generatePairings(new Set());
    setGameState("PLAYING");
  }, []);

  // Compute active survivors remaining in play
  const survivors = useMemo(() => {
    return PLAYERS.filter((p) => !eliminatedIds.has(p.id));
  }, [eliminatedIds]);

  // Determine which player currently occupies the lowest rank on the scoreboard
  const lowestScorerId = useMemo(() => {
    if (gameState !== "PLAYING") return null;
    let lowestScore = Infinity;
    let lowestId = null;

    survivors.forEach((p) => {
      // The player holding a round bye cannot be targeted for elimination
      if (p.id === byePlayerId) return;

      const score = scores[p.id] || 0;
      if (score < lowestScore) {
        lowestScore = score;
        lowestId = p.id;
      }
    });
    return lowestId;
  }, [scores, survivors, byePlayerId, gameState]);

  // Construct matchups based on survivors remaining
  const generatePairings = (currentEliminatedSet) => {
    const activeSurvivors = PLAYERS.filter(
      (p) => !currentEliminatedSet.has(p.id),
    );

    if (activeSurvivors.length <= 1) {
      if (activeSurvivors.length === 1) setWinner(activeSurvivors[0]);
      setGameState("WINNER");
      return;
    }

    // Shuffle modern assortment array arrays natively
    const pool = [...activeSurvivors].sort(() => Math.random() - 0.5);

    // Manage odd survivor balances by issuing a random round bye
    if (pool.length % 2 !== 0) {
      const byeTarget = pool.pop();
      setByePlayerId(byeTarget.id);
    } else {
      setByePlayerId(null);
    }

    const newPairings = [];
    for (let i = 0; i < pool.length; i += 2) {
      const white = pool[i];
      const black = pool[i + 1];
      newPairings.push({ white, black, boardId: `b-${white.id}-${black.id}` });

      // Initialize default start FENs for background engine tracking
      phantomBoardsRef.current[white.id] = new Chess().fen();
      phantomBoardsRef.current[black.id] = new Chess().fen();
    }
    setActivePairings(newPairings);
  };

  // Push capture scoring updates up into the primary collector record
  const recordCapture = useCallback((playerId, points) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + points,
    }));
  }, []);

  // Internal routine to manage automated background matches for side-boards
  const stepPhantomMatchups = useCallback(() => {
    activePairings.forEach((pair) => {
      // Skip updates if either slot maps to the human user tracking target (id: 1)
      if (pair.white.id === 1 || pair.black.id === 1) return;

      [pair.white.id, pair.black.id].forEach((botId) => {
        const fen = phantomBoardsRef.current[botId];
        if (!fen) return;

        const chessInstance = new Chess(fen);
        if (chessInstance.isGameOver()) {
          chessInstance.reset(); // Loop matches endlessly to sustain raw point gathering
        }

        const moves = chessInstance.moves({ verbose: true });
        if (moves.length === 0) return;

        const captureMoves = moves.filter((m) => m.captured);
        let selectedMove = null;

        // Apply strict 70/30 weight tactical bias
        if (captureMoves.length > 0 && Math.random() < 0.7) {
          selectedMove =
            captureMoves[Math.floor(Math.random() * captureMoves.length)];
        } else {
          selectedMove = moves[Math.floor(Math.random() * moves.length)];
        }

        if (selectedMove) {
          if (selectedMove.captured) {
            const pointsValue =
              POINT_VALUES[selectedMove.captured.toLowerCase()] || 1;
            recordCapture(botId, pointsValue);
          }
          chessInstance.move({ from: selectedMove.from, to: selectedMove.to });
          phantomBoardsRef.current[botId] = chessInstance.fen();
        }
      });
    });
  }, [activePairings, recordCapture]);

  // Background clock interval management
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          evaluateElimination();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, scores, survivors, currentRound, byePlayerId]);

  // Secondary phantom bot engine ticking interval
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const botTick = setInterval(() => {
      stepPhantomMatchups();
    }, 3500); // Ticks inside your requested 3-4 second frequency boundary

    return () => clearInterval(botTick);
  }, [gameState, stepPhantomMatchups]);

  // Execute elimination evaluations at the close of round clocks
  const evaluateElimination = () => {
    const currentEliminated = new Set(eliminatedIds);
    let potentialTargets = survivors.filter((p) => p.id !== byePlayerId);

    if (potentialTargets.length === 0) return;

    // Sort by points ascending
    potentialTargets.sort((a, b) => (scores[a.id] || 0) - (scores[b.id] || 0));
    const lowestScore = scores[potentialTargets[0].id] || 0;

    const matchingLowestPlayers = potentialTargets.filter(
      (p) => (scores[p.id] || 0) === lowestScore,
    );

    let idsToRemove = [];

    if (currentRound === 1) {
      // Round 1 Enforcement: Eliminate exactly one player
      idsToRemove.push(
        matchingLowestPlayers[
          Math.floor(Math.random() * matchingLowestPlayers.length)
        ].id,
      );
    } else {
      // Subsequent Rounds: Tiebreaker double elimination rules trigger
      idsToRemove = matchingLowestPlayers.map((p) => p.id);
    }

    // Process targeted deletions
    idsToRemove.forEach((id) => currentEliminated.add(id));

    const namedTargets = PLAYERS.filter((p) => idsToRemove.includes(p.id))
      .map((p) => p.name)
      .join(" & ");

    setRecentEliminatedPlayer(namedTargets || "No one");
    setEliminatedIds(currentEliminated);
    setGameState("ELIMINATION");

    setTimeout(() => {
      const activeSurvivors = PLAYERS.filter(
        (p) => !currentEliminated.has(p.id),
      );
      if (activeSurvivors.length <= 1) {
        if (activeSurvivors.length === 1) setWinner(activeSurvivors[0]);
        setGameState("WINNER");
      } else {
        setCurrentRound((r) => r + 1);
        setTimeRemaining(120);
        generatePairings(currentEliminated);
        setGameState("PLAYING");
      }
    }, 3000); // 3-second display duration matching overlay constraints
  };

  // Safe external read utility fetching current active FEN positions
  const getPhantomFen = (botId) => {
    return phantomBoardsRef.current[botId] || new Chess().fen();
  };

  return {
    gameState,
    currentRound,
    scores,
    eliminatedIds,
    activePairings,
    byePlayerId,
    timeRemaining,
    recentEliminatedPlayer,
    winner,
    lowestScorerId,
    initTournament,
    recordCapture,
    getPhantomFen,
  };
}
