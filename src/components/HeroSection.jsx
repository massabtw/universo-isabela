/**
 * ====================================================================
 * HeroSection.jsx — Entrada Editorial com a Lua
 * ====================================================================
 *
 * 1. Ao carregar pós-tela preta:
 *    A Lua sai do centro da tela e se desloca suavemente para a lateral direita.
 * 2. Textos editoriais da esquerda entram em sintonia:
 *    "Isabela" (branco) / "Marty" (dourado)
 * 3. Ao scrollar:
 *    - Leve zoom suave na Lua (1.0 -> 1.16)
 *    - Frases da esquerda vão desaparecendo aos pouquinhos suavemente
 * 4. A Lua fica EXCLUSIVAMENTE neste painel! Ao rolar para a próxima seção,
 *    ela sobe junto com o painel e não invade o restante do site.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TURNING_AGE } from "../config";

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

  // 1. Zoom leve na Lua conforme o scroll desce: 1.0 -> 1.16
  const moonZoom = 1 + scrollProgress * 0.16;

  // 2. Frases da esquerda desaparecem aos pouquinhos suavemente
  // Em scroll 0: opacity 1.0 -> scroll 0.5: opacity 0
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const textTranslateY = scrollProgress * -30;

  // Footer bar da Hero desvanece no scroll
  const footerOpacity = Math.max(0, 1 - scrollProgress * 3.5);

  return (
    <section
      ref={storyRef}
      className="relative z-10 w-full"
      style={{ height: "190svh" }}
      id="inicio"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#03070E] flex items-center select-none">

        {/* ── LUA FOTORREALISTA: SAI DO CENTRO PARA A DIREITA + LEVE ZOOM NO SCROLL ── */}
        <motion.div
          initial={{
            x: "-26vw", // Começa no meio da tela
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            x: 0, // Desliza majestosamente para a lateral direita
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2.2,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transform: `scale(${moonZoom})`,
            willChange: "transform, opacity",
          }}
          className="absolute right-[-14vw] top-1/2 -translate-y-1/2 w-[clamp(380px,62vw,920px)] aspect-square pointer-events-none select-none z-10 hidden md:block"
        >
          {/* Halo sutil em volta da Lua */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 40%, rgba(180,160,120,0.18) 0%, rgba(60,50,30,0.06) 55%, transparent 75%)",
              transform: "scale(1.15)",
              filter: "blur(24px)",
            }}
          />

          {/* Imagem da Lua fotorrealista com máscara suave nas bordas */}
          <img
            src="/moon_full.jpg"
            alt="Lua"
            aria-hidden="true"
            className="w-full h-full object-cover rounded-full"
            style={{
              maskImage:
                "radial-gradient(circle at 50% 50%, black 58%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, black 58%, transparent 75%)",
              filter: "brightness(0.9) contrast(1.08) saturate(0.85)",
            }}
            draggable={false}
          />
        </motion.div>

        {/* ── COLUNA DE TEXTO ESQUERDA (DESAPARECE AOS POUQUINHOS NO SCROLL) ── */}
        <div
          className="relative z-20 flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-xl w-full"
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

      </div>
    </section>
  );
}
