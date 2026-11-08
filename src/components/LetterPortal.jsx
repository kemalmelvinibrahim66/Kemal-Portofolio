import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function LetterPortal({ copy }) {
  const word = (copy?.word || 'PORTOFOLIO').split('');
  const [selectedIndex, setSelectedIndex] = useState(2); // Default 'R'
  const [originPercent, setOriginPercent] = useState(25);
  const portalRef = useRef(null);
  const wordContainerRef = useRef(null);
  const letterRefs = useRef([]);

  // Measure the exact horizontal center percentage of the clicked letter inside the word container
  useLayoutEffect(() => {
    const updateOrigin = () => {
      const container = wordContainerRef.current;
      const letterEl = letterRefs.current[selectedIndex];
      if (container && letterEl) {
        const containerRect = container.getBoundingClientRect();
        const letterRect = letterEl.getBoundingClientRect();
        if (containerRect.width > 0) {
          const letterCenter =
            letterRect.left - containerRect.left + letterRect.width / 2;
          const pct = (letterCenter / containerRect.width) * 100;
          setOriginPercent(pct);
          return;
        }
      }
      // Fallback mathematical estimate if DOM layout isn't measured (e.g. JSDOM)
      const fallbackPct = ((selectedIndex + 0.5) / word.length) * 100;
      setOriginPercent(fallbackPct);
    };

    updateOrigin();
    window.addEventListener('resize', updateOrigin);
    return () => window.removeEventListener('resize', updateOrigin);
  }, [selectedIndex, word.length]);

  const { scrollYProgress } = useScroll({
    target: portalRef,
    offset: ['start start', 'end end'],
  });

  // Shift the chosen letter to the center of the viewport as we zoom in, and scale around that exact letter!
  const targetShiftPercent = 50 - originPercent;
  const x = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ['0%', `${targetShiftPercent}%`, `${targetShiftPercent}%`]
  );
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [1, 3.2, 24, 48]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const helperTextOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const lightOverlayOpacity = useTransform(scrollYProgress, [0.58, 0.9], [0, 1]);

  return (
    <section
      ref={portalRef}
      aria-label="Portfolio Portal Transition"
      className="relative h-[155vh] bg-[#0C1017] select-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle Radial Coral Backdrop */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[#FF6B4A]/10 blur-[130px] pointer-events-none" />

        {/* Interactive Letter Picker Header (fades out cleanly as zoom begins) */}
        <motion.div
          style={{ opacity: helperTextOpacity }}
          className="relative z-20 text-center px-6 mb-8 space-y-2"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-[#FF856A]">
            {copy?.hint || 'Klik huruf untuk memilih jalur zoom, lalu gulir ke bawah'}
          </span>
        </motion.div>

        {/* Giant Zooming Word Anchored to Selected Letter's Exact Transform-Origin */}
        <motion.div
          ref={wordContainerRef}
          style={{
            x,
            scale,
            rotate,
            transformOrigin: `${originPercent}% 50%`,
          }}
          role="radiogroup"
          aria-label="Choose portal letter"
          className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-4 will-change-transform"
        >
          {word.map((letter, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${letter}-${idx}`}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedIndex(idx)}
                className={`text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter transition-colors duration-200 px-1 rounded-xl ${
                  isSelected
                    ? 'text-[#FAFAFA] drop-shadow-[0_0_35px_rgba(255,107,74,0.85)]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </motion.div>

        <motion.p
          style={{ opacity: helperTextOpacity }}
          className="relative z-20 mt-8 text-xs font-mono text-slate-400 px-6 text-center"
        >
          {copy?.sub}
        </motion.p>

        {/* Seamless White Portal Wash at End of Zoom */}
        <motion.div
          style={{ opacity: lightOverlayOpacity }}
          className="absolute inset-0 bg-[#FAFAFA] pointer-events-none z-30"
        />
      </div>
    </section>
  );
}
