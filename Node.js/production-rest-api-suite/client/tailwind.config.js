export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e'
        }
      },
      boxShadow: {
        panel: '0 20px 60px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};
