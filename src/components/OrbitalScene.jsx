import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
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
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
    catch { setFailed(true); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.domElement.setAttribute('aria-label', 'Sistema solar em 3D');
    host.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 250);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minPolarAngle = 0.03;
    controls.maxPolarAngle = Math.PI - 0.03;
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const light = new THREE.PointLight(0xffe6bc, 80, 0, 1);
    light.position.set(0, 2, 0);
    scene.add(light);
    const loader = new THREE.TextureLoader();
    const textures = [];
    let disposed = false;
    const meshes = BODIES.map((body, index) => {
      const size = index === 0 ? 0.95 : [0.32, 0.46, 0.48, 0.37, 0.83, 0.68, 0.55, 0.53][index - 1];
      const material = new THREE.MeshStandardMaterial({ color: body.color, roughness: 0.9, ...(index === 0 ? { emissive: '#ffb94b', emissiveIntensity: 1 } : {}) });
      loader.load(body.texture3D, texture => {
        if (disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.push(texture);
        material.map = texture;
        material.color.set('white');
        if (index === 0) material.emissiveMap = texture;
        material.needsUpdate = true;
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 24), material);
      mesh.userData = { id: body.id, size, radius: index ? 2.3 + index * 1.65 : 0, angle: (body.mapAngle || 0) * Math.PI / 180 };
      scene.add(mesh);
      if (index) {
        const points = Array.from({ length: 160 }, (_, i) => new THREE.Vector3(Math.cos(i / 160 * Math.PI * 2) * mesh.userData.radius, 0, Math.sin(i / 160 * Math.PI * 2) * mesh.userData.radius));
        const orbit = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: '#96acba', transparent: true, opacity: 0.25 }));
        scene.add(orbit);
      }
      if (body.hasRings) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.4, size * 2.15, 64), new THREE.MeshBasicMaterial({ color: '#c5b894', side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
        ring.rotation.x = Math.PI / 2.4;
        mesh.add(ring);
      }
      return mesh;
    });
    let fit = 45;
    const resize = () => {
      const width = host.clientWidth, height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fit = 44 / Math.min(1, camera.aspect);
      controls.minDistance = fit / 3;
      controls.maxDistance = fit * 1.3;
      camera.position.set(0, 0.67, 0.74).normalize().multiplyScalar(fit);
      controls.update();
      controls.saveState();
      renderer.setSize(width, height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const onChange = () => {
      setZoom(Math.round(fit / camera.position.length() * 100) / 100);
      renderer.domElement.dataset.camera = camera.position.toArray().map(n => n.toFixed(2)).join(',');
    };
    controls.addEventListener('change', onChange);
    api.current = {
      zoom: value => { camera.position.setLength(fit / value); controls.update(); },
      reset: () => { controls.reset(); setZoom(1); },
      rotate: (x, y) => { controls.rotateLeft(x); controls.rotateUp(y); controls.update(); },
    };
    let visible = false, frame, previous = 0, elapsed = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);
    const projected = new THREE.Vector3();
    const animate = time => {
      frame = requestAnimationFrame(animate);
      const delta = Math.min((time - previous) / 1000 || 0, 0.05);
      previous = time;
      if (!visible || document.hidden) return;
      if (playingRef.current) elapsed += delta;
      controls.update(delta);
      meshes.forEach((mesh, index) => {
        const { radius, angle, size } = mesh.userData;
        const a = angle + elapsed * 0.025 / Math.sqrt(index || 1);
        mesh.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
        mesh.rotation.y = elapsed * 0.08;
        projected.copy(mesh.position).project(camera);
        const label = labels.current[index];
        if (label) {
          const x = (projected.x + 1) * host.clientWidth / 2;
          const y = (1 - projected.y) * host.clientHeight / 2;
          const pixelRadius = size * host.clientHeight / (2 * Math.tan(Math.PI / 8) * mesh.position.distanceTo(camera.position));
          label.style.transform = `translate(${x}px, ${y + pixelRadius + 4}px) translateX(-50%)`;
          label.style.visibility = Math.abs(projected.x) < 0.94 && Math.abs(projected.y) < 0.85 && projected.z < 1 ? 'visible' : 'hidden';
        }
      });
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    const raycaster = new THREE.Raycaster();
    let start = null;
    const down = e => { start = { x: e.clientX, y: e.clientY }; };
    const up = e => {
      if (!start || Math.hypot(e.clientX - start.x, e.clientY - start.y) > 6) return;
      const bounds = host.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((e.clientX - bounds.left) / bounds.width * 2 - 1, -(e.clientY - bounds.top) / bounds.height * 2 + 1), camera);
      const hit = raycaster.intersectObjects(meshes, false)[0];
      if (hit) onSelectRef.current(hit.object.userData.id);
      start = null;
    };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointerup', up);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); resizeObserver.disconnect(); controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointerup', up);
      scene.traverse(obj => { obj.geometry?.dispose(); obj.material?.dispose(); });
      textures.forEach(texture => texture.dispose());
      renderer.dispose(); renderer.domElement.remove(); api.current = null;
    };
  }, []);

  const iconButton = (label, Icon, action) => <button type="button" className="icon-control" title={label} aria-label={label} onClick={action}><Icon size={18} aria-hidden="true" /></button>;
  return <div className="orbital-experience">
    <div className="orbital-stage" ref={mount} data-lenis-prevent tabIndex={0} role="group" aria-label="Mapa orbital interativo" onKeyDown={e => {
      const rotations = { ArrowLeft: [0.15, 0], ArrowRight: [-0.15, 0], ArrowUp: [0, 0.15], ArrowDown: [0, -0.15] };
      if (rotations[e.key]) { e.preventDefault(); api.current?.rotate(...rotations[e.key]); }
    }}>
      {!failed && BODIES.map((body, i) => <button className="orbital-label" key={body.id} ref={el => { labels.current[i] = el; }} onClick={() => onSelect(body.id)} aria-label={`Aproximar de ${body.name}`}>{body.name}</button>)}
      {failed && <p className="orbital-fallback">Visualização 3D indisponível neste navegador. Escolha um astro abaixo.</p>}
    </div>
    <div className="orbit-toolbar">
      <div className="orbit-directions">
        {iconButton('Girar para a esquerda', ArrowLeft, () => api.current?.rotate(0.25, 0))}
        {iconButton('Girar para a direita', ArrowRight, () => api.current?.rotate(-0.25, 0))}
        {iconButton('Inclinar para cima', ArrowUp, () => api.current?.rotate(0, 0.25))}
        {iconButton('Inclinar para baixo', ArrowDown, () => api.current?.rotate(0, -0.25))}
      </div>
      <label className="orbit-zoom"><ZoomOut size={18} aria-hidden="true" /><span className="sr-only">Zoom das órbitas</span><input type="range" min="0.77" max="3" step="0.01" value={zoom} onChange={e => { const value = Number(e.target.value); setZoom(value); api.current?.zoom(value); }} /><ZoomIn size={18} aria-hidden="true" /><output>{zoom.toFixed(1)}x</output></label>
      <div className="orbit-directions">
        {iconButton('Restaurar ângulo e zoom', RotateCcw, () => api.current?.reset())}
        {iconButton(playing ? 'Pausar órbitas' : 'Animar órbitas', playing ? Pause : Play, () => setPlaying(value => !value))}
      </div>
    </div>
    <div className="planet-picker">{BODIES.map(body => <button key={body.id} onClick={() => onSelect(body.id)}><span style={{ backgroundColor: body.color }} />{body.name}</button>)}</div>
  </div>;
}
