import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GalaxySection from './components/GalaxySection';
import MoonPhase from './components/MoonPhase';
import VirgoConstellation from './components/VirgoConstellation';
import SolarSystemMap from './components/SolarSystemMap';
import CosmicAgeCalculator from './components/CosmicAgeCalculator';
import MoonGallery from './components/MoonGallery';
import ClosingMessage from './components/ClosingMessage';
import UniverseBeauty from './components/UniverseBeauty';
import FloatingParticles from './components/FloatingParticles';
import DecorativeGalaxies from './components/DecorativeGalaxies';
import MusicPlayer from './components/MusicPlayer';
import { Undo2 } from 'lucide-react';

export default function Universe({ onReturn }) {
  return <>
    <DecorativeGalaxies />
    <FloatingParticles />
    <MusicPlayer />
    <SmoothScroll />
    <Header />
    <main>
      <div id="cosmic-journey" className="relative isolate">
        <GalaxySection />
        <HeroSection />
        <div id="galaxy" className="galaxy-passage" />
        <MoonPhase />
      </div>
      <VirgoConstellation />
      <SolarSystemMap />
      <CosmicAgeCalculator />
      <MoonGallery />
      <ClosingMessage />
      <UniverseBeauty />
    </main>
    <footer className="py-16 px-6 text-center border-t border-white/10 bg-midnight-950 relative z-10">
      <p className="text-xs text-gray-400">Feito com amor para a Bebela</p>
      <button onClick={onReturn} className="text-command mt-6"><Undo2 size={18} aria-hidden="true" /> Retornar à Tela de Espera &amp; Big Bang</button>
    </footer>
  </>;
}
