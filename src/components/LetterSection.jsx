import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LETTER } from '../config'; // Importa a carta das configurações

const LetterSection = () => {
  // Ref para detectar quando a seção entra na tela
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Variantes para a animação do contêiner (efeito em cascata)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  // Variantes para os elementos individuais da carta
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    // Fundo com gradiente suave de creme para um azul bem claro
    <section 
      id="carta" 
      className="py-24 md:py-32 bg-gradient-to-b from-[#FAF8F5] to-[#EEF2F7] overflow-hidden"
    >
      <div className="container mx-auto px-4 flex justify-center">
        
        {/* Contêiner da carta com animação principal e uma rotação bem sutil para parecer natural */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative max-w-2xl w-full"
          style={{ rotate: -1 }} // Rotação orgânica e sutil da "folha"
        >
          {/* O "Papel" da carta */}
          <div className="bg-white rounded-3xl shadow-2xl px-10 md:px-16 py-12 md:py-20 relative overflow-hidden">
            
            {/* Detalhe decorativo no topo do papel (linha azul escuro) */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1B3A5C] opacity-80" />

            {/* Ornamento acima da saudação */}
            <motion.div variants={itemVariants} className="text-center mb-8 text-[#1B3A5C] text-2xl">
              🪶
            </motion.div>

            {/* Saudação */}
            <motion.div variants={itemVariants}>
              <h2 className="font-serif italic text-2xl md:text-3xl text-[#1B3A5C] mb-8">
                {LETTER.greeting}
              </h2>
            </motion.div>

            {/* Corpo da Carta */}
            <motion.div variants={itemVariants}>
              {/* whitespace-pre-line garante que as quebras de linha da string sejam respeitadas */}
              <p className="font-serif text-lg md:text-xl leading-loose text-neutral-700 whitespace-pre-line mb-12">
                {LETTER.body}
              </p>
            </motion.div>

            {/* Assinatura */}
            <motion.div variants={itemVariants} className="flex justify-end mt-8">
              <p className="font-serif italic text-lg text-neutral-500">
                {LETTER.signature}
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LetterSection;
