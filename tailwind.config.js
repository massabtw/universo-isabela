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
          950: '#03070E',
          900: '#060B15',
          850: '#0A1220',
          800: '#0F1A2D',
          700: '#162540',
          600: '#1E3255',
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
