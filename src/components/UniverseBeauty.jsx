/**
 * ====================================================================
 * UniverseBeauty.jsx — A Mulher Mais Linda do Universo
 * ====================================================================
 *
 * Seção de encerramento da jornada cósmica com as fotos especiais da Bela,
 * celebrando o maior e mais lindo espetáculo de todo o cosmos.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import PhotoLightbox from './PhotoLightbox';

const BELA_PHOTOS = [
  {
    id: 1,
    src: "/bebs/bela1.jpg",
    title: "O Meu Universo Favorito",
    caption: "A luz mais brilhante e encantadora de qualquer galáxia.",
  },
  {
    id: 2,
    src: "/bebs/bela2.jpg",
    title: "Constelação em Pessoa",
    caption: "Dona do sorriso que ilumina mais do que bilhões de supernovas.",
  },
  {
    id: 3,
    src: "/bebs/bela3.jpg",
    title: "Minha Estrela Guia",
    caption: "A maior e mais perfeita obra de arte que o cosmos já criou.",
  },
];

export default function UniverseBeauty() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section 
      id="mais-linda" 
      className="relative z-10 py-24 sm:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Luz ambiente cósmica dourada e rosada suave */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[700px] rounded-full pointer-events-none opacity-25 blur-[160px]"
        style={{ 
          background: 'radial-gradient(circle, rgba(229,196,131,0.35) 0%, rgba(244,114,182,0.18) 45%, transparent 75%)' 
        }}
      />

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">
        
        {/* Cabeçalho Celestial com Ornamento */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center mb-14 sm:mb-20 max-w-4xl px-4"
        >
          {/* Badge Celestial */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-celestial-gold/60" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-celestial-gold font-mono flex items-center gap-2">
              <Sparkles size={13} className="text-amber-300" />
              <span>O Maior Espetáculo do Cosmos</span>
              <Sparkles size={13} className="text-amber-300" />
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-celestial-gold/60" />
          </div>

          {/* Frase Principal em Destaque Absoluto */}
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-celestial-gold tracking-tight leading-snug sm:leading-tight mb-6 drop-shadow-[0_4px_30px_rgba(229,196,131,0.35)]">
            Mesmo depois de vermos tudo isso, posso me orgulhar de namorar a mulher mais linda do universo!
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            O cosmos possui 93 bilhões de anos-luz de extensão, trilhões de estrelas e mistérios sem fim... mas absolutamente nada se compara à sua beleza, ao seu olhar e ao privilégio que é ter você na minha vida.
          </p>
        </motion.div>

        {/* Grade com as 3 Fotos Luxuosas da Bela */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 w-full max-w-5xl mx-auto mb-16">
          {BELA_PHOTOS.map((photo, index) => (
            <motion.button type="button"
              key={photo.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.18, ease: "easeOut" }}
              onClick={event => { event.currentTarget.focus({ preventScroll: true }); setSelectedPhoto(photo); }}
              className="photo-card group relative cursor-pointer text-left bg-midnight-900/70 backdrop-blur-xl border border-celestial-gold/25 hover:border-celestial-gold/70 rounded-3xl p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_50px_rgba(229,196,131,0.25)] transition-colors duration-200 overflow-hidden flex flex-col"
            >
              {/* Brilho Dourado de Borda no Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-celestial-gold/5 via-transparent to-celestial-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Cantoneiras Celestiais nos 4 cantos da moldura */}
              <span className="absolute top-3 left-3 text-celestial-gold/40 group-hover:text-celestial-gold text-[10px] select-none transition-colors">✦</span>
              <span className="absolute top-3 right-3 text-celestial-gold/40 group-hover:text-celestial-gold text-[10px] select-none transition-colors">✦</span>
              <span className="absolute bottom-3 left-3 text-celestial-gold/40 group-hover:text-celestial-gold text-[10px] select-none transition-colors">✦</span>
              <span className="absolute bottom-3 right-3 text-celestial-gold/40 group-hover:text-celestial-gold text-[10px] select-none transition-colors">✦</span>

              {/* Moldura da Foto */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/90 mb-4 border border-white/10 shadow-inner">
                <img
                  src={photo.src}
                  width="900" height="1200" decoding="async"
                  alt={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Gradiente sutil na base da foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* Badge de ampliação no hover */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-celestial-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver foto ↗
                </div>
              </div>

              {/* Textos da Foto */}
              <div className="px-1 text-center flex flex-col items-center">
                <h3 className="font-serif italic text-lg sm:text-xl text-celestial-starlight group-hover:text-celestial-gold transition-colors duration-300 mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Fim da grade */}
      </div>


      {/* ── MODAL LIGHTBOX EM TELA CHEIA ── */}
      {selectedPhoto && <PhotoLightbox photos={BELA_PHOTOS}
        selectedPhoto={selectedPhoto} onSelect={setSelectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </section>
  );
}
