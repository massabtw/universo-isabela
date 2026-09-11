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

// Áudio cósmico sintetizado aveludado com volume atenuado e decay mais longo
function playBigBangBoom() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    // Sub-bass impact suave e profundo (volume reduzido)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(18, now + 3.2);
    gain.gain.setValueAtTime(0.20, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 3.6);

    // Noise wash cósmico suave
    const bufferSize = Math.floor(ctx.sampleRate * 3.4);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(35, now + 3.0);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.09, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 3.4);
  } catch (e) {}
}

export default function CountdownScreen({ targetDate, onComplete }) {
  const [isExploding, setIsExploding] = useState(false);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [isBlackout, setIsBlackout] = useState(false);

  const canvasRef = useRef(null);
  const animIdRef = useRef(null);

  const calculateTimeLeft = () => getTimeLeft(targetDate);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Disparo do Big Bang com sequência cinematográfica mais longa
  const triggerBigBang = () => {
    if (isExploding) return;
    setIsExploding(true);
    playBigBangBoom();

    // 1. Clarão inicial com dissipação gradual
    setFlashOpacity(1);
    startWarpStars();

    // 2. Dissolve o clarão
    setTimeout(() => {
      setFlashOpacity(0);
    }, 700);

    // 3. Após contemplação ("A exposição espacial começa"), tela preta suave
    setTimeout(() => {
      setIsBlackout(true);
    }, 4200);

    // 4. Conclui e abre a HeroSection
    setTimeout(() => {
      onComplete();
    }, 5000);
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

  // Efeito Warp Speed prolongado ao explodir o Big Bang
  const startWarpStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const cx = width / 2;
    const cy = height / 2;

    const streaks = Array.from({ length: 320 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 22 + 12;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? "#FFFFFF" : Math.random() > 0.5 ? "#E5C483" : "#80D0FF",
      };
    });

    const renderWarp = () => {
      ctx.fillStyle = "rgba(4, 7, 20, 0.25)";
      ctx.fillRect(0, 0, width, height);
      streaks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 1.025;
        s.vy *= 1.025;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 1.6, s.y - s.vy * 1.6);
        ctx.stroke();
      });
      animIdRef.current = requestAnimationFrame(renderWarp);
    };
    renderWarp();
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="countdown-screen relative min-h-screen w-full overflow-hidden bg-black text-white select-none">
      {/* ── CANVAS DE ESTRELAS ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* ── CLARÃO DO BIG BANG ── */}
      <div
        className="absolute inset-0 bg-white pointer-events-none z-50 transition-opacity duration-700 ease-out"
        style={{ opacity: flashOpacity }}
      />

      {/* ── TELA PRETA RÁPIDA (FADE TO BLACK PÓS MENSAGEM) ── */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBlackout ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* ── ONDA DE EXPANSÃO ÓPTICA ── */}
      {isExploding && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0.9 }}
          animate={{ scale: 30, opacity: 0 }}
          transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-amber-200/90 pointer-events-none z-40"
        />
      )}

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
                    <span className="text-[#E5C483]">Bela.</span>
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

                {/* CTA dourado sólido */}
                <button
                  onClick={triggerBigBang}
                  className="self-start flex items-center gap-2.5 px-6 py-3 rounded-sm bg-[#E5C483] hover:bg-[#D4B070] text-[#03070E] text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_25px_rgba(229,196,131,0.35)]"
                >
                  Antecipar o Big Bang
                  <span className="text-base">↗</span>
                </button>

                <p className="text-[10px] sm:text-[11px] text-gray-500 font-mono mt-3">
                  Uma prévia do universo que espera por você.
                </p>

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
            <img
              src="/moon_full.jpg"
              alt="Lua"
              className="w-full h-full object-cover rounded-full"
              style={{
                filter: "brightness(0.92) contrast(1.08) saturate(0.9)",
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      {/* ── MENSAGEM PÓS-BIG BANG: "A exposição espacial começa" ── */}
      <AnimatePresence>
        {isExploding && !isBlackout && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 1.0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight text-center px-6">
              A exposição espacial começa
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
