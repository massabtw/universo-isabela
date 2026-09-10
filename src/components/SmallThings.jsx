import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SMALL_THINGS } from '../config';

// Mapeamento das cores para as classes do Tailwind
const colorMap = {
  rose: 'bg-accent-rose/25 border-accent-rose/60 text-warmGray-800',
  gold: 'bg-accent-gold/20 border-accent-gold/50 text-warmGray-800',
  sage: 'bg-accent-sage/25 border-accent-sage/60 text-warmGray-800',
  blush: 'bg-accent-blush/25 border-accent-blush/60 text-warmGray-800',
  blue: 'bg-[#1B3A5C]/10 border-[#1B3A5C]/30 text-warmGray-800',
};

const SmallThings = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Variantes para animação de staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-white"
      id="salas"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho da Seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-warmGray-900 tracking-tight">
            Sala das Pequenas Coisas
          </h2>
          <p className="text-lg md:text-xl font-sans font-light text-warmGray-500">
            Os detalhes que fazem dela quem ela é
          </p>
        </motion.div>

        {/* Grade de Cartões */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SMALL_THINGS.map((item, index) => {
            const colors = colorMap[item.color] || colorMap.blush; // fallback

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className={`p-8 rounded-2xl border ${colors} flex flex-col items-start transition-shadow hover:shadow-xl`}
              >
                <div className="text-5xl mb-6">
                  {item.emoji}
                </div>
                <div className="uppercase tracking-widest text-xs font-semibold text-warmGray-500 mb-2">
                  {item.category}
                </div>
                <h3 className="text-2xl font-serif text-warmGray-900 mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-warmGray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SmallThings;
