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
        "bg-primary": "#0A0F1E",
        "bg-secondary": "#111827",
        "bg-tertiary": "#1F2937",
        "accent-blue": "#1A56DB",
        "accent-cyan": "#0EA5E9",
        "accent-green": "#10B981",
        "accent-amber": "#F59E0B",
        "accent-red": "#EF4444",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        "text-tertiary": "#6B7280",
        "border-default": "#1F2937"
      },
      fontFamily: {
        mono: ["JetBrains Mono", "DM Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        "pulse-green": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        "pulse-amber": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        },
        "pulse-red": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" }
        }
      },
      animation: {
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "pulse-amber": "pulse-amber 1.5s ease-in-out infinite",
        "pulse-red": "pulse-red 1s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
