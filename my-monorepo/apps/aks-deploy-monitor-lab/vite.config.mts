/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/aks-deploy-monitor-lab',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  // 🔥 2. Add vuetify() to the plugins array
  // Note: Order matters! vuetify() should usually come before vue() or alongside it.
  plugins: [vue(), tailwindcss()],
  
  // 🔥 3. Ensure Vuetify styles are processed correctly
  css: {
    preprocessorOptions: {
      scss: {
        // This allows you to use @use 'vuetify/settings' in your SCSS files
        additionalData: `@use 'vuetify/settings' as *;`,
      },
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@org/aks-deploy-monitor-lab',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
