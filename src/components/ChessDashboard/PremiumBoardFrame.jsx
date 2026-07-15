import { motion } from "framer-motion";

export default function PremiumBoardFrame({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Purple Ambient Glow */}
      <div className="absolute -inset-6 rounded-[40px] bg-[#7C5CFF]/18 blur-[90px]" />

      {/* Outer Glow */}
      <div className="absolute -inset-2 rounded-[34px] bg-gradient-to-r from-[#7C5CFF]/20 via-[#A855F7]/15 to-[#7C5CFF]/20 blur-xl" />

      {/* Glass Container */}
      <div
        className="
        relative
        rounded-[32px]
        p-[2px]
        bg-gradient-to-br
        from-[#F4D47C]
        via-[#8E6A2E]
        to-[#F6E6A8]
        shadow-[0_30px_80px_rgba(0,0,0,.55)]
      "
      >
        {/* Metallic Reflection */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none" />

        {/* Glass */}
        <div
          className="
          relative
          rounded-[30px]
          overflow-hidden
          border
          border-white/10
          bg-[#090B17]/90
          backdrop-blur-3xl
        "
        >
          {children}
        </div>

        {/* Shine */}
      </div>

      {/* Bottom Shadow */}
      <div className="absolute left-1/2 top-full h-14 w-[75%] -translate-x-1/2 rounded-full bg-black/60 blur-3xl" />
    </motion.div>
  );
}
