/**
 * ====================================================================
 * CountdownScreen.jsx — Split Layout Luxuoso com Big Bang Aprimorado
 * ====================================================================
 *
 * - A Lua colossal no lado direito, cortada na borda direita.
 * - Textos perfeitamente alinhados e responsivos no celular.
 * - Big Bang cinemático estendido com som suave e aveludado.
 */

import { getTimeLeft } from "../utils/countdown";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import BigBangTransition from "./BigBangTransition";

export default function CountdownScreen({ targetDate, onComplete }) {
  const [isExploding, setIsExploding] = useState(false);
  const [belaClicks, setBelaClicks] = useState(0);

  const canvasRef = useRef(null);
  const animIdRef = useRef(null);
  const explodingRef = useRef(false);

  const calculateTimeLeft = () => getTimeLeft(targetDate);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  const handleBelaClick = () => {
    const newClicks = belaClicks + 1;
    setBelaClicks(newClicks);
    if (newClicks >= 3) {
      triggerBigBang();
    }
  };

  // O contador e o atalho de três toques compartilham um único disparo.
  const triggerBigBang = () => {
    if (explodingRef.current) return;
    explodingRef.current = true;
    setIsExploding(true);
    // Prepara o universo durante a animação para reduzir a espera na revelação.
    import('../Universe').catch(() => {});
    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
  };

  useEffect(() => {
    if (isExploding) return;
    const tick = () => {
      const current = calculateTimeLeft();
      if (current.diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        triggerBigBang();
      } else {
        setTimeLeft(current);
      }
    };
    const timer = setInterval(tick, 250);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [targetDate, isExploding]);

  // Canvas de estrelas de fundo estático e leve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.012 + 0.004,
    }));

    let frame = 0;
    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = s.alpha + Math.sin(frame * s.pulse) * 0.18;
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(1, a))})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      animIdRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="countdown-screen relative min-h-screen w-full overflow-hidden bg-black text-white select-none">
      {/* ── CANVAS DE ESTRELAS ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {isExploding && <BigBangTransition onComplete={onComplete} />}

      {/* ── HEADER NO TOPO ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-14 pt-6 sm:pt-8 pointer-events-none">
        <span className="font-serif text-sm sm:text-base text-white/90 tracking-wide">
          Universo da Isabela
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 tracking-widest">
          14 · 09 · 2026
        </span>
      </div>

      {/* ── CONTEÚDO SPLIT: ESQUERDA & DIREITA (RESPONSIVO NO CELULAR) ── */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden">

        {/* COLUNA ESQUERDA — Textos do countdown */}
        <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-20 pb-10 md:pt-0 md:pb-0 md:w-1/2 md:max-w-[620px] w-full z-20">
          <AnimatePresence mode="wait">
            {!isExploding && (
              <motion.div
                key="countdown-content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                {/* Título principal responsivo */}
                <h1 className="font-serif leading-[1.05] mb-4 sm:mb-5">
                  <span className="block text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                    Aniversário
                  </span>
                  <span className="block text-4xl sm:text-6xl lg:text-7xl tracking-tight">
                    <span className="text-white">da </span>
                    <span 
                      className="text-[#E5C483] cursor-pointer"
                      onClick={handleBelaClick}
                    >
                      Bela.
                    </span>
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-gray-400 font-light mb-6 sm:mb-10 max-w-xs leading-relaxed">
                  O cosmos aguarda o início dos seus 19 anos.
                </p>

                {/* Contador alinhado à esquerda */}
                <div className="flex items-end gap-4 sm:gap-8 mb-8 sm:mb-10">
                  {[
                    { value: timeLeft.days, label: "dias" },
                    { value: timeLeft.hours, label: "horas" },
                    { value: timeLeft.minutes, label: "min" },
                    { value: timeLeft.seconds, label: "seg" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-start">
                      <span className="tabular-nums font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-none tracking-tight">
                        {pad(value)}
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-gray-500 mt-1.5 font-mono">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Rodapé da esquerda */}
                <div className="flex items-center gap-4 sm:gap-6 mt-10 sm:mt-14 pt-6 border-t border-white/[0.07]">
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-500">Isabela Marty</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-600">O seu lugar entre as estrelas.</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 ml-auto hidden sm:block">Desde 14.09.2007</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── LUA FOTORREALISTA COLOSSAL ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isExploding ? 0.6 : 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="side-moon pointer-events-none select-none z-10"
        >
          {/* Halo cósmico suave */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 45% 45%, rgba(229,196,131,0.2) 0%, rgba(120,167,217,0.08) 50%, transparent 72%)",
              transform: "scale(1.15)",
              filter: "blur(30px)",
            }}
          />

          {/* Disco Lunar Monumental */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[-25px_0_70px_rgba(0,0,0,0.9)] border border-white/[0.05]">
            <picture>
              <source srcSet="/moon-1280.webp" type="image/webp" />
              <img
                src="/moon-640.webp"
                alt="Lua"
                className="w-full h-full object-cover rounded-full"
                style={{
                  filter: "brightness(0.92) contrast(1.08) saturate(0.9)",
                }}
                draggable={false}
              />
            </picture>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
