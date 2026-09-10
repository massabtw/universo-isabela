/**
 * ============================================
 * HeroSection — Entrada Celestial (Dark Luxury)
 * ============================================
 */

import { motion } from "framer-motion";
import { PERSON_NAME, TURNING_AGE } from "../config";

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden bg-transparent">
      {/* Luz ambiente central sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(120,167,217,0.4) 0%, rgba(229,196,131,0.15) 50%, transparent 70%)"
          }}
        />
      </div>

      {/* Ornamento astronômico superior */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-celestial-gold/50" />
        <span className="text-xs uppercase tracking-[0.4em] text-celestial-gold font-sans font-light">
          14 de Setembro de 2007
        </span>
        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-celestial-gold/50" />
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

      {/* Nome Principal com revelação de cinema */}
      <div className="overflow-hidden py-2 relative max-w-full">
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.3, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-celestial-starlight to-gray-400 text-center tracking-normal sm:tracking-tight leading-none px-2"
        >
          {PERSON_NAME}
        </motion.h1>
      </div>

      {/* Idade e coordenadas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="flex items-center gap-4 my-4 sm:my-6"
      >
        <span className="text-xs sm:text-sm font-serif italic text-celestial-gold">
          {TURNING_AGE} voltas completas ao redor do Sol
        </span>
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

      {/* Indicador de scroll animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => {
          document.getElementById('lua')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-mono">
          Descobrir a Lua de 2007
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-celestial-gold text-lg"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
