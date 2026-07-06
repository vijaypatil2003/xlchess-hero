# XLChess Hero Section — Stage 2 Technical Assessment

> **Approach chosen: Option 2 — Improve**  
> Thoughtful improvements to the existing [XLChess](https://xlchess.com) hero section, demonstrating engineering judgment, UI/UX polish, and production-quality code.

**Live Demo:** [https://xlchess-hero.vercel.app](https://xlchess-hero.vercel.app)  
**GitHub:** [https://github.com/vijaypatil2003/xlchess-hero](https://github.com/vijaypatil2003/xlchess-hero)

---

## Why Option 2 — Improve?

- **Option 1 (Recreate)** shows no initiative — pixel-perfect recreation without source code access is also practically impossible
- **Option 3 (Redesign)** is risky without brand guidelines — a full redesign could misalign with the company's visual identity
- **Option 2 (Improve)** is the right engineering call — respect the existing brand, identify what's weak, fix it with purpose

---

## What I Improved

The original hero section had several gaps — no navigation, a disconnected chess board with no game state, no background depth, and a basic CTA button. Here's every improvement made and why:

| Area               | Original                                                        | My Version                                                                                           | Why                                                                                |
| ------------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Navigation         | No navbar at all                                                | Fixed navbar — logo, nav links, Log In / Sign Up, scroll effect, mobile hamburger                    | Every production site has a navbar — its absence made the original feel unfinished |
| Chess Board        | Mid-game static position, pieces disappear/appear between moves | Full Evergreen Game autoplay from move 1 — pieces slide smoothly between squares every 1.5s          | Smooth animation makes the board feel alive, not like a screenshot                 |
| Game End State     | No end state — board just sits there                            | Checkmate overlay on board — blurred board, "Checkmate! White wins 🏆" with Reset and Replay buttons | Real chess apps always show a game-over state — absence of this felt incomplete    |
| Autoplay Indicator | "Autoplay in Progress..." text only                             | Animated green pulse dot + "Autoplay in Progress..." — disappears when game ends                     | Visual feedback shows the system is active, not frozen                             |
| Background         | Faint static ghost chess pieces                                 | Chess pieces travelling continuously across the full viewport using `requestAnimationFrame`          | Dynamic background adds depth and reinforces the chess theme intentionally         |
| Typography         | Default system sans-serif                                       | Space Grotesk — modern geometric typeface                                                            | Matches the premium, competitive feel of a chess platform                          |
| CTA Button         | Basic rectangular purple button                                 | Capsule-shaped with subtle border and shine effect                                                   | More modern, less generic — consistent with current SaaS design patterns           |
| Logo               | Knight image + XLCHESS text stacked                             | Same logo in navbar + hero — consistent branding across the page                                     | Navbar without logo breaks brand identity                                          |
| Responsiveness     | No mobile consideration visible                                 | Fully responsive — two-column desktop, single-column mobile, hamburger menu                          | Assessment explicitly required mobile/tablet support                               |

---

## Setup & Installation

```bash
# Clone the repository
git clone https://github.com/vijaypatil2003/xlchess-hero.git
cd xlchess-hero

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Tech Stack

| Library          | Version | Why I Chose It                                                     |
| ---------------- | ------- | ------------------------------------------------------------------ |
| React            | 19      | Component model, declarative UI, state management                  |
| Vite             | 7       | Fastest dev experience, instant HMR, optimised production builds   |
| Tailwind CSS     | 3       | Consistent design system without class naming overhead             |
| react-chessboard | 4       | Smooth piece sliding animations — v5 broke this API                |
| chess.js         | 1       | Move validation, FEN generation, checkmate detection               |
| Space Grotesk    | —       | Modern geometric font, loaded via Google Fonts with `display=swap` |
| clsx             | —       | Clean conditional className utility                                |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   │   └── Navbar.jsx          → Fixed navbar, scroll effect, mobile menu
│   ├── HeroSection.jsx         → Left side: logo, headline, CTA button
│   ├── ChessDashboard.jsx      → Right side: animated chess game
│   └── BackgroundWatermarks.jsx → Floating chess pieces across viewport
|
├── App.jsx                     → Chess game state and autoplay logic
├── main.jsx
└── index.css
public/
├── xlchess.png                 → Logo asset
└── play-icon.png               → Play button icon
```

---

## Key Engineering Decisions

**Chess game state lives in App.jsx, not ChessDashboard:**  
`ChessDashboard` is a pure presentational component — it receives FEN, move count, game over state as props and renders them. All game logic (move execution, checkmate detection, reset) lives in `App.jsx`. Clean separation of concerns — easier to test, easier to reason about.

**react-chessboard v4 over v5:**  
v5 changed the animation API. Pieces no longer slide smoothly between squares — they teleport. v4 gives the exact smooth piece movement needed. Pinning to v4 is a deliberate, documented decision, not an accident.

**No animation library (Framer Motion / GSAP):**  
Every animation in this project — floating pieces, typewriter headline, navbar scroll transition, button hover effects — is built with CSS keyframes or `requestAnimationFrame`. Zero additional bundle weight. Framer Motion alone adds ~60KB to the bundle for animations achievable in pure CSS.

**requestAnimationFrame for background pieces:**  
CSS keyframes animate along a fixed, predictable path. Using `rAF` lets each piece calculate its own velocity and direction, bouncing across the full viewport continuously — far more dynamic and visually interesting than the original's static ghost pieces.

---

## Assumptions

- Hero section only — no other pages or sections required by the brief
- Dark theme only — the brand is explicitly dark-first; a light mode toggle would require brand sign-off
- Nav links are placeholder anchors — no routing needed for a single-page hero section submission
- Chess game is autoplay only — making it fully interactive would require integrating Stockfish.js (a chess engine), which is clearly out of scope for a hero section
- Player stats shown in the original (if any) are placeholder — no real API available

---

## Trade-offs

| Decision                                | What I Gained                          | What I Traded Off                               |
| --------------------------------------- | -------------------------------------- | ----------------------------------------------- |
| No animation library                    | Lean bundle, zero extra dependencies   | Less expressive animations than Framer Motion   |
| react-chessboard v4                     | Smooth piece sliding                   | Pinned to older version, manual upgrades needed |
| Autoplay only chess board               | Simple, reliable, no engine dependency | No user interactivity on the board              |
| Board hidden on smallest mobile screens | Clean readable layout on small devices | Feature parity sacrificed below 640px           |

---

## Accessibility

- Semantic HTML throughout — `<header>`, `<nav>`, `<main>`, `<section>`, `<button>` used correctly
- Chess board marked with `role="img"` and descriptive `aria-label`
- Hamburger button has `aria-label="Open menu"` and `aria-expanded` reflecting state
- All interactive elements keyboard accessible with visible focus ring (`focus:ring-2`)
- `prefers-reduced-motion` respected in `index.css` — all animations disabled for users who prefer it
- Color contrast meets WCAG AA on all text elements

---

## Performance

- Tailwind CSS purges unused styles in production — zero unused CSS shipped
- No heavy animation libraries — CSS keyframes and `requestAnimationFrame` only
- Google Fonts loaded with `display=swap` — text renders immediately, font swaps in without blocking
- Vite production build — automatic minification, tree shaking, code splitting
- Deployed on Vercel — global edge CDN, gzip compression, automatic HTTPS, zero config

---

## What I Would Improve With More Time

- **Interactive puzzle mode** — let the user play White's final moves with Stockfish.js validating each move, exactly like the original's puzzle mechanic
- **Move history panel** — display algebraic notation of all moves played during the autoplay replay
- **Entrance animations** — staggered fade-in for hero text sections using Framer Motion for more polish
- **Unit and integration tests** — Vitest + React Testing Library covering hook logic and component rendering
- **Light mode** — improve accessibility for users who prefer reduced contrast environments
- **i18n support** — internationalisation for a global chess audience

---

## Author

**Vijay Patil** — MERN Stack Developer  
[GitHub](https://github.com/vijaypatil2003) · [LinkedIn](https://linkedin.com/in/vijaypatil0106)
