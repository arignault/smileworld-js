import { resolve } from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';

// Récupérer tous les fichiers .js à la racine, sauf les fichiers de config
const entryPoints = glob.sync('*.js', { 
    ignore: ['vite.config.js', 'tailwind.config.js'] 
});

export default defineConfig({
  build: {
    // Utiliser les points d'entrée multiples
    rollupOptions: {
      input: entryPoints,
      output: {
        // Définir le pattern pour les noms de fichiers en sortie
        entryFileNames: '[name].js',
        // S'assurer que les dépendances externes sont gérées
        globals: {
          gsap: 'gsap',
        },
      },
      // Externaliser les dépendances que l'on ne veut pas inclure dans le bundle
      external: ['gsap'],
    },
    // Générer les bundles dans un dossier 'dist' à la racine
    outDir: 'dist',
    // Vider le dossier dist à chaque build
    emptyOutDir: true,
  },
}); 