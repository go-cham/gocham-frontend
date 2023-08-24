import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
      exclude: ['/virtual:/**', 'node_modules/**'],
    }),
    svgr(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'script',
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,otf}'],
      },
      srcDir: 'src',
      filename: 'serviceWorker.ts',
      manifestFilename: 'manifest.json',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
