/**
 * ============================================
 * App.jsx — Universo da Isabela (Dark Luxury)
 * ============================================
 *
 * MoonLayer: layer fixa global que persiste entre CountdownScreen e HeroSection.
 * Fases: "countdown" → "bigbang" → "hero"
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BIRTHDAY_DATE } from "./config";

// Componentes do Universo
import CountdownScreen from "./components/CountdownScreen";
import MoonLayer from "./components/MoonLayer";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import GalaxySection from "./components/GalaxySection";
import MoonPhase from "./components/MoonPhase";
import VirgoConstellation from "./components/VirgoConstellation";
import SolarSystemMap from "./components/SolarSystemMap";
import CosmicAgeCalculator from "./components/CosmicAgeCalculator";
import MoonGallery from "./components/MoonGallery";
import ClosingMessage from "./components/ClosingMessage";
import FloatingParticles from "./components/FloatingParticles";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [isMuseumOpen, setIsMuseumOpen] = useState(() => {
    return new Date() >= new Date(BIRTHDAY_DATE);
  });

  // Fase da Lua: controla a posição/tamanho da MoonLayer
  const [moonPhase, setMoonPhase] = useState("countdown");

  const handleCountdownComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMoonPhase("hero");
    setIsMuseumOpen(true);
  };

  const handlePhaseChange = (phase) => {
    setMoonPhase(phase);
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-celestial-starlight selection:bg-celestial-glow selection:text-midnight-950">

      {/* ── LUA FOTORREALISTA GLOBAL (persiste entre countdown e hero) ── */}
      {/* Visível apenas quando o museu não está aberto OU quando está na hero */}
      <AnimatePresence>
        {(!isMuseumOpen || moonPhase === "hero") && (
          <motion.div
            key="moon-layer"
            initial={false}
            exit={{ opacity: 0, transition: { duration: 1, delay: 1.5 } }}
          >
            <MoonLayer phase={moonPhase} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isMuseumOpen ? (
          /* ── Tela de Bloqueio: Contagem Regressiva ── */
          <motion.div
            key="countdown"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <CountdownScreen
              targetDate={BIRTHDAY_DATE}
              onComplete={handleCountdownComplete}
              onPhaseChange={handlePhaseChange}
            />
          </motion.div>
        ) : (
          /* ── Conteúdo Principal: O Universo da Isabela ── */
          <motion.div
            key="universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative"
          >
            {/* Céu estrelado flutuante */}
            <FloatingParticles />

            {/* Player de música */}
            <MusicPlayer />

            {/* Navegação */}
            <SmoothScroll />
            <Header />

            {/* Entrada Editorial com Lua */}
            <HeroSection />

            {/* Via Láctea — Nebulosa via scroll */}
            <GalaxySection />

            {/* O Astro Favorito: A Lua exata de 14/09/2007 */}
            <MoonPhase />

            {/* A Constelação de Virgem */}
            <VirgoConstellation />

            {/* Mapa Orbital do Sistema Solar */}
            <SolarSystemMap />

            {/* Calculadora Cósmica */}
            <CosmicAgeCalculator />

            {/* Galeria de Fotos */}
            <MoonGallery />

            {/* Carta Pessoal */}
            <ClosingMessage />

            {/* Rodapé */}
            <footer className="py-16 text-center border-t border-white/[0.06] bg-midnight-950/80 backdrop-blur-md relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-celestial-gold/40" />
                <span className="text-celestial-gold text-sm">🌙</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-celestial-gold/40" />
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-mono">
                Feito com amor para a Bebela • 14.09.2007
              </p>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setMoonPhase("countdown");
                    setIsMuseumOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-celestial-gold/40 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 hover:text-celestial-gold transition-all duration-300 cursor-pointer"
                >
                  ⏳ Retornar à Tela de Espera & Big Bang
                </button>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
