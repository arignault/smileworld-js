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
      // Externaliser les dépendances que l'on ne veut pas inclure dans le bundle
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
  },
}); 