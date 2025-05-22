#!/bin/bash

# Fonction pour pousser les changements
push_changes() {
    echo "🚀 Changements détectés dans les fichiers JS..."
    git add "*.js"
    git commit -m "Auto-commit: Mise à jour des fichiers JS $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    echo "✅ Changements poussés avec succès!"
}

# Surveiller les changements dans les fichiers .js
echo "👀 Surveillance des fichiers JS en cours..."
fswatch -0 "*.js" | while read -d "" event
do
    echo "📝 Modification détectée dans: $event"
    push_changes
done 