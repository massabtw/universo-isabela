import { useEffect, useId, useMemo, useState } from 'react';
import { calculateLunarData } from '../utils/moon';

export default function MoonPhase() {
  const [mode, setMode] = useState('today');
  const [today, setToday] = useState(() => new Date());
  const mask = useId();
  useEffect(() => {
    const refresh = () => setToday(new Date());
    const timer = setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', refresh); };
  }, []);
  const date = mode === 'birth' ? new Date('2007-09-14T00:00:00Z') : today;
  const data = useMemo(() => calculateLunarData(date), [mode, today]);
  const dateLabel = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', ...(mode === 'birth' ? { timeZone: 'UTC' } : {}) });
  return (
    <section id="lua" className="moon-observatory">
      <div className="moon-observatory-inner">
        <header className="moon-heading">
          <h2>O Astro Favorito da Bebela</h2>
          <p>A mesma Lua. Dois momentos da sua história.</p>
        </header>
        <div className="moon-observation">
          <div className="moon-facts">
            <h3>{mode === 'birth' ? 'A noite em que você chegou' : 'O céu desta noite'}</h3>
            <p className="moon-date">{dateLabel}</p>
            <dl className="moon-metrics">
              <div><dt>Fase lunar</dt><dd>{data.phaseName}</dd></div>
              <div><dt>Iluminação</dt><dd>{data.illuminationPercent}%</dd></div>
              <div><dt>Ciclo lunar</dt><dd>{data.ageDays} dias</dd></div>
              <div><dt>Referência</dt><dd>Hemisfério sul</dd></div>
            </dl>
            <p className="moon-poem">{mode === 'birth'
              ? 'Na noite em que você nasceu, a Lua desenhava um delicado arco de prata. Uma luz discreta no céu para receber a sua aqui na Terra.'
              : 'Não importa a fase da Lua esta noite. Há uma beleza em mudar, em recomeçar e em continuar brilhando.'}</p>
          </div>
          <div className="moon-portrait">
            <div className="segmented" role="group" aria-label="Data da Lua">
              <button aria-pressed={mode === 'birth'} onClick={() => setMode('birth')}>14 de setembro de 2007</button>
              <button aria-pressed={mode === 'today'} onClick={() => setMode('today')}>Lua de hoje</button>
            </div>
            <figure>
              <svg viewBox="0 0 100 100" role="img" aria-label={data.phaseName + ', ' + data.illuminationPercent + '% iluminada'} className="observatory-moon">
                <defs><mask id={mask}><rect width="100" height="100" fill="black" /><path d={data.lightPath} fill="white" transform={data.waxing ? 'translate(100 0) scale(-1 1)' : undefined} /></mask></defs>
                <image href="/moon-640.webp" x="-3.1" y="-3.1" width="106.2" height="106.2" opacity="0.13" />
                <image href="/moon-640.webp" x="-3.1" y="-3.1" width="106.2" height="106.2" mask={'url(#' + mask + ')'} />
              </svg>
              <figcaption><strong>{data.phaseName}</strong><span>{dateLabel}</span></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
