import React, { useState, useEffect } from "react";
import { useBattleGame } from "../../hooks/useBattleGame";
import Lobby from "./Lobby";
import BoardGrid from "../../components/BattleRoyale/BoardGrid";
import Scoreboard from "../../components/BattleRoyale/Scoreboard";
import EliminationTimer from "../../components/BattleRoyale/EliminationTimer";
import EliminationBanner from "../../components/BattleRoyale/EliminationBanner";
import WinnerScreen from "../../components/BattleRoyale/WinnerScreen";
import { AnimatePresence } from "framer-motion";

export default function BattleArena() {
  const {
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
  } = useBattleGame();

  const [dimensions, setDimensions] = useState({ player: 420, thumb: 100 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setDimensions({ player: 280, thumb: 65 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ player: 360, thumb: 85 });
      } else {
        setDimensions({ player: 430, thumb: 105 });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (gameState === "LOBBY") {
    return <Lobby onStart={initTournament} />;
  }

  if (gameState === "WINNER") {
    return (
      <WinnerScreen winner={winner} scores={scores} onReset={initTournament} />
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative min-h-[85vh] select-none text-white">
      <AnimatePresence>
        {gameState === "ELIMINATION" && recentEliminatedPlayer && (
          <EliminationBanner playerName={recentEliminatedPlayer} />
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Battle Matrix
          </h2>
          <h1 className="text-2xl font-light text-neutral-200">
            Survival Round{" "}
            <span className="font-serif italic text-purple-400 font-normal">
              {currentRound}
            </span>
          </h1>
        </div>
        <EliminationTimer timeRemaining={timeRemaining} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch flex-1 min-h-0">
        <BoardGrid
          activePairings={activePairings}
          lowestScorerId={lowestScorerId}
          recordCapture={recordCapture}
          getPhantomFen={getPhantomFen}
          playerBoardWidth={dimensions.player}
          thumbnailWidth={dimensions.thumb}
        />
        <Scoreboard
          scores={scores}
          eliminatedIds={eliminatedIds}
          lowestScorerId={lowestScorerId}
          byePlayerId={byePlayerId}
        />
      </div>
    </div>
  );
}
