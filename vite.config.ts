import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/portfolio/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'dev-root-redirect',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/' || req.url === '') {
              res.writeHead(302, { Location: '/portfolio/' });
              res.end();
              return;
            }
            next();
          });
        },
      },
    ],
    define: {
      __BUILD_DATE__: JSON.stringify(
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      ),
      __BUILD_TIMESTAMP__: JSON.stringify(Date.now()),
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
