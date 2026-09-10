/**
 * ====================================================================
 * SolarSystemMap.jsx — Mapa Orbital & Observatório 3D Imersivo Integrado
 * ====================================================================
 *
 * Experiência Ultra Imersiva & Clean:
 * 1. Modo Órbitas:
 *    - Linhas orbitais contínuas e ultra-sutis sem molduras
 *    - Efeito de hover suave: o planeta cresce suavemente
 *    - Telemetria Fixa (HUD): o nome e dados do astro aparecem em um
 *      banner limpo e fixo no topo, sem tooltips cobrindo o mapa
 * 2. Modo Zoom (Ao Clicar no Astro):
 *    - Transição fluida de aproximação
 *    - Lado Esquerdo: Globo 3D real interativo (Three.js WebGL) em 360°
 *    - Lado Direito: Curiosidades da NASA, conexão especial da Bela e métricas
 *    - Botão "← Voltar para as Órbitas" para sair suavemente
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLANETS_DATA, SUN_DATA } from "../data/planetsData";
import PlanetOrb from "./PlanetOrb";
import PlanetViewer3D from "./PlanetViewer3D";

// Todos os corpos celestes em ordem (Sol + 8 Planetas)
const ALL_BODIES = [SUN_DATA, ...PLANETS_DATA];

// Proporções astronômicas visuais para o mapa orbital
const PLANET_SIZES = {
  mercurio: 20,
  venus: 27,
  terra: 29,
  marte: 23,
  jupiter: 48,
  saturno: 42,
  urano: 33,
  netuno: 32,
};

export default function SolarSystemMap() {
  // Estado de inspeção / zoom (null = mapa de órbitas, string id = planeta em zoom)
  const [inspectedPlanetId, setInspectedPlanetId] = useState(null);
  
  // Hover no mapa de órbitas
  const [hoveredAstro, setHoveredAstro] = useState(null);
  
  // Controle de visualização da Lua quando a Terra estiver inspecionada
  const [viewingSatellite, setViewingSatellite] = useState(false);
  
  // Controle de rotação automática no 3D
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Astro atualmente em foco no modo zoom
  const activeAstro = useMemo(() => {
    if (!inspectedPlanetId) return null;
    return ALL_BODIES.find((b) => b.id === inspectedPlanetId) || ALL_BODIES[0];
  }, [inspectedPlanetId]);

  // Objeto atual para o visor 3D (o planeta ou seu satélite se selecionado)
  const current3DObject = useMemo(() => {
    if (!activeAstro) return null;
    if (viewingSatellite && activeAstro.satellite) {
      return activeAstro.satellite;
    }
    return activeAstro;
  }, [activeAstro, viewingSatellite]);

  // Transição para inspecionar um planeta
  const handleSelectPlanet = (planetId, asSatellite = false) => {
    setHoveredAstro(null);
    setInspectedPlanetId(planetId);
    setViewingSatellite(asSatellite);
  };

  // Retornar para o mapa orbital
  const handleBackToOrbits = () => {
    setInspectedPlanetId(null);
    setViewingSatellite(false);
  };

  return (
    <section 
      id="sistema-solar" 
      className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center overflow-hidden bg-transparent select-none"
    >
      {/* Brilho Cósmico Difuso Central Adaptativo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full pointer-events-none opacity-25 blur-[150px] transition-all duration-1000"
        style={{
          background: activeAstro 
            ? `radial-gradient(circle, ${activeAstro.atmosphereColor || activeAstro.color}66 0%, rgba(2, 6, 23, 0.2) 55%, transparent 75%)` 
            : "radial-gradient(circle, rgba(245, 185, 65, 0.45) 0%, rgba(229, 83, 56, 0.15) 45%, transparent 75%)"
        }}
      />

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-12 h-[1px] bg-celestial-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-celestial-gold font-mono font-medium">
              Cosmologia do Sistema Solar
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-celestial-gold/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-celestial-starlight tracking-tight mb-2">
            {inspectedPlanetId ? `Observatório: ${activeAstro?.name}` : "Os Mundos em Harmonia"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-lg mx-auto">
            {inspectedPlanetId 
              ? "Aproxime-se do modelo 3D em 360° e descubra os segredos deste mundo."
              : "Passe o mouse pelos astros para focalizar e clique para aproximar em 3D."}
          </p>
        </div>

        {/* ── TRANSIÇÃO ULTRA FLUÍDA E OTIMIZADA ENTRE ÓRBITAS E ZOOM ── */}
        <div className="w-full flex flex-col items-center relative">
          <AnimatePresence mode="wait">
            {!inspectedPlanetId ? (
              <motion.div
                key="orbits-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
                
                {/* ── BARRA FIXA DE TELEMETRIA (HUD LIMPO NO TOPO) ── */}
                <div className="w-full max-w-2xl h-14 mb-4 flex items-center justify-center px-4 rounded-2xl bg-midnight-900/60 border border-white/[0.08] backdrop-blur-xl shadow-lg z-40 relative">
                  <AnimatePresence mode="wait">
                    {hoveredAstro ? (
                      <motion.div
                        key={`hud-${hoveredAstro.id}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl" style={{ color: hoveredAstro.color }}>
                            {hoveredAstro.symbol}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-lg font-medium text-white">
                              {hoveredAstro.name}
                            </span>
                            <span className="text-xs text-gray-400 font-light hidden sm:inline">
                              • {hoveredAstro.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {hoveredAstro.id === "marte" && (
                            <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#E55338]/20 text-[#E55338] border border-[#E55338]/40 font-mono font-bold">
                              Marty
                            </span>
                          )}
                          {hoveredAstro.id === "venus" && (
                            <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#E5A952]/20 text-[#E5A952] border border-[#E5A952]/40 font-mono font-bold">
                              Cratera Isabella
                            </span>
                          )}
                          {hoveredAstro.id === "terra" && (
                            <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 font-mono font-bold">
                              + A Lua
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-mono text-celestial-gold bg-celestial-gold/10 px-2 py-0.5 rounded border border-celestial-gold/30">
                            Clique para Zoom 3D
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hud-idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xs font-mono text-gray-400"
                      >
                        <span className="text-celestial-gold">☉</span>
                        <span>Passe o mouse sobre qualquer planeta para ver as coordenadas • Clique para aproximar</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── O MAPA DAS ÓRBITAS (LINHAS ESTÁTICAS E SUAVES SEM MUDAR DE COR) ── */}
                <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center my-2">
                  
                  {/* SVG das Linhas Orbitais: Sempre limpas, estáticas e elegantes */}
                  <svg 
                    viewBox="-220 -220 440 440" 
                    className="absolute inset-0 w-full h-full pointer-events-none select-none"
                  >
                    {PLANETS_DATA.map((planet) => {
                      const r = 32 + planet.orbitRadiusScale * 170;
                      return (
                        <circle
                          key={`orbit-${planet.id}`}
                          cx="0"
                          cy="0"
                          r={r}
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.08)"
                          strokeWidth="0.75"
                        />
                      );
                    })}
                  </svg>

                  {/* ── CENTRO DO MAPA: O SOL ── */}
                  <div className="absolute z-30 flex flex-col items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.22 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      onMouseEnter={() => setHoveredAstro(SUN_DATA)}
                      onMouseLeave={() => setHoveredAstro(null)}
                      onClick={() => handleSelectPlanet("sol")}
                      className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
                      aria-label="Inspecionar O Sol"
                    >
                      <div className="rounded-full flex items-center justify-center relative z-10">
                        <PlanetOrb planet={SUN_DATA} size={54} />
                      </div>
                    </motion.button>
                  </div>

                  {/* ── OS 8 PLANETAS NAS ÓRBITAS ── */}
                  {PLANETS_DATA.map((planet) => {
                    const rPct = 14 + planet.orbitRadiusScale * 34.5;
                    const rad = (planet.mapAngle * Math.PI) / 180;
                    const xPct = 50 + rPct * Math.cos(rad);
                    const yPct = 50 + rPct * Math.sin(rad);
                    const isEarth = planet.id === "terra";
                    const orbSize = PLANET_SIZES[planet.id] || 30;

                    return (
                      <div
                        key={planet.id}
                        style={{
                          left: `${xPct}%`,
                          top: `${yPct}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <motion.button
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          onMouseEnter={() => setHoveredAstro(planet)}
                          onMouseLeave={() => setHoveredAstro(null)}
                          onClick={() => handleSelectPlanet(planet.id)}
                          className="group relative flex flex-col items-center cursor-pointer focus:outline-none touch-manipulation"
                          aria-label={`Aproximar de ${planet.name}`}
                        >
                          <div className="rounded-full flex items-center justify-center relative z-10">
                            <PlanetOrb planet={planet} size={orbSize} />
                          </div>

                          {/* Se for a Terra: Mini Lua Orbitando ao Lado */}
                          {isEarth && (
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPlanet("terra", true);
                              }}
                              className="absolute -top-2.5 -right-3.5 cursor-pointer group-hover:scale-125 transition-transform z-20"
                              title="A Lua (Satélite Natural da Terra)"
                            >
                              <div className="w-3.5 h-3.5 rounded-full overflow-hidden border border-white/70 shadow-md flex items-center justify-center">
                                <PlanetOrb planet={planet.satellite} size={14} />
                              </div>
                            </div>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}

                </div>

                {/* ── SELETOR RÁPIDO INFERIOR DISCRETO ── */}
                <div className="w-full max-w-2xl mt-4 flex items-center justify-center gap-1.5 overflow-x-auto pb-2 no-scrollbar z-40 relative">
                  {ALL_BODIES.map((body) => (
                    <button
                      key={`btn-${body.id}`}
                      onClick={() => handleSelectPlanet(body.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-celestial-gold/40 text-[11px] font-mono text-gray-300 hover:text-white shrink-0 transition-all cursor-pointer active:scale-95"
                    >
                      <span style={{ color: body.color }}>{body.symbol}</span>
                      <span>{body.name}</span>
                    </button>
                  ))}
                </div>

              </motion.div>
            ) : (
              
              <motion.div
                key="zoom-view"
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full max-w-6xl p-4 sm:p-8 relative z-20 flex flex-col"
              >
                {/* ── BARRA SUPERIOR DO ZOOM: BOTÃO VOLTAR + SELETOR DE ASTROS ── */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10 w-full"
                >
                  {/* Botão de Voltar para as Órbitas */}
                  <button
                    onClick={handleBackToOrbits}
                    className="group px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-celestial-gold/50 text-xs font-mono uppercase tracking-[0.2em] text-celestial-starlight hover:text-celestial-gold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Voltar para as Órbitas</span>
                  </button>

                  {/* Seletor Compacto de Astros para navegar direto */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {ALL_BODIES.map((body) => {
                      const isSelected = body.id === activeAstro.id;
                      return (
                        <button
                          key={`zoom-pill-${body.id}`}
                          onClick={() => handleSelectPlanet(body.id, false)}
                          className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1 shrink-0 border cursor-pointer ${
                            isSelected
                              ? "bg-white/15 text-white border-celestial-gold shadow-[0_0_10px_rgba(229,196,131,0.3)] scale-105 font-medium"
                              : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span style={{ color: body.color }}>{body.symbol}</span>
                          <span className="hidden sm:inline">{body.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* ── GRID SPLIT: 3D NA ESQUERDA + CURIOSIDADES NA DIREITA ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
                  
                  {/* ── LADO ESQUERDO: GLOBO 3D INTERATIVO GIGANTE (SEM BORDAS) ── */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px]">
                    
                    {/* Container do Visor 3D: Clean e focado em 60fps sem distorção */}
                    <div className="relative w-full aspect-square max-w-[460px] rounded-full flex items-center justify-center z-10">
                      {/* Brilho da Auréola Atmosférica de Fundo */}
                      <div 
                        className="absolute inset-0 pointer-events-none blur-3xl rounded-full opacity-40 transition-opacity duration-700"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${current3DObject.atmosphereColor || current3DObject.color} 0%, transparent 70%)` }}
                      />

                      {/* Componente WebGL 3D com Rotação Livre em 360° */}
                      <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing rounded-full overflow-visible">
                        <PlanetViewer3D
                          key={`${current3DObject.id}-${viewingSatellite ? "moon" : "planet"}`}
                          textureUrl={current3DObject.texture3D}
                          planetName={current3DObject.name}
                          atmosphereColor={current3DObject.atmosphereColor}
                          hasRings={Boolean(current3DObject.hasRings)}
                          ringTextureUrl={current3DObject.ringTexture}
                          isSun={Boolean(current3DObject.isSun)}
                          isAutoRotating={isAutoRotating}
                          onToggleAutoRotate={() => setIsAutoRotating(!isAutoRotating)}
                        />
                      </div>
                    </div>

                    {/* Sub-categoria: Alternar entre Terra e A Lua */}
                    {activeAstro.satellite && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-2 mt-6 p-1.5 rounded-full bg-midnight-950/80 border border-white/15 shadow-xl"
                      >
                        <button
                          onClick={() => setViewingSatellite(false)}
                          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                            !viewingSatellite 
                              ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20 scale-105" 
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          🜨 Terra (3D)
                        </button>
                        <button
                          onClick={() => setViewingSatellite(true)}
                          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                            viewingSatellite 
                              ? "bg-celestial-gold text-midnight-950 font-medium shadow-md shadow-celestial-gold/20 scale-105" 
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          🌙 A Lua (3D)
                        </button>
                      </motion.div>
                    )}

                  </div>

                  {/* ── LADO DIREITO: CARD DE CURIOSIDADES, HOMENAGEM & SPECS ── */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="lg:col-span-6 flex flex-col justify-between gap-6 text-left p-6 sm:p-8 rounded-3xl bg-midnight-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                  >
                    {/* Filete superior com a cor do astro */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500"
                      style={{ backgroundColor: activeAstro.color }}
                    />

                    {/* Cabeçalho do Astro */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-2xl" style={{ color: current3DObject.color }}>
                          {current3DObject.symbol}
                        </span>
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-celestial-gold">
                          {current3DObject.tag || "CORPO CELESTE"}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                        {current3DObject.name}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-400 font-light mt-2">
                        {current3DObject.subtitle}
                      </p>
                    </div>

                    {/* Card de Destaque Especial (Conexão da Bela: Marty / Cratera Isabella / A Lua) */}
                    {current3DObject.highlightText && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-celestial-gold/30 shadow-inner">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-celestial-gold mb-2 flex items-center gap-1.5 font-bold">
                          <span>✦</span> {current3DObject.highlightTitle || "Conexão Cósmica:"}
                        </h4>
                        <p className="text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line">
                          {current3DObject.highlightText}
                        </p>
                      </div>
                    )}

                    {/* Fatos Científicos da NASA */}
                    {current3DObject.facts && (
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                          Dados Científicos da NASA:
                        </h4>
                        <ul className="space-y-2">
                          {current3DObject.facts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-light leading-relaxed">
                              <span className="text-celestial-gold mt-0.5">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Grid de Especificações Astronômicas Detalhadas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-gray-400">Diâmetro</span>
                        <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                          {current3DObject.diameter || "—"}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-gray-400">
                          {current3DObject.id === "sol" ? "Posição" : current3DObject.id === "lua" ? "Distância Terra" : "Distância Sol"}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                          {current3DObject.distanceSun || current3DObject.distanceCenter || "—"}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-gray-400">Duração do Ano</span>
                        <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                          {current3DObject.orbitalPeriod || "—"}
                        </span>
                      </div>

                      {/* Temperatura Média Completa — sem cortes */}
                      <div className="p-3 rounded-2xl bg-celestial-gold/5 border border-celestial-gold/25 flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-mono text-celestial-gold/80 block mb-0.5">
                          Temperatura Média
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-celestial-gold font-mono leading-snug break-words">
                          {current3DObject.temperature || "—"}
                        </span>
                      </div>
                    </div>

                  </motion.div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

