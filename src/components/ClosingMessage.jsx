/**
 * ============================================
 * ClosingMessage — Carta Galáctica Cósmica (Dark Luxury)
 * ============================================
 *
 * Animação Cinematográfica Cósmica de Abertura:
 * 1. Toque no Selo: Brilho intenso, anel de choque e explosão de partículas estelares em 360°
 * 2. Desdobramento 3D: A aba superior do envelope abre em perspectiva real 3D
 * 3. Feixe de Luz Celestial: Um raio de luz galáctico irrompe de dentro do envelope
 * 4. Emergência da Carta: O pergaminho desliza para fora envolto em poeira de estrelas
 * 5. Revelação Majestosa: Expansão fluida para a carta completa com revelação tipográfica em cascata
 */

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LETTER, PERSON_NAME, TURNING_AGE } from "../config.js";

// Partículas douradas para a explosão do selo ao abrir (24 partículas em 360°)
const SEAL_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 2 * Math.PI + (i % 2 === 0 ? 0.08 : -0.08);
  const distance = 60 + (i % 5) * 22;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 3 + (i % 3) * 2,
    symbol: i % 4 === 0 ? "✦" : i % 4 === 1 ? "★" : i % 4 === 2 ? "✧" : "•",
    color: i % 3 === 0 ? "#FFE79A" : i % 3 === 1 ? "#E5C483" : "#FFF7D6",
    duration: 0.75 + (i % 3) * 0.15,
  };
});

