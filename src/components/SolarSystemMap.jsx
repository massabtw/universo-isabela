import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PLANETS_DATA, SUN_DATA } from '../data/planetsData';
import OrbitalScene from './OrbitalScene';
import PlanetViewer3D from './PlanetViewer3D';

const BODIES = [SUN_DATA, ...PLANETS_DATA];
export default function SolarSystemMap() {
  const [selected, setSelected] = useState(null);
  const [satellite, setSatellite] = useState(false);
  const [rotating, setRotating] = useState(true);
  const reduced = useReducedMotion();
  const active = BODIES.find(body => body.id === selected);
  const body = satellite && active?.satellite ? active.satellite : active;
  const select = id => { setSatellite(false); setSelected(id); };

  return (
    <section id="sistema-solar" className="solar-section relative">
      <header className="section-heading transition-all duration-500">
        <h2>{active ? 'Observatório: ' + body.name : 'Os Mundos em Harmonia'}</h2>
        <p>{active ? body.subtitle : 'Oito mundos, uma estrela e infinitas histórias.'}</p>
      </header>

      <div className="solar-content relative w-full min-h-[520px]">
        {/* Cena Orbital 3D - Mantida montada para transição instantânea e ultra fluida */}
        <motion.div
          key="orbits-persistent"
          animate={{
            opacity: active ? 0 : 1,
            scale: active ? (reduced ? 1 : 1.05) : 1,
            filter: active ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            pointerEvents: active ? 'none' : 'auto',
            position: active ? 'absolute' : 'relative',
            inset: active ? 0 : 'auto',
            width: '100%',
            zIndex: active ? 0 : 10,
          }}
        >
          <OrbitalScene onSelect={select} />
        </motion.div>

        {/* Inspeção do Planeta com fade in e out ultra suave */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="inspection"
              initial={{ opacity: 0, y: reduced ? 0 : 25, scale: reduced ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-20"
            >
              <div className="planet-navigation">
                <button 
                  className="text-command group cursor-pointer" 
                  onClick={() => setSelected(null)}
                >
                  <ArrowLeft size={18} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" /> 
                  <span>Voltar para as Órbitas</span>
                </button>
                <div className="planet-picker">
                  {BODIES.map(item => (
                    <button 
                      key={item.id} 
                      aria-pressed={item.id === selected} 
                      onClick={() => select(item.id)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="planet-inspection" key={body.id}>
                <motion.div 
                  className="planet-model" 
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.7 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="planet-model-stage">
                    <PlanetViewer3D 
                      key={body.id} 
                      textureUrl={body.texture3D} 
                      planetName={body.name} 
                      atmosphereColor={body.atmosphereColor || body.color} 
                      hasRings={!!body.hasRings} 
                      ringTextureUrl={body.ringTexture} 
                      isSun={!!body.isSun} 
                      isAutoRotating={rotating && !reduced} 
                      onToggleAutoRotate={() => setRotating(value => !value)} 
                    />
                  </div>
                  {active.satellite && (
                    <div className="segmented" role="group" aria-label="Planeta ou satélite">
                      <button aria-pressed={!satellite} onClick={() => setSatellite(false)}>Terra</button>
                      <button aria-pressed={satellite} onClick={() => setSatellite(true)}>A Lua</button>
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  className="planet-information" 
                  initial={{ opacity: 0, x: reduced ? 0 : 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2 }}
                >
                  <h3 style={{ color: body.color }}>{body.name}</h3>
                  {body.highlightText && (
                    <div className="planet-highlight">
                      <h4>{body.highlightTitle || 'Uma conexão com você'}</h4>
                      {body.highlightText.split('\n\n').map((text, i) => <p key={i}>{text}</p>)}
                    </div>
                  )}
                  <ul className="planet-facts">
                    {body.facts?.map((fact, i) => <li key={i}>{fact}</li>)}
                  </ul>
                  <dl className="planet-specs">
                    {[
                      ['Diâmetro', body.diameter], 
                      [body.id === 'lua' ? 'Distância da Terra' : 'Distância do Sol', body.distanceSun || body.distanceCenter], 
                      ['Translação', body.orbitalPeriod], 
                      ['Temperatura', body.temperature || (body.isSun ? '5.500 °C na superfície' : null)]
                    ].filter(([, value]) => value).map(([label, value]) => (
                      <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                    ))}
                  </dl>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

