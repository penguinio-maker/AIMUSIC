import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 48px rgba(29, 185, 84, 0.24)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.34)"
      }
    }
  },
  plugins: []
};

export default config;
