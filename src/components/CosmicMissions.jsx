import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, RotateCcw, Trophy, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { PLANETS_DATA } from '../data/planetsData';

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function CosmicMissions() {
  const [deck, setDeck] = useState(() => shuffle(PLANETS_DATA));
  const [round, setRound] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [options, setOptions] = useState(() => shuffle([deck[0], ...shuffle(deck.slice(1)).slice(0, 3)]));

  const done = round === deck.length;
  const planet = deck[Math.min(round, deck.length - 1)];

  const choose = id => {
    if (answer !== null) return;
    setAnswer(id);
    if (id === planet.id) {
      setScore(value => value + 100 + streak * 25);
      setStreak(value => value + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    const nextRound = round + 1;
    setRound(nextRound);
    setAnswer(null);
    if (nextRound < deck.length) {
      setOptions(shuffle([deck[nextRound], ...shuffle(deck.filter(p => p.id !== deck[nextRound].id)).slice(0, 3)]));
    }
  };

  const reset = () => {
    const nextDeck = shuffle(PLANETS_DATA);
    setDeck(nextDeck);
    setRound(0);
    setScore(0);
    setStreak(0);
    setAnswer(null);
    setOptions(shuffle([nextDeck[0], ...shuffle(nextDeck.slice(1)).slice(0, 3)]));
  };

  return (
    <div className="w-full rounded-3xl bg-midnight-900/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col items-center">
      {/* Glow de fundo */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: planet?.color || '#e5c483' }}
      />

      {/* Barra de Status da Missão */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs font-mono">
        <span className="text-gray-400">
          {done ? '✦ Expedição Concluída' : `Astro ${round + 1} de ${deck.length}`}
        </span>
        <span className="flex items-center gap-1.5 text-celestial-gold font-semibold">
          <Trophy size={15} />
          <span>{score} pontos</span>
          {streak > 1 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-celestial-gold/20 text-celestial-gold text-[10px]">
              {streak}x Combo
            </span>
          )}
        </span>
      </div>

      {done ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-8 gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-celestial-gold/10 border border-celestial-gold/30 flex items-center justify-center text-celestial-gold mb-2 shadow-[0_0_30px_rgba(229,196,131,0.25)]">
            <Orbit size={32} />
          </div>
          <h3 className="font-serif text-3xl text-white">
            O Sistema Solar é Seu, Bela!
          </h3>
          <p className="text-sm text-gray-300 font-light max-w-md leading-relaxed">
            Você completou o reconhecimento de todos os 8 planetas da sua galáxia com <strong className="text-celestial-gold font-mono">{score} pontos</strong> de conhecimento estelar.
          </p>
          <button
            onClick={reset}
            className="mt-4 px-6 py-3 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(229,196,131,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>Jogar Novamente</span>
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-xl flex flex-col items-center">
          {/* Card do Astro Desconhecido */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-full p-2 flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-500"
                style={{ background: answer ? planet.color : '#e5c483' }}
              />
              <img
                src={planet.texture3D || `/planetas/orbs/${planet.id}.png`}
                alt={answer ? planet.name : 'Astro misterioso'}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-full relative z-10 select-none pointer-events-none drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div>
              <span className="text-[10px] font-mono text-celestial-gold uppercase tracking-widest flex items-center gap-1 justify-center sm:justify-start">
                <Sparkles size={12} />
                <span>Desafio de Reconhecimento</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                {answer ? planet.name : 'Que astro é este?'}
              </h3>
              <p className="text-xs text-gray-300 font-light mt-1.5 leading-relaxed max-w-sm">
                {answer ? (
                  planet.facts?.[0] || planet.subtitle
                ) : (
                  'Observe a atmosfera, as cores e as características visuais captadas pelo telescópio.'
                )}
              </p>
            </div>
          </div>

          {/* Opções de Resposta em Grid 2x2 */}
          <div className="grid grid-cols-2 gap-3 w-full mb-6">
            {options.map(option => {
              const isSelected = answer === option.id;
              const isCorrect = option.id === planet.id;

              let btnStyle = "bg-white/[0.03] text-gray-300 border-white/10 hover:bg-white/[0.08] hover:text-white";
              if (answer !== null) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/20 border-emerald-400/60 text-emerald-300 font-semibold shadow-[0_0_15px_rgba(52,211,153,0.2)]";
                } else if (isSelected) {
                  btnStyle = "bg-rose-500/20 border-rose-400/60 text-rose-300 font-semibold";
                } else {
                  btnStyle = "bg-white/[0.01] text-gray-500 border-white/5 opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={answer !== null}
                  onClick={() => choose(option.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-mono transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: option.color }} 
                    />
                    <span>{option.name}</span>
                  </div>
                  {answer !== null && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  {answer !== null && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Botão Próximo */}
          <AnimatePresence>
            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full flex items-center justify-between pt-2"
              >
                <span className="text-xs font-mono text-gray-300">
                  {answer === planet.id ? (
                    <span className="text-emerald-300 font-semibold">✦ Coordenadas exatas confirmadas!</span>
                  ) : (
                    <span>O astro correto era <strong>{planet.name}</strong>.</span>
                  )}
                </span>
                <button
                  onClick={next}
                  className="px-5 py-2 rounded-full bg-celestial-gold text-midnight-950 font-mono text-xs uppercase font-semibold tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  {round === deck.length - 1 ? 'Ver Resultado' : 'Próximo Astro →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
