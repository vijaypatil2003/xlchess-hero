import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import BackgroundWatermarks from "./components/BackgroundWatermarks";
import ChessDashboard from "./components/EvergreenGame";
import PlayArena from "./components/PlayArena/PlayArena";
import Learn from "./components/Learn/Learn";
import Compete from "./components/Compete/Compete";
import Community from "./components/Community/Community";
import Preloader from "./components/Preloader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // Elegant system initialization delay wrapper
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // 2.8 seconds lets the beautiful shimmer show off perfectly

    return () => clearTimeout(timer);
  }, []);

  // Viewport tracking script: highlights navbar links dynamically during scroll
  useEffect(() => {
    const sections = ["Hero", "Play", "Learn", "Compete", "Community"];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focuses logic on the central layout viewport area
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Smooth Fade Out for the Preloader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Application Container — Fades in gently as the loader disappears */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 15 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen w-full overflow-x-hidden bg-[#07050d] text-white selection:bg-[#ebd391]/20 selection:text-[#ebd391]"
      >
        <BackgroundWatermarks />

        {/* Ambient Glow Infrastructure */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-220px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-[180px]" />
          <div className="absolute left-[-150px] top-[900px] h-[500px] w-[500px] rounded-full bg-[#6366F1]/10 blur-[170px]" />
          <div className="absolute right-[-120px] top-[1800px] h-[600px] w-[600px] rounded-full bg-[#8B5CF6]/10 blur-[200px]" />
          <div className="absolute left-[-120px] top-[2800px] h-[550px] w-[550px] rounded-full bg-[#7C5CFF]/10 blur-[180px]" />
        </div>

        {/* State Controlled Premium Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 flex flex-col gap-36 pt-28 pb-32">
          {/* Section 1: Hero Showcase */}
          <section
            id="Hero"
            className="min-h-[calc(100vh-112px)] flex items-center scroll-mt-28"
          >
            <ChessDashboard />
          </section>

          {/* Section 2: Interactive Play Arena — Stripped pt-16 */}
          <section
            id="Play"
            className="min-h-[85vh] scroll-mt-28 border-t border-white/[0.03]"
          >
            <PlayArena />
          </section>

          {/* Section 3: Learn Academy — Stripped pt-16 */}
          <section
            id="Learn"
            className="min-h-[80vh] scroll-mt-28 border-t border-white/[0.03]"
          >
            <Learn />
          </section>

          {/* Section 4: Compete Arena — Stripped pt-16 */}
          <section
            id="Compete"
            className="min-h-[80vh] scroll-mt-28 border-t border-white/[0.03]"
          >
            <Compete />
          </section>

          {/* Section 5: Community Hub — Stripped pt-16 */}
          <section
            id="Community"
            className="min-h-[80vh] scroll-mt-28 border-t border-white/[0.03]"
          >
            <Community />
          </section>
        </main>

        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#07050d] to-transparent" />
      </motion.div>
    </>
  );
}
