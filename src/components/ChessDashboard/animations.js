let particleId = 0;

// Premium Royal Colors
const ROYAL_GOLD = "#ebd391"; // Champagne Gold
const DEEP_VIOLET = "#a78bfa"; // Royal Violet
const PURE_IVORY = "#fdfbf7"; // Polished Ivory

/**
 * Generates elegant, slow-drifting champagne gold stardust
 * that mimics light catching luxury dust when a piece moves.
 */
export function createMoveParticles(x, y, count = 14) {
  return Array.from({ length: count }).map(() => {
    // Slower, highly elegant drift speeds (reduced velocity multiplier)
    const angle = Math.random() * Math.PI * 2;
    const speed = 10 + Math.random() * 25; // Gentler velocity

    return {
      id: particleId++,
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      size: 2 + Math.random() * 4, // Delicate, pinpoint particle sizes
      color: Math.random() > 0.3 ? ROYAL_GOLD : PURE_IVORY,
      opacity: 0.9,
      // Add a slow rotation and shimmer
      spin: (Math.random() - 0.5) * 2,
    };
  });
}

/**
 * Generates a majestic burst of stardust blending champagne gold
 * and deep royal violet when a piece is captured.
 */
export function createCaptureParticles(x, y, count = 32) {
  return Array.from({ length: count }).map(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 25 + Math.random() * 65; // Smooth but energetic expansion

    // Split colors: 50% Royal Violet, 40% Champagne Gold, 10% Pure Ivory spark
    const randomColorRoll = Math.random();
    let color = DEEP_VIOLET;
    if (randomColorRoll > 0.6) color = ROYAL_GOLD;
    else if (randomColorRoll > 0.9) color = PURE_IVORY;

    return {
      id: particleId++,
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      size: 3 + Math.random() * 5,
      color: color,
      opacity: 1,
      spin: (Math.random() - 0.5) * 4,
    };
  });
}

/**
 * Translates algebraic chess coordinates into pixel coordinates
 */
export function squareToPixel(square, boardWidth) {
  const files = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  };

  const cell = boardWidth / 8;
  const file = files[square[0]];
  const rank = Number(square[1]);

  return {
    x: file * cell + cell / 2,
    y: (8 - rank) * cell + cell / 2,
  };
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// let particleId = 0;

// export function createMoveParticles(x, y, count = 12) {
//   return Array.from({ length: count }).map(() => ({
//     id: particleId++,
//     x,
//     y,
//     dx: (Math.random() - 0.5) * 70,
//     dy: (Math.random() - 0.5) * 70,
//     size: 3 + Math.random() * 5,
//   }));
// }

// export function createCaptureParticles(x, y, count = 28) {
//   return Array.from({ length: count }).map(() => ({
//     id: particleId++,
//     x,
//     y,
//     dx: (Math.random() - 0.5) * 160,
//     dy: (Math.random() - 0.5) * 160,
//     size: 4 + Math.random() * 7,
//   }));
// }

// export function squareToPixel(square, boardWidth) {
//   const files = {
//     a: 0,
//     b: 1,
//     c: 2,
//     d: 3,
//     e: 4,
//     f: 5,
//     g: 6,
//     h: 7,
//   };

//   const cell = boardWidth / 8;

//   const file = files[square[0]];
//   const rank = Number(square[1]);

//   return {
//     x: file * cell + cell / 2,
//     y: (8 - rank) * cell + cell / 2,
//   };
// }

// export function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
