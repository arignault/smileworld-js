# Checklist de Mise en Production

Ce document détaille les étapes à suivre pour passer de l'environnement de développement local (`vite dev`) à la version de production déployée sur le CDN jsDelivr.

## Étape 1 : Arrêter le serveur de développement

Assurez-vous que le processus `npm run dev` est bien arrêté dans votre terminal.

## Étape 2 : Lancer le build de production

Exécutez la commande suivante pour créer le bundle optimisé pour la production. Cette commande va générer le fichier `dist/smileworld-bundle.iife.js`.

```bash
npm run build
```

## Étape 3 : Sauvegarder les modifications sur GitHub

Ajoutez tous les fichiers, créez un "commit" et poussez les changements sur la branche principale du projet.

```bash
git add .
git commit -m "feat: Mise en production des dernières modifications"
git push origin [nom-de-votre-branche]
```

## Étape 4 : Récupérer le hash du dernier commit

Obtenez l'identifiant unique (le "hash") de votre dernier commit. Vous pouvez le trouver sur GitHub ou en utilisant la commande :

```bash
git rev-parse HEAD
```

## Étape 5 : Construire l'URL jsDelivr

Utilisez le hash de commit récupéré pour construire l'URL finale du script. Le format est le suivant :

`https://cdn.jsdelivr.net/gh/arignault/smileworld-js@[HASH_DU_COMMIT]/dist/smileworld-bundle.iife.js`

**Exemple :**
Si votre hash est `ed3b3a1f9a8b2c7d4e5f6...`, l'URL sera :
`https://cdn.jsdelivr.net/gh/arignault/smileworld-js@ed3b3a1f9a8b2c7d4e5f6/dist/smileworld-bundle.iife.js`

## Étape 6 : Mettre à jour la balise script dans Webflow

Dans les paramètres de votre site Webflow (`Custom Code > Footer Code`), modifiez la balise `<script>` pour :

1.  Utiliser la nouvelle URL jsDelivr.
2.  **TRÈS IMPORTANT :** Supprimer l'attribut `type="module"`. Le bundle de production est auto-exécutable et n'en a pas besoin.

Votre balise `<script>` doit ressembler à ceci :

```html
<script src="https://cdn.jsdelivr.net/gh/arignault/smileworld-js@.../dist/smileworld-bundle.iife.js"></script>
```

---

Une fois ces étapes terminées, publiez votre site Webflow pour que les changements soient en ligne. 