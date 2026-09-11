/**
 * ====================================================================
 * HeroSection — Entrada Celestial Cinemática (3D Solar Scroll Engine)
 * ====================================================================
 *
 * Animação de Scroll Cinemática de Alto Impacto:
 * 1. ☀️ Núcleo Solar Radiante: Expande e irradia raios dourados atrás do nome.
 * 2. 🌍 Revolução 3D da Terra e Lua: A Terra orbita 360° ao redor do nome
 *    conforme você rola a página, com profundidade de primeiro e segundo plano.
 * 3. ⏱️ Contador Interativo de Órbitas: Conta dinamicamente de 1 a 19 voltas
 *    ao redor do Sol com gauge circular progressivo.
 * 4. ✨ Reflexo Estelar no Nome: Shimmer dourado que desliza pelas letras.
 * 5. 🧭 Bússola e Anéis Astronômicos: Rotação tridimensional com paralaxe.
 */

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PERSON_NAME, TURNING_AGE } from "../config";

export default function HeroSection() {
  const storyRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    let frame;
    const update = () => {
      const distance = story.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -story.getBoundingClientRect().top / Math.max(1, distance)));
      story.style.setProperty("--hero-progress", progress);
      setScrollProgress(progress);
      frame = null;
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Ângulo e posição da Terra na órbita 3D elíptica
  const { earthX, earthY, isForeground, earthScale, currentOrbit, isCelebrated, sceneFade } = useMemo(() => {
    const rx = isMobile ? 155 : 350; // Raio horizontal da órbita
    const ry = isMobile ? 42 : 90;   // Raio vertical da órbita (circunda o nome)
    
    // Inicia no quadrante direito (angle = 0) para não colidir com o nome no início
    const angle = scrollProgress * Math.PI * 2;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;

    // Quando y > 0, a Terra passa NA FRENTE do nome; quando y < 0, passa POR TRÁS
    const foreground = y >= 0;
    const scale = foreground ? (isMobile ? 1.05 : 1.22) : (isMobile ? 0.75 : 0.85);
    
    // Contador dinâmico de 1 a 19 órbitas
    const orbit = Math.min(TURNING_AGE, Math.max(1, Math.floor(scrollProgress * 25) + 1));
    const celebrated = scrollProgress >= 0.70;
    const fade = scrollProgress > 0.82 ? Math.max(0, 1 - (scrollProgress - 0.82) * 5.5) : 1;

    return {
      earthX: x,
      earthY: y,
      isForeground: foreground,
      earthScale: scale,
      currentOrbit: orbit,
      isCelebrated: celebrated,
      sceneFade: fade,
    };
  }, [scrollProgress, isMobile]);

  // Gauge circular de progresso da órbita (raio 14, circunferência ~88)
  const circleCircumference = 88;
  const strokeDashoffset = circleCircumference - (circleCircumference * Math.min(1, scrollProgress / 0.72));

  return (
    <section ref={storyRef} className="hero-story relative z-10">
      <div className="hero-scene">
        
        {/* Luz ambiente de fundo */}
        <div className="hero-scroll-glow" aria-hidden="true" />

        {/* ─── NÚCLEO SOLAR RADIANTE (Atrás do Nome da Bela) ─── */}
        <div 
          className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full transition-transform duration-75"
          style={{
            width: isMobile ? "240px" : "460px",
            height: isMobile ? "240px" : "460px",
            background: "radial-gradient(circle, rgba(229,196,131,0.3) 0%, rgba(245,158,11,0.12) 45%, transparent 70%)",
            transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.7})`,
            filter: "blur(30px)",
            opacity: sceneFade,
            zIndex: 1,
          }}
        />

        {/* Raios e flares de luz solar que giram no scroll */}
        <div 
          className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(229,196,131,0.4) 20deg, transparent 45deg, rgba(120,167,217,0.3) 70deg, transparent 95deg, rgba(229,196,131,0.4) 120deg, transparent 150deg, rgba(229,196,131,0.4) 180deg, transparent 210deg, rgba(120,167,217,0.3) 250deg, transparent 280deg, rgba(229,196,131,0.4) 310deg, transparent 340deg)",
            transform: `translate(-50%, -50%) rotate(${scrollProgress * 120}deg) scale(${1 + scrollProgress * 0.4})`,
            filter: "blur(8px)",
            opacity: sceneFade * 0.2,
            zIndex: 1,
          }}
        />

        {/* ─── ANÉIS ORBITAIS 3D ESTILIZADOS ─── */}
        <div 
          className="hero-orbit-ring-primary transition-opacity duration-150" 
          style={{ top: "42%", opacity: sceneFade * 0.85 }}
          aria-hidden="true" 
        />
        <div 
          className="hero-orbit-ring-secondary transition-opacity duration-150" 
          style={{ top: "42%", opacity: sceneFade * 0.6 }}
          aria-hidden="true" 
        />

        {/* ─── A TERRA EM ÓRBITA 3D CONFORME O SCROLL ─── */}
        <div
          className="absolute top-[42%] left-1/2 pointer-events-none transition-transform duration-75 flex flex-col items-center justify-center"
          style={{
            transform: `translate(calc(-50% + ${earthX}px), calc(-50% + ${earthY}px)) scale(${earthScale})`,
            zIndex: isForeground ? 28 : 4,
            opacity: (isForeground ? 1 : 0.65) * sceneFade,
          }}
        >
          {/* Esfera do Planeta Terra */}
          <div className="relative w-5 h-5 sm:w-8 sm:h-8 rounded-full shadow-[0_0_20px_#4BA0E0,0_0_35px_rgba(255,255,255,0.8)] border border-cyan-200/50 flex items-center justify-center bg-gradient-to-tr from-[#153B6B] via-[#4BA0E0] to-[#E0F2FE]">
            {/* Atmosfera e continente sutil */}
            <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-ping absolute" />
            
            {/* A Lua orbitando a Terra */}
            <div 
              className="absolute w-10 sm:w-12 h-10 sm:h-12 rounded-full pointer-events-none"
              style={{
                transform: `rotate(${scrollProgress * 720}deg)`,
              }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#E2E8F0] shadow-[0_0_8px_#ffffff]" title="Lua" />
            </div>
          </div>

          {/* Badge flutuante da Terra (visível em desktop, sutil em mobile) */}
          <span className="hidden sm:block text-[9px] font-mono text-cyan-200 mt-2 px-2 py-0.5 rounded-full bg-midnight-950/80 border border-cyan-400/30 whitespace-nowrap shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            Terra 🜨 • {Math.round(scrollProgress * 360)}°
          </span>
        </div>

        {/* ─── CONTEÚDO PRINCIPAL (TEXTOS & SELO) ─── */}
        <div className="hero-copy relative flex flex-col items-center justify-center px-6 pt-20 pb-36 w-full z-10">

          {/* Ornamento astronômico superior */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-celestial-gold/50" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-celestial-gold font-sans font-light whitespace-nowrap">
              14 de Setembro de 2007
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-celestial-gold/50" />
          </motion.div>

          {/* Título de exibição */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[11px] uppercase tracking-[0.3em] text-celestial-gold/90 font-mono mb-4"
          >
            Aniversário da Bela • Exposição Cósmica
          </motion.p>

          {/* Nome Principal com revelação e reflexo estelar que reage ao scroll */}
          <div className="overflow-visible py-2 relative max-w-full hero-name-glow">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundSize: "200% auto",
                backgroundPosition: `${scrollProgress * 150}% center`,
              }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-celestial-starlight to-gray-400 text-center tracking-normal sm:tracking-tight leading-none px-2 select-none drop-shadow-[0_0_30px_rgba(229,196,131,0.4)]"
            >
              {PERSON_NAME}
            </motion.h1>
          </div>

          {/* ─── SELO DINÂMICO DE ÓRBITAS AO REDOR DO SOL (REAGE AO SCROLL) ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-4 my-4 sm:my-6 hero-solar-badge"
          >
            <div className={`px-5 py-2.5 rounded-full border transition-all duration-300 backdrop-blur-md flex items-center gap-3 shadow-[0_0_25px_rgba(229,196,131,0.25)] ${
              isCelebrated
                ? "bg-celestial-gold/20 border-celestial-gold shadow-[0_0_35px_rgba(229,196,131,0.5)] scale-105"
                : "bg-midnight-900/80 border-celestial-gold/30"
            }`}>
              
              {/* Mini Gauge Circular de Progresso Solar */}
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className="stroke-white/10"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#E5C483"
                    strokeWidth="3"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                  />
                </svg>
                <span className="absolute text-[11px]">☀️</span>
              </div>

              {/* Texto dinâmico que conta as voltas ao rolar */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-serif italic text-celestial-gold font-medium">
                  {isCelebrated
                    ? `✦ ${TURNING_AGE} voltas completas ao redor do Sol! ✦`
                    : `Volta ${currentOrbit} de ${TURNING_AGE} ao redor do Sol`}
                </span>
                <span className="text-[9px] font-mono text-gray-400">
                  {isCelebrated ? "14/09/2007 • Jornada Estelar Completa" : "Gire o scroll para avançar as órbitas"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Frase poética */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2 }}
            className="font-serif italic text-base md:text-xl text-gray-300 text-center max-w-xl leading-relaxed px-4"
          >
            “Dizem que o universo é feito de poeira de estrelas.
            <br className="hidden md:block" />
            Mas algumas pessoas trazem uma constelação inteira no olhar.”
          </motion.p>

        </div>

        {/* ─── INDICADOR DE SCROLL INTERATIVO (PILOTO DO UNIVERSO) ─── */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="hero-scroll-cue absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2 cursor-pointer z-30"
          onClick={() => {
            document.getElementById("lua")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
            });
          }}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-celestial-gold/90 font-mono">
            <span>
              {scrollProgress < 0.05
                ? "Arraste para explorar o universo"
                : `Navegando pela Galáxia • ${Math.round(scrollProgress * 100)}%`}
            </span>
            <span className="scroll-chevron" aria-hidden="true">↓</span>
          </div>

          {/* Barra de progresso sutil */}
          <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-celestial-gold to-white transition-all duration-75"
              style={{ width: `${Math.min(100, Math.round(scrollProgress * 100))}%` }}
            />
          </div>
        </motion.button>

      </div>
    </section>
  );
}

