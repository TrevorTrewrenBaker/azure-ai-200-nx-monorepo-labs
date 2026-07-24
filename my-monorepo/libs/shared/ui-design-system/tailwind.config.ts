import type { Config } from 'tailwindcss';

export default {
  content: [
    // Explicitly include the specific app
    "./apps/aks-deploy-monitor-lab/src/**/*.{vue,js,ts,jsx,tsx}",
    "./apps/aks-deploy-monitor-lab/index.html",
    
    // Include ALL libs (or specific ones) so component classes are generated
    "./libs/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
  plugins: [],
} satisfies Config;