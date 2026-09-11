import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Moon, Undo2, Feather, Sparkles } from 'lucide-react';
import { LETTER, PERSON_NAME } from '../config';

export default function ClosingMessage() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const hasBody = Boolean(LETTER.body && LETTER.body.trim().length > 0);

  return (
    <section id="mensagem" className="relative z-10 min-h-[90svh] py-28 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Luz ambiente cósmica dourada */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-full h-[600px] rounded-full pointer-events-none opacity-20 blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(229,196,131,0.25) 0%, rgba(13,22,34,0.3) 50%, transparent 70%)' }}
      />

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-lg flex flex-col items-center text-center relative z-10"
          >
            {/* Título da Seção */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-celestial-gold/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-celestial-gold font-mono">
                Mensagem Pessoal
              </span>
              <span className="w-8 h-[1px] bg-celestial-gold/40" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              Algumas palavras, só para você.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light mb-8 max-w-sm">
              Um envelope selado com as memórias, o carinho e as estrelas desta galáxia.
            </p>

            {/* ── ENVELOPE DE LUXO EM RELEVO ── */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir a carta selada da galáxia"
              className="group relative w-full aspect-[1.62] max-w-[460px] rounded-2xl bg-gradient-to-br from-[#16202c] via-[#0e1620] to-[#090d13] border border-celestial-gold/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(229,196,131,0.12)] p-6 flex flex-col justify-between items-center cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-celestial-gold/60 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.98),0_0_50px_rgba(229,196,131,0.25)] select-none overflow-hidden"
            >
              {/* Dobra superior do envelope (Triângulo com sombreado físico) */}
              <div 
                className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#1a2533] to-[#121c27] shadow-md border-b border-celestial-gold/20"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Linhas decorativas de carta no interior */}
              <div className="absolute inset-4 rounded-xl border border-white/[0.04] pointer-events-none" />

              {/* Selo de Cera Dourado em Alto Relevo 3D */}
              <div className="relative z-20 my-auto flex flex-col items-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f8e4b8] via-[#d4af37] to-[#8a6414] shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.5)] border-2 border-[#fff0cc]/70 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#8a6414]/40 flex items-center justify-center bg-gradient-to-br from-[#d4af37] to-[#b38f28] shadow-inner text-[#3d2e08]">
                    <Moon size={26} className="fill-[#3d2e08]/20" />
                  </div>
                </div>
                <span className="mt-2 text-[9px] font-mono uppercase tracking-widest text-celestial-gold/80 bg-midnight-950/70 px-2 py-0.5 rounded-full border border-celestial-gold/20">
                  Selo Lunar Oficial
                </span>
              </div>

              {/* Destinatário Caligráfico */}
              <div className="relative z-10 w-full flex items-center justify-between pt-2 border-t border-white/5">
                <span className="font-serif italic text-base sm:text-lg text-celestial-starlight tracking-wide">
                  Para {PERSON_NAME} ♡
                </span>
                <span className="text-[10px] font-mono text-celestial-gold/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Toque para desdobrar</span>
                  <span>→</span>
                </span>
              </div>
            </button>

            {/* Ação secundária acessível */}
            <button
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-celestial-gold/40 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Mail size={15} className="text-celestial-gold" />
              <span>Desdobrar a Carta</span>
            </button>
          </motion.div>
        ) : (
          /* ── CARTA DESDOBRADA: PAPEL DE LUXO EM PERGAMINHO ESTELAR ── */
          <motion.article
            key="letter-paper"
            id="carta-aberta"
            tabIndex={-1}
            initial={{ opacity: 0, y: reduced ? 0 : 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#111822] via-[#0d131b] to-[#090e15] border-2 border-celestial-gold/35 p-8 sm:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(229,196,131,0.15)] relative overflow-hidden flex flex-col z-10 select-text"
          >
            {/* Moldura Interna com Filigrana Dourada */}
            <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-celestial-gold/20 pointer-events-none" />

            {/* Estrelas de Canto Clássicas */}
            <span className="absolute top-6 left-6 text-celestial-gold/50 text-xs select-none">✦</span>
            <span className="absolute top-6 right-6 text-celestial-gold/50 text-xs select-none">✦</span>
            <span className="absolute bottom-6 left-6 text-celestial-gold/50 text-xs select-none">✦</span>
            <span className="absolute bottom-6 right-6 text-celestial-gold/50 text-xs select-none">✦</span>

            {/* Marca d'água Cósmica de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] text-celestial-gold select-none">
              <Moon size={320} />
            </div>

            {/* Cabeçalho de Papelaria de Luxo */}
            <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-celestial-gold/20 relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-celestial-gold mb-1">
                ✦ Universo Isabela • 19 Anos ✦
              </span>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-celestial-starlight mt-2">
                {LETTER.greeting || "Querida Bebela,"}
              </h3>
            </div>

            {/* Conteúdo da Carta */}
            <div className="relative z-10 flex-1 my-4">
              {hasBody ? (
                /* Texto escrito */
                <div className="space-y-5 text-gray-200 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose">
                  {LETTER.body.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="indent-4 sm:indent-8 first:indent-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                /* Pautas de Papelaria Douradas Prontas para Escrita Pessoal */
                <div className="flex flex-col items-center py-6 px-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-celestial-gold/10 border border-celestial-gold/30 flex items-center justify-center text-celestial-gold mb-4 shadow-[0_0_20px_rgba(229,196,131,0.2)]">
                    <Feather size={22} />
                  </div>
                  
                  <h4 className="font-serif text-xl sm:text-2xl text-white mb-2">
                    Um Espaço Reservado com Carinho
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md leading-relaxed mb-8">
                    Esta folha de pergaminho estelar está guardada e pronta para receber as suas palavras sinceras para a Bela.
                  </p>

                  {/* Linhas elegantes de pauta esperando o texto */}
                  <div className="w-full max-w-lg space-y-6 opacity-40">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent" />
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-celestial-gold/50 to-transparent" />
                  </div>

                  <p className="text-[11px] font-mono text-celestial-gold/70 mt-6 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full">
                    Edite a propriedade <strong>LETTER.body</strong> em config.js quando desejar escrever.
                  </p>
                </div>
              )}
            </div>

            {/* Assinatura Caligráfica & Fechamento */}
            <div className="pt-6 mt-4 border-t border-celestial-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <p className="font-serif italic text-lg sm:text-xl text-celestial-gold">
                {LETTER.signature || "Com todo o amor ♡"}
              </p>

              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-celestial-gold/40 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Undo2 size={14} className="text-celestial-gold" />
                <span>Guardar Carta no Envelope</span>
              </button>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
