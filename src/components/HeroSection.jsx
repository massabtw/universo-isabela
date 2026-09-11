/**
 * ====================================================================
 * HeroSection.jsx — Entrada Editorial com a Lua Pique na Foto
 * ====================================================================
 *
 * 1. Lua colossal exatamente como na foto de referência (right: -14vw).
 * 2. Ao carregar pós-tela preta:
 *    A Lua sai do centro da tela e se desloca suavemente até a lateral direita.
 * 3. Textos editoriais da esquerda entram em sintonia:
 *    "Isabela" (branco) / "Marty" (dourado)
 * 4. Ao scrollar:
 *    - Leve zoom gradual suave na Lua (1.0 -> 1.18)
 *    - Textos da esquerda vão desaparecendo aos pouquinhos suavemente
 *    - A seção sobe naturalmente no scroll, revelando a Via Láctea logo abaixo!
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TURNING_AGE } from "../config";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const moonRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
      setScrollProgress(progress);

      // Leve zoom na Lua conforme desce o scroll
      if (moonRef.current) {
        const zoom = 1 + progress * 0.18;
        moonRef.current.style.transform = `scale(${zoom})`;
      }

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

  // Textos da esquerda desvanecem suavemente no scroll
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const textTranslateY = scrollProgress * -40;

  // Footer bar da Hero desvanece suavemente
  const footerOpacity = Math.max(0, 1 - scrollProgress * 2.8);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen flex items-center overflow-hidden bg-[#03070E] select-none"
      id="inicio"
    >
      {/* ── CONTEÚDO PRINCIPAL: ESQUERDA (TEXTOS) & DIREITA (LUA PIQUE NA FOTO) ── */}
      <div className="relative z-20 w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 sm:px-14 lg:px-20 pt-20 pb-16 overflow-hidden">

        {/* ── COLUNA DE TEXTO ESQUERDA ── */}
        <div
          className="flex flex-col justify-center max-w-xl w-full z-20"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            willChange: "opacity, transform",
          }}
        >
          {/* Nome: Isabela (branco) / Marty (dourado) */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif leading-[0.92] mb-1"
          >
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-white tracking-tight">
              Isabela
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-[#E5C483] tracking-tight">
              Marty
            </span>
          </motion.h1>

          {/* Subtítulo: 19 voltas completas ao redor do Sol */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[13px] text-[#E5C483]/90 font-light mt-5 mb-5 tracking-wide"
          >
            {TURNING_AGE} voltas completas ao redor do Sol
          </motion.p>

          {/* Frase poética */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-serif italic text-sm sm:text-base text-white/70 leading-relaxed max-w-xs mb-8"
          >
            "Dizem que o universo é feito de poeira de estrelas.
            Mas algumas pessoas trazem uma constelação inteira no olhar."
          </motion.p>

          {/* Link CTA discreto */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            href="#galaxy"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("galaxy")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="self-start flex items-center gap-2 text-[13px] font-mono text-[#E5C483] hover:text-white transition-colors tracking-wide underline underline-offset-4 decoration-[#E5C483]/40 hover:decoration-white/40 cursor-pointer"
          >
            Explorar seu universo
            <span className="text-base no-underline">↗</span>
          </motion.a>
        </div>

        {/* ── LUA FOTORREALISTA COLOSSAL: SAI DO CENTRO E ENCOSTA NA BORDA DIREITA ── */}
        <motion.div
          initial={{
            x: "-32vw", // Começa no centro horizontal da tela
            opacity: 0,
          }}
          animate={{
            x: 0,       // Desliza suavemente até a posição exata da foto
            opacity: 1,
          }}
          transition={{
            duration: 2.2,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute right-[-14vw] lg:right-[-12vw] top-1/2 -translate-y-1/2 w-[clamp(520px,64vw,980px)] aspect-square pointer-events-none select-none z-10 hidden md:flex items-center justify-center"
        >
          {/* Elemento de Zoom suave no Scroll */}
          <div
            ref={moonRef}
            className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-out will-change-transform"
          >
            {/* Halo cósmico suave */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 45% 45%, rgba(229,196,131,0.2) 0%, rgba(120,167,217,0.08) 50%, transparent 72%)",
                transform: "scale(1.15)",
                filter: "blur(30px)",
              }}
            />

            {/* Disco Lunar Colossal cortado na borda direita exatamente como no print */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[-25px_0_70px_rgba(0,0,0,0.9)] border border-white/[0.05]">
              <img
                src="/moon_full.jpg"
                alt="Lua da Isabela"
                className="w-full h-full object-cover rounded-full"
                style={{
                  filter: "brightness(0.92) contrast(1.08) saturate(0.9)",
                }}
                draggable={false}
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── FOOTER BAR DA HERO (RODAPÉ) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 sm:px-14 pb-6 sm:pb-8 z-20 pointer-events-none"
        style={{
          opacity: footerOpacity,
          willChange: "opacity",
        }}
      >
        <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">
          Uma exposição cósmica para você
        </span>

        {/* Seta indicadora de scroll para a Via Láctea */}
        <button
          type="button"
          onClick={() =>
            document.getElementById("galaxy")?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1.5 text-celestial-gold/50 hover:text-celestial-gold transition-colors cursor-pointer pointer-events-auto"
          aria-label="Rolar para a Via Láctea"
        >
          <span className="scroll-chevron text-lg">↓</span>
        </button>

        <span className="text-[11px] font-mono text-gray-500 tracking-widest">
          14 · 09 · 2007
        </span>
      </div>
    </section>
  );
}
