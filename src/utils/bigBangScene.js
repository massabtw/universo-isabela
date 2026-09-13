// A cena usa tempo decorrido, para manter o mesmo ritmo em 30, 60 ou 120 Hz.
export const BIG_BANG_DURATION = 6400;
export const BIG_BANG_IGNITION = 1.25;

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };

function randomGenerator() {
  let seed = 14092007;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function glowTexture(color) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, `rgba(${color},0.6)`);
  gradient.addColorStop(0.25, `rgba(${color},0.28)`);
  gradient.addColorStop(0.65, `rgba(${color},0.07)`);
  gradient.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  return canvas;
}

export function createBigBangScene(canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return { draw() {}, resize() {} };
  const random = randomGenerator();
  const colors = ['239,206,150', '147,185,255', '164,119,219'];
  const glows = colors.map(glowTexture);
  const core = glowTexture('255,230,183');
  const stars = Array.from({ length: window.innerWidth < 640 ? 480 : 850 }, () => ({
    angle: random() * Math.PI * 2,
    radius: 0.08 + random() * 0.95,
    depth: 0.2 + random() * 1.8,
    size: 0.4 + random() * 1.5,
    color: colors[Math.floor(random() * colors.length)],
    twist: (random() - 0.5) * 1.2,
  }));
  const clouds = Array.from({ length: 38 }, (_, i) => ({
    angle: i * 2.39996 + random() * 0.5,
    radius: 0.12 + random() * 0.65,
    size: 0.18 + random() * 0.34,
    color: i % 3,
    stretch: 0.35 + random() * 0.5,
  }));
  let width, height, reach;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    reach = Math.hypot(width, height) * 0.6;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  function draw(time) {
    const gathering = smooth(time / BIG_BANG_IGNITION);
    const age = Math.max(0, time - BIG_BANG_IGNITION);
    const expansion = 1 - Math.exp(-age * 1.25);
    const settling = smooth((age - 1.8) / 1.8);
    const fade = 1 - smooth((time - 5.7) / 0.7);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#020304';
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height * 0.46);
    ctx.globalCompositeOperation = 'lighter';

    // Nuvens irregulares formam a nebulosa, sem uma borda circular.
    if (age > 0) {
      for (const cloud of clouds) {
        const angle = cloud.angle + expansion * 0.35;
        const radius = cloud.radius * reach * expansion;
        const size = reach * cloud.size * (0.2 + expansion * 1.8);
        ctx.save();
        ctx.translate(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.68);
        ctx.rotate(angle - 0.5);
        ctx.scale(1, cloud.stretch);
        ctx.globalAlpha = fade * (0.055 + 0.085 * (1 - settling)) * smooth(age * 3);
        ctx.drawImage(glows[cloud.color], -size, -size, size * 2, size * 2);
        ctx.restore();
      }
    }

    const position = (star, elapsed) => {
      if (elapsed < BIG_BANG_IGNITION) {
        const pull = smooth(elapsed / BIG_BANG_IGNITION);
        const radius = star.radius * reach * (1 - pull) + 2;
        const angle = star.angle + pull * star.twist;
        return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8];
      }
      const flight = elapsed - BIG_BANG_IGNITION;
      const travel = 1 - Math.exp(-flight * (0.65 + star.depth * 0.5));
      const radius = 2 + reach * star.radius * (0.25 + star.depth) * travel;
      const angle = star.angle + star.twist * Math.exp(-flight * 1.8);
      return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8];
    };
    for (const star of stars) {
      const [x, y] = position(star, time);
      const tail = age > 0 ? 0.09 * (1 - settling) + 0.008 : 0.026;
      const [px, py] = position(star, Math.max(0, time - tail));
      ctx.globalAlpha = fade * (age > 0 ? 0.5 + 0.4 * (1 - settling) : 0.25 + gathering * 0.55);
      ctx.strokeStyle = `rgb(${star.color})`;
      ctx.lineWidth = star.size * (age > 0 ? 0.8 : 0.55);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = `rgb(${star.color})`;
      ctx.fillRect(x, y, star.size * 0.7, star.size * 0.7);
    }

    // Um sopro de luz e uma difração horizontal marcam a ruptura.
    const ignition = age > 0 ? Math.exp(-age * 3.4) : 0;
    const coreSize = age > 0 ? 22 + ignition * reach * 0.5 : 24 + gathering * 70;
    ctx.globalAlpha = fade * (age > 0 ? ignition : gathering);
    ctx.drawImage(core, -coreSize, -coreSize, coreSize * 2, coreSize * 2);
    ctx.save();
    ctx.scale(1, 0.025);
    const flareSize = age > 0 ? reach * (0.7 + expansion) : 130 * gathering;
    ctx.globalAlpha = fade * (age > 0 ? ignition * 0.8 : gathering * 0.45);
    ctx.drawImage(core, -flareSize, -flareSize, flareSize * 2, flareSize * 2);
    ctx.restore();
    ctx.restore();
  }
  return { draw, resize };
}

export function playBigBangSound() {
  let ctx;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return () => {};
    ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    const start = ctx.currentTime;
    const impact = start + BIG_BANG_IGNITION;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.frequency.setValueAtTime(42, start);
    oscillator.frequency.exponentialRampToValueAtTime(110, impact);
    oscillator.frequency.exponentialRampToValueAtTime(22, impact + 2.8);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.09, impact);
    gain.gain.exponentialRampToValueAtTime(0.001, impact + 3);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(impact + 3.1);
    oscillator.onended = () => { if (ctx.state !== 'closed') void ctx.close().catch(() => {}); };
  } catch {
    // A sequência visual também funciona quando áudio não está disponível.
  }
  return () => { if (ctx && ctx.state !== 'closed') void ctx.close().catch(() => {}); };
}
