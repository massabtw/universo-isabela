import { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Undo2 } from 'lucide-react';
import { LETTER, PERSON_NAME, TURNING_AGE } from '../config';

// 20 Partículas celestiais douradas para a explosão do selo de cera ao abrir
const SEAL_PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * 2 * Math.PI + (i % 2 === 0 ? 0.1 : -0.1);
  const distance = 55 + (i % 4) * 28;
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const openTimer = useRef(null);
  const letterRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    return () => clearTimeout(openTimer.current);
  }, []);

  const handleOpenLetter = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Duração de 1.25s para apreciar o selo quebrando, a aba abrindo em 3D e a folha saindo
    openTimer.current = setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      setTimeout(() => {
        const target = letterRef.current || document.getElementById('mensagem');
        if (target) {
          if (window.lenisInstance && typeof window.lenisInstance.scrollTo === 'function') {
            window.lenisInstance.scrollTo(target, { offset: -50, force: true });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }, 1250);
  };

  const handleCloseLetter = () => {
    setIsOpening(false);
    setIsOpen(false);
  };

  // Separação do texto em parágrafos preservando a escrita exata de Gabriel
  const paragraphs = useMemo(() => {
    if (!LETTER.body) return [];
    return LETTER.body
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);
  }, []);

  // Primeiro parágrafo como saudação/título de abertura ("Feliz aniversario, amor da minha vida!")
  const firstParagraph = paragraphs[0] || '';
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <section 
      id="mensagem" 
      className="relative z-10 min-h-screen py-24 sm:py-28 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Luz ambiente cósmica dourada e profunda */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] max-w-full h-[650px] rounded-full pointer-events-none opacity-25 blur-[150px]"
        style={{ 
          background: 'radial-gradient(circle, rgba(229,196,131,0.3) 0%, rgba(135,75,200,0.2) 40%, transparent 75%)' 
        }}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── ESTADO FECHADO & EM TRANSIÇÃO: ENVELOPE CÓSMICO LUXUOSO ── */
          <motion.div
            key="envelope-wrapper"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.35 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center select-none z-10 w-full max-w-xl text-center"
          >
            {/* Ornamento Superior Celestial */}
            <div className="mb-6 flex items-center justify-center w-full opacity-70">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-celestial-gold/60" />
              <span className="mx-4 text-celestial-gold text-sm tracking-widest">✧ 🌙 ✧</span>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-celestial-gold/60" />
            </div>

            {/* O Envelope Cósmico Interativo com Dobra 3D */}
            <button
              type="button"
              aria-label="Abrir a carta de aniversário"
              onClick={handleOpenLetter}
              className="relative group cursor-pointer focus:outline-none select-none touch-manipulation border-0 bg-transparent p-0"
              style={{ perspective: 1200 }}
            >
              {/* Feixe de Luz Estelar Emergente ao Romper o Selo */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: [0, 0.9, 0.6], 
                      scaleY: [0, 1.4, 2],
                      filter: ["blur(10px)", "blur(20px)", "blur(30px)"]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom center" }}
                    className="absolute -top-40 inset-x-8 h-48 bg-gradient-to-t from-celestial-gold/60 via-purple-500/30 to-transparent rounded-full pointer-events-none z-20"
                  />
                )}
              </AnimatePresence>

              {/* Corpo Principal do Envelope */}
              <div className="relative w-[310px] h-[210px] sm:w-[420px] sm:h-[270px] md:w-[480px] md:h-[300px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#141c42] via-[#0b122c] to-[#050818] border border-celestial-gold/40 group-hover:border-celestial-gold/80 transition-all duration-500 shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(229,196,131,0.2)]">
                
                {/* Textura Galáctica Interna */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 35%, rgba(135,75,200,0.45) 0%, rgba(45,95,180,0.3) 45%, transparent 75%)"
                  }}
                />

                {/* Estrelinhas cintilantes de fundo no envelope */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:18px_18px] opacity-60 pointer-events-none" />

                {/* ── CARTA INTERNA QUE DESLIZA PARA CIMA DURANTE A ABERTURA ── */}
                <motion.div
                  initial={false}
                  animate={isOpening ? { y: -110, scale: 1.03, opacity: 1 } : { y: 0, scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-4 top-3 h-[180px] sm:h-[230px] rounded-2xl bg-gradient-to-b from-[#1b2654] to-[#0d1430] border border-celestial-gold/60 shadow-[0_10px_35px_rgba(0,0,0,0.8)] z-10 flex flex-col items-center justify-start pt-5 px-4 text-center pointer-events-none"
                >
                  <span className="text-celestial-gold text-lg sm:text-xl animate-pulse">✦ 🌙 ✦</span>
                  <p className="font-serif italic text-amber-200 text-sm sm:text-base font-medium mt-2">
                    {firstParagraph}
                  </p>
                  <p className="text-[10px] sm:text-xs font-mono text-celestial-gold/70 mt-1 uppercase tracking-widest">
                    Desdobrando a carta...
                  </p>
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent mt-3" />
                </motion.div>

                {/* ── DOBRAS E BOLSO DO ENVELOPE (FRENTE) ── */}
                {/* Dobra Inferior do Envelope */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 overflow-hidden pointer-events-none z-15">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#060b1e] via-[#09112e] to-transparent"
                    style={{ clipPath: "polygon(0 100%, 50% 20%, 100% 100%)" }}
                  />
                  {/* Linha de borda dourada sutil da dobra inferior */}
                  <div
                    className="absolute inset-0 border-t border-celestial-gold/25"
                    style={{ clipPath: "polygon(0 100%, 50% 20%, 100% 100%)" }}
                  />
                </div>

                {/* Dobra Esquerda */}
                <div 
                  className="absolute inset-y-0 left-0 w-1/2 pointer-events-none z-15 opacity-60"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)"
                  }}
                />

                {/* Dobra Direita */}
                <div 
                  className="absolute inset-y-0 right-0 w-1/2 pointer-events-none z-15 opacity-60"
                  style={{
                    background: "linear-gradient(-135deg, rgba(255,255,255,0.03) 0%, transparent 60%)",
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
                  }}
                />

                {/* ── ABA SUPERIOR DO ENVELOPE (ABRE EM 3D) ── */}
                <motion.div
                  initial={false}
                  animate={isOpening ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                  transition={{ duration: 0.75, delay: 0.25, ease: [0.45, 0, 0.2, 1] }}
                  style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                  className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-[#1a2556] via-[#10193c] to-[#0a102b] shadow-lg border-b border-celestial-gold/30"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  >
                    <div 
                      className="w-full h-full opacity-30"
                      style={{ background: "radial-gradient(circle at 50% 30%, rgba(229,196,131,0.4) 0%, transparent 70%)" }}
                    />
                  </div>
                </motion.div>

                {/* ── SELO DE CERA CÓSMICO COM A LUA (GATILHO DA ANIMAÇÃO) ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 flex items-center justify-center">
                  {/* Selo Principal com relevo de cera real */}
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
                    whileHover={!isOpening ? { scale: 1.1 } : {}}
                    whileTap={!isOpening ? { scale: 0.95 } : {}}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#ffe59e] via-[#d4993a] to-[#783e07] shadow-[0_0_35px_rgba(229,196,131,0.9),inset_0_3px_6px_rgba(255,255,255,0.75),inset_0_-3px_8px_rgba(0,0,0,0.7)] flex items-center justify-center border-2 border-yellow-200 group-hover:scale-110 transition-transform duration-300 relative"
                  >
                    {/* Anel interno da cera gravada */}
                    <div className="absolute inset-1.5 rounded-full border border-yellow-100/50 pointer-events-none" />

                    {/* Símbolo da Lua esculpido no centro */}
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

                {/* Destinatário na Frente do Envelope (Sem coraçãozinho) */}
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

            {/* Dica de Toque */}
            <motion.p
              animate={{ opacity: isOpening ? 0 : [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 sm:mt-10 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-celestial-gold font-mono font-light flex items-center gap-2"
            >
              <span>✦</span> {isOpening ? "Abrindo os segredos cósmicos..." : "Toque no selo para abrir a carta da galáxia"} <span>✦</span>
            </motion.p>
          </motion.div>
        ) : (
          /* ── ESTADO ABERTO: CARTA DESDOBRADA CONTENDO EXCLUSIVAMENTE AS PALAVRAS DE GABRIEL ── */
          <motion.article
            key="letter-open"
            ref={letterRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: reduced ? 0 : 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(229,196,131,0.15)] border-2 border-celestial-gold/45 bg-[#080d24] relative z-10 flex flex-col p-6 sm:p-12 md:p-16 select-text"
          >
            {/* ── FUNDO DE NEBULOSA E POEIRA CÓSMICA DA CARTA ── */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background: `
                  radial-gradient(circle at 80% 15%, rgba(135, 75, 200, 0.3) 0%, transparent 60%),
                  radial-gradient(circle at 20% 85%, rgba(45, 95, 180, 0.35) 0%, transparent 60%),
                  linear-gradient(180deg, rgba(12, 18, 48, 0.95) 0%, rgba(6, 10, 26, 0.98) 100%)
                `
              }}
            />

            {/* Estrelas sutis de fundo */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none opacity-40" />

            {/* Moldura Interna com Filigrana Dourada */}
            <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-celestial-gold/20 pointer-events-none" />

            {/* Cantoneiras Celestiais nos 4 cantos */}
            <span className="absolute top-5 left-5 text-celestial-gold/50 text-xs select-none pointer-events-none">✦</span>
            <span className="absolute top-5 right-5 text-celestial-gold/50 text-xs select-none pointer-events-none">✦</span>
            <span className="absolute bottom-5 left-5 text-celestial-gold/50 text-xs select-none pointer-events-none">✦</span>
            <span className="absolute bottom-5 right-5 text-celestial-gold/50 text-xs select-none pointer-events-none">✦</span>

            {/* Conteúdo Exclusivo da Carta Escrita por Gabriel */}
            <div className="relative z-10 flex flex-col my-2">
              
              {/* Primeiro Parágrafo em Destaque Caligráfico */}
              {firstParagraph && (
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-celestial-gold to-yellow-100 font-semibold mb-6 sm:mb-8 tracking-wide drop-shadow text-center sm:text-left leading-snug"
                >
                  {firstParagraph}
                </motion.h3>
              )}

              {/* Parágrafos da Mensagem */}
              <div className="space-y-5 sm:space-y-6 text-gray-100 font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {remainingParagraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Assinatura de Gabriel Massa */}
              {LETTER.signature && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + remainingParagraphs.length * 0.1 }}
                  className="pt-8 sm:pt-10 mt-6 border-t border-celestial-gold/25 flex justify-end"
                >
                  <p className="font-serif italic text-xl sm:text-2xl text-celestial-gold font-medium tracking-wide">
                    {LETTER.signature}
                  </p>
                </motion.div>
              )}

              {/* Botão para Guardar a Carta no Envelope Novamente */}
              <div className="mt-10 sm:mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={handleCloseLetter}
                  className="px-6 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-celestial-gold/45 text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-md"
                >
                  <Undo2 size={15} className="text-celestial-gold" />
                  <span>Guardar a Carta no Envelope</span>
                </button>
              </div>

            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
