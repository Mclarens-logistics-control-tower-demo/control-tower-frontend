import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        windward: {
          bg: "#F3F6F6",        // App background / canvas
          surface: "#FFFFFF",   // Card / table surface
          border: "#D9E2EC",    // Borders / dividers
          muted: "#6B6B6F",     // Muted text / icons
          subtle: "#A2A3A6",    // Lighter muted text
          ocean: "#B2D9F0",     // Map ocean
          land: "#E9CBB2",      // Map land
          primary: "#1265F0",   // Strong blue (routes, active)
          secondary: "#69A3E8", // Secondary route blue
          alert: "#FB6F05",     // Alert orange
          "alert-bg": "#FFE7D5",// Soft orange background
        },
      },
      boxShadow: {
        "windward-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "windward-card": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        "windward-float": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        windward: "0.5rem", // 8px soft corners
      },
    },
  },
  plugins: [],
};

export default config;