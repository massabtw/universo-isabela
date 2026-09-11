import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export default function PlanetViewer3D({ textureUrl, planetName, atmosphereColor = '#ffffff', hasRings, ringTextureUrl, isSun, isAutoRotating, onToggleAutoRotate }) {
  const mount = useRef(null);
  const api = useRef(null);
  const auto = useRef(isAutoRotating);
  auto.current = isAutoRotating;
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = mount.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
    catch { setFailed(true); setLoading(false); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.domElement.setAttribute('aria-label', planetName);
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const home = hasRings ? 10.8 : 6.6;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    camera.position.set(0, 0.3, reduced ? home : home * 1.9);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false; // Permite scroll vertical livre da página
    controls.minDistance = home * 0.65;
    controls.maxDistance = home * 2;
    controls.autoRotateSpeed = 0.55;
    scene.add(new THREE.AmbientLight(0xd5e0e8, 1.4));
    const sun = new THREE.DirectionalLight(0xfff6e4, 3.2);
    sun.position.set(5, 3, 6);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(atmosphereColor, 0.4);
    rim.position.set(-5, 0, 1);
    scene.add(rim);
    const group = new THREE.Group();
    group.rotation.z = hasRings ? -0.32 : 0.08;
    scene.add(group);
    const material = new THREE.MeshStandardMaterial({ color: atmosphereColor, roughness: 0.9, ...(isSun ? { emissive: '#ffbd66', emissiveIntensity: 1 } : {}) });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1.85, 48, 32), material);
    group.add(globe);
    let disposed = false;
    const textures = [];
    const loader = new THREE.TextureLoader();
    setLoading(true);
    loader.load(textureUrl, texture => {
      if (disposed) { texture.dispose(); return; }
      textures.push(texture);
      texture.colorSpace = THREE.SRGBColorSpace;
      material.map = texture; material.color.set('white');
      if (isSun) material.emissiveMap = texture;
      material.needsUpdate = true;
      setLoading(false);
    }, undefined, () => { if (!disposed) { setFailed(true); setLoading(false); } });
    if (hasRings) {
      const geometry = new THREE.RingGeometry(2.25, 3.7, 96);
      const position = geometry.attributes.position;
      const vertex = new THREE.Vector3();
      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);
        geometry.attributes.uv.setXY(i, (vertex.length() - 2.25) / 1.45, 0.5);
      }
      const ringMaterial = new THREE.MeshStandardMaterial({ color: '#d8cba7', side: THREE.DoubleSide, transparent: true, opacity: 0.82 });
      const ring = new THREE.Mesh(geometry, ringMaterial);
      ring.rotation.x = Math.PI / 2.6;
      group.add(ring);
      if (ringTextureUrl) loader.load(ringTextureUrl, texture => {
        if (disposed) { texture.dispose(); return; }
        textures.push(texture); texture.colorSpace = THREE.SRGBColorSpace;
        ringMaterial.map = texture; ringMaterial.needsUpdate = true;
      });
    }
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      camera.aspect = w / Math.max(1, h); camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host); resize();
    let visible = true, frame, previous = 0, approach = !reduced;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(host);
    controls.addEventListener('start', () => { approach = false; });
    const render = now => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - previous) / 1000 || 0, .05); previous = now;
      if (!visible || document.hidden) return;
      if (approach) {
        camera.position.setLength(THREE.MathUtils.damp(camera.position.length(), home, 4, delta));
        if (Math.abs(camera.position.length() - home) < .02) approach = false;
      }
      controls.autoRotate = auto.current;
      controls.update(delta);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
    api.current = {
      zoom: factor => { approach = false; camera.position.setLength(THREE.MathUtils.clamp(camera.position.length() * factor, controls.minDistance, controls.maxDistance)); controls.update(); },
      reset: () => { approach = false; camera.position.set(0, .3, home); controls.target.set(0, 0, 0); controls.update(); },
      rotate: (x, y) => { approach = false; controls.rotateLeft(x); controls.rotateUp(y); controls.update(); },
    };
    return () => {
      disposed = true; cancelAnimationFrame(frame);
      observer.disconnect(); resizeObserver.disconnect(); controls.dispose();
      scene.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
      textures.forEach(texture => texture.dispose());
      renderer.dispose(); renderer.domElement.remove(); api.current = null;
    };
  }, [textureUrl, planetName, atmosphereColor, hasRings, ringTextureUrl, isSun]);
  return <div className="globe-viewer">
    <div className="globe-canvas" ref={mount} data-lenis-prevent tabIndex={0} role="group" aria-label={'Modelo de ' + planetName} onKeyDown={e => {
      const directions = { ArrowLeft: [.2, 0], ArrowRight: [-.2, 0], ArrowUp: [0, .2], ArrowDown: [0, -.2] };
      if (directions[e.key]) { e.preventDefault(); api.current?.rotate(...directions[e.key]); }
    }}>
      {loading && <span className="globe-loading" role="status">Carregando {planetName}...</span>}
      {failed && <img className="globe-fallback" src={textureUrl} alt={planetName} />}
    </div>
    <div className="globe-controls">
      <button className="icon-control" aria-label="Aproximar planeta" title="Aproximar planeta" onClick={() => api.current?.zoom(.85)}><ZoomIn size={18} /></button>
      <button className="icon-control" aria-label="Afastar planeta" title="Afastar planeta" onClick={() => api.current?.zoom(1.15)}><ZoomOut size={18} /></button>
      <button className="icon-control" aria-label="Restaurar planeta" title="Restaurar planeta" onClick={() => api.current?.reset()}><RotateCcw size={18} /></button>
    </div>
  </div>;
}
