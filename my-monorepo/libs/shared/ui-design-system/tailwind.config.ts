// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./apps/aks-deploy-monitor-lab/src/**/*.{vue,js,ts,jsx,tsx}",
    "./apps/aks-deploy-monitor-lab/index.html",
    "./libs/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
  primary: 'var(--color-primary)',
  onPrimary: 'var(--color-on-primary)',
  secondary: 'var(--color-secondary)',
  onSecondary: 'var(--color-on-secondary)',
  accent: 'var(--color-accent)',
  onAccent: 'var(--color-on-accent)',
  error: 'var(--color-error)',
  onError: 'var(--color-on-error)',
  info: 'var(--color-info)',
  onInfo: 'var(--color-on-info)',
  success: 'var(--color-success)',
  onSuccess: 'var(--color-on-success)',
  warning: 'var(--color-warning)',
  onWarning: 'var(--color-on-warning)',
  background: 'var(--color-background)',
  onBackground: 'var(--color-on-background)',
  surface: 'var(--color-surface)',
  onSurface: 'var(--color-on-surface)',
  surfaceVariant: 'var(--color-surface-variant)',
  onSurfaceVariant: 'var(--color-on-surface-variant)',
  surfaceContainer: 'var(--color-surface-container)',
  surfaceContainerHigh: 'var(--color-surface-container-high)',
},
    },
  },
  plugins: []
} satisfies Config