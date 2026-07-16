import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../../assets/conpany-logo.png";

const NAV_LINKS = ["Hero", "Play", "Learn", "Compete", "Community"];

export default function Navbar({
  activeTab,
  setActiveTab,
  menuOpen,
  setMenuOpen,
}) {
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);

    // Smooth scroll to targeted layout element safely
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-none border-b border-[#d4af37]/15 bg-[#07050d]/80 px-6 py-2 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          {/* Logo Area */}
          <a href="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src={logo}
              alt="XLChess"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-[10px] text-[#ebd391] tracking-[0.2em] font-mono border border-[#d4af37]/20 px-1.5 py-0.5 rounded-md bg-[#d4af37]/5 uppercase hidden sm:inline-block">
              v1.0
            </span>
          </a>

          {/* Desktop Navigation with Premium Sliding Pill Effect */}
          <nav className="hidden lg:flex items-center gap-1 relative">
            {NAV_LINKS.map((item) => {
              const isActive = activeTab === item;
              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-5 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? "text-[#ebd391]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#d4af37]/5 border border-[#d4af37]/20"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Premium Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-xs uppercase tracking-widest font-semibold text-neutral-300 hover:text-[#ebd391] transition duration-300 cursor-pointer px-4 py-2">
              Log in
            </button>

            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 text-[11px] tracking-wider uppercase font-bold transition duration-300 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
            >
              <span>Sign up</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-neutral-300 hover:text-[#ebd391] transition-colors focus:outline-none cursor-pointer"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Elegant Overlay Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-20 inset-x-4 z-40 rounded-[24px] border border-[#d4af37]/15 bg-[#07050d]/95 backdrop-blur-2xl p-6 lg:hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-left text-xs uppercase tracking-widest font-semibold pb-2 border-b border-white/5 cursor-pointer ${
                    activeTab === item ? "text-[#ebd391]" : "text-neutral-400"
                  }`}
                >
                  {item}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button className="rounded-full border border-white/10 py-3 text-xs uppercase tracking-widest font-semibold text-neutral-300 cursor-pointer">
                  Log in
                </button>

                <button className="rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 py-3 text-xs uppercase tracking-widest font-bold cursor-pointer">
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
