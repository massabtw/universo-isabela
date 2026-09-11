import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { PLANETS_DATA, SUN_DATA } from '../data/planetsData';

const BODIES = [SUN_DATA, ...PLANETS_DATA];

export default function OrbitalScene({ onSelect }) {
  const mount = useRef(null);
  const labels = useRef([]);
  const api = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [zoom, setZoom] = useState(1);
  const [playing, setPlaying] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.domElement.setAttribute('aria-label', 'Sistema solar em 3D interativo');
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);

    // OrbitControls configurado para NÃO travar o scroll da página
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false; // DESLIGA O INTERCEPTADOR DE WHEEL DO MOUSE: Scroll da página 100% livre!
    controls.minPolarAngle = 0.08;
    controls.maxPolarAngle = Math.PI - 0.08;

    // Iluminação espacial cinematográfica
    const ambientLight = new THREE.AmbientLight(0xddeeff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffecc2, 120, 0, 1.2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Fundo sutil de poeira estelar cintilante
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, transparent: true, opacity: 0.45 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const loader = new THREE.TextureLoader();
    const textures = [];
    let disposed = false;

    // Criar astros e órbitas luminosas
    const meshes = BODIES.map((body, index) => {
      const isSun = index === 0;
      const size = isSun ? 1.05 : [0.35, 0.48, 0.50, 0.38, 0.88, 0.72, 0.58, 0.56][index - 1];

      const material = new THREE.MeshStandardMaterial({
        color: body.color,
        roughness: isSun ? 0.2 : 0.8,
        metalness: 0.05,
        ...(isSun ? { emissive: new THREE.Color(0xff8811), emissiveIntensity: 1.5 } : {})
      });

      if (body.texture3D) {
        loader.load(body.texture3D, texture => {
          if (disposed) { texture.dispose(); return; }
          texture.colorSpace = THREE.SRGBColorSpace;
          textures.push(texture);
          material.map = texture;
          material.color.set('white');
          if (isSun) {
            material.emissiveMap = texture;
          }
          material.needsUpdate = true;
        });
      }

      const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 24), material);
      mesh.userData = {
        id: body.id,
        name: body.name,
        symbol: body.symbol || '✦',
        color: body.color,
        size,
        radius: isSun ? 0 : 2.5 + index * 1.72,
        angle: (body.mapAngle || 0) * (Math.PI / 180)
      };
      scene.add(mesh);

      // Brilho solar (Corona)
      if (isSun) {
        const coronaGeo = new THREE.SphereGeometry(size * 1.15, 32, 24);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: 0xffaa22,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide
        });
        const corona = new THREE.Mesh(coronaGeo, coronaMat);
        mesh.add(corona);
      }

      // Linhas orbitais de alta fidelidade
      if (index > 0) {
        const segments = 160;
        const points = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(theta) * mesh.userData.radius, 0, Math.sin(theta) * mesh.userData.radius));
        }
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMat = new THREE.LineBasicMaterial({
          color: 0xa8c4d8,
          transparent: true,
          opacity: 0.18
        });
        const orbit = new THREE.Line(orbitGeo, orbitMat);
        scene.add(orbit);
      }

      // Anéis realistas de Saturno
      if (body.hasRings) {
        const ringGeo = new THREE.RingGeometry(size * 1.45, size * 2.3, 64);
        const pos = ringGeo.attributes.position;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          ringGeo.attributes.uv.setXY(i, v3.length() < size * 1.8 ? 0 : 1, 1);
        }
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xdfd3ad,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
          roughness: 0.6
        });
        if (body.ringTexture) {
          loader.load(body.ringTexture, rTex => {
            ringMat.map = rTex;
            ringMat.needsUpdate = true;
          });
        }
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.3;
        mesh.add(ring);
      }

      return mesh;
    });

    let fit = 46;
    const resize = () => {
      if (!host) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fit = 44 / Math.min(1, camera.aspect);
      camera.position.set(0, 0.68, 0.72).normalize().multiplyScalar(fit / zoom);
      controls.update();
      controls.saveState();
      renderer.setSize(width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    api.current = {
      zoom: targetZoom => {
        const z = Math.max(0.7, Math.min(2.5, targetZoom));
        setZoom(z);
        camera.position.setLength(fit / z);
        controls.update();
      },
      reset: () => {
        controls.reset();
        setZoom(1);
        camera.position.set(0, 0.68, 0.72).normalize().multiplyScalar(fit);
        controls.update();
      }
    };

    let visible = false;
    let frame;
    let previous = 0;
    let elapsed = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);

    const projected = new THREE.Vector3();
    const animate = time => {
      frame = requestAnimationFrame(animate);
      const delta = Math.min((time - previous) / 1000 || 0, 0.05);
      previous = time;
      if (!visible || document.hidden) return;

      if (playingRef.current) elapsed += delta;
      controls.update();

      meshes.forEach((mesh, index) => {
        const { radius, angle, size } = mesh.userData;
        if (radius > 0) {
          const a = angle + elapsed * 0.022 / Math.sqrt(index || 1);
          mesh.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
        }
        mesh.rotation.y = elapsed * 0.06;

        // Projeção dos rótulos na tela
        projected.copy(mesh.position).project(camera);
        const label = labels.current[index];
        if (label) {
          const x = (projected.x + 1) * host.clientWidth / 2;
          const y = (1 - projected.y) * host.clientHeight / 2;
          const pixelRadius = size * host.clientHeight / (2 * Math.tan(Math.PI / 8) * mesh.position.distanceTo(camera.position));
          label.style.transform = `translate(${x}px, ${y + pixelRadius + 6}px) translateX(-50%)`;
          const isVisible = Math.abs(projected.x) < 0.95 && Math.abs(projected.y) < 0.88 && projected.z < 1;
          label.style.opacity = isVisible ? '1' : '0';
          label.style.pointerEvents = isVisible ? 'auto' : 'none';
        }
      });

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    // Raycasting para clique direto no planeta 3D
    const raycaster = new THREE.Raycaster();
    let start = null;
    const down = e => { start = { x: e.clientX, y: e.clientY }; };
    const up = e => {
      if (!start || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return;
      const bounds = host.getBoundingClientRect();
      raycaster.setFromCamera(
        new THREE.Vector2(
          ((e.clientX - bounds.left) / bounds.width) * 2 - 1,
          -((e.clientY - bounds.top) / bounds.height) * 2 + 1
        ),
        camera
      );
      const hit = raycaster.intersectObjects(meshes, false)[0];
      if (hit) onSelectRef.current(hit.object.userData.id);
      start = null;
    };

    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointerup', up);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointerup', up);
      scene.traverse(obj => {
        obj.geometry?.dispose();
        obj.material?.dispose();
      });
      textures.forEach(t => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── PALCO 3D COM DESIGN REFINADO E SCROLL TOTALMENTE SEGURO ── */}
      <div 
        className="w-full h-[480px] sm:h-[580px] lg:h-[640px] relative overflow-hidden rounded-3xl bg-midnight-950/80 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Glow cósmico de fundo */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(229,196,131,0.12) 0%, rgba(13,22,34,0.4) 60%, transparent 80%)' }}
        />

        {/* Canvas WebGL Three.js */}
        <div 
          ref={mount} 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Etiquetas Flutuantes Luxuosas com Símbolo e Cor */}
          {!failed && BODIES.map((body, i) => (
            <button
              key={body.id}
              ref={el => { labels.current[i] = el; }}
              onClick={() => onSelect(body.id)}
              aria-label={`Aproximar de ${body.name}`}
              className="absolute top-0 left-0 px-2.5 py-1 rounded-full bg-midnight-950/80 border border-white/15 hover:border-celestial-gold/60 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all duration-200 hover:scale-110 cursor-pointer group text-left select-none"
              style={{ transition: 'opacity 0.25s, transform 0.05s' }}
            >
              <span 
                className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: body.color, boxShadow: `0 0 8px ${body.color}` }}
              />
              <span className="text-[11px] font-sans font-medium text-gray-200 group-hover:text-white">
                {body.name}
              </span>
            </button>
          ))}

          {failed && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-gray-400 font-light">
              Visualização 3D indisponível neste navegador. Escolha um astro na barra inferior.
            </div>
          )}
        </div>

        {/* Dica discreta no topo */}
        <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-900/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-gray-400 pointer-events-none">
          <Compass size={13} className="text-celestial-gold animate-spin" style={{ animationDuration: '12s' }} />
          <span>Arraste para orbitar o Sistema</span>
        </div>

        {/* Controles Flutuantes da Câmera (Clean & Minimalista) */}
        <div className="absolute bottom-4 right-4 sm:right-6 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={() => api.current?.zoom(zoom + 0.25)}
            className="w-9 h-9 rounded-full bg-midnight-900/80 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-md"
            title="Aproximar visualização"
            aria-label="Aproximar visualização"
          >
            <ZoomIn size={16} />
          </button>

          <button
            type="button"
            onClick={() => api.current?.zoom(zoom - 0.25)}
            className="w-9 h-9 rounded-full bg-midnight-900/80 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-md"
            title="Afastar visualização"
            aria-label="Afastar visualização"
          >
            <ZoomOut size={16} />
          </button>

          <button
            type="button"
            onClick={() => api.current?.reset()}
            className="w-9 h-9 rounded-full bg-midnight-900/80 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-md"
            title="Restaurar ângulo cósmico"
            aria-label="Restaurar ângulo"
          >
            <RotateCcw size={15} />
          </button>

          <button
            type="button"
            onClick={() => setPlaying(p => !p)}
            className="px-3.5 h-9 rounded-full bg-midnight-900/80 hover:bg-white/15 border border-white/15 text-gray-300 hover:text-white flex items-center gap-1.5 transition-all backdrop-blur-md cursor-pointer shadow-md text-xs font-mono"
            title={playing ? 'Pausar translação' : 'Animar translação'}
            aria-label={playing ? 'Pausar translação' : 'Animar translação'}
          >
            {playing ? <Pause size={14} className="text-celestial-gold" /> : <Play size={14} className="text-celestial-gold" />}
            <span className="hidden sm:inline">{playing ? 'Pausar' : 'Girar'}</span>
          </button>
        </div>
      </div>

      {/* ── DOCK DE SELEÇÃO RÁPIDA DOS ASTROS ── */}
      <div className="w-full max-w-4xl mt-6 flex items-center justify-center gap-2 flex-wrap px-2">
        {BODIES.map(body => (
          <button
            key={body.id}
            onClick={() => onSelect(body.id)}
            className="group px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.09] border border-white/10 hover:border-celestial-gold/50 text-xs font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <span 
              className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: body.color }}
            />
            <span className="text-gray-300 group-hover:text-white font-medium">
              {body.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
