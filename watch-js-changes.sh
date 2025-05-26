#!/bin/bash

# Fonction pour obtenir le hash MD5 d'un fichier
get_file_hash() {
    if [ -f "$1" ]; then
        md5 -q "$1"
    else
        echo ""
    fi
}

# Fonction pour pousser les changements
push_changes() {
    local file=$1
    echo "🔄 Traitement des changements pour: $file"
    
    # Vérifier s'il y a des changements
    if git diff --quiet "$file" 2>/dev/null; then
        echo "ℹ️ Pas de changements détectés dans $file"
        return
    fi
    
    echo "🚀 Changements détectés dans: $file"
    echo "📝 Ajout des fichiers au staging..."
    git add "$file"
    
    echo "💾 Création du commit..."
    git commit -m "Auto-commit: Mise à jour de $file $(date '+%Y-%m-%d %H:%M:%S')"
    
    echo "⬆️ Poussage vers GitHub..."
    if git push origin main; then
        echo "✅ Changements poussés avec succès!"
    else
        echo "❌ Erreur lors du push. Vérifiez votre connexion internet et vos credentials Git."
    fi
}

echo "🔍 Démarrage de la surveillance des fichiers JS..."
echo "📁 Répertoire surveillé: $(pwd)"

# Initialiser les hashes pour tous les fichiers JS existants
echo "📋 Liste des fichiers JS surveillés:"
while IFS= read -r file; do
    if [ -f "$file" ]; then
        echo "   - $file"
        hash=$(get_file_hash "$file")
        echo "$file:$hash" >> .file_hashes
    fi
done < <(find . -name "*.js" -type f)

echo "👀 Surveillance active des fichiers JS..."

# Boucle principale de surveillance
while true; do
    # Vérifier chaque fichier JS
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            current_hash=$(get_file_hash "$file")
            stored_hash=$(grep "^$file:" .file_hashes 2>/dev/null | cut -d: -f2)
            
            # Si le hash a changé
            if [ "$current_hash" != "$stored_hash" ] && [ -n "$current_hash" ]; then
                echo "📢 Modification détectée dans: $file"
                push_changes "$file"
                # Mettre à jour le hash stocké
                sed -i '' "s|^$file:.*|$file:$current_hash|" .file_hashes 2>/dev/null || echo "$file:$current_hash" >> .file_hashes
            fi
        fi
    done < <(find . -name "*.js" -type f)
    
    # Attendre 1 seconde avant la prochaine vérification
    sleep 1
done 