/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          50: '#FDFBF7',
          100: '#FAF7EF',
          200: '#F5EFDF',
          300: '#EFE7CF',
          400: '#EAE0C0',
          500: '#E5D8B0',
        },
        sand: {
          50: '#FAF5F0',
          100: '#F5EBE1',
          200: '#EBD7C3',
          300: '#E1C3A5',
          400: '#D7AF87',
          500: '#CD9B69',
        },
        sage: {
          50: '#F4F6F4',
          100: '#E9EDE9',
          200: '#D3DBD3',
          300: '#BDC9BD',
          400: '#A7B7A7',
          500: '#91A591',
          800: '#425542',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out 0.4s forwards',
        'fade-in-up-delay': 'fade-in-up 0.3s ease-out 0.6s forwards',
        'fade-in': 'fade-in 0.3s ease-out 0.2s forwards',
      },
    },
  },
  plugins: [],
};
