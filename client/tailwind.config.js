/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yardi: {
          50: '#F0F5FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          300: '#A3BFFD',
          400: '#739BFA',
          500: '#436FF5',
          600: '#2553EB', // Core enterprise blue
          700: '#1D44D8',
          800: '#1E3A8A', // Deep blue
          900: '#0F172A', // Deep slate navy
          950: '#0A0F1D', // Ultra dark background
        },
        navy: {
          800: '#131D36',
          900: '#0B1124',
          950: '#060A17',
        },
        accent: {
          purple: '#6D28D9',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.03)',
        'glow': '0 0 25px -5px rgba(37, 83, 235, 0.35)',
        'glow-accent': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
