/**
 * ====================================================================
 * MoonLayer.jsx — Lua Fotorrealista Global (Layer Fixa Persistente)
 * ====================================================================
 *
 * A Lua persiste entre CountdownScreen e HeroSection como um elemento
 * fixo em App.jsx, animando sua posição e escala conforme o estado do app.
 *
 * Estados:
 * - "countdown": Lua centralizada à direita, grande
 * - "bigbang": Lua permanece, textos somem (fase pós-explosão)
 * - "hero": Lua anima para canto superior direito, um pouco maior
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MoonLayer({ phase }) {
  // phase: "countdown" | "bigbang" | "hero"

  // Configurações de posição/tamanho por fase
  // Desktop: a Lua sangra pela borda direita (~40% cortada)
  const variants = {
    countdown: {
      right: "-12vw",
      top: "50%",
      y: "-50%",
      width: "clamp(380px, 58vw, 820px)",
      opacity: 1,
    },
    bigbang: {
      right: "-12vw",
      top: "50%",
      y: "-50%",
      width: "clamp(380px, 58vw, 820px)",
      opacity: 1,
    },
    hero: {
      right: "-14vw",
      top: "48%",
      y: "-50%",
      width: "clamp(420px, 64vw, 900px)",
      opacity: 1,
    },
  };

  const current = variants[phase] || variants.countdown;

  return (
    <motion.div
      className="fixed pointer-events-none z-10 select-none"
      animate={{
        right: current.right,
        top: current.top,
        y: current.y,
        width: current.width,
        opacity: current.opacity,
      }}
      transition={{
        duration: phase === "hero" ? 1.8 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ aspectRatio: "1/1" }}
    >
      {/* Halo suave atrás da Lua */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 40%, rgba(180,160,120,0.18) 0%, rgba(60,50,30,0.08) 55%, transparent 75%)",
          transform: "scale(1.12)",
          filter: "blur(18px)",
        }}
      />

      {/* A Lua fotorrealista */}
      <img
        src="/moon_full.jpg"
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover rounded-full"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 50%, black 55%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 55%, transparent 75%)",
          filter: "brightness(0.88) contrast(1.08) saturate(0.85)",
        }}
        draggable={false}
      />
    </motion.div>
  );
}
