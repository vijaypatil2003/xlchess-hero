import React from "react";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroLeft() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
  ];

  // Infinite golden shimmer/blink effect for the stars
  const starShimmer = {
    animate: {
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      filter: [
        "drop-shadow(0 0 2px rgba(212,175,55,0.3))",
        "drop-shadow(0 0 8px rgba(212,175,55,0.8))",
        "drop-shadow(0 0 2px rgba(212,175,55,0.3))",
      ],
    },
  };

  // Main container orchestrating staggered reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Fancy slide-mask transition
  const maskReveal = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Elegant fade & focus transition
  const luxuryReveal = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-start justify-center max-w-xl text-white select-none p-6 lg:p-0"
    >
      {/* ================= BACKGROUND DECORATIVE FLOATING CHESS PIECES ================= */}

      {/* 1. Mini Golden Queen (Floating Top Right-ish) */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 right-12 opacity-25 text-[#d4af37] pointer-events-none hidden sm:block"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M18 19c0 1-1 1-1 1H7s-1 0-1-1 1-2 1-2h8s1 1 1 2Z"
            fill="currentColor"
          />
          <path d="M8 12l-2-4 4 2 2-6 2 6 4-2-2 4H8Z" fill="currentColor" />
          <circle cx="6" cy="7" r="1" fill="currentColor" />
          <circle cx="10" cy="9" r="1" fill="currentColor" />
          <circle cx="12" cy="3" r="1" fill="currentColor" />
          <circle cx="14" cy="9" r="1" fill="currentColor" />
          <circle cx="18" cy="7" r="1" fill="currentColor" />
        </svg>
      </motion.div>

      {/* 2. Mini Silver Knight (Floating near description/CTA area) */}
      <motion.div
        animate={{ y: [0, 6, 0], rotate: [0, -3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-24 -left-12 opacity-20 text-neutral-400 pointer-events-none hidden sm:block"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M17 19c0 1-1 1-1 1H8s-1 0-1-1 1-2 1-2h8s1 1 1 2Z"
            fill="currentColor"
          />
          <path
            d="M12 6c-3.3 0-5 2.5-5 5.5 0 2 1.5 3 2.5 3.5.5.3.8.8.8 1.4V17h4v-.6c0-.6.3-1.1.8-1.4 1-.5 2.5-1.5 2.5-3.5C17 8.5 15.3 6 12 6Z"
            fill="currentColor"
          />
          <path d="M10 9a1 1 0 100-2 1 1 0 000 2Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* 3. Mini Deep Purple Pawn (Floating near social proof) */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-2 right-4 opacity-20 text-purple-400 pointer-events-none hidden sm:block"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M16 19c0 1-1 1-1 1H9s-1 0-1-1 1-2 1-2h6s1 1 1 2Z"
            fill="currentColor"
          />
          <circle cx="12" cy="8" r="3" fill="currentColor" />
          <path d="M9 13c0-3 1.5-4 3-4s3 1 3 4H9Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* ============================================================================== */}

      {/* Interactive Floating Shimmering Star 1 (Left Corner) */}
      <motion.span
        variants={starShimmer}
        animate="animate"
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 text-[#d4af37] text-lg pointer-events-none"
      >
        ✦
      </motion.span>

      {/* 1. Ultra-Minimalist Prestigious Badge */}
      <motion.div
        variants={luxuryReveal}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[10px] sm:text-xs text-[#ebd391] tracking-widest uppercase font-medium"
      >
        <Sparkles className="w-3 h-3 text-[#d4af37]" />
        <span>The Grandmaster Lounge</span>
      </motion.div>

      {/* 2. Headline with Fixed Mask Heights (Prevents descenders from getting cut) */}
      <div className="mt-6 mb-6">
        <h1 className="font-light text-5xl sm:text-6xl tracking-tight text-neutral-300 leading-tight">
          {/* Mask container for Row 1 */}
          <span className="block overflow-hidden h-[62px] sm:h-[72px]">
            <motion.span variants={maskReveal} className="block pb-1">
              Where intellect
            </motion.span>
          </span>

          {/* Mask container for Row 2 - Increased height and bottom padding specifically for 'grandeur' descenders */}
          <span className="block overflow-hidden h-[75px] sm:h-[88px] relative">
            <motion.span variants={maskReveal} className="block pb-4">
              meets{" "}
              <span className="font-serif italic font-normal text-[#ebd391] relative">
                grandeur.
                {/* Micro Golden Star 2 nested inside the headline */}
                <motion.span
                  variants={starShimmer}
                  animate="animate"
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -top-1 -right-3 text-[#ebd391] text-xs"
                >
                  ✦
                </motion.span>
              </span>
            </motion.span>
          </span>
        </h1>

        {/* Subtle separator line */}
        <div className="h-[1px] w-16 bg-gradient-to-r from-[#d4af37]/50 to-transparent mt-6 mb-2" />
      </div>

      {/* 3. Stylized Paragraph block */}
      <motion.p
        variants={luxuryReveal}
        className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-light mb-8 tracking-wide"
      >
        Immerse yourself in{" "}
        <span className="font-serif italic text-[#ebd391] font-normal">
          competitive chess refined.
        </span>{" "}
        Engage in flawlessly rendered matches on an arena designed for players
        who appreciate{" "}
        <span className="font-semibold text-neutral-200">
          pure tactical art.
        </span>
      </motion.p>

      {/* 4. Sophisticated Call to Actions */}
      <motion.div
        variants={luxuryReveal}
        className="flex flex-wrap items-center gap-6 w-full sm:w-auto mb-10"
      >
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(212, 175, 55, 0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 text-xs tracking-wider uppercase font-semibold transition duration-300 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
        >
          <span>Enter Arena</span>
          <ArrowRight className="w-4 h-4 text-[#ebd391]" />
        </motion.button>

        <motion.button
          whileHover={{ x: 3 }}
          className="group inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-semibold text-neutral-300 hover:text-[#ebd391] transition duration-300 cursor-pointer"
        >
          <span>Observe Matches</span>
          <span className="text-[#d4af37] transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </motion.button>
      </motion.div>

      {/* 5. Minimalist Member Count Proof */}
      <motion.div
        variants={luxuryReveal}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 max-w-md"
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Club Rating
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 font-light">
            Rated 4.9/5 by active players
          </span>
        </div>

        {/* Luxury circular avatar stack */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((url, index) => (
              <motion.img
                key={index}
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-8 h-8 rounded-full ring-2 ring-[#08070b] object-cover relative"
                src={url}
                alt={`Lobby user ${index}`}
              />
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#ebd391]">
            +12K Online
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// import React from "react";
// import { ArrowRight, Star, Trophy, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";

// export default function HeroLeft() {
//   const avatars = [
//     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
//   ];

//   // Elegant, heavy, luxury entrance physics
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.15,
//       },
//     },
//   };

//   const luxuryReveal = {
//     hidden: { opacity: 0, y: 15 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 1, 0.5, 1], // Custom slow cinematic cubic-bezier
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="flex flex-col items-start justify-center max-w-xl text-white select-none p-6 lg:p-0"
//     >
//       {/* 1. Ultra-Minimalist Prestigious Badge */}
//       <motion.div
//         variants={luxuryReveal}
//         className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-xs text-[#ebd391] tracking-widest uppercase font-medium"
//       >
//         <Sparkles className="w-3 h-3 text-[#d4af37]" />
//         <span>The Grandmaster Lounge</span>
//       </motion.div>

//       {/* 2. Sleek, Balanced Editorial Typography */}
//       <motion.div variants={luxuryReveal} className="mt-6 mb-6">
//         <h1 className="font-light text-5xl sm:text-6xl tracking-tight text-neutral-300 leading-tight">
//           Where intellect <br />
//           meets{" "}
//           <span className="font-serif italic font-normal text-[#ebd391]">
//             grandeur.
//           </span>
//         </h1>

//         {/* Subtle separator line */}
//         <div className="h-[1px] w-16 bg-gradient-to-r from-[#d4af37]/50 to-transparent mt-6 mb-2" />
//       </motion.div>

//       {/* 3. Pure, clean description text */}
//       <motion.p
//         variants={luxuryReveal}
//         className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-light mb-8"
//       >
//         Immerse yourself in competitive chess refined. Engage in flawlessly
//         rendered matches on an arena designed for players who appreciate pure
//         tactical art.
//       </motion.p>

//       {/* 4. Sophisticated Call to Actions */}
//       <motion.div
//         variants={luxuryReveal}
//         className="flex flex-wrap items-center gap-6 w-full sm:w-auto mb-10"
//       >
//         {/* Royal Purple to Warm Gold interactive gradient button */}
//         <motion.button
//           whileHover={{
//             scale: 1.02,
//             boxShadow: "0 10px 25px rgba(212, 175, 55, 0.15)",
//           }}
//           whileTap={{ scale: 0.98 }}
//           className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 text-xs tracking-wider uppercase font-semibold transition duration-300 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
//         >
//           <span>Enter Arena</span>
//           <ArrowRight className="w-4 h-4 text-[#ebd391]" />
//         </motion.button>

//         {/* Minimal Underline Text Button */}
//         <motion.button
//           whileHover={{ x: 3 }}
//           className="group inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-semibold text-neutral-300 hover:text-[#ebd391] transition duration-300 cursor-pointer"
//         >
//           <span>Observe Matches</span>
//           <span className="text-[#d4af37] transform transition-transform group-hover:translate-x-1">
//             →
//           </span>
//         </motion.button>
//       </motion.div>

//       {/* 5. Minimalist Member Count Proof */}
//       <motion.div
//         variants={luxuryReveal}
//         className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900 max-w-md"
//       >
//         <div className="flex flex-col gap-0.5">
//           <div className="flex items-center gap-1">
//             <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
//             <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
//               Club Rating
//             </span>
//           </div>
//           <span className="text-[11px] text-neutral-500 font-light">
//             Rated 4.9/5 by active players
//           </span>
//         </div>

//         {/* Luxury circular avatar stack */}
//         <div className="flex items-center gap-3">
//           <div className="flex -space-x-2">
//             {avatars.map((url, index) => (
//               <motion.img
//                 key={index}
//                 whileHover={{ scale: 1.15, zIndex: 10 }}
//                 className="w-8 h-8 rounded-full ring-2 ring-[#08070b] object-cover relative"
//                 src={url}
//                 alt={`Lobby user ${index}`}
//               />
//             ))}
//           </div>
//           <div className="text-[10px] uppercase tracking-wider font-semibold text-[#ebd391]">
//             +12K Online
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// import React from "react";
// import { Crown, Play, Star } from "lucide-react";
// import { motion } from "framer-motion";

// export default function HeroLeft() {
//   const avatars = [
//     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
//     "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60",
//   ];

//   // Animation variants for staggered load sequencing
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15, // Delay between each child's entrance
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 25 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="flex flex-col items-start justify-center max-w-xl text-white font-sans p-6 bg-transparent selection:bg-purple-500/30"
//     >
//       {/* 1. Animated Badge with ambient glow */}
//       <motion.div
//         variants={itemVariants}
//         whileHover={{ scale: 1.03 }}
//         className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 text-sm text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-sm transition-all duration-300 cursor-default"
//       >
//         <motion.span
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//           className="text-purple-400"
//         >
//           ✦
//         </motion.span>
//         <span>Next Generation Chess Platform</span>
//       </motion.div>

//       {/* 2. Main Hero Headline */}
//       <motion.h1
//         variants={itemVariants}
//         className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mt-6 mb-6"
//       >
//         Build the Future <br />
//         of{" "}
//         <motion.span
//           animate={{
//             textShadow: [
//               "0 0 12px rgba(168,85,247,0.2)",
//               "0 0 24px rgba(168,85,247,0.6)",
//               "0 0 12px rgba(168,85,247,0.2)",
//             ],
//           }}
//           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//           className="bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] font-black"
//         >
//           Online Chess
//         </motion.span>
//       </motion.h1>

//       {/* 3. Paragraph Body Text */}
//       <motion.p
//         variants={itemVariants}
//         className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md mb-2"
//       >
//         Experience chess like never before. Learn, play, and compete with
//         millions around the world.
//       </motion.p>

//       {/* 4. Interactive Call to Action Buttons */}
//       <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
//         {/* Play Now with breathing glow shadow and hover scaling */}
//         <motion.button
//           whileHover={{
//             scale: 1.04,
//             boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)",
//             filter: "brightness(1.1)",
//           }}
//           whileTap={{ scale: 0.97 }}
//           className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold shadow-[0_15px_40px_-10px_rgba(147,51,234,0.5)] transition duration-300"
//         >
//           <Crown className="w-4 h-4" fill="white" /> Play Now
//         </motion.button>

//         {/* Secondary Button with sleek hover transition */}
//         <motion.button
//           whileHover={{
//             scale: 1.04,
//             backgroundColor: "rgba(255, 255, 255, 0.08)",
//             borderColor: "rgba(255, 255, 255, 0.3)",
//           }}
//           whileTap={{ scale: 0.97 }}
//           className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 transition duration-300"
//         >
//           <Play className="w-4 h-4" fill="currentColor" /> Watch Evergreen Game
//         </motion.button>
//       </motion.div>

//       {/* 5. Social Proof / Trust Indicators */}
//       <motion.div
//         variants={itemVariants}
//         className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 mt-6 border-t border-white/5 w-full"
//       >
//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ rotate: -15, scale: 0.8 }}
//                 animate={{ rotate: 0, scale: 1 }}
//                 transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
//               >
//                 <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
//               </motion.div>
//             ))}
//           </div>
//           <span className="text-gray-400 text-xs sm:text-sm font-medium whitespace-nowrap">
//             Trusted by thousands of chess players
//           </span>
//         </div>

//         {/* Overlapping Avatars that expand on hover */}
//         <div className="flex items-center">
//           <div className="flex -space-x-2.5 overflow-visible">
//             {avatars.map((url, index) => (
//               <motion.img
//                 key={index}
//                 whileHover={{
//                   scale: 1.25,
//                   zIndex: 30,
//                   marginRight: "4px",
//                   marginLeft: "4px",
//                 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 15 }}
//                 className="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-950 object-cover cursor-pointer relative z-10"
//                 src={url}
//                 alt={`User avatar ${index + 1}`}
//               />
//             ))}
//           </div>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="flex items-center justify-center h-8 px-2.5 rounded-full ring-2 ring-neutral-950 bg-purple-950/40 border border-purple-500/30 ml-2 shadow-[0_0_10px_rgba(168,85,247,0.2)] cursor-default"
//           >
//             <span className="text-purple-300 text-xs font-bold tracking-tight">
//               12K+
//             </span>
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
