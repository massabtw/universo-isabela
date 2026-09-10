/**
 * ============================================
 * ClosingMessage — Carta Galáctica Cósmica (Dark Luxury)
 * ============================================
 *
 * Carta personalizada com tema de Galáxia profundo:
 * - Pergaminho estelar com nebulosas azuis e púrpuras
 * - Tipografia dourada e filetes celestiais gravados
 * - Selo de cera cósmico interativo com a Lua
 * - Lançador de Desejos Estelares interativo com chuva de meteoros
 */

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LETTER, PERSON_NAME, TURNING_AGE } from "../config.js";

export default function ClosingMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [isOpen, setIsOpen] = useState(false);
  const [wishesCount, setWishesCount] = useState(19);
  const [showWishParticles, setShowWishParticles] = useState(false);

  const handleMakeWish = () => {
    setWishesCount((prev) => prev + 1);
    setShowWishParticles(true);
    setTimeout(() => setShowWishParticles(false), 2500);
  };

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
          /* ── ESTADO FECHADO: ENVELOPE CÓSMICO DARK LUXURY ── */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center cursor-pointer select-none z-10"
            onClick={() => setIsOpen(true)}
          >
            {/* Ornamento Superior */}
            <div className="mb-8 flex items-center justify-center w-full opacity-70">
              <div className="h-[1px] w-12 md:w-28 bg-gradient-to-r from-transparent to-celestial-gold/60" />
              <span className="mx-4 text-celestial-gold text-sm">✧ 🌙 ✧</span>
              <div className="h-[1px] w-12 md:w-28 bg-gradient-to-l from-transparent to-celestial-gold/60" />
            </div>

            {/* O Envelope Visual */}
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="relative w-[280px] h-[190px] sm:w-88 sm:h-56 md:w-96 md:h-64 bg-gradient-to-b from-[#0e1635] to-[#070b1e] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden border border-celestial-gold/40 group-hover:border-celestial-gold transition-all duration-500">
                
                {/* Textura Galáctica Interna da Aba */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 30%, rgba(135,75,200,0.5) 0%, transparent 70%)"
                  }}
                />

                {/* Linhas de Dobra do Envelope */}
                <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 bg-white/[0.04] border-b border-celestial-gold/20"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-0 bg-white/[0.02]"
                    style={{ clipPath: "polygon(0 100%, 50% 25%, 100% 100%)" }}
                  />
                </div>

                {/* Selo de Cera Cósmico com a Lua */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-celestial-gold via-amber-600 to-amber-800 shadow-[0_0_25px_rgba(229,196,131,0.7)] flex items-center justify-center border-2 border-yellow-200/80 group-hover:scale-110 transition-transform">
                  <span className="text-midnight-950 text-xl md:text-2xl drop-shadow">🌙</span>
                </div>

                {/* Nome Gravado em Ouro */}
                <div className="absolute bottom-5 inset-x-0 flex flex-col items-center justify-center">
                  <p className="font-serif italic text-sm md:text-base text-celestial-starlight tracking-widest uppercase">
                    Para {PERSON_NAME}
                  </p>
                  <p className="text-[10px] font-mono text-celestial-gold/70 tracking-widest mt-0.5">
                    14.09.2007 • 19 ANOS
                  </p>
                </div>
              </div>

              {/* Sombra de Projeção Flutuante */}
              <div className="absolute -bottom-6 inset-x-6 h-12 bg-black/80 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Dica Animada */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 sm:mt-10 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-celestial-gold font-mono font-light flex items-center gap-2"
            >
              <span>✦</span> Toque no selo para abrir a carta da galáxia <span>✦</span>
            </motion.p>
          </motion.div>
        ) : (
          /* ── ESTADO ABERTO: CARTA TOTALMENTE PERSONALIZADA DE GALÁXIA ── */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center w-full z-10 px-2 sm:px-0 max-w-3xl"
          >
            {/* O Pergaminho Galáctico */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] border-2 border-celestial-gold/50 bg-[#070c20]">
              
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
                <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
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
                </div>

                {/* Saudação em Ouro Radiante */}
                <h3 className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-celestial-gold to-yellow-100 mb-8 font-semibold tracking-wide drop-shadow">
                  {LETTER.greeting}
                </h3>

                {/* Corpo da Mensagem com Tipografia Celestial */}
                <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-gray-100 whitespace-pre-line mb-10 font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {LETTER.body}
                </p>

                {/* Assinatura Cósmica */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-white/15 gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <span className="text-celestial-gold">✧</span>
                    <span>Gravado para todo o sempre no cosmos</span>
                  </div>

                  <p className="font-serif italic text-celestial-gold text-lg sm:text-xl self-end sm:self-auto font-medium">
                    {LETTER.signature}
                  </p>
                </div>

                {/* ── INTERATIVIDADE: LANÇADOR DE DESEJOS ESTELARES ── */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-2xl">
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
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-celestial-gold/30 to-purple-500/30 hover:from-celestial-gold/40 hover:to-purple-500/40 border border-celestial-gold/60 text-xs font-mono text-celestial-gold hover:text-white transition-all shadow-lg flex items-center gap-2 shrink-0"
                  >
                    <span>⭐</span>
                    <span>Fazer um Desejo Cósmico</span>
                  </motion.button>
                </div>

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
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-gray-400 hover:text-white transition-all flex items-center gap-2"
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
                FELIZ ANIVERSÁRIO, BEBELA • 19 ANOS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
