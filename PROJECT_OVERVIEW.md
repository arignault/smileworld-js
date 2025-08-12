# Vue d'ensemble du projet Smile World JS

Ce document décrit l'architecture, le fonctionnement et le processus de build du projet JavaScript de Smile World. Il sert de référence pour toute modification ou maintenance future.

## 1. Philosophie du Projet

Le projet utilise un **système de build moderne** (Vite.js) pour regrouper tous les scripts JavaScript en un **unique fichier "bundle"**. Cette approche offre plusieurs avantages :
- **Performance :** Le navigateur ne charge qu'un seul fichier, ce qui réduit le nombre de requêtes réseau.
- **Maintenance :** Le code source est séparé en modules logiques (`menu-desktop.js`, `centre-card.js`, etc.), ce qui le rend plus facile à comprendre et à modifier.
- **Robustesse :** Le processus de build peut optimiser et vérifier le code pour assurer sa compatibilité.

**Règle d'or :** On ne modifie **jamais** les fichiers dans le dossier `dist/`. Tout le travail se fait sur les fichiers `.js` à la racine du projet.

## 2. Structure des Fichiers

### Fichiers source (à la racine)
Ce sont les fichiers sur lesquels nous travaillons. Chaque fichier a une responsabilité unique :

#### **Modules principaux :**
- `main_gsap.js`: Le chef d'orchestre - Point d'entrée de l'application
- `centre-card.js`: Logique des cartes de centres avec système d'accordéon
- `reservation.js`: Module complexe de gestion des réservations
- `map-integration.js`: Intégration Google Maps avec Places API

#### **Modules d'interface :**
- `menu-desktop.js`: Menu principal desktop avec système de panneaux
- `menu-mobile.js`: Menu mobile "hamburger" avec navigation latérale
- `menu-desktop-hover-activite.js`: Gestion des survols dans le menu activités
- `loading-screen.js`: Écran de chargement avec animations GSAP

#### **Modules de contenu :**
- `faq-toggle.js`: Système d'accordéon pour la FAQ
- `text-animation.js`: Animation des mots qui défilent verticalement
- `privateroom.js`: Popup Matterport pour les salles privatisables
- `preselect.js`: Présélection d'activités/parcs pour la réservation

#### **Modules utilitaires :**
- `debug-menu.js`: Outils de débogage (activé avec `#debug`)

### Fichiers de configuration
- `vite.config.js`: Configuration du processus de build et serveur de développement
- `package.json`: Dépendances (GSAP, Vimeo Player, live-server) et scripts
- `.gitignore`: Ignore `node_modules/`, `dist/`, et `dev-server/`

### Fichiers de build (`/dist`)
- `smileworld-bundle.iife.js`: Le seul fichier à charger dans Webflow (format IIFE)

### Serveur de développement (`/dev-server`)
- Configuration automatique pour tests locaux
- Port 3002 avec support CORS pour Webflow
- Headers `Access-Control-Allow-Private-Network: true` pour Chrome

## 3. Processus de Build et Développement

### Développement local
Pour un développement rapide sans passer par jsDelivr :

1. **Lancer le serveur de développement :**
   ```bash
   cd dev-server && node server.js
   ```

2. **Tester dans Webflow :**
   ```html
   <script src="http://localhost:3002/smileworld-bundle.iife.js"></script>
   ```

3. **Build et test :**
   ```bash
   npm run build  # Génère le bundle
   # Le serveur local se met à jour automatiquement
   ```

### Déploiement en production
1. **Modifier les fichiers source** à la racine du projet
2. **Build :** `npm run build` 
3. **Commit :** `git add .`, `git commit`, `git push`
4. **URL jsDelivr :** `https://cdn.jsdelivr.net/gh/[USER]/[REPO]@[COMMIT]/dist/smileworld-bundle.iife.js`

## 4. Le Chef d'Orchestre : `main_gsap.js`

Ce fichier est le point d'entrée de toute l'application. Version actuelle : **v3.0.1**

### Séquence de chargement :

1. **`window.Webflow.push()` :** Attend que le moteur de Webflow soit prêt
2. **`waitForGsapAndInitialize()` :** Attend que GSAP (chargé via CDN) soit disponible
3. **`initializeModules()` :** Lance l'initialisation de tous les modules :
   - **Modules généraux :** `initTextAnimation()`, `initMenuDesktop()`, `initMenuMobile()`, `initDebugMenu()`, `initMenuDesktopHoverActivite()`
   - **Chargement conditionnel :** Page `/reservation` → `initReservation()`
   - **Modules contextuels :** 
     - `initMap()` (si élément `#map` présent)
     - `initPrivateRoomPopup()` (si `.salles_privatisable_holder` présent)
     - `initPreselection()` (si boutons de présélection présents)
4. **`requestHideLoadingScreen()` :** Masque l'écran de chargement
5. **`window.addEventListener('load', ...)` :** **Après chargement complet** :
   - `initCentreCards()` - **Timing crucial** pour éviter les conflits
   - `initFaqItems()` - Initialisation des FAQ

