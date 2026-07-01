export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f8ff',
          100: '#dff0ff',
          200: '#b9e0ff',
          300: '#7dc6ff',
          400: '#36a7ff',
          500: '#0b88ff',
          600: '#0069db',
          700: '#0054b1',
          800: '#08488f',
          900: '#0d3c75'
        }
      },
      boxShadow: {
        glow: '0 10px 30px rgba(11, 136, 255, 0.20)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
