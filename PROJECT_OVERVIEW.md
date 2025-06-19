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

## 5. Description Détaillée des Modules

### `main_gsap.js`
Chef d'orchestre du projet.
- **`waitForGsapAndInitialize()`**: Boucle d'attente qui vérifie la présence de `window.gsap` avant de lancer l'initialisation principale. Gère un timeout pour ne pas bloquer l'utilisateur.
- **`initializeModules()`**: Appelle les fonctions `init` de tous les modules dans un ordre logique. Charge `reservation.js` de manière asynchrone si l'URL correspond.
- **`window.addEventListener('load', ...)`**: Écouteur d'événement qui déclenche `initCentreCards()` une fois la page entièrement chargée, assurant que son initialisation est la dernière à s'exécuter.

### `menu-desktop.js`
Gère le menu principal sur grand écran.
- **`WrapperBasedContractHandler` (classe)**: Contient toute la logique du menu.
- **`_addGlobalListener()`**: Ajoute un seul écouteur de clic sur `document.body` qui gère toutes les interactions (ouverture, fermeture, changement de panneau).
- **`_openWrapperAndPanel()`**: Affiche le conteneur du menu et le panneau cible avec une animation d'apparition.
- **`_closeAll()`**: Cache le conteneur du menu avec une animation de disparition.
- **`_switchPanels()`**: Gère la transition animée entre deux panneaux lorsque le menu est déjà ouvert.
- **`initMenuDesktop()` (exportée)**: Fonction d'entrée appelée par `main_gsap.js` pour créer une instance de la classe et activer le menu.

### `menu-mobile.js`
Gère le menu "hamburger" sur mobile.
- **`MenuMobileManager` (classe)**: Contient la logique du menu.
- **`_setupEventListeners()`**: Ajoute les écouteurs pour ouvrir/fermer le menu et naviguer entre les panneaux.
- **`_openMainMenu()` / `_closeMainMenu()`**: Animent l'apparition/disparition du menu depuis le côté de l'écran.
- **`_navigateToPanel()`**: Gère la transition latérale entre le menu principal et les sous-menus (parcs, activités, etc.).
- **`initMenuMobile()` (exportée)**: Active le menu mobile.

### `centre-card.js`
Logique complexe des cartes de centres cliquables.
- **`closeCard()` / `openCard()`**: Fonctions internes qui gèrent les animations de fermeture/ouverture d'une carte.
- **`toggleCard()`**: Orchestre la logique d'accordéon : ferme les autres cartes ouvertes avant d'en ouvrir une nouvelle. Envoie les événements `map:focus` ou `map:reset`.
- **`initializeCard()`**: Fonction clé qui prépare chaque carte. Elle cache le contenu par défaut et attache l'écouteur de clic.
- **`setupMutationObserver()`**: Observe le DOM pour initialiser automatiquement les cartes qui seraient ajoutées dynamiquement (par ex: par un filtre).
- **`initCentreCards()` (exportée)**: Fonction d'entrée qui trouve toutes les cartes sur la page et lance leur initialisation.

### `faq-toggle.js`
Logique simple d'accordéon pour la page FAQ.
- **`toggleCard()`**: Gère l'ouverture/fermeture d'un item de la FAQ et ferme les autres.
- **`initFaqItems()` (exportée)**: Trouve tous les items de la FAQ et attache les écouteurs de clic.

### `loading-screen.js`
Gère l'écran de chargement initial.
- **`initLoadingScreen()` (exportée)**: Configure les styles initiaux de l'écran de chargement.
- **`hideLoadingScreen()` (exportée)**: Gère l'animation de disparition de l'écran de chargement.

### `text-animation.js`
Gère l'animation des mots qui défilent verticalement.
- **`initTextAnimation()` (exportée)**: Trouve l'élément et lance la boucle d'animation GSAP.

### `map-integration.js`
Charge et gère la carte Google Maps.
- **`mapManager` (objet)**: Contient toutes les fonctions et l'état de la carte (marqueurs, etc.).
- **`createMarkers()`**: Scanne le DOM pour trouver les éléments de centre et place un marqueur sur la carte pour chacun.
- **`focusOnCenter()`**: Centre la carte et zoome sur un marqueur spécifique.
- **`listenForFocusEvents()`**: Ajoute des écouteurs pour les événements `map:focus` et `map:reset` envoyés par d'autres modules (comme `centre-card.js`).
- **`initMap()` (exportée)**: Fonction d'entrée qui lit la clé API depuis le DOM et charge le script Google Maps.

### `reservation.js`
Logique de la page de réservation.
- **`SmileWorldReservation` (classe)**: Contient toute la logique complexe de la page : sélection, filtrage des parcs/activités, mise à jour de l'interface, etc.
- **`_handleSelection()`**: Gère les clics sur les différentes options.
- **`_updateStateAndButton()`**: Met à jour l'état interne et l'apparence du bouton "Réserver".
- **`_fullReset()`**: Réinitialise complètement le formulaire de sélection.
- **`initReservation()` (exportée)**: Fonction d'entrée qui crée une instance de la classe pour lancer le module.

### `debug-menu.js`
Module d'aide au débogage.
- **`initDebugMenu()` (exportée)**: Vérifie si l'URL contient `#debug`. Si c'est le cas, il affiche un résumé des éléments clés (wrapper, panneaux, etc.) dans la console.

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