export default function ClosingMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const openTimer = useRef(null);
  const letterRef = useRef(null);
  const [wishesCount, setWishesCount] = useState(19);
  const [showWishParticles, setShowWishParticles] = useState(false);

  useEffect(() => {
    return () => clearTimeout(openTimer.current);
  }, []);

  const handleOpenLetter = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Duração equilibrada: 1.15s para apreciar o selo estourando, a aba abrindo e a carta emergindo
    openTimer.current = setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 1150);
  };

  const handleCloseLetter = () => {
    setIsOpening(false);
    setIsOpen(false);
  };

  const handleMakeWish = () => {
    setWishesCount((prev) => prev + 1);
    setShowWishParticles(true);
    setTimeout(() => setShowWishParticles(false), 2500);
  };

  // Separação de parágrafos da carta
  const paragraphs = useMemo(() => LETTER.body.split("\n\n"), []);

  return (
    <section
      className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-transparent px-4 sm:px-6 md:px-12 py-28 overflow-hidden"
      id="mensagem"
      ref={ref}
    >
      {/* Brilho de Fundo da Galáxia */}
      <div 
        className="absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full pointer-events-none opacity-30 blur-[130px]"
        style={{ 
          background: "radial-gradient(circle, rgba(135, 75, 200, 0.45) 0%, rgba(229, 196, 131, 0.25) 40%, transparent 75%)" 
        }}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── ESTADO FECHADO & EM TRANSIÇÃO: ENVELOPE CÓSMICO LUXUOSO ── */
          <motion.div
            key="envelope-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            exit={{ opacity: 0, scale: 0.96, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center select-none z-10 w-full max-w-xl"
          >
            {/* Ornamento Superior Celestial */}
            <div className="mb-8 flex items-center justify-center w-full opacity-70">
              <div className="h-[1px] w-12 md:w-28 bg-gradient-to-r from-transparent to-celestial-gold/60" />
              <span className="mx-4 text-celestial-gold text-sm tracking-widest">✧ 🌙 ✧</span>
              <div className="h-[1px] w-12 md:w-28 bg-gradient-to-l from-transparent to-celestial-gold/60" />
            </div>

            {/* O Envelope Cósmico Interativo */}
            <button
              type="button"
              aria-label="Abrir a carta da galáxia"
              onClick={handleOpenLetter}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLetter();
                }
              }}
              className="relative group cursor-pointer focus:outline-none select-none touch-manipulation border-0 border-none bg-transparent p-0"
              style={{ perspective: 1200 }}
            >
              {/* Feixe de Luz Estelar Emergente ao Abrir */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0, scaleX: 0.5 }}
                    animate={{ 
                      opacity: [0, 0.95, 0.6], 
                      scaleY: [0, 1.8, 2.5],
                      scaleX: [0.5, 1.2, 1],
                      filter: ["blur(10px)", "blur(18px)", "blur(28px)"]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom center" }}
                    className="absolute -top-52 inset-x-4 h-64 bg-gradient-to-t from-celestial-gold/70 via-purple-500/40 to-transparent rounded-full pointer-events-none z-15"
                  />
                )}
              </AnimatePresence>

              {/* Corpo Principal do Envelope (overflow-visible para permitir que a carta e aba subam livremente) */}
              <div className="relative w-[310px] h-[210px] sm:w-[420px] sm:h-[270px] md:w-[480px] md:h-[300px] overflow-visible">
                
                {/* ── PLACA TRASEIRA DO ENVELOPE (FUNDO) ── */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b from-[#10183b] via-[#090f28] to-[#040614] border border-celestial-gold/40 group-hover:border-celestial-gold/70 transition-all duration-500 shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(229,196,131,0.18)] z-0">
                  {/* Textura Galáctica Interna */}
                  <div 
                    className="absolute inset-0 opacity-45 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at 50% 35%, rgba(135,75,200,0.4) 0%, rgba(45,95,180,0.25) 45%, transparent 75%)"
                    }}
                  />
                  {/* Poeira estelar de fundo */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:18px_18px] opacity-60 pointer-events-none" />
                </div>

                {/* ── CARTA / PERGAMINHO INTERNO QUE SOBE MAJESTOSAMENTE ── */}
                <motion.div
                  initial={false}
                  animate={
                    isOpening 
                      ? { y: -130, scale: 1.05, opacity: 1 } 
                      : { y: 0, scale: 0.96, opacity: 0.85 }
                  }
                  transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-3 sm:inset-x-4 top-3 h-[185px] sm:h-[235px] md:h-[260px] rounded-2xl bg-gradient-to-b from-[#1b2654] via-[#11193d] to-[#0a102b] border-2 border-celestial-gold/70 shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(229,196,131,0.3)] z-10 flex flex-col items-center justify-start pt-5 px-4 text-center pointer-events-none"
                >
                  <div className="flex items-center gap-2 text-celestial-gold text-lg sm:text-xl animate-pulse">
                    <span>✦</span>
                    <span>🌙</span>
                    <span>✦</span>
                  </div>
                  <p className="font-serif italic text-amber-200 text-sm sm:text-base md:text-lg font-medium mt-2 drop-shadow">
                    {LETTER.greeting}
                  </p>
                  <p className="text-[10px] sm:text-xs font-mono text-celestial-gold/80 mt-1 uppercase tracking-widest">
                    Desdobrando mensagem do cosmos...
                  </p>
                  <div className="w-28 h-px bg-gradient-to-r from-transparent via-celestial-gold/60 to-transparent mt-3" />
                </motion.div>

                {/* ── BOLSO DO ENVELOPE (FRENTE) ── */}
                {/* Dobra Inferior com ClipPath Triangular */}
                <div className="absolute inset-x-0 bottom-0 h-[62%] overflow-hidden pointer-events-none z-20">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#05091c] via-[#09112e] to-[#0c163a]/90"
                    style={{ clipPath: "polygon(0 100%, 50% 22%, 100% 100%)" }}
                  />
                  {/* Borda dourada refinada na dobra inferior */}
                  <div
                    className="absolute inset-0 border-t border-celestial-gold/30"
                    style={{ clipPath: "polygon(0 100%, 50% 22%, 100% 100%)" }}
                  />
                </div>

                {/* Dobra Lateral Esquerda */}
                <div 
                  className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-20 opacity-70"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)"
                  }}
                />

                {/* Dobra Lateral Direita */}
                <div 
                  className="absolute inset-y-0 right-0 w-1/2 pointer-events-none z-20 opacity-70"
                  style={{
                    background: "linear-gradient(-135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
                  }}
                />

                {/* ── ABA SUPERIOR DO ENVELOPE (ABRE EM 3D PARA CIMA) ── */}
                <motion.div
                  initial={false}
                  animate={
                    isOpening 
                      ? { rotateX: -180, zIndex: 5 } 
                      : { rotateX: 0, zIndex: 30 }
                  }
                  transition={{ duration: 0.75, delay: 0.18, ease: [0.45, 0, 0.2, 1] }}
                  style={{ 
                    transformOrigin: "top center", 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible"
                  }}
                  className="absolute inset-x-0 top-0 h-[52%] pointer-events-none"
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-[#182352] via-[#111b40] to-[#0a102b] shadow-xl border-b border-celestial-gold/40"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  >
                    <div 
                      className="w-full h-full opacity-35"
                      style={{ background: "radial-gradient(circle at 50% 30%, rgba(229,196,131,0.45) 0%, transparent 70%)" }}
                    />
                  </div>
                </motion.div>

                {/* ── SELO DE CERA CÓSMICO COM SÍMBOLO DA LUA BEM APARENTE ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 flex items-center justify-center pointer-events-none">
                  {/* Selo Principal de Cera com Relevo Real */}
                  <motion.div
                    animate={
                      isOpening
                        ? { 
                            scale: [1, 1.35, 0], 
                            opacity: [1, 1, 0],
                            filter: ["drop-shadow(0 0 30px #ffe59e)", "drop-shadow(0 0 60px #ffd700)", "drop-shadow(0 0 0px transparent)"]
                          }
                        : { scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#ffe59e] via-[#d4993a] to-[#783e07] shadow-[0_0_35px_rgba(229,196,131,0.9),inset_0_3px_6px_rgba(255,255,255,0.75),inset_0_-3px_8px_rgba(0,0,0,0.7)] flex items-center justify-center border-2 border-yellow-200 group-hover:scale-110 transition-transform duration-300 relative"
                  >
                    {/* Anel de chanfro interno da cera gravada */}
                    <div className="absolute inset-1.5 rounded-full border border-yellow-100/50 pointer-events-none" />

                    {/* Símbolo da Lua Esculpido em Ouro Líquido — Grandioso, Nítido e Proeminente */}
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="w-9 h-9 sm:w-11 sm:h-11 text-[#fffbe8] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0_12px_rgba(255,235,160,0.95)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                      aria-label="Símbolo da Lua Cósmica"
                    >
                      <path d="M12.3 2a10 10 0 0 0-.19 20 10.04 10.04 0 0 0 9.8-7.8 1 1 0 0 0-1.2-1.2 8 8 0 1 1-8.4-11 1 1 0 0 0-.01-2z" />
                      <circle cx="17.5" cy="5.8" r="1.1" fill="#fffdf2" />
                      <circle cx="20" cy="9.8" r="0.8" fill="#fffdf2" opacity="0.9" />
                    </svg>
                  </motion.div>

                  {/* Onda de Choque de Luz Dourada ao Abrir */}
                  {isOpening && (
                    <motion.div
                      initial={{ scale: 0.3, opacity: 1 }}
                      animate={{ scale: 3.5, opacity: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      className="absolute w-16 h-16 rounded-full border-2 border-celestial-gold shadow-[0_0_30px_rgba(229,196,131,0.95)] pointer-events-none"
                    />
                  )}

                  {/* Explosão de Partículas e Poeira de Estrelas em 360° */}
                  {isOpening &&
                    SEAL_PARTICLES.map((p) => (
                      <motion.span
                        key={p.id}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                        animate={{ 
                          x: p.x, 
                          y: p.y, 
                          scale: [0, 1.5, 0], 
                          opacity: [1, 1, 0],
                          rotate: p.id % 2 === 0 ? 270 : -270
                        }}
                        transition={{ duration: p.duration, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute pointer-events-none select-none font-bold"
                        style={{ color: p.color, fontSize: `${p.size * 2.6}px` }}
                      >
                        {p.symbol}
                      </motion.span>
                    ))}
                </div>

                {/* Letreiro em Ouro na Frente do Envelope */}
                <motion.div 
                  animate={isOpening ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute bottom-4 sm:bottom-5 inset-x-0 flex flex-col items-center justify-center z-25 pointer-events-none"
                >
                  <p className="font-serif italic text-xs sm:text-sm md:text-base text-celestial-starlight tracking-widest uppercase font-medium drop-shadow">
                    Para {PERSON_NAME}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono text-celestial-gold/80 tracking-widest mt-0.5 font-light">
                    14.09.2007 • {TURNING_AGE} ANOS
                  </p>
                </motion.div>

              </div>

              {/* Sombra de Projeção Flutuante */}
              <div className="absolute -bottom-6 inset-x-6 h-12 bg-black/80 rounded-full blur-2xl -z-10" />
            </button>

            {/* Dica Animada */}
            <motion.p
              animate={{ opacity: isOpening ? 0 : [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 sm:mt-10 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-celestial-gold font-mono font-light flex items-center gap-2"
            >
              <span>✦</span> {isOpening ? "Abrindo os segredos cósmicos..." : "Toque no selo para abrir a carta da galáxia"} <span>✦</span>
            </motion.p>
          </motion.div>
        ) : (
          /* ── ESTADO ABERTO: CARTA TOTALMENTE REVELADA DE GALÁXIA ── */
          <motion.div
            key="letter"
            ref={letterRef}
            id="carta-aberta"
            style={{ scrollMarginTop: 110 }}
            onAnimationComplete={() => {
              document.getElementById('carta-aberta')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full z-10 px-2 sm:px-0 max-w-3xl"
          >
            {/* O Pergaminho Galáctico */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] border-2 border-celestial-gold/50 bg-[#070c20]">
              
              {/* Arabescos / Cantoneiras Celestiais nos 4 cantos */}
              <div className="absolute top-4 left-4 text-celestial-gold/40 text-xs font-mono select-none pointer-events-none">
                ╔ ✦
              </div>
              <div className="absolute top-4 right-4 text-celestial-gold/40 text-xs font-mono select-none pointer-events-none">
                ✦ ╗
              </div>
              <div className="absolute bottom-4 left-4 text-celestial-gold/40 text-xs font-mono select-none pointer-events-none">
                ╚ ✦
              </div>
              <div className="absolute bottom-4 right-4 text-celestial-gold/40 text-xs font-mono select-none pointer-events-none">
                ✦ ╝
              </div>

              {/* ── FUNDO DE NEBULOSA E POEIRA CÓSMICA DA CARTA ── */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{
                  background: `
                    radial-gradient(circle at 80% 20%, rgba(135, 75, 200, 0.35) 0%, transparent 60%),
                    radial-gradient(circle at 20% 80%, rgba(45, 95, 180, 0.4) 0%, transparent 60%),
                    radial-gradient(circle at 50% 50%, rgba(229, 196, 131, 0.12) 0%, transparent 70%),
                    linear-gradient(180deg, rgba(8, 14, 38, 0.95) 0%, rgba(5, 8, 22, 0.98) 100%)
                  `
                }}
              />

              {/* Estrelas Fundo Fixo na Carta */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none opacity-60" />

              {/* Filete de Ouro Superior com Brilho Cósmico */}
              <div className="relative h-1.5 bg-gradient-to-r from-transparent via-celestial-gold to-transparent shadow-[0_0_12px_rgba(229,196,131,0.8)]" />

              {/* Conteúdo da Carta */}
              <div className="relative px-6 sm:px-12 md:px-16 py-10 sm:py-14 md:py-18 flex flex-col">
                
                {/* Cabeçalho Celestial da Carta */}
                <motion.div 
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex flex-col items-center text-center mb-8 sm:mb-10"
                >
                  <span className="text-3xl sm:text-4xl mb-3 animate-pulse drop-shadow-[0_0_15px_rgba(229,196,131,0.7)]">
                    🌙
                  </span>
                  
                  <div className="flex items-center gap-3 opacity-80">
                    <span className="w-10 h-px bg-celestial-gold/60" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-celestial-gold font-mono">
                      14 de Setembro de 2007 • Constelação de Virgem
                    </span>
                    <span className="w-10 h-px bg-celestial-gold/60" />
                  </div>
                </motion.div>

                {/* Saudação em Ouro Radiante */}
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-celestial-gold to-yellow-100 mb-8 font-semibold tracking-wide drop-shadow text-center sm:text-left"
                >
                  {LETTER.greeting}
                </motion.h3>

                {/* Corpo da Mensagem com Revelação Tipográfica Staggered */}
                <div className="mb-10">
                  {paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, delay: 0.35 + index * 0.15, ease: "easeOut" }}
                      className="font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-gray-100 mb-6 font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Assinatura Cósmica */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.85 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-white/15 gap-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <span className="text-celestial-gold">✧</span>
                    <span>Gravado para todo o sempre no cosmos</span>
                  </div>

                  <p className="font-serif italic text-celestial-gold text-lg sm:text-xl self-end sm:self-auto font-medium">
                    {LETTER.signature}
                  </p>
                </motion.div>

                {/* ── INTERATIVIDADE: LANÇADOR DE DESEJOS ESTELARES ── */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-2xl"
                >
                  <div>
                    <p className="text-xs font-mono text-celestial-gold flex items-center gap-2">
                      <span>✨</span>
                      <span>Desejos Cósmicos Enviados: <strong className="text-white text-sm">{wishesCount}</strong></span>
                    </p>
                    <p className="text-[10px] text-gray-400 font-light mt-0.5">
                      Toque para enviar mais um desejo de aniversário para as estrelas
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMakeWish}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-celestial-gold/30 to-purple-500/30 hover:from-celestial-gold/40 hover:to-purple-500/40 border border-celestial-gold/60 text-xs font-mono text-celestial-gold hover:text-white transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>⭐</span>
                    <span>Fazer um Desejo Cósmico</span>
                  </motion.button>
                </motion.div>

                {/* Animação de Confetes Estelares ao Fazer Desejo */}
                {showWishParticles && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-center text-xs font-mono text-celestial-gold animate-bounce"
                  >
                    🌠 Seu desejo acabou de cruzar a Via Láctea!
                  </motion.div>
                )}

                {/* Botão para Guardar a Carta no Envelope Novamente */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleCloseLetter}
                    className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-gray-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>⟲</span>
                    <span>Guardar a Carta no Envelope</span>
                  </button>
                </div>

              </div>

              {/* Filete de Ouro Inferior */}
              <div className="relative h-1.5 bg-gradient-to-r from-transparent via-celestial-gold to-transparent opacity-70" />
            </div>

            {/* Ornamento Final do Rodapé */}
            <div className="mt-12 flex flex-col items-center opacity-60">
              <span className="text-celestial-gold text-xl mb-2">✦</span>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-mono">
                FELIZ ANIVERSÁRIO, BEBELA • {TURNING_AGE} ANOS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
