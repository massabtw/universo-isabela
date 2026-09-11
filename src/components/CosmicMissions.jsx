import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Crosshair, Orbit, Play, RotateCcw, Trophy } from 'lucide-react';
import { PLANETS_DATA } from '../data/planetsData';

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function PlanetMission() {
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
    if (id === planet.id) { setScore(value => value + 100 + streak * 25); setStreak(value => value + 1); }
    else setStreak(0);
  };
  const next = () => {
    const nextRound = round + 1;
    setRound(nextRound); setAnswer(null);
    if (nextRound < deck.length) setOptions(shuffle([deck[nextRound], ...shuffle(deck.filter(p => p.id !== deck[nextRound].id)).slice(0, 3)]));
  };
  const reset = () => {
    const nextDeck = shuffle(PLANETS_DATA);
    setDeck(nextDeck); setRound(0); setScore(0); setStreak(0); setAnswer(null);
    setOptions(shuffle([nextDeck[0], ...shuffle(nextDeck.slice(1)).slice(0, 3)]));
  };
  return <div className="mission-game">
    <div className="mission-status"><span>{done ? 'Expedição concluída' : `Descoberta ${round + 1} de 8`}</span><span><Trophy size={16} aria-hidden="true" /> {score} pontos</span></div>
    {done ? <div className="mission-result"><Orbit size={48} /><h3>O Sistema Solar é seu.</h3><p>{score} pontos nesta expedição.</p><button className="primary-command" onClick={reset}><RotateCcw size={18} /> Nova expedição</button></div> : <>
      <div className="planet-challenge"><img src={`/planetas/orbs/${planet.id}.png`} alt={answer ? planet.name : 'Astro misterioso'} width="260" height="260" /><div><h3>Que mundo é este?</h3><p>{answer ? planet.name : 'Um novo astro apareceu no seu telescópio.'}</p><span className="streak-count">Sequência: {streak}</span></div></div>
      <div className="mission-answers">{options.map(option => <button key={option.id} disabled={answer !== null} data-result={answer ? option.id === planet.id ? 'correct' : option.id === answer ? 'wrong' : '' : ''} onClick={() => choose(option.id)}>{option.name}</button>)}</div>
      <div className="mission-feedback" aria-live="polite">{answer && <><p>{answer === planet.id ? 'Coordenadas confirmadas!' : `Era ${planet.name}. Próxima descoberta!`}</p><button className="text-command" onClick={next}>{round === 7 ? 'Ver resultado' : 'Próximo astro'}</button></>}</div>
    </>}
  </div>;
}

function SignalMission() {
  const reduced = useReducedMotion();
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [manual, setManual] = useState(0);
  const [target, setTarget] = useState(61);
  const [best, setBest] = useState(() => { try { return Number(localStorage.getItem('isabela-signal-best')) || 0; } catch { return 0; } });
  const cursor = useRef(null);
  const position = useRef(0);
  const arena = useRef(null);
  const band = Math.max(5, 14 - round * 1.5);
  useEffect(() => {
    if (!running || reduced) return;
    let frame, elapsed = 0, previous;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(arena.current);
    const tick = time => {
      const delta = previous === undefined ? 0 : Math.min(time - previous, 60);
      previous = time;
      if (!document.hidden && visible) elapsed += delta;
      position.current = (1 - Math.cos(elapsed * (0.0017 + round * 0.00023))) * 50;
      if (cursor.current) cursor.current.style.left = `${position.current}%`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [running, round, reduced]);
  const capture = () => {
    if (!running) { setRunning(true); return; }
    const difference = Math.abs((reduced ? manual : position.current) - target);
    const earned = difference <= band ? Math.round(100 * (1 - difference / (band * 1.25))) : 0;
    setResult(earned); setRunning(false); setScore(value => value + earned);
    if (round === 5 && score + earned > best) {
      setBest(score + earned);
      try { localStorage.setItem('isabela-signal-best', String(score + earned)); } catch { /* Storage is optional. */ }
    }
  };
  const next = () => { setRound(value => value + 1); setTarget(22 + Math.random() * 56); setResult(null); setManual(0); position.current = 0; if (cursor.current) cursor.current.style.left = '0%'; };
  return <div className="mission-game" ref={arena}>
    <div className="mission-status"><span>Transmissão {round} de 5</span><span><Trophy size={16} aria-hidden="true" /> {score} pontos</span></div>
    <div className="signal-sky"><img src="/planetas/orbs/terra.png" alt="Terra" width="150" height="150" /><div className="signal-route"><span /><span /><span /></div><Crosshair size={58} aria-hidden="true" /></div>
    <h3>Sinal distante</h3><p className="signal-objective">Capture o sinal na faixa iluminada.</p>
    <div className="signal-track"><span className="signal-target" style={{ left: `${target - band}%`, width: `${band * 2}%` }} /><span className="signal-cursor" ref={cursor} style={reduced ? { left: `${manual}%` } : undefined} /></div>
    {reduced && <label className="manual-signal">Frequência<input type="range" min="0" max="100" value={manual} onChange={e => setManual(Number(e.target.value))} /></label>}
    <div className="signal-actions">
      {result === null ? <button className="primary-command" onClick={capture}>{running ? <Crosshair size={18} /> : <Play size={18} />}{running ? 'Capturar sinal' : 'Iniciar transmissão'}</button> : round < 5 ? <button className="primary-command" onClick={next}>Próxima transmissão</button> : <button className="primary-command" onClick={() => { setRound(1); setScore(0); setResult(null); setTarget(61); }}><RotateCcw size={18} /> Jogar novamente</button>}
      <span>Recorde: {best}</span>
    </div>
    <p className="mission-feedback" aria-live="polite">{result !== null ? `${result ? 'Sinal recebido' : 'Sinal perdido'} · +${result} pontos${round === 5 ? ' · Missão concluída' : ''}` : 'Aguardando transmissão'}</p>
  </div>;
}

export default function CosmicMissions() {
  const [mode, setMode] = useState('planets');
  return <div className="cosmic-missions">
    <div className="mission-modes" role="group" aria-label="Missão">
      <button aria-pressed={mode === 'planets'} onClick={() => setMode('planets')}><Orbit size={20} /><span>Astro misterioso</span></button>
      <button aria-pressed={mode === 'signal'} onClick={() => setMode('signal')}><Crosshair size={20} /><span>Sinal distante</span></button>
    </div>
    <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{mode === 'planets' ? <PlanetMission /> : <SignalMission />}</motion.div>
  </div>;
}
