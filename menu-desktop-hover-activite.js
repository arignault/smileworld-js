// Version: 1.1.1 - Reverted to original selectors and logic to fix hover functionality
console.log('🚀 menu-desktop-hover-activite.js v1.1.1 chargé');

export function initMenuDesktopHoverActivite() {
    const menuItems = document.querySelectorAll('.desktop_menu_list.acitivt-s .default-container');
    const imageList = document.querySelector('.desktop_menu_content.right .w-dyn-items');

    if (!imageList || menuItems.length === 0) {
        console.warn('⚠️ Éléments pour le survol du menu (activités) non trouvés. Hover non fonctionnel.');
        return;
    }

    const allImages = Array.from(imageList.children);
    const defaultImageWrapper = allImages.find(item => item.querySelector('img')?.id === 'Bowling');
    const activeAnimations = new Map();

    if (!defaultImageWrapper) {
        console.warn('⚠️ Image par défaut (Bowling) non trouvée.');
    }

    // Set initial state
    allImages.forEach(imgWrapper => {
        const isDefault = defaultImageWrapper && imgWrapper === defaultImageWrapper;
        gsap.set(imgWrapper, {
            display: isDefault ? 'block' : 'none',
            opacity: isDefault ? 1 : 0
        });
    });
    
    function showImage(imageWrapper) {
        if (!imageWrapper) return;
        if (activeAnimations.has(imageWrapper)) activeAnimations.get(imageWrapper).kill();
        
        const anim = gsap.to(imageWrapper, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onStart: () => gsap.set(imageWrapper, { display: 'block' })
        });
        activeAnimations.set(imageWrapper, anim);
    }

    function hideImage(imageWrapper) {
        if (!imageWrapper) return;
        if (activeAnimations.has(imageWrapper)) activeAnimations.get(imageWrapper).kill();

        const anim = gsap.to(imageWrapper, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => gsap.set(imageWrapper, { display: 'none' })
        });
        activeAnimations.set(imageWrapper, anim);
    }

    function handleHover(e) {
        const name = e.currentTarget.getAttribute('data-name');
        if (!name) return;

        const targetImageWrapper = allImages.find(item => item.querySelector('img')?.id === name);
        
        allImages.forEach(img => {
            if (img === targetImageWrapper) {
                showImage(img);
            } else {
                hideImage(img);
            }
        });
    }

    function handleMouseLeave() {
        allImages.forEach(img => {
            if (img === defaultImageWrapper) {
                showImage(img);
            } else {
                hideImage(img);
            }
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', handleHover);
    });

    const menuContainer = document.querySelector('.activites_menu_desktop .menu-column.is-left');
    if (menuContainer) {
        menuContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    console.log('✅ Hover pour le menu desktop (activités) initialisé.');
} 