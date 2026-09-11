/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: {
          950: '#020304',
          900: '#080a0c',
          850: '#101315',
          800: '#161a1d',
          700: '#222a30',
          600: '#34424c',
        },
        celestial: {
          gold: '#E5C483',
          amber: '#D4AF37',
          silver: '#DDE5ED',
          glow: '#78A7D9',
          starlight: '#F3F6FA',
        },
        accent: {
          blue: '#1B3A5C',
          blueLight: '#2A5080',
          blueSoft: '#A8C4E0',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
