import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LetterPortal({ copy }) {
  const word = (copy?.word || 'PORTOFOLIO').split('');
  const [selectedIndex, setSelectedIndex] = useState(2); // Default 'R'
  const portalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 2.8, 18]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const lightOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.92], [0, 1]);

  return (
    <section
      ref={portalRef}
      aria-label="Portfolio Portal Transition"
      className="relative h-[135vh] bg-[#0C1017] select-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle Radial Coral Backdrop */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[#FF6B4A]/10 blur-[130px] pointer-events-none" />

        {/* Interactive Letter Picker Header */}
        <div className="relative z-20 text-center px-6 mb-8 space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-[#FF856A]">
            {copy?.hint || 'Klik huruf untuk memilih jalur zoom, lalu gulir ke bawah'}
          </span>
        </div>

        {/* Giant Zooming Word */}
        <motion.div
          style={{ scale, rotate }}
          role="radiogroup"
          aria-label="Choose portal letter"
          className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-4"
        >
          {word.map((letter, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${letter}-${idx}`}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedIndex(idx)}
                className={`text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter transition-all duration-300 px-1 rounded-xl ${
                  isSelected
                    ? 'text-[#FAFAFA] drop-shadow-[0_0_35px_rgba(255,107,74,0.85)] scale-110'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </motion.div>

        <p className="relative z-20 mt-8 text-xs font-mono text-slate-400 px-6 text-center">
          {copy?.sub}
        </p>

        {/* Seamless White Portal Wash at End of Zoom */}
        <motion.div
          style={{ opacity: lightOverlayOpacity }}
          className="absolute inset-0 bg-[#FAFAFA] pointer-events-none z-30"
        />
      </div>
    </section>
  );
}
