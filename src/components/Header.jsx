/**
 * ============================================
 * Header — Universo da Isabela (Dark Luxury)
 * ============================================
 *
 * Navegação Responsiva:
 * - Desktop: Barra horizontal limpa e luxuosa
 * - Celular: Top bar compacta com Sidebar Drawer deslizante super fluida
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { PERSON_NAME, TURNING_AGE } from "../config";

const NAV_ITEMS = [
  { label: "A Lua", href: "#lua", icon: "🌙", subtitle: "Fase de 14/09/2007" },
  { label: "Constelação", href: "#constelacao", icon: "✧", subtitle: "Virgem no Céu Estelar" },
  { label: "Sistema Solar", href: "#sistema-solar", icon: "🪐", subtitle: "Órbitas e Modelos 3D" },
  { label: "Galeria", href: "#galeria", icon: "📷", subtitle: "Astrofotografia da Bela" },
  { label: "19 Anos & Games", href: "#calculadora-cosmica", icon: "🎮", subtitle: "Odisséia, Gravidade & Quiz" },
  { label: "Carta", href: "#mensagem", icon: "💌", subtitle: "Envelope Selado" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const drawer = drawerRef.current;
    document.body.style.overflow = 'hidden';
    const background = [document.querySelector('main'), document.querySelector('.music-player')].filter(Boolean);
    background.forEach(element => element.inert = true);
    drawer?.querySelector('button')?.focus({ preventScroll: true });
    const trapFocus = event => {
      if (event.key !== 'Tab') return;
      const focusable = [...drawer.querySelectorAll('a[href], button')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    drawer?.addEventListener('keydown', trapFocus);
    return () => {
      document.body.style.overflow = '';
      background.forEach(element => element.inert = false);
      drawer?.removeEventListener('keydown', trapFocus);
    };
  }, [isMobileMenuOpen]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fecha o menu móvel ao redimensionar para desktop ou pressionar Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (item) => {
    // Desbloqueia overflow e inert imediatamente caso a sidebar móvel esteja aberta
    document.body.style.overflow = '';
    const background = [document.querySelector('main'), document.querySelector('.music-player')].filter(Boolean);
    background.forEach(el => { el.inert = false; });
    setIsMobileMenuOpen(false);

    const href = typeof item === 'string' ? item : item.href;
    const target = document.querySelector(href) || (href === '#calculadora-cosmica' ? document.querySelector('#mini-games') : null);
    if (!target) return;

    const performScroll = () => {
      const lenis = window.lenisInstance;
      if (lenis && typeof lenis.scrollTo === 'function') {
        try {
          lenis.scrollTo(target, { offset: -70, force: true });
          return;
        } catch (err) {
          console.warn('Lenis scroll fallback:', err);
        }
      }

      // Fallback nativo absoluto em pixels
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

    // Rola imediatamente e confirma após 80ms para garantir qualquer recalculo de layout
    performScroll();
    setTimeout(performScroll, 80);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-midnight-950/85 backdrop-blur-2xl border-b border-white/[0.08]"
      >
        {/* Barra de Progresso Cósmica no Topo */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-celestial-gold via-blue-400 to-celestial-gold origin-left shadow-[0_0_8px_rgba(229,196,131,0.7)]"
          style={{ scaleX }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo / Título do Universo */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-celestial-gold text-base group-hover:scale-110 transition-transform">🌙</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-sm sm:text-lg text-celestial-starlight tracking-wide font-medium">
                Universo da Bela
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-celestial-gold/80 px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/10">
                {TURNING_AGE} ANOS
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
                className="text-[10.5px] lg:text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 font-sans cursor-pointer py-1 text-gray-400 hover:text-celestial-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botão Hamburger Móvel (visível em telas pequenas) */}
          <button
            type="button"
            ref={menuButtonRef}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex flex-col items-center justify-center gap-1.5 text-celestial-gold focus:outline-none cursor-pointer active:scale-95 transition-all"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-celestial-gold block origin-center transition-transform"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-[1.5px] bg-celestial-gold/80 block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-5 h-[1.5px] bg-celestial-gold block origin-center transition-transform"
            />
          </button>
        </div>
      </motion.header>

      {/* ── SIDEBAR DRAWER PARA CELULAR ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[70] md:hidden flex justify-end" data-lenis-prevent>
            {/* Backdrop Escuro com Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Painel da Sidebar Deslizante */}
            <motion.aside
              ref={drawerRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navegação cósmica"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative w-[285px] sm:w-[320px] h-full bg-midnight-900 border-l border-white/15 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 z-10 overflow-y-auto"
            >
              {/* Topo da Sidebar */}
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-celestial-gold">🔭</span>
                    <div>
                      <h2 className="font-serif text-base text-white font-medium">Navegação Cósmica</h2>
                      <p className="text-[10px] font-mono text-gray-400">Universo da Isabela</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                    aria-label="Fechar navegação"
                  >
                    ✕
                  </button>
                </div>

                {/* Lista de Seções da Sidebar */}
                <nav className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item);
                      }}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx, duration: 0.3 }}
                      className="flex items-center gap-3.5 p-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.08] hover:border-celestial-gold/40 transition-all group cursor-pointer"
                    >
                      <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 group-hover:scale-110 transition-transform bg-celestial-gold/10 border border-celestial-gold/30">
                        {item.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-mono uppercase tracking-wider transition-colors font-medium text-celestial-starlight group-hover:text-celestial-gold">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-gray-400 font-light">
                          {item.subtitle}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Rodapé da Sidebar */}
              <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Data Especial:</span>
                  <span className="text-celestial-gold">14.09.2007</span>
                </div>
                <div className="p-3 rounded-xl bg-celestial-gold/5 border border-celestial-gold/20 text-center">
                  <p className="text-[11px] font-serif italic text-amber-200">
                    "Você é o astro que ilumina o cosmos"
                  </p>
                </div>
              </div>

            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
