import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'main_gsap.js'),
      name: 'SmileWorld',
      // Le nom du fichier de sortie
      fileName: 'smileworld-bundle',
      // On force le format iife, plus sûr pour l'injection
      formats: ['iife']
    },
    rollupOptions: {
      // Ne pas externaliser GSAP, car il est chargé via CDN
      external: ['gsap'],
      output: {
        // Fournir les noms de variables globales pour les dépendances externalisées
        globals: {
          gsap: 'gsap',
        },
      },
    },
    // Générer le bundle dans un dossier 'dist' à la racine
    outDir: 'dist', 
    // Vider le dossier dist à chaque build
    emptyOutDir: true,
  },
  // Ajout de la configuration du serveur de développement
  server: {
    port: 3005,
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
  // Ajout d'un plugin pour ajouter les en-têtes PNA
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