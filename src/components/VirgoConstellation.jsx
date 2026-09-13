/**
 * ============================================
 * VirgoConstellation — O Mapa Estelar de Virgem
 * ============================================
 *
 * Mapeamento astronômico interativo das principais estrelas
 * da constelação de Virgem (Virgo), presente no céu de 14 de Setembro.
 * Foco puramente astronômico nas estrelas, magnitudes e distâncias.
 */

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// Dados astronômicos reais das estrelas de Virgem
const VIRGO_STARS = [
  { 
    id: "spica", 
    name: "Spica", 
    bayer: "Alpha Virginis (α Vir)",
    type: "Binária Espectroscópica Azul",
    magnitude: "0.98 (Alta Visibilidade)",
    distance: "250 anos-luz",
    temperature: "25.300 K",
    x: 420, 
    y: 340, 
    size: 7, 
    color: "#9BC5F8", 
    glow: true, 
    details: "A 16ª estrela mais brilhante de todo o céu noturno. Na verdade, é composta por duas estrelas massivas azuis que orbitam uma à outra a cada 4 dias, gerando um brilho 12.000 vezes maior que o Sol." 
  },
  { 
    id: "porrima", 
    name: "Porrima", 
    bayer: "Gamma Virginis (γ Vir)",
    type: "Sistema Binário Branco",
    magnitude: "2.74",
    distance: "38 anos-luz",
    temperature: "7.100 K",
    x: 290, 
    y: 230, 
    size: 5, 
    color: "#F5E6C8", 
    details: "Um dos pares de estrelas mais famosos da astronomia. Duas estrelas brancas quase gêmeas que realizam uma órbita mútua com período de 169 anos." 
  },
  { 
    id: "vindemiatrix", 
    name: "Vindemiatrix", 
    bayer: "Epsilon Virginis (ε Vir)",
    type: "Gigante Amarela",
    magnitude: "2.85",
    distance: "110 anos-luz",
    temperature: "5.080 K",
    x: 340, 
    y: 110, 
    size: 5, 
    color: "#F5D782", 
    details: "Uma gigante estelar com raio 11 vezes maior que o nosso Sol e luminosidade 83 vezes superior. Localizada no braço norte da constelação." 
  },
  { 
    id: "zavijava", 
    name: "Zavijava", 
    bayer: "Beta Virginis (β Vir)",
    type: "Anã Amarela-Branca",
    magnitude: "3.61",
    distance: "36 anos-luz",
    temperature: "6.130 K",
    x: 140, 
    y: 150, 
    size: 4.5, 
    color: "#E0ECF8", 
    details: "Uma estrela próxima ao Sistema Solar. Foi historicamente relevante em 1922 durante um eclipse solar utilizado para confirmar medições da Teoria da Relatividade Geral de Einstein." 
  },
  { 
    id: "zaniah", 
    name: "Zaniah", 
    bayer: "Eta Virginis (η Vir)",
    type: "Sistema Múltiplo Triplo",
    magnitude: "3.89",
    distance: "250 anos-luz",
    temperature: "9.300 K",
    x: 210, 
    y: 190, 
    size: 4.5, 
    color: "#E0ECF8", 
    details: "Um complexo sistema triplo onde duas estrelas orbitam muito próximas uma da outra a cada 71 dias, acompanhadas por uma terceira estrela exterior." 
  },
  { 
    id: "auva", 
    name: "Minelauva", 
    bayer: "Delta Virginis (δ Vir)",
    type: "Gigante Vermelha",
    magnitude: "3.38",
    distance: "202 anos-luz",
    temperature: "3.750 K",
    x: 320, 
    y: 170, 
    size: 4.5, 
    color: "#F8B880", 
    details: "Uma gigante fria de cor avermelhada característica e brilho pulsante. Seu raio se expandiu para mais de 48 vezes o tamanho do Sol." 
  },
  { 
    id: "heze", 
    name: "Heze", 
    bayer: "Zeta Virginis (ζ Vir)",
    type: "Estrela Branca da Sequência Principal",
    magnitude: "3.38",
    distance: "73 anos-luz",
    temperature: "8.250 K",
    x: 380, 
    y: 270, 
    size: 4.5, 
    color: "#E8F0FE", 
    details: "Estrela branca de rotação extremamente rápida — gira a mais de 200 km/s no equador. Possui uma companheira anã vermelha de baixa massa." 
  },
  { 
    id: "syrma", 
    name: "Syrma", 
    bayer: "Iota Virginis (ι Vir)",
    type: "Subgigante Amarela-Branca",
    magnitude: "4.07",
    distance: "70 anos-luz",
    temperature: "6.280 K",
    x: 490, 
    y: 390, 
    size: 4, 
    color: "#F5E6C8", 
    details: "Marca o prolongamento inferior da constelação. Já consumiu o hidrogênio de seu núcleo e está iniciando sua transição para gigante." 
  },
  { 
    id: "chara", 
    name: "Kappa Virginis", 
    bayer: "Kappa Virginis (κ Vir)",
    type: "Gigante Laranja",
    magnitude: "4.18",
    distance: "225 anos-luz",
    temperature: "4.500 K",
    x: 450, 
    y: 410, 
    size: 3.5, 
    color: "#E0ECF8", 
    details: "Estrela gigante rica em metais localizada próxima ao ponto de maior declinação sul da figura de Virgem." 
  },
  { 
    id: "theta", 
    name: "Theta Virginis", 
    bayer: "Theta Virginis (θ Vir)",
    type: "Sistema Binário Branco",
    magnitude: "4.38",
    distance: "415 anos-luz",
    temperature: "9.500 K",
    x: 360, 
    y: 310, 
    size: 4, 
    color: "#E8F0FE", 
    details: "Localizada no centro geométrico entre Porrima e Spica, conecta os principais eixos visuais da constelação." 
  },
];

