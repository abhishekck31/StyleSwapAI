/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // modern blue
          dark: '#1e40af',
        },
        accent: {
          DEFAULT: '#f59e42',
        },
        neutral: {
          100: '#f8f9fa',
          900: '#18181b',
        },
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          700: '#374151',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};
