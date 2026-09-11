/**
 * ====================================================================
 * CosmicAgeCalculator.jsx — Odisséia Cósmica dos 19 Anos da Bela
 * ====================================================================
 *
 * Experiência comemorativa dos 19 anos da Isabela (14/09/2007):
 * 1. 🚀 Odisséia em Tempo Real: Odômetro estelar ao vivo (~17.8 bilhões de km),
 *    ciclo de Meton (235 luas) e luz emitida viajando no cosmos.
 * 2. 🪐 Passaporte Interplanetário: Idade relativística, datas de aniversário
 *    e personas astronômicas exclusivas (Capitã Marty, Cratera Isabella).
 * 3. 🦘 Simulador de Salto Gravitacional: Teste interativo de saltos com
 *    física e hangtime reais em cada astro.
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TURNING_AGE, PERSON_NAME } from "../config";
import CosmicMissions from './CosmicMissions';
import { Crosshair } from 'lucide-react';

const BIRTH_TIMESTAMP = new Date("2007-09-14T00:00:00-03:00").getTime();
const ORBIT_SPEED_KMS = 29.7827; // km/s da Terra ao redor do Sol

const PLANETARY_PHYSICS = [
  {
    id: "marte",
    name: "Marte",
    symbol: "♂",
    color: "#E55338",
    yearDays: 686.98,
    gravityRatio: 0.38,
    jumpHeightMeters: 1.32,
    hangtimeSeconds: 1.69,
    titlePersona: "A Capitã Marty de Comex",
    badge: "Comandante da Rota Vermelha",
    comment: "Em Marte (raiz do seu sobrenome 'Marty'), o ano dura quase dois anos da Terra. Com apenas 10 aninhos marcianos, você é a mais jovem comandante de rotas interestelares do Comex!",
  },
  {
    id: "venus",
    name: "Vênus",
    symbol: "♀",
    color: "#E5A952",
    yearDays: 224.7,
    gravityRatio: 0.91,
    jumpHeightMeters: 0.55,
    hangtimeSeconds: 0.67,
    titlePersona: "Soberana da Cratera Isabella",
    badge: "Governante de 175 km de Vênus",
    comment: "Em Vênus, você está no auge dos seus 30 anos e reina com elegância sobre a Cratera Isabella — uma formação de impacto de 175 km batizada oficialmente com o seu nome!",
  },
  {
    id: "lua",
    name: "A Lua",
    symbol: "🌙",
    color: "#DCE5EE",
    yearDays: 365.25,
    gravityRatio: 0.166,
    jumpHeightMeters: 3.01,
    hangtimeSeconds: 3.85,
    titlePersona: "Rainha das Marés & Dançarina Lunar",
    badge: "Guardiã da Noite Eterna",
    comment: "No seu astro favorito, a gravidade é 6 vezes menor que na Terra. Seus pulos ultrapassam 3 metros de altura e duram quase 4 segundos no ar, flutuando como uma pluma!",
  },
  {
    id: "mercurio",
    name: "Mercúrio",
    symbol: "☿",
    color: "#D4AF37",
    yearDays: 87.97,
    gravityRatio: 0.38,
    jumpHeightMeters: 1.32,
    hangtimeSeconds: 1.69,
    titlePersona: "A Sábia Anciã das Estrelas",
    badge: "Mestre dos 78 Ciclos Solares",
    comment: "Mercúrio gira feito um foguete ao redor do Sol a cada 88 dias terrestres! Em tempo mercuriano, você já completou 78 anos cósmicos de pura sabedoria e fogo estelar.",
  },
  {
    id: "terra",
    name: "Terra",
    symbol: "🜨",
    color: "#4BA0E0",
    yearDays: 365.25,
    gravityRatio: 1.0,
    jumpHeightMeters: 0.50,
    hangtimeSeconds: 0.64,
    titlePersona: "19 Anos de Pura Luz",
    badge: "Origem Celestial • 14/09/2007",
    comment: "O ponto azul onde sua história começou. 19 voltas perfeitas pelo Sol espalhando doçura, inteligência e o riso que ilumina qualquer dia escuro.",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    symbol: "♃",
    color: "#D08F56",
    yearDays: 4332.59,
    gravityRatio: 2.53,
    jumpHeightMeters: 0.20,
    hangtimeSeconds: 0.40,
    titlePersona: "A Menina dos Raios Titânicos",
    badge: "Herdeira da Grande Mancha Vermelha",
    comment: "Júpiter leva quase 12 anos da Terra para uma única órbita. Aqui você é apenas uma garotinha de 1 ano e meio aprendendo a caminhar entre tempestades de diamantes.",
  },
  {
    id: "saturno",
    name: "Saturno",
    symbol: "♄",
    color: "#E2CE9F",
    yearDays: 10759.22,
    gravityRatio: 1.06,
    jumpHeightMeters: 0.47,
    hangtimeSeconds: 0.62,
    titlePersona: "A Guardiã dos Anéis de Gelo",
    badge: "Primeiro Alvorecer Saturniano",
    comment: "Saturno leva quase 30 anos terrestres para dar uma volta no Sol. Em tempo saturniano, você ainda nem completou seu primeiro aninho de vida cercada pelos anéis mais belos da galáxia.",
  },
];

export default function CosmicAgeCalculator() {
  const [activeTab, setActiveTab] = useState("missoes");
  const [selectedPlanetId, setSelectedPlanetId] = useState("marte");
  const [customAge, setCustomAge] = useState(TURNING_AGE);
  const [showCustomAge, setShowCustomAge] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [currentKm, setCurrentKm] = useState(() => {
    const elapsedSec = (Date.now() - BIRTH_TIMESTAMP) / 1000;
    return Math.floor(elapsedSec * ORBIT_SPEED_KMS);
  });

  // Ticker de quilometragem cósmica em tempo real (atualiza a cada 100ms)
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedSec = (Date.now() - BIRTH_TIMESTAMP) / 1000;
      setCurrentKm(Math.floor(elapsedSec * ORBIT_SPEED_KMS));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Astro ativo
  const planet = useMemo(() => {
    return PLANETARY_PHYSICS.find((p) => p.id === selectedPlanetId) || PLANETARY_PHYSICS[0];
  }, [selectedPlanetId]);

  // Cálculos cósmicos da idade
  const { ageValue, ageUnit, nextBirthdayText } = useMemo(() => {
    const age = Number(customAge) || 19;
    const planetaryYears = (age * 365.25) / planet.yearDays;
    
    // Próximo aniversário
    const nextEarthYears = (Math.floor(planetaryYears) + 1) * (planet.yearDays / 365.25);
    const yearsRemaining = (nextEarthYears - age).toFixed(1);

    if (planetaryYears >= 10) {
      return {
        ageValue: planetaryYears.toFixed(1),
        ageUnit: "anos cósmicos",
        nextBirthdayText: `Próxima celebração em ${planet.name}: em ~${yearsRemaining} anos terrestres`,
      };
    } else if (planetaryYears >= 1) {
      return {
        ageValue: planetaryYears.toFixed(2),
        ageUnit: "anos cósmicos",
        nextBirthdayText: `Próxima celebração em ${planet.name}: em ~${yearsRemaining} anos terrestres`,
      };
    } else {
      const months = (planetaryYears * 12).toFixed(1);
      return {
        ageValue: planetaryYears.toFixed(2),
        ageUnit: `anos cósmicos (~${months} meses)`,
        nextBirthdayText: `Primeiro aniversário em ${planet.name} quando você tiver ~${nextEarthYears.toFixed(0)} anos terrestres`,
      };
    }
  }, [customAge, planet]);

  // Dispara animação de salto
  const handleTriggerJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, (planet.hangtimeSeconds * 1000) + 200);
  };

  // Estatísticas calculadas desde o nascimento
  const totalDays = Math.floor((Date.now() - BIRTH_TIMESTAMP) / (1000 * 60 * 60 * 24));
  const metonLunas = 235; // 19 anos solares = exatamente 235 lunações (Ciclo de Meton clássico)
  const lightYears = 19;
  const estimatedHeartbeats = (totalDays * 24 * 60 * 75).toLocaleString("pt-BR");

  return (
    <section id="calculadora-cosmica" className="relative z-10 py-24 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center bg-transparent">
      
      {/* Luz e brilho de fundo dinâmico */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] max-w-full h-[550px] rounded-full pointer-events-none opacity-20 blur-[140px] transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${planet.color} 0%, rgba(229,196,131,0.1) 40%, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        
        {/* ─── Cabeçalho Elegante ─── */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-10 h-[1px] bg-celestial-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-celestial-gold font-mono">
              Homenagem de 19 Anos • 14/09/2007
            </span>
            <span className="w-10 h-[1px] bg-celestial-gold/40" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-celestial-starlight tracking-tight mb-3">
            Odisséia Cósmica da Bela
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
            Uma expedição pelos 19 anos de luz que a Bela espalhou pela galáxia: velocidade real, passaporte interplanetário e física gravitacional.
          </p>
        </div>

        {/* ─── Navegação por Abas Estilizadas ─── */}
        <div className="cosmic-tabs segmented" role="group" aria-label="Atividades cósmicas">
          <button aria-pressed={activeTab === 'missoes'} onClick={() => setActiveTab('missoes')}><Crosshair size={18} aria-hidden="true" />Missões</button>
          <button
            onClick={() => setActiveTab("odisseia")}
            aria-pressed={activeTab === 'odisseia'}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "odisseia"
                ? "bg-celestial-gold text-midnight-950 font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🚀</span>
            <span>Jornada Real</span>
          </button>

          <button
            onClick={() => setActiveTab("passaporte")}
            aria-pressed={activeTab === 'passaporte'}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "passaporte"
                ? "bg-celestial-gold text-midnight-950 font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🪐</span>
            <span>Passaporte Galáctico</span>
          </button>

          <button
            onClick={() => setActiveTab("salto")}
            aria-pressed={activeTab === 'salto'}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "salto"
                ? "bg-celestial-gold text-midnight-950 font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🦘</span>
            <span>Simulador de Salto</span>
          </button>
        </div>

        {activeTab === 'missoes' && <CosmicMissions />}

        {/* ─── Conteúdo da Aba 1: Jornada Real dos 19 Anos ─── */}
        {activeTab === "odisseia" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col gap-6"
          >
            {/* O Grande Odômetro Estelar ao Vivo */}
            <div className="w-full rounded-3xl bg-midnight-900/80 border border-celestial-gold/25 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden text-center">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-celestial-gold/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-celestial-gold/10 border border-celestial-gold/30 text-[11px] font-mono text-celestial-gold mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Odômetro Cósmico em Tempo Real • 29,78 km/s
              </div>

              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-mono mb-2">
                Distância percorrida pelo espaço desde 14/09/2007:
              </h3>

              {/* Número que pula ao vivo com o tempo */}
              <div className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-celestial-starlight to-celestial-gold my-2 select-text">
                {currentKm.toLocaleString("pt-BR")} <span className="text-lg sm:text-2xl text-celestial-gold/80 font-sans font-normal">km</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto mt-3 leading-relaxed">
                Neste exato segundo, a Terra viaja a mais de <strong>107.000 km/h</strong> ao redor do Sol. Em 19 anos de vida, a Bela já cruzou quase <strong>18 bilhões de quilômetros</strong> no cosmos!
              </p>
            </div>

            {/* 4 Grandes Marcos Astronômicos de 19 Anos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Voltas ao Sol */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-2 block">☀️</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-celestial-gold">Órbitas Terrestres</p>
                  <p className="font-serif text-3xl text-white my-1 font-light">{TURNING_AGE} voltas</p>
                </div>
                <p className="text-xs text-gray-400 font-light mt-2">
                  Exatamente {totalDays.toLocaleString("pt-BR")} dias de sol e vida completados no planeta Terra.
                </p>
              </div>

              {/* Card 2: Ciclo de Meton (A Lua da Bela) */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-2 block">🌙</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-celestial-gold">Ciclo Lunar de Meton</p>
                  <p className="font-serif text-3xl text-white my-1 font-light">{metonLunas} Luas</p>
                </div>
                <p className="text-xs text-gray-400 font-light mt-2">
                  Aos 19 anos ocorre o lendário Ciclo de Meton: a Lua retorna à exata mesma fase do dia que você nasceu!
                </p>
              </div>

              {/* Card 3: Anos-Luz no Vácuo */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-2 block">✨</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-celestial-gold">Ondas de Luz Emitidas</p>
                  <p className="font-serif text-3xl text-white my-1 font-light">{lightYears} Anos-Luz</p>
                </div>
                <p className="text-xs text-gray-400 font-light mt-2">
                  A luz do seu nascimento já viajou ~180 trilhões de km, ultrapassando estrelas como Vega e Sirius.
                </p>
              </div>

              {/* Card 4: Pulsares & Batimentos */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-2 block">💓</span>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-celestial-gold">Pulsar Cósmico</p>
                  <p className="font-serif text-3xl text-white my-1 font-light">~750 Milhões</p>
                </div>
                <p className="text-xs text-gray-400 font-light mt-2">
                  Batimentos do coração sincronizados com o ritmo e as marés do universo.
                </p>
              </div>

            </div>
          </motion.div>
        )}

        {/* ─── Conteúdo da Aba 2: Passaporte Galáctico da Bela ─── */}
        {activeTab === "passaporte" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Seletor Rápido de Astros */}
            <div className="w-full flex items-center justify-center gap-2 flex-wrap">
              {PLANETARY_PHYSICS.map((item) => {
                const isSelected = item.id === selectedPlanetId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPlanetId(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? "bg-white/10 text-white border-celestial-gold shadow-[0_0_20px_rgba(229,196,131,0.3)] scale-105 font-medium"
                        : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    <span style={{ color: item.color }}>{item.symbol}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Estilo Passaporte Cósmico Luxuoso */}
            <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
              
              {/* Faixa colorida do astro */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500"
                style={{ backgroundColor: planet.color }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Lado Esquerdo: Selo de Visto Espacial & Idade */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative">
                  
                  {/* Carimbo de Visto Estelar */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-celestial-gold/60 uppercase tracking-widest border border-celestial-gold/30 px-2 py-0.5 rounded-md -rotate-6">
                    VISTO AUTORIZADO
                  </div>

                  <span className="text-5xl my-2" style={{ color: planet.color }}>
                    {planet.symbol}
                  </span>
                  
                  <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
                    Idade da Bela em {planet.name}
                  </p>

                  <div 
                    className="font-serif text-5xl sm:text-6xl font-light tracking-tight my-1 transition-colors duration-300"
                    style={{ color: planet.color }}
                  >
                    {ageValue}
                  </div>

                  <p className="text-xs font-mono text-gray-300">
                    {ageUnit}
                  </p>

                  <div className="mt-4 px-3 py-1.5 rounded-xl bg-celestial-gold/10 border border-celestial-gold/30 text-[11px] font-mono text-celestial-gold">
                    {planet.badge}
                  </div>
                </div>

                {/* Lado Direito: Persona, Curiosidade & Próximo Niver */}
                <div className="md:col-span-7 flex flex-col justify-between gap-4">
                  
                  {/* Título da Persona */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-celestial-gold">
                      ✦ Título Honorário:
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                      {planet.titlePersona}
                    </h4>
                  </div>

                  {/* Relato poético & pessoal */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                      "{planet.comment}"
                    </p>
                  </div>

                  {/* Próximo Aniversário Planetário */}
                  <div className="p-3.5 rounded-xl bg-celestial-gold/[0.07] border border-celestial-gold/25 flex items-center gap-3">
                    <span className="text-xl">🎂</span>
                    <div>
                      <p className="text-[10px] uppercase font-mono text-celestial-gold tracking-wider">
                        Calendário Solar de {planet.name}
                      </p>
                      <p className="text-xs text-white font-medium mt-0.5">
                        {nextBirthdayText}
                      </p>
                    </div>
                  </div>

                  {/* Controle opcional de idade */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setShowCustomAge(!showCustomAge)}
                      className="text-xs font-mono text-gray-400 hover:text-celestial-gold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>⚙</span>
                      <span>{showCustomAge ? "Ocultar Ajuste de Idade" : "Simular com outra idade (além de 19)"}</span>
                    </button>

                    {showCustomAge && (
                      <span className="text-xs font-mono text-celestial-gold">
                        {customAge} anos na Terra
                      </span>
                    )}
                  </div>

                  {showCustomAge && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex flex-col gap-2 pt-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400">Ajuste Livre:</span>
                        <button
                          onClick={() => setCustomAge(TURNING_AGE)}
                          className="text-[10px] text-celestial-gold underline cursor-pointer"
                        >
                          Restaurar 19 Anos da Bela
                        </button>
                      </div>
                      <input
                        type="range"
                        aria-label="Idade na Terra"
                        min="1"
                        max="100"
                        value={customAge}
                        onChange={(e) => setCustomAge(Number(e.target.value))}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-celestial-gold"
                      />
                    </motion.div>
                  )}

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ─── Conteúdo da Aba 3: Simulador de Salto Gravitacional ─── */}
        {activeTab === "salto" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Seletor rápido de planetas para testar gravidade */}
            <div className="w-full flex items-center justify-center gap-2 flex-wrap">
              {PLANETARY_PHYSICS.map((item) => {
                const isSelected = item.id === selectedPlanetId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPlanetId(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? "bg-white/10 text-white border-celestial-gold shadow-[0_0_20px_rgba(229,196,131,0.3)] scale-105 font-medium"
                        : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    <span style={{ color: item.color }}>{item.symbol}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Arena de Salto Interativa */}
            <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col items-center">
              
              <div className="text-center mb-6">
                <span className="text-xs font-mono text-celestial-gold uppercase tracking-widest">
                  Laboratório Gravitacional da Bela
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  Seu Salto em {planet.name}
                </h3>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Baseado no salto humano terrestre médio de 50 cm. Veja a diferença astronômica!
                </p>
              </div>

              {/* Palco Visual do Salto */}
              <div className="w-full max-w-lg h-64 bg-midnight-950/70 border border-white/10 rounded-2xl relative flex flex-col justify-end items-center p-4 overflow-hidden">
                
                {/* Linhas de altitude de referência */}
                <div className="absolute top-6 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-white/5 pb-1">
                  <span>3.0 metros (Recorde Lunar)</span>
                  <span className="text-celestial-gold/50">🌙</span>
                </div>
                <div className="absolute top-1/2 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-white/5 pb-1">
                  <span>1.3 metros (Marte)</span>
                  <span className="text-red-400/50">♂</span>
                </div>
                <div className="absolute bottom-16 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-white/5 pb-1">
                  <span>0.50 metros (Terra Padrão)</span>
                  <span className="text-blue-400/50">🜨</span>
                </div>

                {/* Astronauta / Avatar Cósmico saltando */}
                <motion.div
                  animate={
                    isJumping
                      ? {
                          y: [0, -Math.min(180, planet.jumpHeightMeters * 58), 0],
                          scale: [1, 1.15, 1],
                        }
                      : { y: 0, scale: 1 }
                  }
                  transition={
                    isJumping
                      ? {
                          duration: planet.hangtimeSeconds,
                          ease: "easeInOut",
                          times: [0, 0.5, 1],
                        }
                      : { duration: 0.3 }
                  }
                  className="flex flex-col items-center z-10"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-white/30"
                    style={{ backgroundColor: planet.color }}
                  >
                    {planet.symbol}
                  </div>
                  <span className="text-[10px] font-mono text-celestial-gold mt-1 bg-midnight-950/80 px-2 py-0.5 rounded-full border border-celestial-gold/30">
                    Bela ({planet.jumpHeightMeters}m)
                  </span>
                </motion.div>

                {/* Chão do Planeta */}
                <div 
                  className="w-full h-4 rounded-b-xl mt-2 transition-colors duration-500 flex items-center justify-center text-[9px] font-mono uppercase tracking-widest text-white/70"
                  style={{ backgroundColor: `${planet.color}40`, borderTop: `2px solid ${planet.color}` }}
                >
                  Solo de {planet.name}
                </div>
              </div>

              {/* Botão de Ação: Testar Salto */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleTriggerJump}
                  disabled={isJumping}
                  className="px-8 py-3 rounded-full bg-celestial-gold text-midnight-950 font-mono font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(229,196,131,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span>{isJumping ? "Flutuando no Vácuo..." : "Testar Salto da Bela"}</span>
                  <span className="text-base">🦘</span>
                </button>
              </div>

              {/* Métricas Físicas do Salto */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg mt-6 text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[9px] uppercase font-mono text-gray-400">Gravidade</p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {(planet.gravityRatio * 100).toFixed(0)}% da Terra
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[9px] uppercase font-mono text-gray-400">Altura do Salto</p>
                  <p className="text-sm font-semibold text-celestial-gold mt-0.5">
                    {planet.jumpHeightMeters.toFixed(2)} metros
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-[9px] uppercase font-mono text-gray-400">Tempo no Ar</p>
                  <p className="text-sm font-semibold text-celestial-starlight mt-0.5">
                    {planet.hangtimeSeconds}s
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}



