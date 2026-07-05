import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // File watching is disabled when HMR is off to reduce edit-time churn.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: process.env.CONTACT_API_URL || 'http://127.0.0.1:8787',
          changeOrigin: true,
        },
      },
      watch: process.env.DISABLE_HMR === 'true'
        ? null
        : {
            ignored: [
              '**/server.js',
              '**/.env',
              '**/.env.local',
              '**/*.log',
            ],
          },
    },
  };
});
