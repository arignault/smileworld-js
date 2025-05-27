# Smile World GSAP

Ce dépôt contient les fichiers JavaScript et HTML pour le site Smile World, utilisant GSAP pour les animations.

## Structure du projet

```
smileworld-js/
└─ www/                # Racine web servie par l'hébergement mutualisé
   ├─ index.html      # Page principale
   ├─ smileworld.js   # Fichiers JavaScript
   ├─ *.js            # Autres fichiers JavaScript
   └─ .htaccess       # Configuration Apache (en-têtes anti-cache)
.ovhconfig            # Configuration OVH (racine du dépôt)
```

## Déploiement

Le déploiement est géré automatiquement via l'intégration Git d'OVH. Seul le contenu du dossier `www/` est déployé sur le serveur.

## Développement local

Pour le développement local, un serveur de développement est disponible sur `http://127.0.0.1:5500`.
