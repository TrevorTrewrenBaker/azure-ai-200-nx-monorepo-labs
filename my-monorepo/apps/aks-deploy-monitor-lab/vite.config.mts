import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// Custom plugin to handle YAML files as raw strings
function yamlRawPlugin() {
  return {
    name: 'yaml-raw-plugin',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (id.endsWith('.yaml') || id.endsWith('.yml')) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        };
      }
    },
  };
}

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
  plugins: [
    vue(), 
    tailwindcss(),
    yamlRawPlugin(),
  ],
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'vuetify/settings' as *;`,
      },
    },
  },

  assetsInclude: ['**/*.yaml', '**/*.yml'],

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