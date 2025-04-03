module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            600: '#2563eb',
            700: '#1d4ed8',
          },
          gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            900: '#111827',
          }
        },
        boxShadow: {
          card: '0 1px 3px rgba(0,0,0,0.12)',
          'card-hover': '0 10px 15px -3px rgba(0,0,0,0.1)'
        }
      },
    },
    plugins: [],
  }