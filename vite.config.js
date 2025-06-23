import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'main_gsap.js',
      name: 'SmileWorldBundle',
      formats: ['iife'],
      fileName: (format) => `smileworld-bundle.${format}.js`,
    },
    rollupOptions: {
      external: ['gsap'],
      output: {
        globals: {
          gsap: 'gsap',
        },
      },
    },
    emptyOutDir: true,
  },
  server: {
    port: 3005,
    strictPort: true, // Fait échouer le lancement si le port est déjà utilisé
    cors: {
      origin: 'https://smile-world-c1bc36.webflow.io',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  plugins: [
    {
      name: 'pna-header-plugin',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Access-Control-Allow-Private-Network', 'true');
          next();
        });
      },
    },
  ],
}); 