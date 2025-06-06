// Module pour gérer l'affichage des images d'activités au survol
export const initMenuDesktopHoverActivite = () => {
    console.log('🎯 Initialisation du menu hover activite...');

    // Sélection de la liste des images uniquement
    const imageList = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');
    
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
        } else {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    });

    if (defaultImage) {
        console.log('✅ Image par défaut (Bowling) affichée');
    }

    // Stocker les animations en cours pour pouvoir les arrêter
    const activeAnimations = new Map();

    // Fonction pour gérer l'affichage des images
    const handleImageDisplay = (hoveredName, isEntering) => {
        const targetImage = Array.from(imageList.children).find(item => {
            const img = item.querySelector('img');
            return img && img.id === hoveredName;
        });

        if (!targetImage) {
            return;
        }

        if (activeAnimations.has(targetImage)) {
            activeAnimations.get(targetImage).kill();
            activeAnimations.delete(targetImage);
        }

        if (isEntering) {
            if (defaultImage && defaultImage !== targetImage) {
                if (activeAnimations.has(defaultImage)) {
                    activeAnimations.get(defaultImage).kill();
                }
                const defaultAnim = gsap.to(defaultImage, {
                    opacity: 0,
                    duration: 0.15,
                    ease: "power2.out",
                    onComplete: () => {
                        if (defaultImage) {
                           defaultImage.style.display = 'none';
                        }
                        activeAnimations.delete(defaultImage);
                    }
                });
                activeAnimations.set(defaultImage, defaultAnim);
            }

            targetImage.style.display = 'block';
            const showAnim = gsap.to(targetImage, {
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => activeAnimations.delete(targetImage)
            });
            activeAnimations.set(targetImage, showAnim);
        } else {
            const hideAnim = gsap.to(targetImage, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                    targetImage.style.display = 'none';
                    if (defaultImage) {
                        defaultImage.style.display = 'block';
                        if (activeAnimations.has(defaultImage)) {
                            activeAnimations.get(defaultImage).kill();
                        }
                        const showDefaultAnim = gsap.to(defaultImage, {
                            opacity: 1,
                            duration: 0.15,
                            ease: "power2.out",
                            onComplete: () => activeAnimations.delete(defaultImage)
                        });
                        activeAnimations.set(defaultImage, showDefaultAnim);
                    }
                    activeAnimations.delete(targetImage);
                }
            });
            activeAnimations.set(targetImage, hideAnim);
        }
    };

    const handleMenuHover = (item, isEntering) => {
        if (activeAnimations.has(item)) {
            activeAnimations.get(item).kill();
            activeAnimations.delete(item);
        }

        const animConfig = {
            duration: isEntering ? 0.1 : 0.05,
            ease: "power2.out",
            onComplete: () => activeAnimations.delete(item)
        };

        const animProps = isEntering 
            ? { scale: 1.1, backgroundColor: '#FFFFFF' }
            : { scale: 1, backgroundColor: '' };

        const anim = gsap.to(item, { ...animProps, ...animConfig });
        activeAnimations.set(item, anim);
    };

    let configuredItems = 0;
    menuItems.forEach((item) => {
        const name = item.getAttribute('data-name');
        if (!name) {
            return; // On ignore les éléments sans nom
        }

        item.addEventListener('mouseenter', () => {
            handleImageDisplay(name, true);
            handleMenuHover(item, true);
        });

        item.addEventListener('mouseleave', () => {
            handleImageDisplay(name, false);
            handleMenuHover(item, false);
        });
        configuredItems++;
    });

    console.log(`✅ ${configuredItems}/${menuItems.length} éléments du menu d'activités configurés.`);
    console.log('✅ Initialisation du menu hover activite terminée.');
};
