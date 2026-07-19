import React from "react";
import PlayerBoard from "./PlayerBoard";

export default function BoardGrid({
  activePairings,
  lowestScorerId,
  recordCapture,
  getPhantomFen,
  playerBoardWidth,
  thumbnailWidth,
}) {
  const humanPairing = activePairings.find(
    (p) => p.white.id === 1 || p.black.id === 1,
  );
  const secondaryPairings = activePairings.filter(
    (p) => p.white.id !== 1 && p.black.id !== 1,
  );

  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-6 justify-center items-center w-full min-h-0 overflow-y-auto p-2">
      {humanPairing && (
        <div className="shrink-0">
          <PlayerBoard
            player={humanPairing.white}
            opponent={humanPairing.black}
            isAtRisk={
              lowestScorerId === humanPairing.white.id ||
              lowestScorerId === humanPairing.black.id
            }
            boardWidth={playerBoardWidth}
            onCapture={recordCapture}
          />
        </div>
      )}

      {secondaryPairings.length > 0 && (
        <div className="flex flex-wrap gap-4 items-center justify-center max-w-2xl bg-neutral-900/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
          {secondaryPairings.map((pair) => (
            <div key={pair.boardId} className="flex gap-2 p-1">
              <PlayerBoard
                player={pair.white}
                opponent={pair.black}
                isAtRisk={lowestScorerId === pair.white.id}
                isThumbnail={true}
                boardWidth={thumbnailWidth}
                onCapture={recordCapture}
                phantomFen={getPhantomFen(pair.white.id)}
              />
              <PlayerBoard
                player={pair.black}
                opponent={pair.white}
                isAtRisk={lowestScorerId === pair.black.id}
                isThumbnail={true}
                boardWidth={thumbnailWidth}
                onCapture={recordCapture}
                phantomFen={getPhantomFen(pair.black.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
