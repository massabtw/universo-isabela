import { useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BIG_BANG_DURATION, createBigBangScene, playBigBangSound } from '../utils/bigBangScene';

export default function BigBangTransition({ onComplete }) {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const completeRef = useRef(onComplete);
  const finishedRef = useRef(false);
  const soundRef = useRef(null);
  completeRef.current = onComplete;

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    soundRef.current?.();
    completeRef.current();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const duration = reduced ? 1400 : BIG_BANG_DURATION;
    const timer = window.setTimeout(finish, duration);
    const scene = !reduced && canvasRef.current ? createBigBangScene(canvasRef.current) : null;
    if (!reduced) soundRef.current = playBigBangSound();
    const start = performance.now();
    let frame;
    const render = now => {
      if (finishedRef.current) return;
      scene?.draw((now - start) / 1000);
      if (scene) frame = requestAnimationFrame(render);
    };
    if (scene) frame = requestAnimationFrame(render);
    const resize = () => scene?.resize();
    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      soundRef.current?.();
      window.removeEventListener('resize', resize);
      document.body.style.overflow = previousOverflow;
    };
  }, [finish, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#020304]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 0.4 }}
      role="status"
      aria-label="O nascimento do seu universo"
    >
      {!reduced && <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 46%, transparent 20%, rgba(2,3,4,0.65) 100%)' }} />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? [0, 1, 1] : [0, 1, 1, 0] }}
        transition={reduced ? { duration: 0.4 } : { delay: 3.5, duration: 2.7, times: [0, 0.3, 0.78, 1] }}
      >
        <p className="font-serif text-base sm:text-xl text-[#E5C483] mb-4">Bela,</p>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight text-[#fff6e6] max-w-3xl" style={{ textShadow: '0 2px 35px #020304' }}>
          este universo é seu.
        </h2>
      </motion.div>
    </motion.div>
  );
}
