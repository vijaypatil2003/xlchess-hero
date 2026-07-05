import React from "react";

export default function HeroSection() {
  return (
    <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 max-w-[700px] mx-auto lg:mx-0 mt-8 lg:mt-16">
      {" "}
      {/* Logo */}
      <div>
        <img
          src="/xlchess.png"
          alt="XLCHESS Logo"
          className="h-24 sm:h-32 md:h-40 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
      {/* Headlines */}
      <div className="space-y-7 pt-1 w-full max-w-[720px]">
        <h1
          className="
    text-[42px]
    sm:text-[48px]
    md:text-[56px]
    lg:text-[64px]
    font-black
    leading-[1.02]
    tracking-[-0.01em]
  "
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="whitespace-nowrap">Build the Future of</span>

          <br />
          <span className="bg-gradient-to-r from-[#6e71f9] to-[#9799ff] bg-clip-text text-transparent">
            Online Chess
          </span>
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl font-bold tracking-wide leading-snug">
          Making the Best Move on the Way to the Top
        </p>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          <span className="hidden md:inline whitespace-nowrap">
            A complete chess platform to play, learn, compete, and grow—built
          </span>
          <span className="md:hidden">
            A complete chess platform to play, learn, compete, and grow—built
          </span>
          <br className="hidden md:block" />
          to become the world's #1 destination for chess.
        </p>
      </div>
      {/* Play Button */}
      <button className="flex items-center gap-3 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#5b5fff] to-[#787cff] text-white font-semibold shadow-[0_10px_30px_rgba(91,95,255,0.35)] hover:translate-y-[-2px] hover:shadow-[0_15px_35px_rgba(91,95,255,0.5)] transition-all duration-300">
        <img
          src="/play-icon.png"
          alt="Play"
          className="w-7 h-7 object-contain scale-[1.6]"
        />

        <span className="tracking-wide">Play</span>
      </button>
    </div>
  );
}
// import React from "react";

// export default function HeroSection() {
//   return (
//     <div className="lg:col-span-5 flex flex-col items-start text-left space-y-5 max-w-xl mx-auto lg:mx-0 mt-16">
//       {/* Logo */}
//       <div>
//         <img
//           src="/xlchess.png"
//           alt="XLCHESS Logo"
//           className="h-40 w-auto object-contain"
//           onError={(e) => {
//             e.target.style.display = "none";
//           }}
//         />
//       </div>

//       {/* Headlines */}
//       <div className="space-y-7  pt-1">
//         <h1 className="text-2xl sm:text-6xl lg:text-[56px] font-bold tracking-tight leading-[1.1] text-white">
//           Build the Future of <br />
//           <span className="bg-gradient-to-r from-[#6e71f9] to-[#9799ff] bg-clip-text text-transparent">
//             Online Chess
//           </span>
//         </h1>
//         <p className="text-gray-300 text-lg sm:text-xl font-bold tracking-wide">
//           Making the Best Move on the Way to the Top
//         </p>
//         <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg">
//           A complete chess platform to play, learn, compete, and grow—built to
//           become the world's #1 destination for chess.
//         </p>
//       </div>

//       {/* Play Button */}
//       {/* Play Button */}
//       <button
//         className="
//   flex items-center gap-2
//   bg-transparent
//   border border-white/20
//   hover:border-white/40
//   hover:bg-white/5
//   active:scale-[0.98] transition-all duration-200
//   px-4 py-1 rounded-full
//   font-semibold tracking-wide text-white text-base
//   relative overflow-hidden
//   group
// "
//       >
//         <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0" />
//         <img
//           src="/play-icon.png"
//           alt=""
//           className="w-12 h-12 object-contain relative z-10"
//           onError={(e) => {
//             e.target.style.display = "none";
//           }}
//         />
//         <span className="relative z-10">Play</span>
//       </button>
//       {/* <button
//         className="
//         flex items-center gap-3
//         bg-[#4c50e6]
//         hover:bg-[#3d41ce]
//         active:scale-[0.98] transition-all duration-200
//         px-8 py-3 rounded-xl
//         font-semibold tracking-wide text-white text-base
//       "
//       >
//         <img
//           src="/play-icon.png"
//           alt=""
//           className="w-10 h-10 object-contain"
//           onError={(e) => {
//             e.target.style.display = "none";
//           }}
//         />
//         <span>Play</span>
//       </button> */}
//     </div>
//   );
// }

// // import React from "react";

// // export default function HeroSection() {
// //   return (
// //     <div className="lg:col-span-5 flex flex-col items-start text-left space-y-7 max-w-xl mx-auto lg:mx-0">
// //       {/* Logo */}
// //       <div>
// //         <img
// //           src="/xlchess.png"
// //           alt="XLCHESS Logo"
// //           className="h-32 w-auto object-contain"
// //           onError={(e) => {
// //             e.target.style.display = "none";
// //           }}
// //         />
// //       </div>

// //       {/* Headlines */}
// //       <div className="space-y-4 pt-1">
// //         <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12] text-white">
// //           Build the Future of <br />
// //           <span className="bg-gradient-to-r from-[#6e71f9] to-[#9799ff] bg-clip-text text-transparent">
// //             Online Chess
// //           </span>
// //         </h1>
// //         <p className="text-gray-300 text-base sm:text-lg font-medium tracking-wide">
// //           Making the Best Move on the Way to the Top
// //         </p>
// //         <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm">
// //           A complete chess platform to play, learn, compete, and grow—built to
// //           become the world's #1 destination for chess.
// //         </p>
// //       </div>

// //       {/* Play Button — elongated capsule with glow */}
// //       <button
// //         className="
// //         group flex items-center gap-3
// //         bg-[#4c50e6] hover:bg-[#3d41ce]
// //         active:scale-[0.98] transition-all duration-200
// //         px-8 py-3 rounded-full
// //         shadow-[0_0_20px_rgba(76,80,230,0.5),0_0_40px_rgba(76,80,230,0.2)]
// //         hover:shadow-[0_0_30px_rgba(76,80,230,0.7),0_0_60px_rgba(76,80,230,0.3)]
// //         border border-[#7c7fff]/40
// //         font-semibold tracking-wide text-white text-base
// //         relative overflow-hidden
// //       "
// //       >
// //         {/* shine effect */}
// //         <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

// //         <img
// //           src="/play-icon.png"
// //           alt=""
// //           className="w-6 h-6 object-contain relative z-10"
// //           onError={(e) => {
// //             e.target.style.display = "none";
// //           }}
// //         />
// //         <span className="relative z-10">Play</span>
// //       </button>
// //     </div>
// //   );
// // }
