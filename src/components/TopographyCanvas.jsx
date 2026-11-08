import { useEffect, useRef } from 'react';

export function TopographyCanvas({ theme = 'dark', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      typeof canvas.getContext !== 'function' ||
      (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || ''))
    ) {
      return;
    }

    let ctx = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth || window.innerWidth || 1200;
      canvas.height = canvas.offsetHeight || window.innerHeight || 800;
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.0045;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const strokeColor =
        theme === 'light'
          ? 'rgba(113, 113, 122, 0.22)'
          : 'rgba(255, 107, 74, 0.12)';
      const secondaryColor =
        theme === 'light'
          ? 'rgba(255, 107, 74, 0.14)'
          : 'rgba(148, 163, 184, 0.10)';

      const lines = 11;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 3 === 0 ? strokeColor : secondaryColor;
        ctx.lineWidth = i % 3 === 0 ? 1.2 : 0.8;

        const baseY = (height / (lines + 1)) * (i + 1);
        for (let x = 0; x <= width; x += 28) {
          const wave1 = Math.sin(x * 0.0028 + time + i * 0.55) * 32;
          const wave2 = Math.cos(x * 0.0062 - time * 0.8 + i * 0.9) * 18;
          const y = baseY + wave1 + wave2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none inset-0 w-full h-full ${className}`}
    />
  );
}
