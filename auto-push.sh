#!/bin/bash

# Configuration
REPO_PATH="."
BRANCH="Alex-Modif"
CHECK_INTERVAL=30  # Vérifie toutes les 30 secondes

echo "🚀 Démarrage de la surveillance automatique des changements..."
echo "📁 Répertoire surveillé: $REPO_PATH"
echo "🌿 Branche: $BRANCH"
echo "⏱️  Intervalle de vérification: $CHECK_INTERVAL secondes"
echo "----------------------------------------"

while true; do
    # Vérifie s'il y a des changements
    if git diff --quiet && git diff --cached --quiet; then
        echo "✅ Pas de changements détectés - $(date '+%H:%M:%S')"
    else
        echo "📝 Changements détectés - $(date '+%H:%M:%S')"
        
        # Ajoute tous les fichiers modifiés
        git add .
        
        # Crée un commit avec la date et l'heure
        COMMIT_MSG="Mise à jour automatique - $(date '+%d/%m/%Y %H:%M:%S')"
        git commit -m "$COMMIT_MSG"
        
        # Push vers GitHub
        if git push origin $BRANCH; then
            echo "✅ Changements poussés avec succès vers GitHub"
        else
            echo "❌ Erreur lors du push vers GitHub"
        fi
        
        echo "----------------------------------------"
    fi
    
    # Attend avant la prochaine vérification
    sleep $CHECK_INTERVAL
done 