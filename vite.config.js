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
      // Pas besoin d'externaliser de dépendances ici pour l'instant
      external: [],
      output: {
        // Exposer les variables globales pour les bibliothèques UMD
        globals: {},
      },
    },
    // Générer le bundle dans un dossier 'dist' à la racine
    outDir: 'dist', 
  },
}); 