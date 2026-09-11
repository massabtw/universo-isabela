import React from 'react';

/**
 * DecorativeGalaxies.jsx
 * Galáxias espirais celestes e nebulosas decorativas distribuídas suavemente
 * ao longo do scroll do site, criando uma atmosfera cósmica profunda e luxuosa.
 */
export default function DecorativeGalaxies() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* ── GALÁXIA 1: ESPIRAL ANDRÔMEDA DOURADA & AZUL (TOPO DIREITO) ── */}
      <div 
        className="absolute -top-24 -right-28 w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] opacity-35"
        style={{
          transform: 'rotate(-25deg)',
          animation: 'spin-very-slow 90s linear infinite',
        }}
      >
        {/* Glow do Núcleo */}
        <div 
          className="absolute inset-[30%] rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(254, 243, 199, 0.8) 0%, rgba(245, 158, 11, 0.4) 45%, transparent 70%)' }}
        />
        {/* Braços Espirais em SVG */}
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="armGrad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5e0" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#818cf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#03070e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M200,200 C240,170 290,175 320,210 C345,240 330,290 285,320 C235,355 170,335 130,290 C85,240 95,160 150,110 C215,50 310,65 365,135"
            fill="none"
            stroke="url(#armGrad1)"
            strokeWidth="28"
            strokeLinecap="round"
            filter="blur(10px)"
          />
          <path
            d="M200,200 C160,230 110,225 80,190 C55,160 70,110 115,80 C165,45 230,65 270,110 C315,160 305,240 250,290 C185,350 90,335 35,265"
            fill="none"
            stroke="url(#armGrad1)"
            strokeWidth="28"
            strokeLinecap="round"
            filter="blur(10px)"
          />
        </svg>
      </div>

      {/* ── GALÁXIA 2: NEBULOSA ROSA & PÚRPURA DE VIRGEM (MEIO ESQUERDO) ── */}
      <div 
        className="absolute top-[38%] -left-32 w-[440px] sm:w-[580px] h-[440px] sm:h-[580px] opacity-30"
        style={{
          transform: 'rotate(40deg)',
          animation: 'spin-very-slow-reverse 120s linear infinite',
        }}
      >
        <div 
          className="absolute inset-[28%] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(253, 242, 248, 0.9) 0%, rgba(244, 114, 182, 0.45) 40%, rgba(168, 85, 247, 0.25) 65%, transparent 80%)' }}
        />
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="armGrad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff0f5" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f472b6" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#c084fc" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#03070e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M200,200 C235,165 285,160 325,190 C360,220 355,275 315,315 C265,360 195,350 145,305 C90,255 95,175 145,120 C200,60 295,65 355,125"
            fill="none"
            stroke="url(#armGrad2)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="blur(12px)"
          />
          <path
            d="M200,200 C165,235 115,240 75,210 C40,180 45,125 85,85 C135,40 205,50 255,95 C310,145 305,225 255,280 C200,340 105,335 45,275"
            fill="none"
            stroke="url(#armGrad2)"
            strokeWidth="32"
            strokeLinecap="round"
            filter="blur(12px)"
          />
        </svg>
      </div>

      {/* ── GALÁXIA 3: ESPIRAL CIANO & PRATA (LATERAL DIREITA INFERIOR) ── */}
      <div 
        className="absolute top-[72%] -right-24 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] opacity-25"
        style={{
          transform: 'rotate(-15deg)',
          animation: 'spin-very-slow 105s linear infinite',
        }}
      >
        <div 
          className="absolute inset-[32%] rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, rgba(240, 249, 255, 0.8) 0%, rgba(56, 189, 248, 0.35) 45%, transparent 75%)' }}
        />
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="armGrad3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#03070e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path
            d="M200,200 C240,175 285,180 315,215 C340,245 325,290 285,315 C240,345 180,330 145,290 C105,245 115,175 160,130 C215,80 295,90 345,150"
            fill="none"
            stroke="url(#armGrad3)"
            strokeWidth="24"
            strokeLinecap="round"
            filter="blur(9px)"
          />
          <path
            d="M200,200 C160,225 115,220 85,185 C60,155 75,110 115,85 C160,55 220,70 255,110 C295,155 285,225 240,270 C185,320 105,310 55,250"
            fill="none"
            stroke="url(#armGrad3)"
            strokeWidth="24"
            strokeLinecap="round"
            filter="blur(9px)"
          />
        </svg>
      </div>
    </div>
  );
}

