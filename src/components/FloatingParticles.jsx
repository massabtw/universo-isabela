import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function MilkyWayBackground() {
  // Gerar estrelas de fundo com tamanhos, brilhos e cores cósmicas reais
  const stars = useMemo(() => {
    return Array.from({ length: 130 }).map((_, i) => {
      const isHero = Math.random() < 0.12;
      const isMid = Math.random() < 0.35;
      const size = isHero ? Math.random() * 2 + 2.5 : isMid ? Math.random() * 1.4 + 1.4 : Math.random() * 1 + 0.7;
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 4 + 2.5;
      const delay = Math.random() * 5;
      
      const randColor = Math.random();
      let color = 'rgba(255, 255, 255, 0.95)';
      let glow = 'none';

      if (randColor < 0.25) {
        color = 'rgba(240, 210, 150, 0.95)'; // Ouro quente
        if (isHero) glow = '0 0 14px rgba(240, 210, 150, 0.85)';
      } else if (randColor < 0.5) {
        color = 'rgba(160, 205, 255, 0.95)'; // Azul celestial
        if (isHero) glow = '0 0 14px rgba(160, 205, 255, 0.85)';
      } else if (isHero) {
        glow = '0 0 12px rgba(255, 255, 255, 0.9)';
      }

      return {
        id: i,
        size,
        x,
        y,
        color,
        glow,
        duration,
        delay,
      };
    });
  }, []);

  // Aglomerados densos de poeira estelar ao longo do disco da galáxia
  const galaxyDust = useMemo(() => {
    return Array.from({ length: 85 }).map((_, i) => ({
      id: `dust-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.4 ? 'rgba(255,255,255,0.8)' : 'rgba(215, 180, 255, 0.85)',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030611]">
      
      {/* ── 1. Braço Principal Espiral da Via Láctea (Nebulosa Diagonal) ── */}
      <div 
        className="absolute -top-[30%] -left-[20%] w-[160vw] h-[160vh] opacity-75 pointer-events-none"
        style={{
          transform: 'rotate(-35deg)',
          background: `
            radial-gradient(ellipse 65% 18% at 50% 50%, rgba(135, 75, 200, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 75% 24% at 52% 48%, rgba(45, 95, 180, 0.45) 0%, transparent 75%),
            radial-gradient(ellipse 45% 12% at 48% 52%, rgba(240, 195, 125, 0.32) 0%, transparent 60%),
            radial-gradient(ellipse 60% 8% at 50% 50%, rgba(3, 6, 17, 0.8) 0%, transparent 50%)
          `,
          filter: 'blur(55px)',
        }}
      />

      {/* ── 2. Núcleo Galáctico (Brilho Estelar Púrpura Profundo) ── */}
      <div 
        className="absolute top-[20%] right-[10%] w-[75vw] h-[75vw] rounded-full opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(120, 50, 180, 0.35) 0%, rgba(30, 70, 140, 0.25) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── 3. Nebulosa de Emissão Azul Espacial (Braço de Órion / Carina) ── */}
      <div 
        className="absolute bottom-[10%] left-[5%] w-[80vw] h-[60vw] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(35, 95, 175, 0.4) 0%, rgba(80, 30, 110, 0.2) 55%, transparent 75%)',
          filter: 'blur(110px)',
        }}
      />

      {/* ── 4. Poeira Fina Cósmica (Star Dust) ── */}
      {galaxyDust.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}vw`,
            top: `${d.y}vh`,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* ── 5. Estrelas Cintilantes (GPU-Accelerated Twinkle) ── */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full star-twinkle"
          style={{
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: s.glow,
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* ── 6. Estrelas Cadentes / Meteoros Dinâmicos ── */}
      {/* Meteoro 1 */}
      <motion.div
        className="absolute w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -rotate-45 pointer-events-none"
        style={{ top: '12%', left: '20%' }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, 320],
          y: [0, 320],
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          repeatDelay: 5.5,
          ease: "easeOut",
        }}
      />

      {/* Meteoro 2 (Dourado) */}
      <motion.div
        className="absolute w-44 h-[1.5px] bg-gradient-to-r from-transparent via-celestial-gold to-transparent opacity-0 -rotate-45 pointer-events-none"
        style={{ top: '48%', left: '55%' }}
        animate={{
          opacity: [0, 0.95, 0],
          x: [0, 380],
          y: [0, 380],
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          repeatDelay: 8,
          delay: 2.2,
          ease: "easeOut",
        }}
      />

      {/* Meteoro 3 (Azul Céu) */}
      <motion.div
        className="absolute w-32 h-[1.5px] bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-0 -rotate-[35deg] pointer-events-none"
        style={{ top: '75%', left: '15%' }}
        animate={{
          opacity: [0, 0.9, 0],
          x: [0, 280],
          y: [0, 200],
        }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          repeatDelay: 9.5,
          delay: 4.5,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
