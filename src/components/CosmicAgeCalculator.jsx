/**
 * ====================================================================
 * CosmicAgeCalculator.jsx — Calculadora Cósmica & Relatividade da Bela
 * ====================================================================
 *
 * 100% Reativo, sem travamentos (Zero-Lag & Zero-Freeze):
 * - Atualização síncrona instantânea (removido AnimatePresence mode="wait" que congelava)
 * - Atualizações funcionais seguras de estado (setBaseAge(prev => ...))
 * - Slider e botões com limites seguros (1 a 120 anos)
 * - Precisão matemática adaptativa (anos e meses cósmicos para planetas lentos)
 * - Física dinâmica de salto gravitacional proporcional
 */

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const PLANETARY_PHYSICS = [
  {
    id: "mercurio",
    name: "Mercúrio",
    symbol: "☿",
    color: "#D4AF37",
    yearDays: 87.97,
    gravityRatio: 0.38,
    titlePersona: "A Sábia Anciã Cósmica",
    comment: "Em Mercúrio os anos voam em torno do Sol! Com suas voltas na Terra, você já é uma anciã venerada e experiente no cosmos.",
  },
  {
    id: "venus",
    name: "Vênus",
    symbol: "♀",
    color: "#E5A952",
    yearDays: 224.7,
    gravityRatio: 0.91,
    titlePersona: "No Auge dos 30 Anos • Cratera Isabella",
    comment: "Em Vênus você está na sua melhor fase de maturidade, administrando com elegância a Cratera Isabella de 175 km de diâmetro.",
  },
  {
    id: "terra",
    name: "Terra",
    symbol: "🜨",
    color: "#4BA0E0",
    yearDays: 365.25,
    gravityRatio: 1.0,
    titlePersona: "19 Anos Radiantes",
    comment: "Completados com perfeição desde 14/09/2007. O planeta onde sua luz começou a iluminar todos ao seu redor.",
  },
  {
    id: "lua",
    name: "A Lua",
    symbol: "🌙",
    color: "#DCE5EE",
    yearDays: 365.25,
    gravityRatio: 0.166,
    titlePersona: "A Rainha das Marés",
    comment: "No seu astro favorito, a gravidade levíssima permite que você dê pulos de mais de 3 metros de altura, flutuando como pluma.",
  },
  {
    id: "marte",
    name: "Marte",
    symbol: "♂",
    color: "#E55338",
    yearDays: 686.98,
    gravityRatio: 0.38,
    titlePersona: "A Capitã Marty de Comex",
    comment: "Em Marte (raiz de 'Marty'), o ano dura quase o dobro. Você tem toda a juventude e vigor para comandar rotas comerciais interplanetárias!",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    symbol: "♃",
    color: "#D08F56",
    yearDays: 4332.59,
    gravityRatio: 2.53,
    titlePersona: "Uma Bebê Titânica",
    comment: "O ano de Júpiter dura quase 12 anos terrestres! Aqui você acabou de dar os primeiros passos nas tempestades colossais de hidrogênio.",
  },
  {
    id: "saturno",
    name: "Saturno",
    symbol: "♄",
    color: "#E2CE9F",
    yearDays: 10759.22,
    gravityRatio: 1.06,
    titlePersona: "Menos de 1 aninho dos Anéis",
    comment: "Saturno leva quase 30 anos terrestres para dar uma volta no Sol. Você ainda está no berço cósmico cercado por anéis de gelo e diamante.",
  },
  {
    id: "urano",
    name: "Urano",
    symbol: "⛢",
    color: "#74C6CF",
    yearDays: 30685.4,
    gravityRatio: 0.89,
    titlePersona: "Um Recém-Nascido Cósmico",
    comment: "O ano de Urano dura 84 anos da Terra. Em tempo uraniano, você tem poucos meses de vida e dorme sob anéis azuis verticais.",
  },
  {
    id: "netuno",
    name: "Netuno",
    symbol: "♆",
    color: "#3C6ECC",
    yearDays: 60189.0,
    gravityRatio: 1.14,
    titlePersona: "A Herdeira dos Ventos Supersônicos",
    comment: "Netuno leva 165 anos terrestres para uma única órbita. Você em Netuno é um milagre que acabou de nascer sob ventos de 2.100 km/h.",
  },
];

