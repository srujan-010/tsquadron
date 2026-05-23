/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#ffffff",
          panel: "#f8fafc", // Slate 50
          border: "#e2e8f0", // Slate 200
          text: "#0f172a", // Slate 900
          muted: "#475569", // Slate 600
        },
        brand: {
          cyan: "#5E9CB3",    // Soft Cyan Blue
          violet: "#2857A4",  // Royal Blue
          indigo: "#163C8C",  // Primary Navy
          rose: "#7FB6C5",    // Light Cyan Accent
          emerald: "#3569B3", // Professional Blue
          label: "#526071",   // Premium Soft label color
          placeholder: "#7A8797", // High contrast placeholder color
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'hover-glow': '0 20px 40px rgba(22, 60, 140, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'fade-in-up': 'fade-in-up 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
