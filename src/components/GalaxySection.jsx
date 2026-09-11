/**
 * ====================================================================
 * GalaxySection.jsx — Via Láctea Espiral Animada no Scroll (Three.js 3D)
 * ====================================================================
 *
 * Animação requerida pelo usuário:
 * 1. No início do scroll (scroll = 0): A galáxia começa no canto superior direito
 *    com o texto centralizado: "Toda estrela tem uma história. Esta viagem é a sua."
 * 2. Conforme você scrolla: A galáxia viaja suavemente do topo direito para o MEIO
 *    e vai se APROXIMANDO da tela (zoom in dramático das 42.000 partículas estelares).
 * 3. Quando aproximar tudo no meio: O scroll simplesmente continua e desce
 *    para a próxima tela ("O Astro Favorito da Bebela" / MoonPhase)!
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GalaxySection() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sincronização direta de alta performance com o loop do Three.js
  const progressRef = useRef(0);

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

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // 1. Cena, Câmera e Renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Textura radial difusa das estrelas
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 240, 200, 0.85)");
      gradient.addColorStop(0.48, "rgba(200, 220, 255, 0.28)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const starTexture = createStarTexture();

    // 3. Grupo da Galáxia Espiral
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

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

      const r = Math.pow(Math.random(), 2.1) * radius;
      const branchAngle = ((i % branches) * 2 * Math.PI) / branches;
      const spinAngle = r * spin;

      const randomPower = 2.8;
      const randomX = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * (r + 0.3);
      const randomY = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.22 * (r + 0.2);
      const randomZ = Math.pow(Math.random(), randomPower) * (Math.random() < 0.5 ? 1 : -1) * 0.35 * (r + 0.3);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      let mixedColor;
      if (r < 1.2) {
        mixedColor = colorCore.clone().lerp(colorInside, r / 1.2);
      } else if (r < 3.8) {
        mixedColor = colorInside.clone().lerp(colorMid, (r - 1.2) / 2.6);
      } else {
        mixedColor = colorMid.clone().lerp(colorOutside, (r - 3.8) / (radius - 3.8));
      }

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

    // 4. Núcleo Volumétrico da Galáxia (Supermassive Core Glow)
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

    // 5. Loop de Animação com a Aproximação do Scroll
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current; // scroll progress de 0 a 1

      // Rotação suave contínua no espaço
      galaxyGroup.rotation.y = elapsedTime * 0.045;

      // ─── ANIMAÇÃO: DO TOPO DIREITO PARA O MEIO + APROXIMAÇÃO ───
      // progress 0.0: No topo direito (x: 2.8, y: 1.4, z: -3.5, scale: 0.65)
      // progress 0.85: No meio exato e aproximada (x: 0, y: 0, z: 1.2, scale: 1.35)
      const t = Math.min(1, p / 0.82); // conclui a centralização/zoom em 82% do scroll
      const targetX = 2.8 * (1 - t);
      const targetY = 1.4 * (1 - t);
      const targetZ = -3.5 + t * 4.8;      // aproximação de -3.5 até +1.3 (zoom in grandioso)
      const targetScale = 0.65 + t * 0.70; // escala de 0.65 até 1.35
      const targetTilt = 0.82 - t * 0.35;  // perspectiva de inclinação suave

      // Interpolação fluida a 60 FPS
      galaxyGroup.position.x += (targetX - galaxyGroup.position.x) * 0.12;
      galaxyGroup.position.y += (targetY - galaxyGroup.position.y) * 0.12;
      galaxyGroup.position.z += (targetZ - galaxyGroup.position.z) * 0.12;
      galaxyGroup.scale.set(targetScale, targetScale, targetScale);
      galaxyGroup.rotation.x = targetTilt;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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

  // Textos da Imagem 4:
  // Ficam visíveis no início e desvanecem suavemente conforme a galáxia atinge o meio
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.4);
  const textTranslateY = scrollProgress * -35;

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full"
      style={{ height: "200svh" }}
      id="galaxy"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#03070E] flex items-center justify-center select-none">

        {/* ── CANVAS WEBGL THREE.JS COM A VIA LÁCTEA ANIMADA ── */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* ── CONTEÚDO EDITORIAL CENTRAL (IMAGEM 4) ── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            willChange: "opacity, transform",
          }}
        >
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white/95 leading-tight tracking-tight mb-4 drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]">
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
            className="pointer-events-auto text-[12px] sm:text-xs font-mono text-[#E5C483]/90 hover:text-[#E5C483] tracking-[0.25em] uppercase flex items-center gap-2 transition-colors cursor-pointer mt-6 py-2 px-5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#E5C483]/40 active:scale-95"
          >
            <span>Continue a viagem</span>
            <span className="text-sm">↓</span>
          </a>
        </div>

        {/* Indicador de scroll dinâmico */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
            Role para aproximar
          </span>
          <span className="text-celestial-gold/40 animate-bounce text-sm">↓</span>
        </div>

      </div>
    </section>
  );
}
