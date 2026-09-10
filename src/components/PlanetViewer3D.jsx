/**
 * ============================================
 * PlanetViewer3D.jsx — Globo Planetário 3D Real (Three.js WebGL)
 * ============================================
 *
 * Renderização tridimensional autêntica em Three.js:
 * - Suporta Sol 3D com emissão radiante e corona solar
 * - Suporta todos os 8 planetas com texturas esféricas da NASA
 * - Rotação interativa em 360° nos eixos X e Y (mouse e touch no celular)
 * - Anéis 3D reais para Saturno (RingGeometry)
 * - Iluminação solar direcional realista
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// Cache global de texturas Three.js para carregamento instantâneo sem travamentos
const TEXTURE_CACHE = new Map();

export default function PlanetViewer3D({ 
  textureUrl, 
  planetName,
  atmosphereColor = "#ffffff", 
  hasRings = false,
  ringTextureUrl = null,
  isSun = false,
  isAutoRotating = true,
  onToggleAutoRotate,
  onResetView
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sphereMeshRef = useRef(null);
  const ringMeshRef = useRef(null);
  const coronaMeshRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(!TEXTURE_CACHE.has(textureUrl));

  // Estados de controle de rotação e inércia
  const rotationRef = useRef({ x: 0.15, y: 0 });
  const targetRotationRef = useRef({ x: 0.15, y: 0 });
  const isDraggingRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  // Entrada cinematográfica: a câmera viaja do espaço profundo (9.5) até a órbita (5.2)
  const zoomDistRef = useRef(9.5);
  const targetZoomRef = useRef(5.2);

  // Inicialização única do Three.js
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Cena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Câmera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, zoomDistRef.current);
    cameraRef.current = camera;

    // 3. Renderer WebGL de alto desempenho
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Luzes espaciais cinematográficas
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(7, 4, 6);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x283850, 0.45);
    scene.add(ambientLight);

    const rimLight = new THREE.PointLight(new THREE.Color(atmosphereColor), 1.2, 25);
    rimLight.position.set(-6, -3, -5);
    scene.add(rimLight);

    // 5. Grupo mestre do Planeta
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Esfera base do Planeta / Sol
    const geometry = new THREE.SphereGeometry(1.85, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      roughness: isSun ? 0.2 : 0.75,
      metalness: 0.05,
    });
    const sphere = new THREE.Mesh(geometry, material);
    planetGroup.add(sphere);
    sphereMeshRef.current = sphere;

    // 6. Loop de Animação com inércia e amortecimento suave
    let clock = 0;
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      clock += 0.03;

      // Auto-rotação contínua no eixo Y
      if (isAutoRotating && !isDraggingRef.current) {
        targetRotationRef.current.y += isSun ? 0.002 : 0.0035;
      }

      // Amortecimento suave de interpolação (lerp)
      rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.08;
      rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.08;
      zoomDistRef.current += (targetZoomRef.current - zoomDistRef.current) * 0.1;

      // Limitar inclinação vertical
      targetRotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationRef.current.x));

      // Aplicação da rotação 3D genuína
      if (sphereMeshRef.current) {
        sphereMeshRef.current.rotation.x = rotationRef.current.x;
        sphereMeshRef.current.rotation.y = rotationRef.current.y;
      }

      // Se houver anéis (Saturno)
      if (ringMeshRef.current) {
        ringMeshRef.current.rotation.x = rotationRef.current.x + 0.45;
        ringMeshRef.current.rotation.y = rotationRef.current.y * 0.8;
      }

      // Se for o Sol: pulsação da corona solar
      if (coronaMeshRef.current) {
        const pulse = 1 + Math.sin(clock) * 0.04;
        coronaMeshRef.current.scale.set(pulse, pulse, pulse);
        coronaMeshRef.current.rotation.z += 0.001;
      }

      // Câmera e renderização
      if (cameraRef.current) {
        cameraRef.current.position.z = zoomDistRef.current;
      }
      renderer.render(scene, camera);
    };
    animate();

    // 7. Redimensionamento responsivo otimizado (com debounce para não travar animações)
    let resizeTimer = null;
    const resizeObserver = new ResizeObserver((entries) => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        for (const entry of entries) {
          const { width: newW, height: newH } = entry.contentRect;
          if (newW > 0 && newH > 0 && rendererRef.current && cameraRef.current) {
            cameraRef.current.aspect = newW / newH;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(newW, newH);
          }
        }
      });
    });
    resizeObserver.observe(container);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeObserver.disconnect();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Atualização dinâmica da textura do astro com Cache Instantâneo
  useEffect(() => {
    if (!sphereMeshRef.current || !textureUrl) return;

    // Inicializar carregador de texturas no escopo do efeito para os anéis de Saturno não crasharem
    const textureLoader = new THREE.TextureLoader();

    const applyTexture = (texture) => {
      if (!sphereMeshRef.current) return;
      const mat = sphereMeshRef.current.material;
      if (mat.map && mat.map !== texture) mat.map.dispose();
      mat.map = texture;

      if (isSun) {
        mat.emissive = new THREE.Color(0xff8811);
        mat.emissiveMap = texture;
        mat.emissiveIntensity = 1.4;
        mat.roughness = 0.2;
      } else {
        mat.emissive = new THREE.Color(0x000000);
        mat.emissiveMap = null;
        mat.emissiveIntensity = 0;
        mat.roughness = 0.75;
      }
      mat.needsUpdate = true;
      setIsLoading(false);
    };

    if (TEXTURE_CACHE.has(textureUrl)) {
      applyTexture(TEXTURE_CACHE.get(textureUrl));
    } else {
      setIsLoading(true);
      textureLoader.load(
        textureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          TEXTURE_CACHE.set(textureUrl, texture);
          applyTexture(texture);
        },
        undefined,
        (err) => {
          console.warn("Erro ao carregar textura Three.js:", textureUrl, err);
          setIsLoading(false);
        }
      );
    }

    const scene = sceneRef.current;
    if (scene) {
      // Limpeza de corona anterior
      if (coronaMeshRef.current) {
        scene.remove(coronaMeshRef.current);
        coronaMeshRef.current.geometry.dispose();
        coronaMeshRef.current.material.dispose();
        coronaMeshRef.current = null;
      }

      // Corona Solar do Sol em 3D
      if (isSun) {
        const coronaGeo = new THREE.SphereGeometry(1.98, 32, 32);
        const coronaMat = new THREE.MeshBasicMaterial({
          color: 0xffaa22,
          transparent: true,
          opacity: 0.35,
          side: THREE.BackSide,
        });
        const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
        scene.add(coronaMesh);
        coronaMeshRef.current = coronaMesh;
      }

      // Gerenciamento dos anéis 3D de Saturno
      if (ringMeshRef.current) {
        scene.remove(ringMeshRef.current);
        ringMeshRef.current.geometry.dispose();
        ringMeshRef.current.material.dispose();
        ringMeshRef.current = null;
      }

      if (hasRings) {
        const ringGeo = new THREE.RingGeometry(2.3, 3.8, 64);
        const pos = ringGeo.attributes.position;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          ringGeo.attributes.uv.setXY(i, v3.length() < 3.0 ? 0 : 1, 1);
        }

        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xE2CE9F,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          roughness: 0.6,
        });

        if (ringTextureUrl) {
          if (TEXTURE_CACHE.has(ringTextureUrl)) {
            ringMat.map = TEXTURE_CACHE.get(ringTextureUrl);
            ringMat.needsUpdate = true;
          } else {
            textureLoader.load(ringTextureUrl, (rTex) => {
              TEXTURE_CACHE.set(ringTextureUrl, rTex);
              ringMat.map = rTex;
              ringMat.needsUpdate = true;
            });
          }
        }

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.rotation.y = -Math.PI / 8;
        scene.add(ringMesh);
        ringMeshRef.current = ringMesh;
      }
    }
  }, [textureUrl, hasRings, ringTextureUrl, isSun]);

  // Controles táteis e com mouse para girar livremente em 360 graus
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
    pointerPosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;

    const deltaX = clientX - pointerPosRef.current.x;
    const deltaY = clientY - pointerPosRef.current.y;

    pointerPosRef.current = { x: clientX, y: clientY };

    targetRotationRef.current.y += deltaX * 0.008;
    targetRotationRef.current.x += deltaY * 0.008;
  }, []);

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    targetZoomRef.current = Math.max(3.5, Math.min(8.0, targetZoomRef.current + e.deltaY * 0.004));
  };

  const handleReset = () => {
    targetRotationRef.current = { x: 0.15, y: 0 };
    targetZoomRef.current = 5.2;
    if (onResetView) onResetView();
  };

  const handleZoomIn = () => {
    targetZoomRef.current = Math.max(3.5, targetZoomRef.current - 0.7);
  };

  const handleZoomOut = () => {
    targetZoomRef.current = Math.min(8.0, targetZoomRef.current + 0.7);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* Brilho Atmosférico Cósmico de Fundo */}
      <div 
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-35 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${isSun ? '#FFAE34' : atmosphereColor} 0%, transparent 70%)`
        }}
      />

      {/* Canvas Three.js com suporte completo a gestos touch e mouse */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center overflow-hidden"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-celestial-gold/30 border-t-celestial-gold animate-spin" />
              <span className="text-[11px] font-mono tracking-widest text-celestial-gold uppercase">
                Renderizando Globo 3D...
              </span>
            </div>
          </div>
        )}
      </div>


      {/* Barra de Controles Rápidos do Telescópio 3D */}
      <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={onToggleAutoRotate}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all border flex items-center gap-1.5 ${
            isAutoRotating 
              ? "bg-celestial-gold/20 text-celestial-gold border-celestial-gold/50 shadow-md shadow-celestial-gold/10" 
              : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
          }`}
          title="Alternar rotação automática"
        >
          <span>{isAutoRotating ? "⏸" : "▶"}</span>
          <span>{isAutoRotating ? "Pausar" : "Girar"}</span>
        </button>

        <button
          onClick={handleZoomIn}
          className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-xs font-mono text-gray-300 hover:text-white transition-colors"
          title="Aproximar Zoom"
        >
          +
        </button>

        <button
          onClick={handleZoomOut}
          className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-xs font-mono text-gray-300 hover:text-white transition-colors"
          title="Afastar Zoom"
        >
          -
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          title="Resetar ângulo e zoom"
        >
          <span>⟲</span>
          <span>Resetar</span>
        </button>
      </div>

    </div>
  );
}
