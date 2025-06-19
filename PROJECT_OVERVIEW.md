# Vue d'ensemble du projet Smile World JS

Ce document décrit l'architecture, le fonctionnement et le processus de build du projet JavaScript de Smile World. Il sert de référence pour toute modification ou maintenance future.

## 1. Philosophie du Projet

Le projet utilise un **système de build moderne** (Vite.js) pour regrouper tous les scripts JavaScript en un **unique fichier "bundle"**. Cette approche offre plusieurs avantages :
- **Performance :** Le navigateur ne charge qu'un seul fichier, ce qui réduit le nombre de requêtes réseau.
- **Maintenance :** Le code source est séparé en modules logiques (`menu-desktop.js`, `centre-card.js`, etc.), ce qui le rend plus facile à comprendre et à modifier.
- **Robustesse :** Le processus de build peut optimiser et vérifier le code pour assurer sa compatibilité.

**Règle d'or :** On ne modifie **jamais** les fichiers dans le dossier `dist/`. Tout le travail se fait sur les fichiers `.js` à la racine du projet.

## 2. Structure des Fichiers

- **Fichiers source (à la racine) :** Ce sont les fichiers sur lesquels nous travaillons. Chaque fichier a une responsabilité unique.
  - `main_gsap.js`: Le chef d'orchestre.
  - `menu-desktop.js`: Logique du menu pour ordinateur.
  - `centre-card.js`: Logique des cartes de centres sur la page d'accueil/réservation.
  - etc.
- **Fichiers de build (`/dist`) :** C'est le résultat de la compilation. Ce dossier contient le code optimisé à utiliser en production.
  - `smileworld-bundle.iife.js`: Le seul fichier à charger dans Webflow.
- **Fichiers de configuration :**
  - `vite.config.js`: Configure le processus de build.
  - `package.json`: Liste les dépendances et les scripts du projet.

## 3. Processus de Build

Pour mettre à jour le code en production, il faut suivre ces étapes :

1.  **Modifier les fichiers source** à la racine du projet.
2.  Lancer la commande `npm run build` dans le terminal.
3.  Cela va automatiquement mettre à jour le fichier `dist/smileworld-bundle.iife.js`.
4.  **Sauvegarder les modifications sur GitHub** (`git add .`, `git commit`, `git push`).
5.  Récupérer le nouveau lien **jsDelivr** pointant vers le dernier commit.

## 4. Le Chef d'Orchestre : `main_gsap.js`

Ce fichier est le point d'entrée de toute l'application. Son rôle est d'initialiser tous les autres modules dans le bon ordre.

Voici sa séquence de chargement :

1.  **`window.Webflow.push()` :** Attend que le moteur de Webflow soit prêt.
2.  **`waitForGsapAndInitialize()` :** Attend que la librairie GSAP (chargée via CDN) soit disponible.
3.  **`initializeModules()` :** Une fois GSAP prêt, cette fonction est appelée et exécute :
    - Les modules généraux : `initTextAnimation()`, `initFaqItems()`, `initMenuDesktop()`, `initMenuMobile()`, `initDebugMenu()`.
    - Le chargement conditionnel pour la page de réservation (basé sur l'URL ` /reservation`).
    - L'initialisation du module de carte : `initMap()`.
4.  **`hideLoadingScreen()` :** Une fois que tous les modules principaux sont initialisés, l'écran de chargement est masqué.
5.  **`window.addEventListener('load', ...)` :** En tout dernier, une fois que la page et **toutes ses ressources (images, etc.)** sont chargées, on initialise les cartes de centres (`initCentreCards()`). C'est une étape cruciale pour s'assurer que leur état initial (fermé) n'est pas écrasé par d'autres scripts.

## 5. Description des Modules

- **`main_gsap.js`** : (voir ci-dessus)
- **`menu-desktop.js`** : Gère l'ouverture/fermeture des panneaux du menu sur ordinateur. Il pilote un conteneur principal (`.desktop_menu_wrapper`) et gère les clics à l'extérieur des panneaux pour fermer le menu.
- **`menu-mobile.js`** : Gère la logique d'ouverture et de navigation dans le menu hamburger sur mobile.
- **`centre-card.js`** : Contient la logique complexe d'ouverture/fermeture (accordéon) des cartes de centres. Il force leur état fermé au chargement et communique avec la carte (`map-integration.js`) via des événements pour centrer la vue.
- **`faq-toggle.js`** : Gère l'accordéon simple de la page FAQ.
- **`loading-screen.js`** : Gère l'animation d'apparition et de disparition de l'écran de chargement.
- **`text-animation.js`** : Gère l'animation de texte (défilement vertical de mots).
- **`map-integration.js`** : Charge l'API Google Maps, crée les marqueurs pour chaque centre et écoute les événements (`map:focus`, `map:reset`) pour centrer la carte ou réinitialiser la vue.
- **`reservation.js`** : Contient toute la logique de sélection et de filtrage de la page de réservation.
- **`debug-menu.js`** : Un module d'aide qui s'active en ajoutant `#debug` à l'URL et qui affiche des informations utiles dans la console.

## 6. Déploiement sur Webflow

1.  Assurez-vous d'avoir le dernier lien jsDelivr pointant vers le commit le plus récent. Le format est :
    `https://cdn.jsdelivr.net/gh/arignault/smileworld-js@[COMMIT_HASH]/dist/smileworld-bundle.iife.js`
2.  Dans Webflow, allez dans les paramètres du site (`Site Settings > Custom Code`).
3.  Dans la section "Footer Code", supprimez tous les anciens appels aux scripts individuels.
4.  Ajoutez une seule ligne pour charger le bundle :
    ```html
    <script src="LIEN_JSDELIVR_ICI"></script>
    ```
5.  Publiez votre site. 