import { useMemo } from 'react';

export default function FloatingParticles() {
  const stars = useMemo(() => Array.from({ length: 110 }, (_, i) => ({
    x: (i * 61.803) % 100, y: (i * 37.719) % 100,
    size: i % 9 === 0 ? 2 : 1, opacity: 0.2 + (i % 5) * 0.12,
  })), []);
  return <div className="space-background" aria-hidden="true">
    {stars.map((s, i) => <i key={i} style={{ left: s.x + '%', top: s.y + '%', width: s.size, height: s.size, opacity: s.opacity, background: i % 7 === 0 ? '#86bdce' : '#e4e6e6' }} />)}
    <div className="distant-galaxy">{Array.from({ length: 90 }, (_, i) => {
      const r = Math.sqrt(i / 90) * 48;
      const angle = i * 2.4 + r * 0.08;
      return <i key={i} style={{ left: (50 + Math.cos(angle) * r) + '%', top: (50 + Math.sin(angle) * r) + '%', opacity: 0.15 + (1 - r / 50) * 0.5 }} />;
    })}</div>
    <div className="space-asteroid asteroid-one" />
    <div className="space-asteroid asteroid-two" />
  </div>;
}
