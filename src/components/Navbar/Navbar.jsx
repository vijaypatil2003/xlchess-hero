import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = ["Play", "Learn", "Compete", "Community"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Play");

  return (
    <>
      {/* Removed the extra spacing from header container to let the sharp navbar align perfectly */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-none border-b border-[#d4af37]/15 bg-[#07050d]/80 px-6 py-2 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          {/* Logo Area */}
          <a href="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src="/xlchess.png"
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
                  onClick={() => setActiveTab(item)}
                  className={`relative px-6 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
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
            className="lg:hidden text-neutral-300 hover:text-[#ebd391] transition-colors focus:outline-none"
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
                  onClick={() => {
                    setActiveTab(item);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-xs uppercase tracking-widest font-semibold pb-2 border-b border-white/5 ${
                    activeTab === item ? "text-[#ebd391]" : "text-neutral-400"
                  }`}
                >
                  {item}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button className="rounded-full border border-white/10 py-3 text-xs uppercase tracking-widest font-semibold text-neutral-300">
                  Log in
                </button>

                <button className="rounded-full bg-gradient-to-r from-purple-900 to-indigo-950 text-[#ebd391] border border-[#d4af37]/30 py-3 text-xs uppercase tracking-widest font-bold">
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

// import { useState } from "react";

// const NAV_LINKS = ["Play", "Learn", "Compete", "Community"];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Play");

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50">
//         <div className="mx-auto flex h-24 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
//           {/* Logo */}
//           <a href="/" className="flex items-center shrink-0">
//             <img
//               src="/xlchess.png"
//               alt="XLChess"
//               className="h-11 w-auto object-contain"
//             />
//           </a>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
//             <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] px-10 py-2 backdrop-blur-2xl shadow-[0_10px_40px_rgba(124,92,255,0.08)]">
//               {NAV_LINKS.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setActiveTab(item)}
//                   className={`relative px-7 py-2 text-[15px] font-medium transition-all duration-300 ${
//                     activeTab === item
//                       ? "text-white"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   {item}

//                   {activeTab === item && (
//                     <span className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#6B5CFF] to-[#9A7CFF]" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center gap-4">
//             <button className="h-12 rounded-full border border-white/10 bg-[#0b0d1d]/80 px-8 text-[15px] font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#7C5CFF]/40 hover:bg-[#11142a]">
//               Log in
//             </button>

//             <button className="h-12 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9A7DFF] px-9 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(123,97,255,0.35)] transition-all duration-300 hover:brightness-110">
//               Sign up
//             </button>
//           </div>

//           {/* Mobile */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="lg:hidden text-white"
//           >
//             ☰
//           </button>
//         </div>
//       </header>

//       {menuOpen && (
//         <div className="fixed top-20 inset-x-4 z-40 rounded-3xl border border-white/10 bg-[#090b19]/95 backdrop-blur-2xl p-6 lg:hidden">
//           <div className="flex flex-col gap-5">
//             {NAV_LINKS.map((item) => (
//               <button
//                 key={item}
//                 onClick={() => {
//                   setActiveTab(item);
//                   setMenuOpen(false);
//                 }}
//                 className={`text-left text-base ${
//                   activeTab === item ? "text-[#8B73FF]" : "text-gray-300"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}

//             <div className="pt-4 flex flex-col gap-3">
//               <button className="rounded-xl border border-white/10 py-3 text-white">
//                 Log in
//               </button>

//               <button className="rounded-xl bg-gradient-to-r from-[#6F5BFF] to-[#8F6DFF] py-3 font-semibold text-white">
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
