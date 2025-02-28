import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/assets/**/*'],
      manifest: {
        name: 'Progresses App',
        short_name: 'ProgressesApp',
        description: 'Progresses application',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'assets/apple-touch-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'assets/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'assets/favicon.ico',
            sizes: '512x512',
            type: 'image/favicon',
          },
          {
            src: 'assets/progress_logo.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
});