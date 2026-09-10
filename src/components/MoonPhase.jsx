/**
 * ============================================
 * MoonPhase — Observatório da Lua (Dinâmico)
 * ============================================
 *
 * Calcula a fase da Lua de forma astronômica real
 * tanto para o nascimento da Isabela (14/09/2007)
 * quanto para o dia de HOJE, exibindo a data exata.
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Função para calcular matematicamente a fase lunar exata
function calculateLunarData(targetDate) {
  const d = new Date(targetDate);
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const synodicMonth = 29.53058867;
  const diffDays = (d.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const rawPhase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const phaseNormalized = rawPhase / synodicMonth; // de 0 a 1
  const ageDays = rawPhase.toFixed(1);
  const illuminationPercent = Math.round(((1 - Math.cos(phaseNormalized * 2 * Math.PI)) / 2) * 100);

  let phaseName = "";
  let visualStyle = {};
  let glowColor = "rgba(229, 196, 131, 0.35)";

  if (phaseNormalized < 0.03 || phaseNormalized >= 0.97) {
    phaseName = "Lua Nova (New Moon)";
    visualStyle = {
      boxShadow: "inset 0 0 25px 8px rgba(0, 0, 0, 0.95), 0 0 15px rgba(255, 255, 255, 0.1)",
    };
    glowColor = "rgba(120, 167, 217, 0.2)";
  } else if (phaseNormalized < 0.22) {
    phaseName = "Lua Crescente (Waxing Crescent)";
    visualStyle = {
      boxShadow: "inset -26px 0px 28px 2px rgba(250, 235, 205, 0.95), inset -8px 0px 14px rgba(255, 255, 255, 1)",
      filter: "drop-shadow(0 0 20px rgba(229,196,131,0.65))",
    };
    glowColor = "rgba(229, 196, 131, 0.5)";
  } else if (phaseNormalized < 0.28) {
    phaseName = "Quarto Crescente (First Quarter)";
    visualStyle = {
      boxShadow: "inset -65px 0px 45px 5px rgba(240, 230, 210, 0.95)",
      filter: "drop-shadow(0 0 22px rgba(220,200,160,0.5))",
    };
    glowColor = "rgba(220, 200, 160, 0.4)";
  } else if (phaseNormalized < 0.47) {
    phaseName = "Lua Gibosa Crescente (Waxing Gibbous)";
    visualStyle = {
      boxShadow: "inset -110px 0px 60px 8px rgba(255, 245, 225, 0.95)",
      filter: "drop-shadow(0 0 28px rgba(255,235,180,0.6))",
    };
    glowColor = "rgba(255, 235, 180, 0.5)";
  } else if (phaseNormalized < 0.53) {
    phaseName = "Lua Cheia (Full Moon)";
    visualStyle = {
      boxShadow: "inset 0 0 45px rgba(255, 255, 255, 0.9), 0 0 35px rgba(245, 230, 200, 0.8)",
      filter: "drop-shadow(0 0 35px rgba(245,230,200,0.85))",
    };
    glowColor = "rgba(245, 230, 200, 0.7)";
  } else if (phaseNormalized < 0.72) {
    phaseName = "Lua Gibosa Minguante (Waning Gibbous)";
    visualStyle = {
      boxShadow: "inset 110px 0px 60px 8px rgba(220, 235, 255, 0.95)",
      filter: "drop-shadow(0 0 28px rgba(160,200,245,0.6))",
    };
    glowColor = "rgba(160, 200, 245, 0.45)";
  } else if (phaseNormalized < 0.78) {
    phaseName = "Quarto Minguante (Last Quarter)";
    visualStyle = {
      boxShadow: "inset 65px 0px 45px 5px rgba(210, 230, 255, 0.95)",
      filter: "drop-shadow(0 0 22px rgba(140,190,240,0.5))",
    };
    glowColor = "rgba(140, 190, 240, 0.4)";
  } else {
    phaseName = "Lua Minguante (Waning Crescent)";
    visualStyle = {
      boxShadow: "inset 26px 0px 28px 2px rgba(210, 230, 255, 0.95), inset 8px 0px 14px rgba(255, 255, 255, 1)",
      filter: "drop-shadow(0 0 20px rgba(130,185,245,0.65))",
    };
    glowColor = "rgba(130, 185, 245, 0.45)";
  }

  // Constelação lunar aproximada
  const zodiacList = [
    "Áries ♈", "Touro ♉", "Gêmeos ♊", "Câncer ♋", 
    "Leão ♌", "Virgem ♍", "Libra ♎", "Escorpião ♏", 
    "Sagitário ♐", "Capricórnio ♑", "Aquário ♒", "Peixes ♓"
  ];
  const eclipticLongitude = Math.floor(((diffDays * 13.176) % 360 + 360) % 360);
  const constellation = zodiacList[Math.floor(eclipticLongitude / 30)] || "Virgem ♍";

  return {
    phaseName,
    ageDays,
    illuminationPercent,
    constellation,
    visualStyle,
    glowColor,
  };
}

export default function MoonPhase() {
  const [activeMode, setActiveMode] = useState("birth");

  // Data de hoje calculada dinamicamente
  const todayDate = useMemo(() => new Date(), []);

  // Formatação em português
  const formattedToday = useMemo(() => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const str = todayDate.toLocaleDateString('pt-BR', options);
    // Capitaliza primeira letra
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, [todayDate]);

  // Cálculos dinâmicos para nascimento e hoje
  const birthData = useMemo(() => calculateLunarData("2007-09-14T00:00:00Z"), []);
  const todayData = useMemo(() => calculateLunarData(todayDate), [todayDate]);

  const activeData = activeMode === "birth" ? {
    ...birthData,
    dateTitle: "14 de Setembro de 2007",
    weekday: "Sexta-feira",
    subHeader: "A noite exata em que você chegou ao mundo",
    badge: "14.09.2007 • LUA DO NASCIMENTO",
    quote: "Na noite em que você nasceu, a Lua se recolhia em um fino e delicado arco de prata. Quase sutil, como se soubesse que a verdadeira luz daquela noite acabava de nascer na Terra.",
  } : {
    ...todayData,
    dateTitle: `Hoje, ${todayDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    weekday: formattedToday.split(',')[0],
    subHeader: "O céu que ilumina você neste exato momento",
    badge: `OBSERVAÇÃO ATUAL • ${todayDate.toLocaleDateString('pt-BR')}`,
    quote: "Não importa a fase em que a Lua esteja no céu esta noite: sob qualquer ângulo do cosmos, você continua sendo o espetáculo mais bonito e inspirador de todo o universo.",
  };

  return (
    <section 
      id="lua" 
      className="relative z-10 min-h-screen py-28 px-6 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Luz ambiente da Lua reagindo dinamicamente à fase */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full pointer-events-none opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activeData.glowColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        
        {/* Cabeçalho Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-celestial-gold/40"></span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-celestial-gold font-mono font-medium">
              Observatório Astronômico
            </span>
            <span className="w-8 h-[1px] bg-celestial-gold/40"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-celestial-starlight tracking-tight mb-3">
            O Astro Favorito da Bebela
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light max-w-lg mx-auto">
            Acompanhe em tempo real a dança da Lua pelo cosmos e a memória de onde tudo começou.
          </p>
        </motion.div>

        {/* Seletor Interativo: Nascimento vs Hoje (Otimizado para Mobile e Desktop) */}
        <div className="w-full max-w-sm sm:max-w-none sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-2xl sm:rounded-full bg-midnight-900/80 border border-white/10 backdrop-blur-xl mb-12 sm:mb-14 shadow-2xl gap-1.5 sm:gap-0">
          <button
            onClick={() => setActiveMode("birth")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
              activeMode === "birth"
                ? "bg-gradient-to-r from-[#162540] to-[#1E3255] text-celestial-gold shadow-lg shadow-black/50 border border-celestial-gold/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>🌙</span> 14 de Setembro de 2007
          </button>
          
          <button
            onClick={() => setActiveMode("today")}
            className={`px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
              activeMode === "today"
                ? "bg-gradient-to-r from-[#162540] to-[#1E3255] text-celestial-glow shadow-lg shadow-black/50 border border-celestial-glow/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>✨</span> A Lua Hoje ({todayDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})
          </button>
        </div>

        {/* Grid Principal: Esfera Lunar Realística + Painel de Dados */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Lado Esquerdo: A Lua com Textura e Iluminação Real */}
          <motion.div 
            className="lg:col-span-6 flex flex-col items-center justify-center relative py-4 sm:py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Anéis orbitais decorativos */}
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full border border-white/[0.07] pointer-events-none animate-spin-slow" />
            <div className="absolute w-72 h-72 sm:w-84 sm:h-84 md:w-[430px] md:h-[430px] rounded-full border border-dashed border-white/[0.04] pointer-events-none" />

            {/* A Esfera Lunar com Astrofotografia Real Telescópica */}
            <motion.div 
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center select-none group"
            >
              
              {/* Brilho da borda da Lua */}
              <div 
                className="absolute -inset-4 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeData.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Globo com a Foto Real da Lua */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 shadow-[0_0_35px_rgba(0,0,0,0.95)] bg-black">
                {activeMode === "birth" ? (
                  /* ── Foto Real da Lua de 14/09/2007 ── */
                  <motion.img
                    key="moon-2007-real"
                    src="/moon_2007.jpg"
                    alt="A Lua em 14 de Setembro de 2007"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                ) : (
                  /* ── Foto Real da Lua com Sombreamento Dinâmico para Hoje ── */
                  <div className="relative w-full h-full">
                    <motion.img
                      key="moon-today-real"
                      src="/moon_full.jpg"
                      alt="A Lua Hoje"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    {/* Sombra dinâmica astronômica para a fase atual */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700"
                      style={activeData.visualStyle}
                    />
                  </div>
                )}
              </div>

              {/* Badge de Data comemorativa no pé da Lua */}
              <div className="absolute -bottom-8 px-5 py-1.5 rounded-full bg-midnight-900/90 border border-white/10 text-[11px] font-mono text-celestial-gold tracking-widest backdrop-blur-md shadow-lg">
                {activeData.badge}
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Dados Detalhados com a Data Exata */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-midnight-900/70 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Linha de topo com gradiente */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-celestial-gold to-transparent opacity-60" />

                {/* Sub-header */}
                <span className="text-[11px] uppercase tracking-[0.3em] text-celestial-glow/80 font-mono">
                  {activeData.subHeader}
                </span>

                {/* Data Principal em Destaque */}
                <div className="mt-2 mb-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-celestial-starlight tracking-tight">
                    {activeData.dateTitle}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-celestial-gold mt-1 font-mono">
                    {activeData.weekday}
                  </p>
                </div>

                {/* Métricas Celestiais em Grade */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-mono">Fase Lunar</p>
                    <p className="font-serif text-sm md:text-base text-celestial-gold font-medium">{activeData.phaseName}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-mono">Iluminação</p>
                    <p className="font-serif text-sm md:text-base text-celestial-starlight font-medium">{activeData.illuminationPercent}% visível</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-mono">Ciclo Lunar</p>
                    <p className="font-serif text-sm md:text-base text-celestial-starlight font-medium">{activeData.ageDays} dias</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-midnight-800/70 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-mono">Constelação</p>
                    <p className="font-serif text-sm md:text-base text-celestial-glow font-medium">{activeData.constellation}</p>
                  </div>
                </div>

                {/* Poesia da Lua */}
                <div className="border-l-2 border-celestial-gold/50 pl-5 py-1">
                  <p className="font-serif italic text-base md:text-lg text-gray-300 leading-relaxed">
                    "{activeData.quote}"
                  </p>
                </div>

                {/* Rodapé técnico estilo observatório */}
                <div className="mt-8 flex items-center justify-between text-[11px] text-gray-500 border-t border-white/5 pt-4 font-mono">
                  <span>CELESTIAL ARCHIVE • BEBELA</span>
                  <span>{activeMode === "birth" ? "ORIGIN: 2007" : "REALTIME TRACKER"}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
