/**
 * ============================================
 * Header — Universo da Isabela (Dark Luxury)
 * ============================================
 */

import { motion, useScroll, useSpring } from "framer-motion";
import { PERSON_NAME } from "../config";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/85 backdrop-blur-2xl border-b border-white/[0.08]"
    >
      {/* Barra de Progresso Cósmica no Topo */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-celestial-gold via-blue-400 to-celestial-gold origin-left shadow-[0_0_8px_rgba(229,196,131,0.7)]"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Logo / Título do Universo */}
        <div className="flex items-center gap-2.5">
          <span className="text-celestial-gold text-sm animate-pulse">🌙</span>
          <h1 className="font-serif text-base sm:text-xl text-celestial-starlight tracking-wide truncate">
            Aniversário da Bela <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-celestial-glow/70 ml-1.5 font-sans font-light">19 Anos</span>
          </h1>
        </div>

        {/* Navegação por seções */}
        <nav className="flex items-center gap-4 sm:gap-7">
          {[
            { label: "A Lua", href: "#lua" },
            { label: "Constelação", href: "#constelacao" },
            { label: "Sistema Solar", href: "#sistema-solar" },
            { label: "Galeria", href: "#galeria" },
            { label: "Carta", href: "#mensagem" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 hover:text-celestial-gold transition-colors duration-300 font-sans"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
