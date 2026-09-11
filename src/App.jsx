/**
 * ============================================
 * App.jsx — Universo da Isabela (Dark Luxury)
 * ============================================
 *
 * Experiência imersiva focada no cosmos, na Lua de 14/09/2007,
 * na Via Láctea interativa com Three.js, mapa orbital do Sistema Solar,
 * constelação de Virgem, astrofotografia e celebração dos 19 anos.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BIRTHDAY_DATE } from "./config";

// Componentes do Universo
import CountdownScreen from "./components/CountdownScreen";
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

  const handleCountdownComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIsMuseumOpen(true);
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-celestial-starlight selection:bg-celestial-glow selection:text-midnight-950">
      <AnimatePresence mode="wait">
        {!isMuseumOpen ? (
          /* ── Tela de Bloqueio: Contagem Regressiva & Big Bang ── */
          <motion.div
            key="countdown"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <CountdownScreen
              targetDate={BIRTHDAY_DATE}
              onComplete={handleCountdownComplete}
            />
          </motion.div>
        ) : (
          /* ── Conteúdo Principal: O Universo da Isabela ── */
          <motion.div
            key="universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative"
          >
            {/* Céu estrelado flutuante */}
            <FloatingParticles />

            {/* Player de música (The Weeknd) */}
            <MusicPlayer />

            {/* Navegação e Scroll Suave */}
            <SmoothScroll />
            <Header />

            {/* 1. Entrada Editorial: Isabela Marty com a Lua deslizante e zoom no scroll */}
            <HeroSection />

            {/* 2. Via Láctea Cinemática: 42.000 partículas Three.js viajando do topo-direito ao centro */}
            <GalaxySection />

            {/* 3. O Astro Favorito: A Lua exata de 14/09/2007 */}
            <MoonPhase />

            {/* 4. A Constelação de Virgem (Mapa de Estrelas Puro) */}
            <VirgoConstellation />

            {/* 5. Mapa Orbital do Sistema Solar (Com Zoom 3D Imersivo) */}
            <SolarSystemMap />

            {/* 6. Calculadora Cósmica & Física Relativística */}
            <CosmicAgeCalculator />

            {/* 7. Galeria de Fotos da Lua & Astrofotografia da Bela */}
            <MoonGallery />

            {/* 8. Carta Pessoal no Envelope Selado */}
            <ClosingMessage />

            {/* Rodapé Minimalista Celestial */}
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
                  onClick={() => setIsMuseumOpen(false)}
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
