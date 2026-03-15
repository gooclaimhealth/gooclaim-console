import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-balloo), "DM Sans", system-ui, -apple-system, sans-serif',
        mono: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
      },
      colors: {
        'bg': {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        'accent': {
          blue: 'var(--accent-blue)',
          cyan: 'var(--accent-cyan)',
          light: 'var(--accent-light)',
        },
        'semantic': {
          green: 'var(--green)',
          'green-bg': 'var(--green-bg)',
          amber: 'var(--amber)',
          'amber-bg': 'var(--amber-bg)',
          red: 'var(--red)',
          'red-bg': 'var(--red-bg)',
        },
      },
      backgroundColor: {
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}

export default config
