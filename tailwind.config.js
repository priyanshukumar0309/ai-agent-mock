/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        snow: {
          50: '#fafbfc',
          100: '#f4f5f7',
          200: '#e8eaed',
          300: '#d1d5db',
          400: '#9aa1ad',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        volvo: {
          navy: '#003057',
          'navy-light': '#0a4578',
          blue: '#1B76B9',
          'blue-light': '#2196F3',
          teal: '#0097a7',
          green: '#2e7d32',
          'green-light': '#43a047',
          amber: '#e65100',
          red: '#c62828',
          'red-light': '#ef5350',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      keyframes: {
        spin_ring: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fade_pulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        dot_bounce: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.3' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'spin-ring': 'spin_ring 1s linear infinite',
        'fade-pulse': 'fade_pulse 2s ease-in-out infinite',
        'dot-1': 'dot_bounce 1.4s ease-in-out infinite',
        'dot-2': 'dot_bounce 1.4s ease-in-out 0.2s infinite',
        'dot-3': 'dot_bounce 1.4s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [],
};
