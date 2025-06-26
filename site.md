# Analyse du Site Webflow SmileWorld

## **Informations Générales du Site** 🏢

- **Nom :** Smile World
- **ID Site :** `68108d2d733afc34b6c16d14`
- **Nom Court :** `smile-world-c1bc36`
- **Fuseau Horaire :** Europe/Paris
- **Création :** 29 avril 2025 
- **Dernière Mise à Jour :** 26 juin 2025
- **Dernière Publication :** 26 juin 2025
- **Locale Principal :** Français (Standard) - `fr`
- **Collection de Données :** Désactivée

## **Architecture des Collections CMS** 📊

Le site utilise **11 collections CMS** organisées hiérarchiquement :

### **1. Collection "Centres" (ID: 6814c438cb01946ab4561a9b)**
**Collection centrale** qui représente les centres Smile World en région parisienne.

**Champs principaux :**
- **Localisation :** `place-id`, `latitude`, `longitude`, `gmaps-url`
- **Capacité :** `metres-carres`, `capacite-en-nb-de-personnes`
- **Relations :** 
  - `activites-disponibles` (MultiReference → Activités Générales)
  - `acitvite-dans-le-centre` (MultiReference → Activités par centres)
  - `evenements-du-centre` (MultiReference → Événements)
- **Contenu :** `texte-intro-du-entre`, `a-propos`, `horaire-jour-d-ouverture`
- **Média :** `lien-video-hero-section`, `lien-video-1`, `lien-video-2`, `image-1`, `image-2--map`
- **Réseaux Sociaux :** `facebook`, `instagram`, `linkedin`, `youtube`, `tiktok`
- **Services :** `a-une-offre-anniversaire`, `salles-privatisables-disponibles`, `event-actif`
- **Intégrations :** `apex-id`, `fillout-smile-event-id`, `lien-social-elfsight`

### **2. Collection "Activités Générales" (ID: 6814c5c8ca17df6db071a678)**
**Catalogue global** des activités proposées par Smile World.

**Champs principaux :**
- **Relations :** 
  - `disponible-a` (MultiReference → Centres)
  - `acitvite-par-centre` (MultiReference → Activités par centres)
  - `avis-utilisateur` (MultiReference → Avis utilisateurs)
- **Contenu :** `description`, `en-resume-llm`
- **Média :** `svg-illustration-img`, `link-video-1`
- **Iconographie :** `viewbox`, `path-d`, `illustration-viewbox`, `illustration-path`
- **Section Pro :** `titre-section-pro`, `paragraphe-section-pro`, `image-section-pro`, `visibilite-section-pro`
- **Configuration :** `activite-principale`, `bookable`, `video-display-menu`

### **3. Collection "Activités par centres" (ID: 68347928bb679c2695ed996a)**
**Liaison spécifique** entre activités et centres avec détails contextuels.

**Champs principaux :**
- **Relations :**
  - `activite-general` (Reference → Activités Générales)
  - `centre` (Reference → Centres)
- **Contenu :** `sous-titre`, `description`, `en-resume-llm`
- **Média :** `image-1`, `video-hero`, `video-2`, `image-si-pas-de-video`
- **Commercial :** `tarif-minimum`, `a-une-offre`
- **Intégrations :** `embed-matterport`, `apex-id`

### **4. Collection "Offres" (ID: 683881e87e23e1ee4db4e9e4)**
**Système d'offres commerciales** avec catégorisation.

