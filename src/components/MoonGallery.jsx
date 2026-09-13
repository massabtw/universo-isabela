/**
 * ============================================
 * MoonGallery — Galeria Lunar da Isabela
 * ============================================
 *
 * Seção para exibir as fotos que ela tira da Lua,
 * do céu noturno e momentos especiais sob as estrelas.
 * Suporta fotos locais da pasta public/fotos/ com
 * lightbox em tela cheia ao clicar.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LUNAR_PHOTOS } from "../config.js";

import PhotoLightbox from './PhotoLightbox';

const EXTENSION_CANDIDATES = [".jpg", ".png", ".jpeg", ".webp", ".JPG", ".PNG", ".JPEG"];

export default function MoonGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoSources, setPhotoSources] = useState({});

  const getDisplaySrc = (photo) => {
    if (!photo) return "";
    return photoSources[photo.id] || photo.file;
  };

  const handleImageError = (photo) => {
    const currentSrc = getDisplaySrc(photo);
    if (currentSrc === photo.fallback) return;

    const dotIndex = photo.file.lastIndexOf(".");
    if (dotIndex > 0) {
      const basePath = photo.file.substring(0, dotIndex);
      const currentExt = currentSrc.substring(currentSrc.lastIndexOf("."));
      const currentIdx = EXTENSION_CANDIDATES.indexOf(currentExt);

      if (currentIdx >= 0 && currentIdx < EXTENSION_CANDIDATES.length - 1) {
        const nextExt = EXTENSION_CANDIDATES[currentIdx + 1];
        setPhotoSources((prev) => ({ ...prev, [photo.id]: `${basePath}${nextExt}` }));
        return;
      }
    }

    setPhotoSources((prev) => ({ ...prev, [photo.id]: photo.fallback }));
  };

  return (
    <section 
      id="galeria" 
      className="relative z-10 py-28 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Luz ambiente central */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #78A7D9 0%, #162540 60%, transparent 80%)" }}
      />

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Cabeçalho Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-celestial-gold/40"></span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-celestial-gold font-mono font-medium">
              Astrofotografia & Memórias
            </span>
            <span className="w-8 h-[1px] bg-celestial-gold/40"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-celestial-starlight tracking-tight mb-3">
            A Lua Pelos Olhos da Bela
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light max-w-lg mx-auto">
            Os cliques, a admiração pelas noites claras e os momentos especiais eternizados sob o luar.
          </p>
        </motion.div>

        {/* Grade de Fotos Estilo Galeria de Arte Noturna - 3 Registros da Bela */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full mx-auto">
          {LUNAR_PHOTOS.map((photo, index) => {
            const displaySrc = getDisplaySrc(photo);

            return (
              <motion.button type="button"
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onClick={event => { event.currentTarget.focus({ preventScroll: true }); setSelectedPhoto(photo); }}
                className="photo-card group relative cursor-pointer text-left bg-midnight-900/60 backdrop-blur-xl border border-white/10 hover:border-celestial-gold/40 rounded-3xl p-4 sm:p-5 shadow-2xl transition-colors duration-200 overflow-hidden flex flex-col"
              >
                {/* Moldura da Foto com Aspecto Elegante */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/80 mb-4 border border-white/5">
                  <img
                    src={displaySrc}
                    width="800" height="1000" loading="lazy" decoding="async"
                    alt={photo.title}
                    onError={() => handleImageError(photo)}
                    className="w-full h-full object-cover transition-transform duration-700 select-none"
                  />

                  {/* Gradiente sutil escuro para contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Badge de ampliação */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-midnight-950/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    🔍
                  </div>
                </div>

                {/* Informações da Foto */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-celestial-gold/80 mb-1 uppercase tracking-wider">
                      <span>{photo.date}</span>
                      <span>#0{photo.id}</span>
                    </div>
                    <h4 className="font-serif text-lg text-celestial-starlight group-hover:text-celestial-gold transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>

      {/* ── Modal Lightbox em Tela Cheia ── */}
      {selectedPhoto && <PhotoLightbox photos={LUNAR_PHOTOS} getSrc={getDisplaySrc} onImageError={handleImageError}
        selectedPhoto={selectedPhoto} onSelect={setSelectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </section>
  );
}

