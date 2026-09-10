import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Componente para uma seção de foto com efeito parallax em largura total
const ParallaxPhoto = ({ src, caption }) => {
  // Referência para o container principal para rastrear o scroll
  const containerRef = useRef(null);

  // Rastreia o progresso do scroll em relação ao container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transforma o progresso do scroll em um deslocamento vertical (parallax)
  // A imagem se move de -10% para 10% criando um efeito cinematográfico
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      // Animação sutil de fade-in quando o componente entra na tela
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Wrapper da imagem com movimento vertical */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={src}
          alt={caption || "Imagem em destaque"}
          className="w-full h-full object-cover"
        />
        {/* Sobreposição escura sutil para garantir contraste */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Legenda opcional */}
      {caption && (
        <div className="absolute bottom-8 md:bottom-12 left-0 w-full px-6 flex justify-center pointer-events-none">
          <h3 
            className="text-white font-serif italic text-2xl md:text-4xl text-center"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}
          >
            {caption}
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default ParallaxPhoto;
