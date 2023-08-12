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
      failOnWarning: false,
      failOnError: false,
    }),
    svgr({ svgrOptions: { icon: true } }),
    VitePWA({
      devOptions: { enabled: true },
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'my-sw.js',
      manifest: {
        short_name: '고민의 참견',
        name: '고민의 참견, 고참',
        icons: [
          {
            src: 'icon/android/icon-36.png',
            sizes: '36x36',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon/android/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: './index.html',
        display: 'standalone',
        theme_color: '#F5F7FB',
        background_color: '#ffffff',
      },
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
});
