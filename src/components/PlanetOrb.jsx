/**
 * ============================================
 * PlanetOrb.jsx — Orbe Planetário Fotorrealista
 * ============================================
 *
 * Renderiza qualquer planeta, Sol ou Lua como uma esfera 3D
 * perfeitamente iluminada, com textura real da NASA,
 * sombreamento esférico de profundidade e brilho atmosférico.
 */

import React from "react";
import { motion } from "framer-motion";

export default function PlanetOrb({ planet, size = 38, className = "" }) {
  if (!planet) return null;

  // Renderização Especial: O SOL (Estrela Central Radiante)
  if (planet.id === "sol" || planet.isSun) {
    return (
      <div 
        className={`relative flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Corona Solar Externa Pulsante */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-3 rounded-full blur-md"
          style={{
            background: "radial-gradient(circle, rgba(255, 230, 100, 0.9) 0%, rgba(255, 140, 0, 0.65) 50%, transparent 75%)"
          }}
        />

        {/* Halo Solar Médio */}
        <div 
          className="absolute -inset-1.5 rounded-full blur-sm"
          style={{
            background: "radial-gradient(circle, #FFF4A0 0%, #FF9000 65%, #CC3300 100%)"
          }}
        />

        {/* Disco da Fotosfera Solar com Textura Real */}
        <div 
          className="relative w-full h-full rounded-full overflow-hidden border border-yellow-200 shadow-[0_0_25px_#FFAE34] bg-[#FF9900]"
        >
          <img 
            src={planet.texture3D || "/planetas/3d/sol.jpg"} 
            alt="O Sol"
            className="w-full h-full object-cover select-none pointer-events-none scale-125 brightness-110"
          />
          {/* Brilho do Núcleo */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, rgba(255,180,50,0.3) 50%, rgba(200,60,0,0.6) 100%)"
            }}
          />
        </div>
      </div>
    );
  }

  // Renderização dos Planetas do Sistema Solar
  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* ── Brilho Atmosférico do Planeta ── */}
      <div 
        className="absolute -inset-1.5 rounded-full blur-md pointer-events-none transition-all duration-300 opacity-60 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${planet.atmosphereColor}88 0%, transparent 70%)`
        }}
      />

      {/* ── Caso seja Saturno: Anéis Tilted 3D ── */}
      {planet.hasRings && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{
            width: size * 2.2,
            height: size * 0.55,
            transform: 'translate(-50%, -50%) rotate(-25deg)',
          }}
        >
          {/* Anel Externo com Textura Translúcida */}
          <div 
            className="w-full h-full rounded-full border-2 border-yellow-200/60 shadow-[0_0_12px_rgba(226,206,159,0.5)]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 48%, rgba(226,206,159,0.3) 50%, rgba(245,230,180,0.75) 75%, transparent 92%)'
            }}
          />
        </div>
      )}

      {/* ── Globo Esférico com Textura Real e Sombra 3D ── */}
      <div 
        className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border border-white/20 transition-transform duration-300 z-20 group-hover:scale-110"
        style={{ backgroundColor: planet.color }}
      >
        {/* Textura Fotográfica de Superfície da NASA */}
        <img 
          src={planet.texture3D} 
          alt={planet.name}
          className="w-full h-full object-cover select-none pointer-events-none scale-135"
        />

        {/* Terminador de Iluminação 3D Esférico Realista (Dia / Noite Cósmico) */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              inset -${Math.max(3, size * 0.32)}px -${Math.max(2, size * 0.2)}px ${Math.max(6, size * 0.45)}px ${Math.max(1, size * 0.08)}px rgba(0, 0, 0, 0.95),
              inset ${Math.max(2, size * 0.16)}px ${Math.max(2, size * 0.14)}px ${Math.max(4, size * 0.3)}px rgba(255, 255, 255, 0.32),
              0 0 ${Math.max(3, size * 0.25)}px ${planet.atmosphereColor}40
            `
          }}
        />
      </div>
    </div>
  );
}