// Linhas que conectam as estrelas da constelação
const VIRGO_LINES = [
  ["zavijava", "zaniah"],
  ["zaniah", "porrima"],
  ["porrima", "auva"],
  ["auva", "vindemiatrix"],
  ["porrima", "theta"],
  ["theta", "heze"],
  ["theta", "spica"],
  ["spica", "syrma"],
  ["syrma", "chara"],
  ["heze", "spica"],
];

export default function VirgoConstellation() {
  const [selectedStar, setSelectedStar] = useState(VIRGO_STARS[0]); // Spica por padrão
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const revealLines = mapInView || reducedMotion;

  return (
    <section 
      id="constelacao" 
      className="relative z-10 min-h-screen py-28 px-6 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Brilho de fundo cósmico sutil */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(155, 195, 245, 0.3) 0%, rgba(90, 50, 140, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Cabeçalho Astronômico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-celestial-glow/40"></span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-celestial-glow font-mono font-medium">
              Atlas Estelar
            </span>
            <span className="w-8 h-[1px] bg-celestial-glow/40"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-celestial-starlight tracking-tight mb-3">
            Constelação de Virgem
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light max-w-lg mx-auto">
            Mapeamento das principais coordenadas e corpos celestes da constelação de Virgem.
          </p>
        </motion.div>

        {/* Layout Grid: Mapa SVG Interativo + Painel Técnico das Estrelas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          
          {/* Lado Esquerdo: Mapa Estelar SVG */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-center justify-center relative p-6 md:p-8 bg-midnight-900/60 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            {/* Grade de coordenadas celestes sutil ao fundo */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div ref={mapRef} className="w-full relative flex items-center justify-center">
              <svg 
                viewBox="80 70 450 370" 
                className="w-full max-w-[520px] h-auto overflow-visible select-none"
              >
                <defs>
                  <filter id="virgoLineGlow" filterUnits="userSpaceOnUse" x="70" y="60" width="470" height="390" colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="1.6" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="spicaSuperGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* O contêiner HTML dispara o desenho; um traço de base mantém o mapa conectado. */}
                {VIRGO_LINES.map(([fromId, toId], idx) => {
                  const from = VIRGO_STARS.find((s) => s.id === fromId);
                  const to = VIRGO_STARS.find((s) => s.id === toId);
                  if (!from || !to) return null;

                  return (
                    <g key={`line-${idx}`} pointerEvents="none" aria-hidden="true">
                      <line
                        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                        stroke="rgba(155, 195, 245, 0.18)"
                        strokeWidth="0.8"
                        vectorEffect="non-scaling-stroke"
                      />
                      <motion.line
                        className="constellation-line"
                        x1={from.x}
                        y1={from.y}
                        initial={false}
                        animate={{ x2: revealLines ? to.x : from.x, y2: revealLines ? to.y : from.y }}
                        transition={{ duration: reducedMotion ? 0 : 1.2, delay: reducedMotion ? 0 : idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        stroke="rgba(164, 207, 255, 0.75)"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        filter="url(#virgoLineGlow)"
                      />
                    </g>
                  );
                })}

                {/* Estrelas com Hit-Area Estável para evitar flickering de hover */}
                {VIRGO_STARS.map((star) => {
                  const isSelected = selectedStar?.id === star.id;
                  const isSpica = star.id === "spica";

                  return (
                    <g 
                      key={star.id} 
                      className="cursor-pointer select-none"
                      onClick={() => {
                        if (selectedStar?.id !== star.id) setSelectedStar(star);
                      }}
                      onMouseEnter={() => {
                        if (selectedStar?.id !== star.id) setSelectedStar(star);
                      }}
                    >
                      {/* Hit Area Invisível e Ampla (evita oscilação de mouseleave/mouseenter e facilita o toque no celular) */}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r="22"
                        fill="transparent"
                      />

                      {/* Anel indicador na estrela selecionada (sem interceptar eventos de mouse) */}
                      {isSelected && (
                        <motion.circle
                          cx={star.x}
                          cy={star.y}
                          fill="none"
                          stroke={isSpica ? "#9BC5F8" : "#E5C483"}
                          strokeWidth="1.2"
                          className="pointer-events-none"
                          animate={{ 
                            r: [star.size * 2.2, star.size * 3.2, star.size * 2.2], 
                            opacity: [0.8, 0.2, 0.8] 
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      {/* Halo estático para Spica */}
                      {isSpica && (
                        <circle
                          cx={star.x}
                          cy={star.y}
                          r="15"
                          fill="rgba(155, 195, 248, 0.25)"
                          filter="url(#spicaSuperGlow)"
                          className="pointer-events-none"
                        />
                      )}

                      {/* O corpo visível da estrela (sem scale-125 para não deslocar no canvas SVG) */}
                      <circle
                        cx={star.x}
                        cy={star.y}
                        r={isSelected ? star.size + 2 : star.size}
                        fill={star.color}
                        filter="url(#starGlow)"
                        className="pointer-events-none transition-all duration-300"
                      />

                      {/* Nome da estrela no mapa */}
                      <text
                        x={star.x + 10}
                        y={star.y + 4}
                        fill={isSpica ? "#9BC5F8" : isSelected ? "#E5C483" : "rgba(220, 230, 245, 0.6)"}
                        fontSize={isSpica ? "11" : "9"}
                        fontFamily="monospace"
                        letterSpacing="1px"
                        fontWeight={isSpica ? "bold" : "normal"}
                        className="pointer-events-none"
                      >
                        {isSpica ? "★ SPICA" : star.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Rodapé técnico do mapa (sem a frase indesejada) */}
            <div className="mt-6 flex items-center justify-between w-full text-[11px] text-gray-400 font-mono border-t border-white/5 pt-3">
              <span className="text-celestial-gold/80">
                SISTEMA: VIRGO CONSTELLATION
              </span>
              <span>ASCENSÃO: 13h 25m | DECLINAÇÃO: -11°</span>
            </div>
          </motion.div>

          {/* Lado Direito: Ficha Astronômica Pura da Estrela Selecionada */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStar?.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-midnight-900/70 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-9 shadow-2xl relative overflow-hidden"
              >
                {/* Linha de topo azul-celeste */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9BC5F8] to-transparent opacity-60" />

                {/* Identificação Astronômica */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-celestial-gold tracking-widest uppercase">
                    {selectedStar.bayer}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#162540] text-celestial-glow border border-white/10 font-mono">
                    CATÁLOGO ESTELAR
                  </span>
                </div>

                {/* Nome da Estrela */}
                <h3 className="font-serif text-3xl md:text-4xl text-celestial-starlight mb-1">
                  {selectedStar.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono mb-6">
                  {selectedStar.type}
                </p>

                {/* Métricas Científicas da Estrela */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mb-1">Magnitude Visual</p>
                    <p className="font-mono text-sm text-celestial-gold font-medium">{selectedStar.magnitude}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mb-1">Distância</p>
                    <p className="font-mono text-sm text-celestial-starlight font-medium">{selectedStar.distance}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mb-1">Temperatura</p>
                    <p className="font-mono text-sm text-celestial-glow font-medium">{selectedStar.temperature}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono mb-1">Posição</p>
                    <p className="font-mono text-sm text-celestial-starlight font-medium">Virgo Constellation</p>
                  </div>
                </div>

                {/* Descrição Astrofísica */}
                <div className="p-4 rounded-2xl bg-midnight-800/50 border border-white/5">
                  <p className="text-xs uppercase tracking-widest text-celestial-gold font-mono mb-2">
                    Sobre este corpo celeste:
                  </p>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {selectedStar.details}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-[10px] text-gray-500 border-t border-white/5 pt-3 font-mono">
                  <span>SISTEMA: HIPPARCOS ARCHIVE</span>
                  <span>ESPECTRO: {selectedStar.type.split(" ")[0]}</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