export default function CosmicAgeCalculator() {
  const [baseAge, setBaseAge] = useState(19);
  const [selectedPlanetId, setSelectedPlanetId] = useState("marte");

  // Astro ativo com fallback seguro
  const planet = useMemo(() => {
    return PLANETARY_PHYSICS.find((p) => p.id === selectedPlanetId) || PLANETARY_PHYSICS[4];
  }, [selectedPlanetId]);

  // Cálculo síncrono e instantâneo da idade cósmica
  const { ageValue, ageUnit, ageDetail } = useMemo(() => {
    const validAge = Number(baseAge) || 19;
    const rawCosmicYears = (validAge * 365.25) / planet.yearDays;

    if (rawCosmicYears >= 10) {
      return {
        ageValue: rawCosmicYears.toFixed(1),
        ageUnit: "anos cósmicos",
        ageDetail: `${Math.floor(rawCosmicYears)} voltas completas no Sol`,
      };
    } else if (rawCosmicYears >= 1) {
      return {
        ageValue: rawCosmicYears.toFixed(1),
        ageUnit: "anos cósmicos",
        ageDetail: `${(rawCosmicYears * 12).toFixed(0)} meses planetários`,
      };
    } else {
      // Para planetas distantes (Júpiter a Netuno com menos de 1 ano)
      const months = (rawCosmicYears * 12).toFixed(1);
      return {
        ageValue: rawCosmicYears.toFixed(2),
        ageUnit: "anos cósmicos",
        ageDetail: `Equivalente a ${months} meses planetários`,
      };
    }
  }, [baseAge, planet.yearDays]);

  // Cálculo de salto gravitacional proporcional
  const jumpInfo = useMemo(() => {
    const baseJumpCm = 50; // Salto padrão na Terra
    const jumpCm = Math.round(baseJumpCm / planet.gravityRatio);

    if (jumpCm >= 100) {
      const meters = (jumpCm / 100).toFixed(1);
      const times = (jumpCm / 50).toFixed(1);
      return `${meters}m de altura (${times}x o salto da Terra!)`;
    }
    return `${jumpCm} cm (${planet.gravityRatio > 1 ? "Gravidade pesada" : "Salto ágil"})`;
  }, [planet.gravityRatio]);

  // Handlers seguros com atualização funcional (evita stale closure e congelamento)
  const handleDecrement = () => {
    setBaseAge((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setBaseAge((prev) => Math.min(120, prev + 1));
  };

  const handleReset = () => {
    setBaseAge(19);
  };

  return (
    <section id="calculadora-cosmica" className="relative z-10 py-20 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center bg-transparent select-none">
      
      {/* Brilho atmosférico do planeta selecionado */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] max-w-full sm:w-[600px] h-[450px] sm:h-[600px] rounded-full pointer-events-none opacity-15 blur-[130px] transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${planet.color} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        
        {/* ── Cabeçalho Clean ── */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-celestial-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-celestial-gold font-mono">
              Física & Relatividade Cósmica
            </span>
            <span className="w-8 h-[1px] bg-celestial-gold/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-celestial-starlight tracking-tight mb-2">
            Calculadora Cósmica da Bela
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto">
            Escolha o planeta e ajuste a idade para ver a relatividade temporal e o salto gravitacional em tempo real.
          </p>
        </div>

        {/* ── Seletor Rápido de Astros ── */}
        <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-8">
          {PLANETARY_PHYSICS.map((item) => {
            const isSelected = item.id === selectedPlanetId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPlanetId(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-white/10 text-white border-celestial-gold shadow-[0_0_15px_rgba(229,196,131,0.25)] scale-105 font-medium"
                    : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.07]"
                }`}
              >
                <span style={{ color: item.color }}>{item.symbol}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── Card Principal de Vidro Escuro ── */}
        <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          {/* Filete superior com a cor do planeta */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500"
            style={{ backgroundColor: planet.color }}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Lado Esquerdo: O Número da Idade (Zero Freeze, Atualização Instantânea) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-4xl mb-2" style={{ color: planet.color }}>
                {planet.symbol}
              </span>
              
              <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400 mb-1">
                Sua Idade em {planet.name}
              </p>

              {/* Renderização Direta e Síncrona — Imune a congelamentos */}
              <div 
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-tight my-1 transition-colors duration-300"
                style={{ color: planet.color }}
              >
                {ageValue}
              </div>

              <p className="text-xs font-mono text-gray-300">
                {ageUnit}
              </p>

              <span className="text-[10px] font-mono text-gray-500 mt-1">
                {ageDetail}
              </span>

              <span className="mt-4 text-[11px] font-mono text-celestial-gold bg-celestial-gold/10 px-3 py-1 rounded-full border border-celestial-gold/30">
                {planet.titlePersona}
              </span>
            </div>

            {/* Lado Direito: Física do Salto & Curiosidade Pessoal */}
            <div className="md:col-span-7 flex flex-col justify-between gap-5">
              
              {/* Comentário personalizado */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-celestial-gold mb-1.5 flex items-center gap-1.5">
                  <span>✦</span> Relatividade da Bebela:
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                  "{planet.comment}"
                </p>
              </div>

              {/* Estatísticas Físicas (Salto e Gravidade) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <p className="text-[10px] uppercase font-mono text-gray-400">Gravidade Relativa</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {(planet.gravityRatio * 100).toFixed(0)}% da Terra
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <p className="text-[10px] uppercase font-mono text-gray-400">Seu Salto Lá</p>
                  <p className="text-sm font-semibold text-celestial-gold mt-0.5">
                    {jumpInfo}
                  </p>
                </div>
              </div>

              {/* ── Controle de Idade com Slider & Botões Ultra Responsivos ── */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-3">
                
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">
                    Idade Base na Terra: <strong className="text-white text-sm font-serif ml-1">{baseAge} anos</strong>
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleDecrement}
                      disabled={baseAge <= 1}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-sm cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Diminuir idade"
                    >
                      −
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-2.5 py-1 rounded-full bg-celestial-gold/15 hover:bg-celestial-gold/25 border border-celestial-gold/40 text-celestial-gold text-[10px] font-mono cursor-pointer active:scale-95 transition-all"
                      title="Voltar para os 19 anos da Bela"
                    >
                      19 Anos (Bela)
                    </button>

                    <button
                      onClick={handleIncrement}
                      disabled={baseAge >= 120}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 flex items-center justify-center text-white text-sm cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Aumentar idade"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Slider de toque suave para deslizar a idade em tempo real */}
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={baseAge}
                  onChange={(e) => setBaseAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-celestial-gold"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


