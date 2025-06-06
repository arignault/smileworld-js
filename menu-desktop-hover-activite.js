// Version: 1.1.0 - Removed console logs
console.log('🚀 menu-desktop-hover-activite.js v1.1.0 chargé');

export function initMenuDesktopHoverActivite() {
    const defaultImage = document.querySelector('.default-image');
    const menuItems = document.querySelectorAll('.menu-item');
    const imageMap = new Map();
    const activeAnimations = new Map();

    // Early exit if essential elements are missing
    if (!defaultImage || menuItems.length === 0) {
        console.warn('⚠️ Éléments pour le survol du menu non trouvés.');
        return;
    }

    // --- Caching and Setup ---

    menuItems.forEach((item, index) => {
        const linkId = item.id;
        const targetImageClass = `.image-${linkId}`;
        const targetImage = document.querySelector(targetImageClass);
        if (targetImage) {
            imageMap.set(linkId, targetImage);
            gsap.set(targetImage, { display: 'none' }); // Hide all specific images initially
        }
    });

    gsap.set(defaultImage, { display: 'block' }); // Show default image

    // --- Core Logic ---

    function handleImageDisplay(linkId, show) {
        const targetImage = imageMap.get(linkId);
        if (!targetImage) return;

        // Kill any ongoing animation for this element
        if (activeAnimations.has(targetImage)) {
            activeAnimations.get(targetImage).kill();
        }

        const animation = gsap.to(targetImage, {
            opacity: show ? 1 : 0,
            duration: 0.3,
            ease: 'power2.out',
            onStart: () => {
                if (show) {
                    gsap.set(targetImage, { display: 'block' });
                    gsap.set(defaultImage, { display: 'none' });
                }
            },
            onComplete: () => {
                activeAnimations.delete(targetImage);
                if (!show) {
                    gsap.set(targetImage, { display: 'none' });
                    // Check if any other item is hovered before showing default
                    const isAnyHovered = Array.from(menuItems).some(item => item.matches(':hover'));
                    if (!isAnyHovered) {
                        gsap.set(defaultImage, { display: 'block' });
                    }
                }
            }
        });

        activeAnimations.set(targetImage, animation);
    }

    function handleMenuHover(e) {
        const linkId = e.currentTarget.id;
        if (!linkId) return;

        menuItems.forEach(item => {
            const isCurrent = item.id === linkId;
            handleImageDisplay(item.id, isCurrent);
        });
    }

    function handleMenuMouseLeave() {
        menuItems.forEach(item => {
            handleImageDisplay(item.id, false);
        });
    }

    // --- Event Listeners ---

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', handleMenuHover);
    });

    const menuContainer = document.querySelector('.activites_menu_desktop .menu-column.is-left');
    if (menuContainer) {
        menuContainer.addEventListener('mouseleave', handleMenuMouseLeave);
    }

    console.log('✅ Hover pour le menu desktop initialisé.');
} 