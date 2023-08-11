import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'],
    }),
    svgr({ svgrOptions: { icon: true } }),
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
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
