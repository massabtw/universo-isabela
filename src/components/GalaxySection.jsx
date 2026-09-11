/**
 * ====================================================================
 * GalaxySection.jsx — Via Láctea com Scroll Parallax
 * ====================================================================
 *
 * - Nebulosa dourada começa no canto superior direito
 * - Conforme o scroll, a nebulosa se centraliza na tela
 * - Quando centralizada (progress >= 0.9), o scroll continua naturalmente
 * - Campo estelar profundo no canvas
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GalaxySection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Canvas de estrelas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    // Gerar estrelas
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = s.alpha + Math.sin(frame * s.pulse + s.phase) * 0.15;
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(1, a))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Scroll scrubbing
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
      setScrollProgress(progress);
      raf = null;
    };

    const schedule = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Nebulosa: inicia no canto superior direito, vai para o centro
  // scrollProgress 0 → posição: 85% 15% (canto direito superior)
  // scrollProgress 1 → posição: 50% 50% (centro)
  const nebulaX = 85 - scrollProgress * 35; // 85% → 50%
  const nebulaY = 15 + scrollProgress * 35;  // 15% → 50%
  const nebulaScale = 0.65 + scrollProgress * 0.45; // 0.65 → 1.1
  const contentOpacity = Math.min(1, scrollProgress * 2.5); // aparece no meio do scroll
  const textY = (1 - scrollProgress) * 20; // sobe levemente

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "220svh" }}
      id="galaxy"
    >
      <div
        className="sticky top-0 h-svh overflow-hidden"
        style={{ background: "#03070E" }}
      >
        {/* Canvas de estrelas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />

        {/* Nebulosa dourada animada pelo scroll */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${nebulaX}%`,
            top: `${nebulaY}%`,
            transform: `translate(-50%, -50%) scale(${nebulaScale})`,
            width: "min(700px, 90vw)",
            height: "min(700px, 90vw)",
            background:
              "radial-gradient(circle at 50% 50%, rgba(200,165,80,0.55) 0%, rgba(180,140,60,0.28) 30%, rgba(100,80,30,0.1) 60%, transparent 80%)",
            filter: "blur(60px)",
            transition: "none",
            willChange: "transform, left, top",
          }}
        />

        {/* Brilho central da nebulosa (núcleo mais intenso) */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${nebulaX}%`,
            top: `${nebulaY}%`,
            transform: `translate(-50%, -50%) scale(${nebulaScale * 0.45})`,
            width: "min(700px, 90vw)",
            height: "min(700px, 90vw)",
            background:
              "radial-gradient(circle at 50% 50%, rgba(240,200,100,0.7) 0%, rgba(200,160,60,0.35) 40%, transparent 70%)",
            filter: "blur(24px)",
            willChange: "transform, left, top",
          }}
        />

        {/* Conteúdo central — aparece conforme scroll avança */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${textY}px)`,
            transition: "none",
          }}
        >
          <p className="font-serif text-2xl sm:text-4xl md:text-5xl text-white/90 leading-snug tracking-tight mb-6 max-w-2xl">
            Toda estrela tem uma história.
            <br />
            Esta viagem é a sua.
          </p>

          <a
            href="#lua"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("lua")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pointer-events-auto text-[13px] font-mono text-celestial-gold/80 hover:text-celestial-gold tracking-[0.2em] flex items-center gap-2 transition-colors cursor-pointer mt-2"
            style={{ opacity: Math.min(1, (scrollProgress - 0.4) * 4) }}
          >
            Continuar a viagem
            <span className="text-base">→</span>
          </a>
        </div>

        {/* Indicador de scroll quando ainda não rolou */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
            Role para continuar
          </span>
          <span className="text-celestial-gold/50 animate-bounce text-sm">↓</span>
        </div>
      </div>
    </section>
  );
}
