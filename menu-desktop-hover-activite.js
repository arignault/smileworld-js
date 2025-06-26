// Version: 1.0.2 - Fix transition directe entre tags (debouncing)

// Gère l'affichage des images au survol
export const initMenuDesktopHoverActivite = () => {
    const imageList = document.querySelector('.desktop_menu_content.right .w-dyn-items');
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');
    
    if (!imageList || !menuItems.length) return;

    // Affiche l'image par défaut (Bowling)
    const defaultImage = Array.from(imageList.children).find(item => {
        const img = item.querySelector('img');
        return img && img.id === 'Bowling';
    });

    Array.from(imageList.children).forEach(item => {
        if (item === defaultImage) {
            item.style.opacity = '1';
            item.style.display = 'block';
        } else {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    });

    // Stocke les animations en cours et l'état de survol
    const activeAnimations = new Map();
    let currentHoveredItem = null;

    // Gère l'affichage des images au survol
    const handleImageDisplay = (hoveredName, isEntering) => {
        const targetImage = Array.from(imageList.children).find(item => {
            const img = item.querySelector('img');
            return img && img.id === hoveredName;
        });

        if (!targetImage) return;

        if (activeAnimations.has(targetImage)) {
            activeAnimations.get(targetImage).kill();
            activeAnimations.delete(targetImage);
        }

        if (isEntering) {
            currentHoveredItem = hoveredName;
            
            if (defaultImage && defaultImage !== targetImage) {
                if (activeAnimations.has(defaultImage)) {
                    activeAnimations.get(defaultImage).kill();
                }
                const defaultAnim = window.gsap.to(defaultImage, {
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
            const showAnim = window.gsap.to(targetImage, {
                opacity: 1,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => activeAnimations.delete(targetImage)
            });
            activeAnimations.set(targetImage, showAnim);
        } else {
            // Ne restaurer l'image par défaut que si on quitte vraiment tous les éléments
            if (currentHoveredItem === hoveredName) {
                currentHoveredItem = null;
            }
            
            const hideAnim = window.gsap.to(targetImage, {
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
                onComplete: () => {
                    targetImage.style.display = 'none';
                    // Ne restaurer par défaut que si aucun élément n'est survolé
                    if (currentHoveredItem === null && defaultImage) {
                        defaultImage.style.display = 'block';
                        if (activeAnimations.has(defaultImage)) {
                            activeAnimations.get(defaultImage).kill();
                        }
                        const showDefaultAnim = window.gsap.to(defaultImage, {
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

    // Gère l'animation au survol des éléments de menu
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

        const anim = window.gsap.to(item, { ...animProps, ...animConfig });
        activeAnimations.set(item, anim);
    };

    let configuredItems = 0;
    menuItems.forEach((item) => {
        const name = item.getAttribute('data-name');
        if (!name) return;

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
}; 