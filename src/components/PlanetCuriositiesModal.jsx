/**
 * ============================================
 * PlanetCuriositiesModal — Observatório 3D do Sistema Solar
 * ============================================
 *
 * Apresenta o Sol e todos os 8 planetas em ordem rigorosa:
 * 0. O Sol (Estrela Central em 3D Radiante)
 * 1. Mercúrio → 2. Vênus → 3. Terra (com A Lua como subcategoria)
 * → 4. Marte → 5. Júpiter → 6. Saturno → 7. Urano → 8. Netuno.
 *
 * Globo 3D real interativo (Three.js WebGL) em 360°, texturas esféricas,
 * iluminação solar espacial, anéis 3D de Saturno e conexões exclusivas com a Isabela.
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlanetViewer3D from "./PlanetViewer3D";
import { PLANETS_DATA, SUN_DATA } from "../data/planetsData";

const ALL_BODIES = [SUN_DATA, ...PLANETS_DATA];

export default function PlanetCuriositiesModal({ 
  isOpen, 
  onClose, 
  initialPlanetId = "marte",
  initialViewSatellite = false 
}) {
  const [activePlanetId, setActivePlanetId] = useState(initialPlanetId);
  const [viewSatellite, setViewSatellite] = useState(initialViewSatellite);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Sincroniza quando aberto externamente via clique no mapa orbital
  useEffect(() => {
    if (initialPlanetId) {
      setActivePlanetId(initialPlanetId);
      setViewSatellite(initialViewSatellite);
    }
  }, [initialPlanetId, initialViewSatellite]);

  const activePlanet = ALL_BODIES.find((p) => p.id === activePlanetId) || ALL_BODIES[0];
  const hasSatellite = Boolean(activePlanet.satellite);

  // O astro atualmente inspecionado no visor 3D (o planeta, Sol ou seu satélite)
  const currentObject = (viewSatellite && hasSatellite) ? activePlanet.satellite : activePlanet;
  const isSun = activePlanet.id === "sol" || activePlanet.isSun;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop com desfoque cósmico profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02040a]/92 backdrop-blur-2xl"
          />

          {/* Container Principal do Observatório */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-6xl h-[94vh] max-h-[900px] bg-[#050918]/95 border border-white/15 rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.95)] flex flex-col z-10 overflow-hidden"
          >
            {/* ── Barra Superior do Cockpit ── */}
            <div className="px-5 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between bg-[#070d24]/90 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔭</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-2xl text-celestial-starlight tracking-tight">
                      Observatório 3D do Sistema Solar
                    </h3>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-celestial-gold/20 text-celestial-gold border border-celestial-gold/40">
                      Ordem Celestial • 360°
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    Sol e Planetas em ordem • Arraste para girar em 360°
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 text-sm"
                aria-label="Fechar Observatório"
              >
                ✕
              </button>
            </div>

            {/* ── Seletor de Astros Ordenado (Sol + 1 a 8) ── */}
            <div className="px-4 py-2.5 bg-[#060b1e]/90 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {ALL_BODIES.map((body) => {
                const isSelected = body.id === activePlanetId;
                return (
                  <button
                    key={body.id}
                    onClick={() => {
                      setActivePlanetId(body.id);
                      setViewSatellite(false);
                    }}
                    className={`px-3 py-1.5 sm:py-2 rounded-2xl text-xs font-mono transition-all duration-300 flex items-center gap-2 shrink-0 border ${
                      isSelected
                        ? "bg-gradient-to-r from-celestial-gold/25 to-blue-500/20 text-celestial-gold border-celestial-gold shadow-lg shadow-black/60 scale-[1.03] font-medium"
                        : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/30"
                      style={{ backgroundColor: body.color }}
                    >
                      <img 
                        src={body.texture3D} 
                        alt={body.name}
                        className="w-full h-full object-cover scale-125"
                      />
                    </div>
                    <span>{body.order}. {body.name}</span>
                    {body.id === "marte" && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-[#E55338]/30 text-[#E55338] font-bold">
                        Marty
                      </span>
                    )}
                    {body.id === "venus" && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-[#E5A952]/30 text-[#E5A952] font-bold">
                        Isabella
                      </span>
                    )}
                    {body.id === "terra" && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-blue-500/30 text-sky-300 font-bold">
                        + Lua
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Conteúdo Central: Palco 3D (Esquerda) + Ficha Astrofísica (Direita) ── */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* ── COLUNA ESQUERDA: GLOBO 3D (OU SOL 3D) ── */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl p-4 border border-white/[0.08]">
                
                {/* ── SELETOR DE SUBCATEGORIA (CASO TERRA: TERRA VS A LUA) ── */}
                {hasSatellite && (
                  <div className="w-full mb-3 flex items-center justify-center">
                    <div className="inline-flex p-1 rounded-2xl bg-midnight-950/90 border border-celestial-gold/40 shadow-xl">
                      <button
                        onClick={() => setViewSatellite(false)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                          !viewSatellite
                            ? "bg-blue-600/30 text-sky-300 border border-blue-400/50 shadow-md font-medium"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>🜨</span> Planeta Terra
                      </button>
                      <button
                        onClick={() => setViewSatellite(true)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                          viewSatellite
                            ? "bg-celestial-gold/25 text-celestial-gold border border-celestial-gold/60 shadow-md font-medium"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <span>🌙</span> A Lua <span className="text-[9px] opacity-80">(Satélite Natural)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Badge do Astro */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span 
                    className="text-[10px] sm:text-xs font-mono font-medium uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm"
                    style={{
                      backgroundColor: `${currentObject.tagColor}15`,
                      color: currentObject.tagColor,
                      borderColor: `${currentObject.tagColor}40`
                    }}
                  >
                    {currentObject.tag}
                  </span>

                  <span className="text-xs font-mono text-gray-400">
                    {currentObject.symbol} {isSun ? "Estrela Central" : viewSatellite ? "Satélite Natural da Terra" : `Posição #${activePlanet.order} do Sol`}
                  </span>
                </div>

                {/* Renderizador Three.js 3D (Suporta Planetas, Sol e Lua) */}
                <div className="w-full flex items-center justify-center">
                  <PlanetViewer3D 
                    key={currentObject.id}
                    textureUrl={currentObject.texture3D}
                    planetName={currentObject.name}
                    atmosphereColor={currentObject.atmosphereColor}
                    hasRings={currentObject.hasRings}
                    ringTextureUrl={currentObject.ringTexture}
                    isSun={isSun}
                    isAutoRotating={isAutoRotating}
                    onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
                  />
                </div>

              </div>

              {/* ── COLUNA DIREITA: DADOS ASTROFÍSICOS & CONEXÕES ESPECIAIS ── */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentObject.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    
                    {/* Título & Subtítulo */}
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h2 className="font-serif text-3xl sm:text-4xl text-celestial-starlight tracking-tight">
                          {currentObject.name}
                        </h2>
                        <span className="text-xl font-serif text-celestial-gold opacity-80">
                          {currentObject.symbol}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                        {currentObject.subtitle}
                      </p>
                    </div>

                    {/* ── DESTAQUE ESPECIAL (SOL / MARTY / CRATERA ISABELLA / A LUA) ── */}
                    <div 
                      className="p-4 sm:p-5 rounded-2xl border shadow-xl backdrop-blur-md relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${currentObject.color}15 0%, rgba(10, 18, 38, 0.7) 100%)`,
                        borderColor: `${currentObject.color}50`
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">✦</span>
                        <h4 
                          className="font-serif text-sm sm:text-base font-semibold tracking-wide"
                          style={{ color: currentObject.color }}
                        >
                          {currentObject.highlightTitle}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line">
                        {currentObject.highlightText}
                      </p>
                    </div>

                    {/* ── MÉTRICAS ASTRONÔMICAS (GRID 2x2) ── */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                          {isSun ? "Posição Cósmica" : viewSatellite ? "Distância da Terra" : "Distância do Sol"}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-celestial-starlight mt-0.5">
                          {currentObject.distanceCenter || currentObject.distanceSun}
                        </p>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                          Diâmetro
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-celestial-starlight mt-0.5">
                          {currentObject.diameter}
                        </p>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                          Período de Rotação (Dia)
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-celestial-starlight mt-0.5">
                          {currentObject.rotationPeriod}
                        </p>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                          Temperatura Média
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-celestial-starlight mt-0.5">
                          {currentObject.temperature}
                        </p>
                      </div>
                    </div>

                    {/* ── CURIOSIDADES CIENTÍFICAS DA NASA ── */}
                    <div className="p-4 rounded-2xl bg-midnight-900/60 border border-white/10">
                      <h5 className="text-[11px] uppercase font-mono tracking-widest text-celestial-gold mb-2.5 flex items-center gap-1.5">
                        <span>🪐</span> Curiosidades Científicas:
                      </h5>
                      <ul className="space-y-2">
                        {currentObject.facts.map((fact, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed font-light">
                            <span className="text-celestial-gold/70 text-xs mt-0.5 shrink-0">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
