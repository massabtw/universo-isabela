import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC } from '../config.js';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setHasError(false);
      audio.play().catch((err) => {
        console.warn("Erro ao reproduzir áudio:", err);
        setIsPlaying(false);
        setHasError(true);
      });
    } else {
      audio.pause();
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
      <audio 
        ref={audioRef} 
        src={MUSIC.src} 
        loop 
        preload="none"
        onError={() => {
          if (isPlaying) {
            setIsPlaying(false);
            setHasError(true);
          }
        }}
      />

      {/* Caixa de informações da música / status */}
      <AnimatePresence>
        {(isExpanded || hasError) && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden mr-3"
          >
            <div className="bg-midnight-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl whitespace-nowrap border border-white/10 flex items-center gap-3">
              {hasError ? (
                <div className="flex items-center gap-2 text-amber-300 text-xs">
                  <span>⚠️</span>
                  <span>Adicione <b>musica.mp3</b> na pasta <b>public/</b></span>
                </div>
              ) : (
                <>
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-celestial-gold animate-ping' : 'bg-gray-500'}`} />
                  <div>
                    <p className="text-xs font-serif text-celestial-starlight tracking-wide">{MUSIC.title}</p>
                    <p className="text-[10px] uppercase font-mono text-gray-400 tracking-wider">{MUSIC.artist}</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Glow dourado quando tocando */}
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
          aria-label={isPlaying ? "Pausar trilha sonora" : "Tocar trilha sonora"}
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
