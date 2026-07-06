import React from "react";

export default function HeroSection() {
  return (
    <div
      className="
        lg:col-span-5
        flex
        flex-col
        items-start
        text-left
        space-y-4
        w-full
        max-w-full
        lg:max-w-[700px]
        mx-auto
        lg:mx-0
        mt-4
        lg:mt-8
      "
    >
      {/* Logo */}
      <div>
        <img
          src="/xlchess.png"
          alt="XLCHESS Logo"
          className="
            h-20
            sm:h-24
            md:h-32
            lg:h-36
            w-auto
            object-contain
          "
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Headlines */}
      <div className="space-y-5 pt-1 w-full">
        <h1
          className="
            text-[32px]
            sm:text-[40px]
            md:text-[52px]
            lg:text-[56px]
            font-black
            leading-[1.03]
            tracking-[-0.02em]
            break-words
          "
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Build the Future of
          <br />
          <span className="bg-gradient-to-r from-[#6e71f9] to-[#9799ff] bg-clip-text text-transparent">
            Online Chess
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg font-bold tracking-wide leading-snug">
          Making the Best Move on the Way to the Top
        </p>

        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-full lg:max-w-xl">
          A complete chess platform to play, learn, compete, and grow—built
          <span className="hidden lg:inline">
            <br />
          </span>{" "}
          to become the world's #1 destination for chess.
        </p>
      </div>

      {/* Play Button */}
      <button
        className="
          flex
          items-center
          gap-3
          px-6
          py-2.5
          rounded-2xl
          bg-gradient-to-r
          from-[#5b5fff]
          to-[#787cff]
          text-white
          font-semibold
          shadow-[0_10px_30px_rgba(91,95,255,0.35)]
          hover:translate-y-[-2px]
          hover:shadow-[0_15px_35px_rgba(91,95,255,0.5)]
          transition-all
          duration-300
        "
      >
        <img
          src="/play-icon.png"
          alt="Play"
          className="w-7 h-7 object-contain scale-[1.3]"
        />

        <span className="tracking-wide text-sm sm:text-base">Play</span>
      </button>
    </div>
  );
}
