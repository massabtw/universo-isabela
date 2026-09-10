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
import { motion, AnimatePresence } from "framer-motion";

// Configuração inicial dos slots de fotos (você pode colocar lua1.jpg, lua2.jpg em public/fotos/)
const LUNAR_PHOTOS = [
  {
    id: 1,
    file: "/fotos/lua1.jpg",
    fallback: "/moon_2007.jpg",
    title: "Crescente ao Entardecer",
    caption: "A delicadeza do primeiro fio de prata recortando o céu azul-marinho.",
    date: "Registro da Bela",
  },
  {
    id: 2,
    file: "/fotos/lua2.jpg",
    fallback: "/moon_full.jpg",
    title: "A Lua Cheia Radiante",
    caption: "Quando a noite inteira se ilumina e parece não existir escuridão no mundo.",
    date: "Noite de Brilho",
  },
  {
    id: 3,
    file: "/fotos/lua3.jpg",
    fallback: "/moon_2007.jpg",
    title: "Crateras & Relevo Noturno",
    caption: "O olhar atento para os mínimos detalhes que a maioria deixa passar batido.",
    date: "Pelo Telescópio / Lente",
  },
  {
    id: 4,
    file: "/fotos/lua4.jpg",
    fallback: "/moon_full.jpg",
    title: "Sob o Manto da Noite",
    caption: "A paz silenciosa de quem encontra no cosmos o seu verdadeiro refúgio.",
    date: "Momento Eternizado",
  },
];

export default function MoonGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
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

        {/* Grade de Fotos Estilo Galeria de Arte Noturna */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {LUNAR_PHOTOS.map((photo, index) => {
            const isFallback = imageErrors[photo.id];
            const displaySrc = isFallback ? photo.fallback : photo.file;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative cursor-pointer bg-midnight-900/60 backdrop-blur-xl border border-white/10 hover:border-celestial-gold/40 rounded-3xl p-4 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Moldura da Foto com Aspecto Quadrado/Vertical */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/80 mb-4 border border-white/5">
                  <img
                    src={displaySrc}
                    alt={photo.title}
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
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
                    <h4 className="font-serif text-base text-celestial-starlight group-hover:text-celestial-gold transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Instrução Amigável para Adicionar Fotos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight-900/60 border border-white/10 text-xs text-gray-400 font-mono">
            <span className="text-celestial-gold">📸</span>
            <span>Para colocar as fotos reais dela: basta salvar como <code className="text-celestial-starlight bg-white/10 px-1.5 py-0.5 rounded">lua1.jpg</code>, <code className="text-celestial-starlight bg-white/10 px-1.5 py-0.5 rounded">lua2.jpg</code> na pasta <code className="text-celestial-starlight bg-white/10 px-1.5 py-0.5 rounded">public/fotos/</code></span>
          </div>
        </motion.div>

      </div>

      {/* ── Modal Lightbox em Tela Cheia ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-midnight-950/95 border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Botão fechar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                ✕
              </button>

              {/* Imagem Ampliada */}
              <div className="relative w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={imageErrors[selectedPhoto.id] ? selectedPhoto.fallback : selectedPhoto.file}
                  alt={selectedPhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              {/* Legenda e Detalhes da Foto */}
              <div className="p-6 sm:p-8 bg-midnight-900/90 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-celestial-gold uppercase tracking-widest mb-1.5">
                  <span>🌙</span>
                  <span>{selectedPhoto.date}</span>
                </div>
                <h3 className="font-serif text-2xl text-celestial-starlight mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="font-serif italic text-sm text-gray-300 leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

