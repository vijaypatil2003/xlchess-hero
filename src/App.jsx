import React from "react";

import Navbar from "./components/Navbar/Navbar";
import BackgroundWatermarks from "./components/BackgroundWatermarks";
import ChessDashboard from "./components/EvergreenGame";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07050d] text-white">
      {/* Background elements */}
      <BackgroundWatermarks />

      {/* Restored Saturated Royal Violet Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-[180px]" />
        <div className="absolute right-[-120px] bottom-[-200px] h-[450px] w-[450px] rounded-full bg-[#8B5CF6]/15 blur-[180px]" />
        <div className="absolute left-[-120px] top-[35%] h-[350px] w-[350px] rounded-full bg-[#6366F1]/10 blur-[150px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pt-28 pb-10 sm:px-8 lg:px-12">
        <ChessDashboard />
      </main>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#07050d] to-transparent" />
    </div>
  );
}

// import React from "react";

// import Navbar from "./components/Navbar/Navbar";
// import HeroSection from "./components/HeroSection";
// import BackgroundWatermarks from "./components/BackgroundWatermarks";
// import ChessDashboard from "./components/EvergreenGame";

// export default function App() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#060814] text-white">
//       {/* Background */}
//       <BackgroundWatermarks />

//       {/* Ambient Glow */}
//       <div className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-[180px]" />

//         <div className="absolute right-[-120px] bottom-[-200px] h-[420px] w-[420px] rounded-full bg-[#6F5BFF]/15 blur-[180px]" />

//         <div className="absolute left-[-120px] top-[35%] h-[320px] w-[320px] rounded-full bg-[#5F5BFF]/10 blur-[150px]" />
//       </div>

//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pt-28 pb-10 sm:px-8 lg:px-12">
//         <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
//           {/* Left Hero */}
//           <div className="lg:col-span-5 flex items-center">
//             <HeroSection />
//           </div>

//           <div className="lg:col-span-7 flex justify-end">
//             <ChessDashboard />
//           </div>
//         </div>
//       </main>

//       {/* Bottom Fade */}
//       <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#060814] to-transparent" />
//     </div>
//   );
// }

// import React from "react";
// import Navbar from "./components/Navbar/Navbar";
// import HeroSection from "./components/HeroSection";
// import EvergreenGame from "./components/EvergreenGame";
// import BackgroundWatermarks from "./components/BackgroundWatermarks";

// export default function App() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#060814] text-white">
//       {/* Background */}
//       <BackgroundWatermarks />

//       {/* Gradient Glow */}
//       <div className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute top-[-220px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-[180px]" />
//         <div className="absolute bottom-[-250px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#6E3CFF]/15 blur-[180px]" />
//         <div className="absolute top-[35%] left-[-120px] h-[320px] w-[320px] rounded-full bg-[#5F5BFF]/10 blur-[150px]" />
//       </div>

//       {/* Navbar */}
//       <Navbar />

//       {/* Hero */}
//       <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-5 pt-28 pb-10 sm:px-8 lg:px-12">
//         <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
//           {/* Left */}
//           <div className="lg:col-span-5">
//             <HeroSection />
//           </div>

//           {/* Right */}
//           <div className="lg:col-span-7 flex justify-center lg:justify-end">
//             <EvergreenGame />
//           </div>
//         </div>
//       </main>

//       {/* Bottom Fade */}
//       <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#060814] to-transparent" />
//     </div>
//   );
// }
