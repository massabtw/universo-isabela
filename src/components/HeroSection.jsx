/**
 * ====================================================================
 * HeroSection — Layout Editorial Esquerda + Lua Fotorrealista Direita
 * ====================================================================
 *
 * Design: "Isabela" (branco) / "Marty" (dourado) — alinhado à esquerda
 * Scroll behavior: textos da esquerda dissolvem suavemente com o scroll
 * A Lua fica em MoonLayer (posição fixed global em App.jsx)
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PERSON_NAME, TURNING_AGE } from "../config";

export default function HeroSection() {
  const storyRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    let frame;
    const update = () => {
      const distance = story.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -story.getBoundingClientRect().top / Math.max(1, distance)));
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

  // Dissolve dos textos da esquerda conforme o scroll avança
  // Começa a desaparecer a partir de 30% do scroll
  const textOpacity = Math.max(0, 1 - (scrollProgress - 0.2) * 3.2);
  const textY = scrollProgress * -35; // leve movimento para cima

  // Footer bar da hero aparece logo no início e dissolve levemente
  const footerOpacity = Math.max(0, 1 - scrollProgress * 3);

  return (
    <section ref={storyRef} className="hero-editorial-story relative z-10" id="inicio">
      <div className="hero-editorial-scene">

        {/* ─── COLUNA DE TEXTO ESQUERDA ─── */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-20 z-20 md:w-1/2 pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            willChange: "opacity, transform",
          }}
        >
          {/* "Isabela" em branco */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-[0.95] mb-1 pointer-events-auto"
          >
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight">
              Isabela
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-[#E5C483] tracking-tight">
              Marty
            </span>
          </motion.h1>

          {/* Subtítulo — 19 voltas */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[13px] text-[#E5C483]/80 font-light mt-5 mb-5 tracking-wide pointer-events-auto"
          >
            {TURNING_AGE} voltas completas ao redor do Sol
          </motion.p>

          {/* Frase poética */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="font-serif italic text-sm sm:text-base text-white/65 leading-relaxed max-w-[280px] sm:max-w-xs mb-8 pointer-events-auto"
          >
            "Dizem que o universo é feito de poeira de estrelas.
            Mas algumas pessoas trazem uma constelação inteira no olhar."
          </motion.p>

          {/* CTA link */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            href="#lua"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("lua")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="self-start flex items-center gap-2 text-[13px] font-mono text-[#E5C483] hover:text-white transition-colors tracking-wide underline underline-offset-4 decoration-[#E5C483]/40 hover:decoration-white/40 cursor-pointer pointer-events-auto"
          >
            Explorar seu universo
            <span className="text-base no-underline">↗</span>
          </motion.a>
        </div>

        {/* ─── FOOTER BAR DA HERO (bottom) ─── */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 sm:px-14 pb-6 sm:pb-8 z-20 pointer-events-none"
          style={{ opacity: footerOpacity }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-[11px] font-mono text-gray-500 uppercase tracking-widest"
          >
            Uma exposição cósmica para você
          </motion.span>

          {/* Seta central de scroll */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            onClick={() =>
              document.getElementById("galaxy")?.scrollIntoView({ behavior: "smooth" })
            }
            className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1.5 text-celestial-gold/50 hover:text-celestial-gold transition-colors cursor-pointer pointer-events-auto"
          >
            <span className="scroll-chevron text-lg">↓</span>
          </motion.button>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="text-[11px] font-mono text-gray-500 tracking-widest"
          >
            14 · 09 · 2007
          </motion.span>
        </div>

      </div>
    </section>
  );
}
