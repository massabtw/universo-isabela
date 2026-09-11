/**
 * ====================================================================
 * CountdownScreen.jsx — Split Layout Exatamente como no Print Enviado
 * ====================================================================
 *
 * - A Lua colossal no lado direito (ocupando ~60vw / 110vh), cortada na
 *   borda direita exatamente como na foto de referência.
 * - Textos perfeitamente alinhados à esquerda:
 *   "Aniversário / da Bela." ("Bela." em dourado)
 *   "O cosmos aguarda o início dos seus 19 anos."
 *   Contador DIAS · HORAS · MIN · SEG
 *   Botão CTA dourado sólido "Antecipar o Big Bang ↗"
 * - Transição pós-Big Bang:
 *   1. Clarão de luz e linhas warp com som cósmico
 *   2. Textos da esquerda somem
 *   3. Frase centralizada: "A exposição espacial começa"
 *   4. Tela preta suave (fade to black) antes de abrir a Hero Section
 */

import { getTimeLeft } from "../utils/countdown";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Áudio cósmico sintetizado instantâneo e leve
function playBigBangBoom() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    // Sub-bass impact
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(24, now + 1.4);
    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.8);

    // Noise wash
    const bufferSize = Math.floor(ctx.sampleRate * 1.5);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(50, now + 1.4);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 1.5);
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

  // Disparo do Big Bang com sequência cinematográfica
  const triggerBigBang = () => {
    if (isExploding) return;
    setIsExploding(true);
    playBigBangBoom();

    // 1. Clarão imediato
    setFlashOpacity(1);
    startWarpStars();

    // 2. Dissolve o clarão
    setTimeout(() => {
      setFlashOpacity(0);
    }, 500);

    // 3. Após "A exposição espacial começa", tela preta suave
    setTimeout(() => {
      setIsBlackout(true);
    }, 2100);

    // 4. Conclui e abre a HeroSection
    setTimeout(() => {
      onComplete();
    }, 2800);
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
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startWarpStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    cancelAnimationFrame(animIdRef.current);

    const streaks = Array.from({ length: 180 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 25 + 15;
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
        s.vx *= 1.03;
        s.vy *= 1.03;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 1.5, s.y - s.vy * 1.5);
        ctx.stroke();
      });
      animIdRef.current = requestAnimationFrame(renderWarp);
    };
    renderWarp();
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03070E] text-white select-none">
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
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* ── ONDA DE EXPANSÃO ÓPTICA ── */}
      {isExploding && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0.9 }}
          animate={{ scale: 25, opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-amber-200/90 pointer-events-none z-40"
        />
      )}

      {/* ── HEADER NO TOPO (EXATAMENTE COMO NA FOTO) ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 sm:px-14 pt-8 pointer-events-none">
        <span className="font-serif text-base text-white/90 tracking-wide">
          Universo da Isabela
        </span>
        <span className="text-[11px] font-mono text-gray-400 tracking-widest">
          14 · 09 · 2026
        </span>
      </div>

      {/* ── CONTEÚDO SPLIT: ESQUERDA & DIREITA (LUA PIQUE NA FOTO) ── */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden">

        {/* COLUNA ESQUERDA — Textos do countdown */}
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 pt-28 pb-10 md:pt-0 md:pb-0 md:w-1/2 md:max-w-[620px] w-full z-20">
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
                {/* Título principal em 2 linhas exatamente como no print */}
                <h1 className="font-serif leading-[1.05] mb-5">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                    Aniversário
                  </span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                    <span className="text-white">da </span>
                    <span className="text-[#E5C483]">Bela.</span>
                  </span>
                </h1>

                <p className="text-sm text-gray-400 font-light mb-10 max-w-xs leading-relaxed">
                  O cosmos aguarda o início dos seus 19 anos.
                </p>

                {/* Contador alinhado à esquerda */}
                <div className="flex items-end gap-5 sm:gap-8 mb-10">
                  {[
                    { value: timeLeft.days, label: "dias" },
                    { value: timeLeft.hours, label: "horas" },
                    { value: timeLeft.minutes, label: "min" },
                    { value: timeLeft.seconds, label: "seg" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-start">
                      <span className="tabular-nums font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-none tracking-tight">
                        {pad(value)}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1.5 font-mono">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA dourado sólido */}
                <button
                  onClick={triggerBigBang}
                  className="self-start flex items-center gap-2.5 px-6 py-3 rounded-sm bg-[#E5C483] hover:bg-[#D4B070] text-[#03070E] text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_25px_rgba(229,196,131,0.35)]"
                >
                  Antecipar o Big Bang
                  <span className="text-base">↗</span>
                </button>

                <p className="text-[11px] text-gray-500 font-mono mt-3">
                  Uma prévia do universo que espera por você.
                </p>

                {/* Rodapé da esquerda */}
                <div className="flex items-center gap-6 mt-14 pt-6 border-t border-white/[0.07]">
                  <span className="text-[11px] font-mono text-gray-500">Isabela Marty</span>
                  <span className="text-[11px] font-mono text-gray-600">O seu lugar entre as estrelas.</span>
                  <span className="text-[11px] font-mono text-gray-500 ml-auto hidden sm:block">Desde 14.09.2007</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── LUA FOTORREALISTA COLOSSAL EXATAMENTE COMO NO PRINT ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isExploding ? 0.6 : 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[-14vw] lg:right-[-12vw] top-1/2 -translate-y-1/2 w-[clamp(520px,64vw,980px)] aspect-square pointer-events-none select-none z-10 hidden md:flex items-center justify-center"
        >
          {/* Halo cósmico suave circundando o limbo da Lua */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 45% 45%, rgba(229,196,131,0.2) 0%, rgba(120,167,217,0.08) 50%, transparent 72%)",
              transform: "scale(1.15)",
              filter: "blur(30px)",
            }}
          />

          {/* Disco Lunar Monumental cortado pela borda direita exatamente como no print */}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
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
