/**
 * ====================================================================
 * GalaxySection.jsx — Via Láctea Espiral Cinemática (Three.js 3D)
 * ====================================================================
 *
 * Uma galáxia espiral fotorrealista com 45.000 partículas estelares,
 * núcleo dourado volumétrico, braços espirais logarítmicos e rotação cósmica.
 *
 * Comportamento de Scroll:
 * 1. No início (scroll = 0): A galáxia fica no canto superior direito
 *    com o texto no centro: "Toda estrela tem uma história. Esta viagem é a sua."
 * 2. Conforme você rola: A galáxia viaja suavemente até o centro da tela
 *    e se aproxima da câmera (zoom in dramático preenchendo a tela).
 * 3. Ao aproximar completamente: O scroll desce naturalmente para a próxima seção.
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GalaxySection() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Referência para sincronizar o scroll com o loop do Three.js
  const progressRef = useRef(0);

  // Monitora o scroll com alta precisão
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame;
    const updateScroll = () => {
      const rect = container.getBoundingClientRect();
      const distance = container.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));
      progressRef.current = p;
      setScrollProgress(p);
      frame = null;
    };

    const schedule = () => {
      if (frame == null) frame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Inicialização e renderização da Galáxia em Three.js
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Cena, Câmera e Renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Textura radial difusa das estrelas (sem artefatos quadrados)
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.18, "rgba(255, 240, 200, 0.85)");
      gradient.addColorStop(0.45, "rgba(200, 220, 255, 0.28)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const starTexture = createStarTexture();

    // 3. Grupo da Galáxia Espiral
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Parâmetros da Espiral Galáctica
    const particleCount = 42000;
    const branches = 3;
    const radius = 6.8;
    const spin = 0.95;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorInside = new THREE.Color("#FFE082"); // Dourado âmbar brilhante
    const colorCore = new THREE.Color("#FFF8E7");   // Centro branco-quente radiante
    const colorMid = new THREE.Color("#BAE6FD");    // Azul celeste nos braços
    const colorOutside = new THREE.Color("#818CF8");// Violeta/azul cósmico nas bordas

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distribuição de raio com concentração densa no centro
      const r = Math.pow(Math.random(), 2.1) * radius;
      const branchAngle = ((i % branches) * 2 * Math.PI) / branches;
      const spinAngle = r * spin;

      // Dispersão tridimensional (mais espessa no núcleo, afilada nos braços)
      const randomPower = 2.8;
      const randomX = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * (r + 0.3);
      const randomY = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.22 * (r + 0.2);
      const randomZ = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * (r + 0.3);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Mistura de cor por distância do núcleo
      let mixedColor;
      if (r < 1.2) {
        mixedColor = colorCore.clone().lerp(colorInside, r / 1.2);
      } else if (r < 3.8) {
        mixedColor = colorInside.clone().lerp(colorMid, (r - 1.2) / 2.6);
      } else {
        mixedColor = colorMid.clone().lerp(colorOutside, (r - 3.8) / (radius - 3.8));
      }

      // Variação estelar individual
      const brightness = Math.random() * 0.3 + 0.7;
      colors[i3] = mixedColor.r * brightness;
      colors[i3 + 1] = mixedColor.g * brightness;
      colors[i3 + 2] = mixedColor.b * brightness;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.052,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    galaxyGroup.add(points);

    // 4. Núcleo Galáctico Volumétrico (Supermassive Glow)
    const createCoreGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255, 235, 170, 0.95)");
      gradient.addColorStop(0.2, "rgba(240, 195, 95, 0.6)");
      gradient.addColorStop(0.55, "rgba(180, 140, 50, 0.18)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const coreGlowMaterial = new THREE.SpriteMaterial({
      map: createCoreGlowTexture(),
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreSprite = new THREE.Sprite(coreGlowMaterial);
    coreSprite.scale.set(3.4, 3.4, 1);
    galaxyGroup.add(coreSprite);

    // Halo estelar externo suave
    const outerHaloMaterial = new THREE.SpriteMaterial({
      map: createCoreGlowTexture(),
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const outerHaloSprite = new THREE.Sprite(outerHaloMaterial);
    outerHaloSprite.scale.set(6.8, 6.8, 1);
    galaxyGroup.add(outerHaloSprite);

    // 5. Loop de Animação 60-120 FPS
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current; // progresso do scroll de 0 a 1

      // Rotação cósmica lenta e viva
      galaxyGroup.rotation.y = elapsedTime * 0.045;

      // ─── SCROLL INTERATIVO: DO TOPO-DIREITO AO CENTRO + APROXIMAÇÃO ───
      // progress 0: No canto superior direito (x: 2.8, y: 1.4, z: -3.6)
      // progress 0.85+: No centro exato e aproximada (x: 0, y: 0, z: 1.4)
      const targetX = 2.8 * (1 - Math.min(1, p * 1.25));
      const targetY = 1.4 * (1 - Math.min(1, p * 1.25));
      const targetZ = -3.6 + Math.min(1, p * 1.15) * 5.0; // aproximação de -3.6 até +1.4
      const targetScale = 0.65 + Math.min(1, p * 1.15) * 0.75; // escala de 0.65 até 1.4
      const targetTilt = 0.82 - p * 0.3; // perspectiva de inclinação suave

      // Interpolação suave (lerp) para máxima fluidez
      galaxyGroup.position.x += (targetX - galaxyGroup.position.x) * 0.12;
      galaxyGroup.position.y += (targetY - galaxyGroup.position.y) * 0.12;
      galaxyGroup.position.z += (targetZ - galaxyGroup.position.z) * 0.12;
      galaxyGroup.scale.set(targetScale, targetScale, targetScale);
      galaxyGroup.rotation.x = targetTilt;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth || window.innerWidth;
      const newH = mount.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // Limpeza completa
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      starTexture.dispose();
      coreGlowMaterial.dispose();
      outerHaloMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Textos centrais da Imagem 4:
  // "Toda estrela tem uma história. Esta viagem é a sua."
  // Ficam nítidos no início e desvanecem conforme a galáxia centraliza e cresce
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.6);
  const textTranslateY = scrollProgress * -25;

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full"
      style={{ height: "230svh" }}
      id="galaxy"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#03070E]">

        {/* ── CANVAS WEBGL THREE.JS COM A VIA LÁCTEA ── */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* ── CONTEÚDO EDITORIAL CENTRAL (IMAGEM 4) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none select-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            willChange: "opacity, transform",
          }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white/95 leading-tight tracking-tight mb-4 max-w-2xl drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            Toda estrela tem uma história.
            <br />
            <span className="text-white/85">Esta viagem é a sua.</span>
          </h2>

          <a
            href="#lua"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("lua")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pointer-events-auto text-[12px] sm:text-xs font-mono text-[#E5C483]/90 hover:text-[#E5C483] tracking-[0.25em] uppercase flex items-center gap-2 transition-colors cursor-pointer mt-4 py-2 px-4 rounded-full bg-white/[0.02] border border-white/10 hover:border-[#E5C483]/40"
          >
            <span>Continuar a viagem</span>
            <span className="text-sm">↓</span>
          </a>
        </div>

        {/* Indicador de scroll discreto no rodapé */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
            Role para explorar
          </span>
          <span className="text-celestial-gold/40 animate-bounce text-sm">↓</span>
        </div>

      </div>
    </section>
  );
}