## 5. Description Détaillée des Modules

### `centre-card.js` - **v6.1.0** ⭐ Module critique
**Problèmes récurrents résolus :**
- **Double initialisation** (appelé dans `initializeModules()` ET `window.addEventListener('load')`)
- **Sélecteurs robustes** avec fallbacks pour `.centre-card_wrapper`
- **Diagnostic intégré** avec logs détaillés
- **Gestion d'erreurs** améliorée

**Fonctionnalités :**
- **`initializeCard()`**: Prépare chaque carte (cache contenu, attache écouteurs)
- **`toggleCard()`**: Logique d'accordéon + émission d'événements `map:focus`/`map:reset`
- **`openCard()`/`closeCard()`**: Animations GSAP fluides
- **`setupMutationObserver()`**: Détection automatique de nouvelles cartes
- **WeakSet `initializedCards`**: Évite les doubles initialisations

### `reservation.js` - **v7.0.0** - Classe `SmileWorldReservation`
**Module le plus complexe** avec logique de sélection avancée :

**États gérés :**
- `primarySelectionType`: 'activities' ou 'parks'
- `selectedInitialSlugs`: Set des activités sélectionnées
- `selectedInitialParkId`: ID du parc sélectionné
- `finalSelectedParkId`/`finalSelectedSlugs`: Sélections finales

**Fonctionnalités clés :**
- **Filtrage dynamique** : Activités ↔ Parcs compatibles
- **Gestion vidéo** : Player Vimeo intégré avec vidéos de centres
- **Interface adaptative** : Affichage initial → Filtré
- **URL Parameters** : Support `?activite=X&parc=Y`
- **État persistant** : Bouton "Réserver" avec validation

### `map-integration.js` - **v2.0.1** - Objet `mapManager`
**Intégration Google Maps avancée :**

**Configuration :**
- **API** : Places + Advanced Markers
- **Langue** : Français (`&language=fr`)
- **Chargement** : Asynchrone (`loading=async`)

**Fonctionnalités :**
- **`createMarkers()`**: Scan du DOM pour `[data-place-id]`
- **`focusOnCenter()`**: Places API pour infos détaillées
- **`buildInfoWindowContent()`**: InfoWindow riche (photos, avis, horaires)
- **Événements** : Écoute `map:focus` et `map:reset` des cartes

### `menu-desktop.js` - **v14.0.0** - Classe `WrapperBasedContractHandler`
**Menu principal desktop avec stratégie "Wrapper" :**

**Architecture :**
- **Un wrapper** : `.desktop_menu_wrapper`
- **Trois panneaux** : `.parc_menu_desktop`, `.activites_menu_desktop`, `.offres_menu_desktop`
- **Triggers** : `[data-attribute^="nav-link-desktop-"]`

**Logique :**
- **`_addGlobalListener()`**: Un seul écouteur sur `document.body`
- **`_openWrapperAndPanel()`**: Animation d'apparition
- **`_switchPanels()`**: Transition fluide entre panneaux
- **`_closeAll()`**: Fermeture avec animation

### `menu-mobile.js` - **v1.0.7** - Classe `MenuMobileManager`
**Menu mobile "hamburger" :**

**Éléments gérés :**
- **Menu principal** : `#main-menu-mobile`
- **Sous-menus** : `#parc-menu-mobile`, `#activite-menu-mobile`, `#offres-menu-mobile`
- **Navigation** : Transitions latérales

**Fonctionnalités :**
- **`disableScroll()`/`enableScroll()`**: Gestion du scroll lors de l'ouverture
- **`hamburgerTimeline`**: Animation du bouton (rotation élastique)
- **`handleBottomNavClick()`**: Navigation entre panneaux
- **État persistant** : Boutons actifs + gestion mémoire

### `loading-screen.js` - **v1.3.0**
**Écran de chargement sophistiqué :**

**Timing intelligent :**
- **Durée minimale** : 1.5 secondes (UX)
- **Conditions** : `isReadyToHide` + `minimumTimeElapsed`
- **`tryHide()`**: Logique de masquage conditionnel

**Animations GSAP :**
- **Entrée** : Logo avec scale + opacity
- **Sortie** : Fade out fluide
- **Force** : `forceHideLoadingScreen()` en cas d'erreur

### `text-animation.js` - **v2.1.0**
**Animation verticale des mots :**

**Configuration :**
```javascript
positions: {
    start: "0%",
    middle: "-34%", 
    end: "-68%"
}
```

**Timeline :**
- **Durée** : 0.6s avec `back.out(1.7)`
- **Pause** : 1.5s entre positions
- **Cycle** : Retour au début avec délai de 0.5s

### `privateroom.js` - Popup Matterport
**Gestion du popup de salle privatisable :**

**Éléments :**
- `[data-attribute="matterport_button"]`: Bouton d'ouverture
- `[data-attribute="matterport_popup"]`: Popup container
- `[data-attribute="close_popup"]`: Bouton de fermeture

**Animations :**
- **Ouverture** : Scale 0.95→1 + opacity + translation Y
- **Fermeture** : Animation inverse

