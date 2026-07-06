import { useState } from "react";

const NAV_LINKS = ["Play", "Learn", "Compete", "Community"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Play");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="w-full px-4 lg:px-6 h-20 flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/xlchess.png"
                alt="XLChess"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </a>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => setActiveTab(link)}
                    className={`text-sm font-semibold transition-all duration-300 ${
                      activeTab === link
                        ? "text-[#6B7FE3] drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/*   Login / Signup  */}
          <div className="hidden md:flex items-center rounded-full p-1 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <button className="px-2 py-1 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-200">
              Log In
            </button>

            <button className="px-2 py-1 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#5c61ff] to-[#7b7eff] shadow-[0_0_15px_rgba(92,97,255,0.5)] hover:scale-[1.03] transition-all duration-200">
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-[#6B7FE3] rounded p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 md:hidden bg-[#060b1e]/98 backdrop-blur-md px-4 pb-6 pt-4 border-t border-white/10 shadow-xl">
          <ul className="flex flex-col gap-4 mb-6">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => {
                    setActiveTab(link);
                    setMenuOpen(false);
                  }}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === link
                      ? "text-[#6B7FE3]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <button className="w-full px-5 py-3 text-sm font-semibold text-gray-300 border border-white/20 rounded-xl hover:bg-white/5 transition-all">
              Log In
            </button>

            <button className="w-full px-5 py-3 text-sm font-semibold text-white bg-[#4c50e6] hover:bg-[#3d41ce] rounded-xl transition-all">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
