// Module pour gérer l'affichage des images d'activités au survol
export const initMenuDesktopHoverActivite = () => {
    console.log('\n==========================================');
    console.log('🎯 INITIALISATION DU MENU HOVER ACTIVITE');
    console.log('==========================================\n');

    // Sélection de la liste des images uniquement
    const imageList = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');
    
    console.log('🔍 Recherche des éléments nécessaires:');
    console.log('- Liste des images:', imageList ? '✅' : '❌');
    console.log('- Nombre d\'éléments de menu trouvés:', menuItems.length);
    
    if (!imageList || !menuItems.length) {
        console.warn('⚠️ Les éléments nécessaires pour le menu hover activite n\'ont pas été trouvés');
        return;
    }

    // Trouver l'image du Bowling pour l'afficher par défaut
    const defaultImage = Array.from(imageList.children).find(item => {
        const img = item.querySelector('img');
        return img && img.id === 'Bowling';
    });

    // Cacher toutes les images sauf le Bowling
    Array.from(imageList.children).forEach(item => {
        if (item === defaultImage) {
            item.style.opacity = '1';
            item.style.display = 'block';
            console.log('✅ Image par défaut (Bowling) affichée');
        } else {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    });

    // Stocker les animations en cours pour pouvoir les arrêter
    const activeAnimations = new Map();

    // Fonction pour gérer l'affichage des images
    const handleImageDisplay = (hoveredName, isEntering) => {
        console.log(`\n🔄 ${isEntering ? 'Survol' : 'Fin du survol'} de: "${hoveredName}"`);
        
        // Trouver l'image correspondante
        const targetImage = Array.from(imageList.children).find(item => {
            const img = item.querySelector('img');
            const match = img && img.id === hoveredName;
            if (match) {
                console.log(`✅ Image correspondante trouvée pour "${hoveredName}"`);
            }
            return match;
        });

        if (!targetImage) {
            console.warn(`⚠️ Aucune image trouvée pour "${hoveredName}"`);
            return;
        }

        // Arrêter toute animation en cours pour cette image
        if (activeAnimations.has(targetImage)) {
            activeAnimations.get(targetImage).kill();
            activeAnimations.delete(targetImage);
        }

        // Animation GSAP pour l'affichage/masquage
        console.log('🎨 Démarrage de l\'animation GSAP');
        
        if (isEntering) {
            // Masquer l'image par défaut si ce n'est pas celle qu'on survole
            if (defaultImage && defaultImage !== targetImage) {
                const defaultAnim = gsap.to(defaultImage, {
                    opacity: 0,
                    duration: 0.15,
                    ease: "power2.out",
                    onComplete: () => {
                        defaultImage.style.display = 'none';
                        activeAnimations.delete(defaultImage);
                    }
                });
                activeAnimations.set(defaultImage, defaultAnim);
            }

            // Afficher l'image survolée
            targetImage.style.display = 'block';
            const showAnim = gsap.to(targetImage, {
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                    console.log('✨ Animation d\'affichage terminée');
                    activeAnimations.delete(targetImage);
                }
            });
            activeAnimations.set(targetImage, showAnim);
        } else {
            // Masquer l'image survolée
            const hideAnim = gsap.to(targetImage, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                    targetImage.style.display = 'none';
                    // Réafficher l'image par défaut
                    if (defaultImage) {
                        defaultImage.style.display = 'block';
                        const showDefaultAnim = gsap.to(defaultImage, {
                            opacity: 1,
                            duration: 0.15,
                            ease: "power2.out",
                            onComplete: () => {
                                activeAnimations.delete(defaultImage);
                            }
                        });
                        activeAnimations.set(defaultImage, showDefaultAnim);
                    }
                    console.log('✨ Animation de masquage terminée');
                    activeAnimations.delete(targetImage);
                }
            });
            activeAnimations.set(targetImage, hideAnim);
        }
    };

    // Fonction pour gérer les effets de hover sur les éléments du menu
    const handleMenuHover = (item, isEntering) => {
        const name = item.getAttribute('data-name');
        console.log(`\n🎯 ${isEntering ? 'Survol' : 'Fin du survol'} du menu: "${name}"`);

        // Arrêter toute animation en cours pour cet élément
        if (activeAnimations.has(item)) {
            activeAnimations.get(item).kill();
            activeAnimations.delete(item);
        }

        if (isEntering) {
            // Animation d'entrée directe
            const enterAnim = gsap.to(item, {
                scale: 1.1,
                backgroundColor: '#FFFFFF',
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                    console.log('✨ Animation de hover terminée');
                    activeAnimations.delete(item);
                }
            });
            activeAnimations.set(item, enterAnim);
        } else {
            // Animation de sortie
            const leaveAnim = gsap.to(item, {
                scale: 1,
                backgroundColor: '',
                duration: 0.05,
                ease: "power2.out",
                onComplete: () => {
                    console.log('✨ Animation de fin de hover terminée');
                    activeAnimations.delete(item);
                }
            });
            activeAnimations.set(item, leaveAnim);
        }
    };

    // Ajouter les écouteurs d'événements sur les éléments du menu
    console.log('\n🎯 Configuration des écouteurs d\'événements:');
    menuItems.forEach((item, index) => {
        const name = item.getAttribute('data-name');
        if (!name) {
            console.warn(`⚠️ Élément ${index + 1}: Pas d'attribut data-name trouvé`);
            return;
        }

        console.log(`✅ Élément ${index + 1}: "${name}" - Écouteurs ajoutés`);
        
        // Événements pour les images
        item.addEventListener('mouseenter', () => {
            console.log(`\n🖱️ Souris sur: "${name}"`);
            handleImageDisplay(name, true);
            handleMenuHover(item, true);
        });

        item.addEventListener('mouseleave', () => {
            console.log(`\n👋 Fin du survol: "${name}"`);
            handleImageDisplay(name, false);
            handleMenuHover(item, false);
        });
    });

    console.log('\n✅ Initialisation du menu hover activite terminée');
    console.log('==========================================\n');
}; 