#!/usr/bin/env python3
"""
Script de nettoyage des SVG du fichier Offres.html
Supprime tous les éléments SVG et leurs contenus du fichier HTML
"""

import re
import sys
from pathlib import Path

def clean_svg_from_html(file_path):
    """
    Supprime tous les SVG d'un fichier HTML
    
    Args:
        file_path (str): Chemin vers le fichier HTML à nettoyer
    """
    
    # Vérifier que le fichier existe
    if not Path(file_path).exists():
        print(f"❌ Erreur : Le fichier {file_path} n'existe pas")
        return False
    
    try:
        # Lire le fichier
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"📄 Lecture du fichier {file_path}")
        print(f"📊 Taille originale : {len(content):,} caractères")
        
        # Compter les SVG avant suppression
        svg_count = len(re.findall(r'<svg[^>]*>.*?</svg>', content, re.DOTALL | re.IGNORECASE))
        print(f"🔍 Nombre de SVG détectés : {svg_count}")
        
        # Supprimer tous les SVG (balises ouvrantes et fermantes avec tout le contenu)
        # Pattern qui capture <svg...>...</svg> avec tous les attributs et contenu
        svg_pattern = r'<svg[^>]*>.*?</svg>'
        
        # Supprimer les SVG
        cleaned_content = re.sub(svg_pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Vérifier combien de SVG ont été supprimés
        remaining_svg = len(re.findall(r'<svg[^>]*>.*?</svg>', cleaned_content, re.DOTALL | re.IGNORECASE))
        removed_svg = svg_count - remaining_svg
        
        print(f"🗑️  SVG supprimés : {removed_svg}")
        print(f"📊 Taille après nettoyage : {len(cleaned_content):,} caractères")
        print(f"💾 Gain d'espace : {len(content) - len(cleaned_content):,} caractères")
        
        # Créer le fichier de sortie
        output_path = file_path.replace('.html', '_clean.html')
        
        # Écrire le fichier nettoyé
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        
        print(f"✅ Fichier nettoyé créé : {output_path}")
        
        # Afficher un résumé
        print("\n📋 Résumé du nettoyage :")
        print(f"   • Fichier source : {file_path}")
        print(f"   • Fichier de sortie : {output_path}")
        print(f"   • SVG supprimés : {removed_svg}")
        print(f"   • Réduction de taille : {((len(content) - len(cleaned_content)) / len(content) * 100):.1f}%")
        
        return True
        
    except Exception as e:
        print(f"❌ Erreur lors du traitement : {e}")
        return False

def main():
    """Fonction principale"""
    print("🧹 Script de nettoyage des SVG - Offres.html")
    print("=" * 50)
    
    # Fichier à traiter
    input_file = "Offres.html"
    
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
    
    # Nettoyer le fichier
    success = clean_svg_from_html(input_file)
    
    if success:
        print("\n🎉 Nettoyage terminé avec succès !")
    else:
        print("\n💥 Échec du nettoyage")
        sys.exit(1)

if __name__ == "__main__":
    main() 