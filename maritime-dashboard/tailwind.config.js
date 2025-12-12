/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Windward "Enterprise Light" Palette
        canvas: {
          DEFAULT: "#F3F6F6", // App background
          white: "#FFFFFF",   // Card/Table surface
        },
        border: {
          DEFAULT: "#D9E2EC", // Thin lines
          light: "#E5EAF0",
        },
        text: {
          main: "#111827",    // Gray-900
          secondary: "#4B5563", // Gray-600
          muted: "#6B6B6F",   // Muted text / icons
          subtle: "#9CA3AF",  // Gray-400
        },
        brand: {
          primary: "#1265F0", // Strong blue (routes, active)
          secondary: "#69A3E8", // Lighter blue
          dark: "#0B3B8E",
        },
        alert: {
          orange: "#FB6F05", // Late/Deviation badges
          bg: "#FFE7D5",     // Alert cards
          red: "#EF4444",
          green: "#10B981",
        },
        map: {
          water: "#B2D9F0",
          land: "#E9CBB2",
        },
        // Legacy mappings to prevent immediate crashes, mapped to new palette
        ocean: {
          950: "#F3F6F6", // Was Deepest background -> Now Canvas
          900: "#FFFFFF", // Was Sidebar/Panel -> Now Surface
          800: "#F8FAFC", // Was Card -> Now Light Gray Surface
          700: "#D9E2EC", // Was Borders -> Now Border
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.05)',
        'float': '0 10px 30px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