### `preselect.js` - Présélection pour réservation
**Redirection intelligente vers `/reservation` :**

**Données lues :**
- `[data-preselect-activity-slug]`: Slug d'activité
- `[data-preselect-park-id]`: ID de centre

**URL générée :**
```
/reservation?activite=bowling&parc=centre-id
```

### `faq-toggle.js` - **v2.0.0**
**Système d'accordéon pour FAQ :**

**Animations :**
- **Fermeture** : Hauteur → 0 + opacity + rotation flèche
- **Ouverture** : `elastic.out(1.2, 0.5)` pour effet rebond
- **Logique** : Fermeture des autres items avant ouverture

### `menu-desktop-hover-activite.js` - **v1.0.1**
**Affichage d'images au survol du menu activités :**

**Système :**
- **Image par défaut** : Bowling
- **Mapping** : `data-name` → `img#[name]`
- **Animations** : Cross-fade 0.15s
- **Cache** : `Map` des animations actives

### `debug-menu.js`
**Outils de débogage :**

**Activation :** URL avec `#debug`
**Informations affichées :**
- Wrapper menu desktop
- Boutons de navigation
- Conteneurs de menu

## 6. Configuration Technique

### Vite.js (`vite.config.js`)
**Build configuration :**
```javascript
{
  lib: {
    entry: 'main_gsap.js',
    name: 'SmileWorld',
    fileName: 'smileworld-bundle',
    formats: ['iife']  // OBLIGATOIRE pour Webflow
  },
  external: ['gsap'],  // GSAP via CDN
  outDir: 'dist'
}
```

**Serveur de développement :**
- **Port** : 3005 (config) / 3002 (dev-server réel)
- **CORS** : `https://smile-world-c1bc36.webflow.io`
- **Headers** : `Access-Control-Allow-Private-Network: true`

### Dependencies (`package.json`)
**Principales dépendances :**
 - **`gsap`** : v3.12.5 (animations)
- **`@vimeo/player`** : v2.29.0 (vidéos)
- **`vite`** : v5.3.1 (build)
- **`live-server`** : v1.2.2 (dev)

## 7. Événements et Communication Inter-Modules

### Système d'événements personnalisés :

**`map:focus` :** Émis par `centre-card.js`
```javascript
document.dispatchEvent(new CustomEvent('map:focus', { 
    detail: { placeId } 
}));
```

**`map:reset` :** Émis par `centre-card.js`
```javascript
document.dispatchEvent(new CustomEvent('map:reset'));
```

**Écouté par :** `map-integration.js` via `listenForFocusEvents()`

## 8. Bonnes Pratiques et Patterns

### Initialisation sécurisée :
```javascript
export function initModule() {
    const element = document.querySelector('.selector');
    if (!element) {
        console.warn('Module non initialisé : élément manquant');
        return;
    }
    // ... logique d'initialisation
}
```

### Gestion des animations :
```javascript
let isAnimating = false;
async function animateElement() {
    if (isAnimating) return;
    isAnimating = true;
    try {
        await gsap.to(element, { /* config */ });
    } finally {
        isAnimating = false;
    }
}
```

### Éviter les doubles initialisations :
```javascript
const initializedElements = new WeakSet();
// ou
if (element.dataset.moduleInitialized) return;
element.dataset.moduleInitialized = 'true';
```

## 9. Déploiement sur Webflow

### 🚨 Configuration critique :

1. **Site Settings > Custom Code > Footer Code :**
   ```html
   <script src="https://cdn.jsdelivr.net/gh/[USER]/[REPO]@[COMMIT]/dist/smileworld-bundle.iife.js"></script>
   ```

2. **⚠️ Ne PAS utiliser `type="module"`** - Le bundle IIFE se charge directement

3. **GSAP doit être chargé AVANT** le bundle (Webflow le fait automatiquement)

4. **Google Maps** : 
    ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places,marker&loading=async&language=fr"></script>
    ```

### Workflow complet :

1. **Développement local** : Serveur sur port 3002
2. **Test** : `npm run build` + rechargement auto
3. **Commit** : Messages sans point d'exclamation (préférence utilisateur)
4. **URL finale** : jsDelivr avec hash de commit spécifique

---

## 10. Problèmes Connus et Solutions

### `centre-card.js` - Historique des problèmes :
- **Symptôme** : Cartes ne s'affichent plus
- **Causes** : Double initialisation, sélecteurs obsolètes, éléments cachés sans révélation
- **Solution** : Version 6.1.0 avec diagnostic intégré et sélecteurs robustes

### Performance :
- **Bundle size** : ~37.70 kB (optimisé)
- **14 cartes** trouvées et initialisées correctement
- **Lazy loading** des modules par page

### Compatibilité :
- **CORS** configuré pour Webflow
- **Private Network Access** pour Chrome
- **Fallbacks** pour sélecteurs CSS

Ce document constitue la référence complète du projet SmileWorld JS. Pour toute modification, consulter d'abord cette architecture avant d'intervenir sur le code. 