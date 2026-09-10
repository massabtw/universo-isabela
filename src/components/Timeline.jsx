import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE_EVENTS } from '../config.js';

// Componente para renderizar uma imagem com fallback de erro
const EventImage = ({ photo, title }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !photo) {
    return null;
  }

  return (
    <div className="w-full h-full overflow-hidden rounded-2xl shadow-md">
      <img
        src={photo}
        alt={title}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

// Componente para um evento individual na linha do tempo
const TimelineEvent = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Alterna a direção baseado no índice (par ou ímpar)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mb-32 flex flex-col md:flex-row items-center w-full"
    >
      {/* Ponto no centro da linha do tempo (Desktop) / Esquerda (Mobile) */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#1B3A5C] transform -translate-x-1/2 mt-4 md:mt-0 z-10 hidden md:block"></div>

      {/* Container principal para o conteúdo alternado */}
      <div className={`w-full flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
        
        {/* Coluna da Imagem */}
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <EventImage photo={event.photo} title={event.title} />
        </div>

        {/* Coluna do Texto */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <div className="flex items-center space-x-4 mb-4">
            {event.icon && <span className="text-3xl text-[#1B3A5C]">{event.icon}</span>}
            <h3 className="text-5xl font-serif text-[#1B3A5C] font-bold">{event.year}</h3>
          </div>
          <h4 className="text-2xl font-bold text-warmGray-800 mb-4">{event.title}</h4>
          <p className="text-lg text-warmGray-600 leading-relaxed">
            {event.description}
          </p>
        </div>
        
      </div>
      
      {/* Ponto na esquerda para mobile */}
      <div className="absolute left-6 top-10 w-4 h-4 rounded-full bg-[#1B3A5C] transform -translate-x-1/2 mt-0 z-10 md:hidden block"></div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section id="hall" className="py-24 bg-cream relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif font-bold text-[#1B3A5C]">
            Hall — Linha do Tempo
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Linha vertical central (desktop) ou à esquerda (mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-warmGray-300 transform -translate-x-1/2"></div>

          {/* Renderização dos eventos */}
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineEvent key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