**Champs principaux :**
- **Relations :**
  - `activite-lie` (MultiReference → Activités Générales)
  - `centre` (Reference → Centres)
  - `type-d-offre-cms-2` (Reference → Type d'offres)
- **Contenu :** `description`, `description-rich`, `tarif`
- **Action :** `text-bouton`, `boutton` (lien)
- **Catégorie :** `type-d-offre` (Option : Anniversaire, Famille, Groupe, Enfant, Multi-activité, Étudiant)

### **5. Collections Secondaires**

#### **Événements** (ID: 683865fb1561ea60949365a6)
- Gestion des événements spéciaux par centre
- Liée aux centres via `evenements-du-centre`

#### **Salles Privatisables** (ID: 683ef52385f52bfdcbc9cf9b)
- Espaces privatisables avec intégration Matterport
- Gérée via le switch `salles-privatisables-disponibles` des centres

#### **Avis utilisateurs** (ID: 684009e2208d3b7b8b6e6336)
- Système de témoignages clients
- Liée aux activités via `avis-utilisateur`

#### **FAQs** (ID: 6848a628fe0f783ef477f499)
- Questions fréquentes avec système d'accordéon

#### **Tarifs** (ID: 684950a5c24fdf4dc0ee0859)
- Grille tarifaire globale

#### **Type d'offres** (ID: 684951e1a9b1c16e8dfc31d4)
- Taxonomie des offres commerciales

#### **Communiqué de Presses** (ID: 6842ba3245ec90209c964456)
- Gestion de l'espace presse

## **Structure des Pages** 📄

Le site compte **33 pages** organisées en sections :

### **Pages Principales**
- **Accueil** (`/`) - Page d'atterrissage principale
- **Réservation** (`/reservation`) - **Module complexe** avec système de filtrage
- **Offres** (`/offres`) - Catalogue des offres commerciales
- **Évènements** (`/evenements`) - Liste des événements

### **Pages de Services**
- **Anniversaires** (`/anniversaires`) - Offres spécialisées
- **Smile Event** (`/smile-event`) - Solutions entreprises
- **Privatisation** (`/privatisation`) - *En brouillon*
- **Tarifs généraux** (`/tarifs-generaux`)

### **Pages Templates CMS**
- **Centres Template** (`/nos-parcs-a-paris-region-parisienne`) - Pages individuelles de centres
- **Activités Générales Template** (`/activites`) - Pages d'activités
- **Activités par centres Template** (`/activites-par-centre`) - Pages contextuelles
- **Offres Template** (`/offres`)
- **Événements Template** (`/evenements`)
- **Et 6 autres templates**

### **Pages Utilitaires**
- **À Propos** (`/a-propos`) - Configuré comme FAQ dans le SEO
- **Contact** (`/contact`)
- **Espace Presse** (`/espace-presse`)
- **Recrutement** (`/recrutement`)
- **Partenaires** (`/partenaires`)
- **Mon compte** (`/mon-compte`)

### **Pages Légales**
- **Mentions Légales** (`/mentions-legales`)
- **Politique de Confidentialité** (`/politique-de-confidentialite`)
- **Conditions d'Utilisation** (`/conditions-dutilisation`)
- **404** (`/404`)
- **401** (`/401`) - Page protégée par mot de passe

### **Pages de Développement**
- **Style Guide** (`/style-guide`) - Bibliothèque de composants
- **Style Guide Copy** (`/style-guide-copy`)
- **Default to COPY** (`/default-to-copy`) - *En brouillon*

## **Relations et Interdépendances** 🔄

### **Hiérarchie des Relations CMS**

```
Centres (Principal)
├── Activités Générales (MultiReference)
│   ├── Activités par centres (Spécialisées)
│   └── Avis utilisateurs
├── Événements du centre
├── Offres (par centre)
└── Salles Privatisables

Activités Générales
├── Disponible à (Centres)
├── Activité par centre (Contextuelles)
└── Avis utilisateurs

Offres
├── Activité liée
├── Centre associé
└── Type d'offre
```

### **Intégrations Techniques**

1. **Google Maps :**
   - `place-id` pour Places API
   - `latitude`/`longitude` pour géolocalisation
   - `gmaps-url` pour boutons d'itinéraire

2. **Vidéos :**
   - Vimeo intégré via liens dans `lien-video-*`
   - `video-display-menu` pour affichage dans les menus

3. **Matterport :**
   - `embed-matterport` pour visites virtuelles 3D
   - Utilisé dans les salles privatisables

4. **Systèmes Tiers :**
   - `apex-id` pour système de réservation
   - `fillout-smile-event-id` pour formulaires événements
   - `lien-social-elfsight` pour widgets sociaux

## **Observations Stratégiques** 💡

### **Points Forts**
1. **Architecture modulaire** bien pensée avec séparation logique
2. **Système de relations** sophistiqué entre collections
3. **Intégrations multiples** (Maps, Vimeo, Matterport, réseaux sociaux)
4. **Gestion de contenu** flexible avec Rich Text et options
5. **SEO structuré** avec slugs et métadonnées

### **Complexités Identifiées**
1. **Double référencement** : Activités générales ↔ Activités par centres
2. **Multiplicité des champs média** (vidéos, images, embeddings)
3. **Système d'offres** avec double taxonomie (Option + CMS)
4. **Gestion d'état** complexe (switches multiples : event-actif, salles-privatisables, etc.)

### **Correspondance avec le JavaScript**

Le code JavaScript du projet est parfaitement aligné avec cette structure :

- **`centre-card.js`** → Collection "Centres" avec accordéons
- **`reservation.js`** → Page "/reservation" avec filtrage Centres ↔ Activités
- **`map-integration.js`** → Champs `place-id`, `latitude`, `longitude`
- **`menu-*.js`** → Navigation entre collections (centres, activités, offres)
- **`privateroom.js`** → Collection "Salles Privatisables" + Matterport

Cette analyse révèle un écosystème numérique cohérent où chaque composant JavaScript correspond à une fonctionnalité métier spécifique du CMS Webflow. 