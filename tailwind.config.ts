import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        trust: {
          blue: "#185FA5",
          green: "#1D9E75",
          amber: "#BA7517",
          red: "#E24B4A",
          sidebar: "#0A0F1E"
        }
      },
      boxShadow: {
        panel: "0 12px 32px rgba(10, 15, 30, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
