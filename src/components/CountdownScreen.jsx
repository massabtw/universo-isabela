/**
 * ====================================================================
 * CountdownScreen.jsx — Tela de Espera Cósmica & Big Bang (Ultra Otimizado)
 * ====================================================================
 *
 * Design Clean & Moderno (Espaço Profundo / Dark Space):
 * - 60-120 FPS garantidos (sem shadowBlur pesado, sem lag)
 * - Tipografia editorial minimalista de alto luxo
 * - Transição cinemática de Big Bang instantânea e impactante (2 segundos)
 * - Efeito de expansão cósmica por linhas de velocidade estelar e clarão de luz
 */

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

  const canvasRef = useRef(null);
  const animIdRef = useRef(null);

  // Cálculo de tempo
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { diff: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60 * 60)) % 60),
      seconds: Math.floor((diff / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Disparo cinematográfico e fluido do Big Bang
  const triggerBigBang = () => {
    if (isExploding) return;
    setIsExploding(true);
    playBigBangBoom();

    // 1. Clarão imediato
    setFlashOpacity(1);

    // 2. Inicia efeito warp no canvas
    startWarpStars();

    // 3. Dissolve o clarão suavemente
    setTimeout(() => {
      setFlashOpacity(0);
    }, 550);

    // 4. Conclui e entra no site com transição natural em 2.9s
    setTimeout(() => {
      onComplete();
    }, 2900);
  };

  // Efeito do relógio
  useEffect(() => {
    if (isExploding) return;

    const timer = setInterval(() => {
      const current = calculateTimeLeft();
      if (current.diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        triggerBigBang();
      } else {
        setTimeLeft(current);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isExploding]);

  // Canvas leve e otimizado (60 FPS garantidos)
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

    // 100 estrelas estáticas de fundo (custo de renderização quase zero)
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    let frame = 0;
    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Renderização simples e super rápida sem filtros caros
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = s.alpha + Math.sin(frame * s.pulse) * 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, a))})`;
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

  // Efeito warp de linhas de velocidade cósmica para o Big Bang
  const startWarpStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    // Cancela loop estático
    cancelAnimationFrame(animIdRef.current);

    // 180 feixes de velocidade partindo do centro
    const streaks = Array.from({ length: 180 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 25 + 15;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 40 + 20,
        color: Math.random() > 0.3 ? "#FFFFFF" : Math.random() > 0.5 ? "#E5C483" : "#80D0FF",
        alpha: 1,
      };
    });

    const renderWarp = () => {
      // Deixa rastro suave de movimento cósmico
      ctx.fillStyle = "rgba(4, 7, 20, 0.25)";
      ctx.fillRect(0, 0, width, height);

      streaks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 1.03; // acelera suavemente
        s.vy *= 1.03;

        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#040714] text-white select-none">
      
      {/* ── CANVAS DE ESTRELAS DE ALTA PERFORMANCE ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* ── NEBULOSA CÓSMICA PROFUNDA & SUTIL ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(20, 32, 65, 0.4) 0%, rgba(4, 7, 20, 0.95) 75%)"
        }}
      />

      {/* ── ANEL ORBITAL CLEAN DISCRETO ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-white/[0.03] pointer-events-none z-0" />

      {/* ── CLARÃO DO BIG BANG (HARDWARE ACCELERATED) ── */}
      <div 
        className="absolute inset-0 bg-white pointer-events-none z-50 transition-opacity duration-700 ease-out"
        style={{ opacity: flashOpacity }}
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

      {/* ── CONTEÚDO PRINCIPAL (CLEAN & MODERNO) ── */}
      <AnimatePresence>
        {!isExploding && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl w-full"
          >
            {/* Tag superior fina */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-celestial-gold/40" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-celestial-gold font-mono">
                14 de Setembro de 2026
              </span>
              <span className="w-8 h-[1px] bg-celestial-gold/40" />
            </div>

            {/* Título Principal */}
            <h1 className="font-serif text-3xl sm:text-5xl text-celestial-starlight tracking-tight mb-2">
              Aniversário da Bela
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-light mb-12 sm:mb-16">
              O cosmos aguarda o início dos seus 19 anos.
            </p>

            {/* ── NÚMEROS DO CRONÔMETRO (MINIMALISTAS & ELEGANTES) ── */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-14">
              {/* Dias */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
                  {pad(timeLeft.days)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 mt-2 font-mono">
                  dias
                </span>
              </div>

              <span className="font-serif text-2xl sm:text-4xl text-white/20 -mt-6">:</span>

              {/* Horas */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
                  {pad(timeLeft.hours)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 mt-2 font-mono">
                  horas
                </span>
              </div>

              <span className="font-serif text-2xl sm:text-4xl text-white/20 -mt-6">:</span>

              {/* Minutos */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
                  {pad(timeLeft.minutes)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 mt-2 font-mono">
                  min
                </span>
              </div>

              <span className="font-serif text-2xl sm:text-4xl text-white/20 -mt-6">:</span>

              {/* Segundos */}
              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
                  {pad(timeLeft.seconds)}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 mt-2 font-mono">
                  seg
                </span>
              </div>
            </div>

            {/* ── BOTÃO DISCRETO E CLEAN DE SIMULAÇÃO ── */}
            <button
              onClick={triggerBigBang}
              className="px-5 py-2 rounded-full border border-white/10 hover:border-celestial-gold/50 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono uppercase tracking-[0.25em] text-gray-400 hover:text-celestial-gold transition-all duration-300 cursor-pointer active:scale-95"
            >
              Simular 00:00:00 (Big Bang)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MENSAGEM DO BIG BANG EM EXPANSÃO ── */}
      {isExploding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative z-30 flex flex-col items-center text-center px-4"
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-celestial-gold font-mono mb-2">
            Gênese Cósmica
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            A exposição espacial começa
          </h2>
        </motion.div>
      )}

      {/* Assinatura discreta no rodapé */}
      <div className="absolute bottom-6 text-[10px] text-gray-500 font-mono tracking-[0.25em] uppercase z-10">
        Isabela Marty • 14.09.2007
      </div>

    </div>
  );
}

