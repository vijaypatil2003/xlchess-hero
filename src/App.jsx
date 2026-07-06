import React from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import BackgroundWatermarks from "./components/BackgroundWatermarks";
import EvergreenGame from "./components/EvergreenGame";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#060b1e] bg-gradient-to-br from-[#080d26] via-[#050a1c] to-[#020512] font-sans text-white">
      {/* Navbar */}
      <Navbar />

      {/* Animated Background */}
      <BackgroundWatermarks />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero */}
          <HeroSection />

          {/* Chess Section */}
          <div className="lg:col-span-7 mt-8 lg:mt-12">
            <EvergreenGame />
          </div>
        </div>
      </main>
    </div>
  );
}
