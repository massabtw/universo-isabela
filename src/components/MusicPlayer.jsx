import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC } from '../config.js';

/**
 * Sintetizador Web Audio API do Tema de Interstellar (Hans Zimmer - Cornfield Chase)
 * Ativado automaticamente se o arquivo /musica.mp3 não estiver no diretório public/.
 */
class InterstellarSynthPlayer {
  constructor() {
    this.ctx = null;
    this.timer = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Frequências das notas (Hz)
    const noteFreqs = {
      'A2': 110.00, 'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00,
      'A3': 220.00, 'B3': 246.94, 'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00,
      'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25
    };

    // Progressão icônica de 4 acordes de Interstellar (Cornfield Chase)
    const patterns = [
      // Acorde 1: A menor
      { bass: 'A2', pad: ['A3', 'E4'], arps: ['E4', 'A4', 'C5', 'E5', 'C5', 'A4'] },
      // Acorde 2: Em / G
      { bass: 'E3', pad: ['G3', 'E4'], arps: ['E4', 'G4', 'B4', 'E5', 'B4', 'G4'] },
      // Acorde 3: Fá Maior
      { bass: 'F3', pad: ['A3', 'F4'], arps: ['F4', 'A4', 'C5', 'F5', 'C5', 'A4'] },
      // Acorde 4: D menor / Sol
      { bass: 'D3', pad: ['A3', 'D4'], arps: ['D4', 'F4', 'A4', 'D5', 'A4', 'F4'] }
    ];

    let patternIdx = 0;
    let step = 0;
    const stepDuration = 0.165; // ~98 BPM (semínima pontuada / sextinas)

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    // Filtro estilo órgão de tubos de catedral
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    filter.connect(masterGain);
    masterGain.connect(this.ctx.destination);
    this.masterGain = masterGain;

    const playTone = (freq, duration, type = 'sine', vol = 0.12) => {
      if (!this.isPlaying || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(vol, now + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(g);
      g.connect(filter);
      osc.start(now);
      osc.stop(now + duration);
    };

    const tick = () => {
      if (!this.isPlaying) return;
      const currentPat = patterns[patternIdx];

      // Toca o baixo e o pad a cada compasso
      if (step === 0) {
        const bFreq = noteFreqs[currentPat.bass];
        if (bFreq) playTone(bFreq, 1.8, 'triangle', 0.25);
        currentPat.pad.forEach(note => {
          const pFreq = noteFreqs[note];
          if (pFreq) playTone(pFreq, 1.8, 'sine', 0.14);
        });
      }

      // Toca o arpejo rápido do órgão
      const arpNote = currentPat.arps[step % currentPat.arps.length];
      const aFreq = noteFreqs[arpNote];
      if (aFreq) {
        playTone(aFreq, 0.28, 'sawtooth', 0.09);
        playTone(aFreq, 0.28, 'sine', 0.12);
      }

      step++;
      if (step >= 12) {
        step = 0;
        patternIdx = (patternIdx + 1) % patterns.length;
      }
    };

    tick();
    this.intervalId = setInterval(tick, stepDuration * 1000);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
    }
  }
}

const synthPlayer = new InterstellarSynthPlayer();

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  const isUsingSynth = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isUsingSynth.current = false;
          })
          .catch(() => {
            // Se o arquivo musica.mp3 não for encontrado ou falhar, ativa o tema de Interstellar sintetizado!
            isUsingSynth.current = true;
            synthPlayer.play();
          });
      }
    } else {
      audio.pause();
      if (isUsingSynth.current) {
        synthPlayer.stop();
        isUsingSynth.current = false;
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="music-player fixed bottom-6 right-6 z-50 flex items-center justify-end"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <audio ref={audioRef} src={MUSIC.src} loop />

      {/* Caixa de informações da música Dark Luxury */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden mr-3"
          >
            <div className="bg-midnight-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl whitespace-nowrap border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-celestial-gold animate-ping" />
              <div>
                <p className="text-xs font-serif text-celestial-starlight tracking-wide">{MUSIC.title}</p>
                <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">{MUSIC.artist}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Glow dourado/celestial quando tocando */}
        {isPlaying && (
          <motion.div
            className="absolute -inset-1 rounded-full bg-celestial-gold/30 blur-sm"
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Botão principal do player */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={togglePlay}
          className="relative w-12 h-12 bg-midnight-900 border border-white/15 rounded-full shadow-2xl flex items-center justify-center text-celestial-gold focus:outline-none cursor-pointer"
          aria-label={isPlaying ? "Pausar trilha sonora" : "Tocar " + MUSIC.title}
        >
          {isPlaying ? (
            <div className="flex items-end justify-center space-x-[2px] h-4 w-4">
              <motion.div
                className="w-[2.5px] bg-celestial-gold rounded-full"
                animate={{ height: ['30%', '100%', '30%'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-[2.5px] bg-celestial-gold rounded-full"
                animate={{ height: ['80%', '20%', '80%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              />
              <motion.div
                className="w-[2.5px] bg-celestial-gold rounded-full"
                animate={{ height: ['40%', '90%', '40%'] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />
            </div>
          ) : (
            <span className="text-base ml-0.5">▶</span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
