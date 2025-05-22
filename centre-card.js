// Configuration des états de la carte
const CARD_STATES = {
    CLOSED: {
        scrollWrapper: { display: 'none' },
        scrollElement: { display: 'none' },
        list: { display: 'none' },
        buttonHolder: { display: 'none' },
        tagHolderWrapper: { 
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            flexWrap: 'nowrap !important',
            overflow: 'hidden',
            visibility: 'visible',
            gap: 'clamp(0.375rem, 0.34615384615384615rem + 0.15384615384615385vw, 0.5rem)'
        },
        tagHolder: {
            display: 'inherit',
            position: 'relative',
            width: '100%',
            height: '100%',
            whiteSpace: 'nowrap',
            minWidth: '100%',
            visibility: 'visible'
        },
        maskGradient: { 
            display: 'block'
        },
        arrowHolder: {
            rotate: 0
        }
    },
    OPEN: {
        scrollWrapper: { display: 'flex' },
        scrollElement: { display: 'flex' },
        list: { display: 'flex' },
        buttonHolder: { display: 'flex' },
        tagHolderWrapper: { 
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap !important',
            overflow: 'hidden',
            visibility: 'visible',
            gap: 'clamp(0.375rem, 0.34615384615384615rem + 0.15384615384615385vw, 0.5rem)'
        },
        tagHolder: {
            display: 'inherit',
            position: 'relative',
            width: '100%',
            height: '100%',
            whiteSpace: 'normal',
            minWidth: '100%',
            visibility: 'visible'
        },
        maskGradient: { 
            display: 'none'
        },
        arrowHolder: {
            rotate: 90
        }
    }
};

// Fonction pour initialiser le drag sur les éléments scrollables
function initScrollDrag(scrollWrapper) {
    if (!scrollWrapper) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    scrollWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        scrollWrapper.style.cursor = 'grabbing';
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
    });

    scrollWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollWrapper.style.cursor = 'grab';
    });

    scrollWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        scrollWrapper.style.cursor = 'grab';
    });

    scrollWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Vitesse de déplacement
        scrollWrapper.scrollLeft = scrollLeft - walk;
    });

    // Style initial
    scrollWrapper.style.cursor = 'grab';
    scrollWrapper.style.userSelect = 'none';
    scrollWrapper.style.overflowX = 'auto';
    scrollWrapper.style.scrollBehavior = 'smooth';
}

// Fonction pour initialiser le marquee infini
function initTagHolderMarquee(tagHolderWrapper) {
    if (!tagHolderWrapper) return;

    const GAP_VALUE = 'clamp(0.375rem, 0.34615384615384615rem + 0.15384615384615385vw, 0.5rem)';
    const MARQUEE_SPEED = 50;

    // Récupérer les éléments de la nouvelle structure
    const maskGradient = tagHolderWrapper.querySelector('.mask-gradient');
    const tagHolder = tagHolderWrapper.querySelector('.tag-holder');
    const tags = Array.from(tagHolder.children);

    // Style du wrapper
    tagHolderWrapper.style.cssText = `
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        visibility: visible;
    `;

    // Style du tag holder - S'assurer que flex-wrap: nowrap est appliqué directement
    tagHolder.setAttribute('style', `
        display: flex !important;
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        white-space: nowrap !important;
        min-width: 100% !important;
        visibility: visible !important;
        gap: ${GAP_VALUE} !important;
    `);

    // Créer le conteneur du marquee
    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = 'tag-holder-marquee';
    marqueeContainer.style.cssText = `
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        visibility: visible;
    `;

    // Créer les conteneurs pour le contenu
    const content1 = document.createElement('div');
    const content2 = document.createElement('div');
    content1.className = 'marquee-content';
    content2.className = 'marquee-content';
    
    // Style commun pour les conteneurs de contenu
    const contentStyle = `
        display: inline-flex;
        flex-direction: row;
        white-space: nowrap;
        position: relative;
        gap: ${GAP_VALUE};
        width: 100%;
        min-width: 100%;
        height: 100%;
        align-items: center;
        will-change: transform;
        visibility: visible;
    `;
    content1.style.cssText = contentStyle;
    content2.style.cssText = contentStyle;
    
    // Cloner les tags en préservant leurs styles
    const cloneTags = (container) => {
        const parentWidth = tagHolderWrapper.offsetWidth;
        let currentWidth = 0;
        let tagsToAdd = [...tags]; // Copie du tableau original

        while (currentWidth < parentWidth * 2) { // On multiplie par 2 pour s'assurer d'avoir assez de contenu
            tagsToAdd.forEach(tag => {
                const clone = tag.cloneNode(true);
                const computedStyle = window.getComputedStyle(tag);
                
                // Style minimal pour préserver l'espacement
                const tagStyle = {
                    display: 'inline-flex',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    margin: 0, // Reset des marges pour utiliser gap
                    padding: computedStyle.padding
                };

                Object.assign(clone.style, tagStyle);
                clone.className = tag.className;
                container.appendChild(clone);
                currentWidth += clone.offsetWidth + parseFloat(getComputedStyle(container).gap);
            });
        }
    };

    cloneTags(content1);
    cloneTags(content2);

    // Assembler le marquee
    marqueeContainer.appendChild(content1);
    marqueeContainer.appendChild(content2);

    // Stocker les références
    tagHolderWrapper._marqueeContainer = marqueeContainer;
    tagHolderWrapper._originalContent = tagHolder.innerHTML;
    tagHolderWrapper._maskGradient = maskGradient;
    tagHolderWrapper._timeline = null;

    // Fonction pour calculer la largeur totale des tags
    const calculateTotalWidth = (container) => {
        const tags = container.children;
        let totalWidth = 0;
        Array.from(tags).forEach((tag, index) => {
            const style = window.getComputedStyle(tag);
            totalWidth += tag.offsetWidth + 
                parseFloat(style.marginRight) + 
                parseFloat(style.marginLeft);
            
            if (index < tags.length - 1) {
                totalWidth += parseFloat(getComputedStyle(container).gap);
            }
        });
        return totalWidth;
    };

    // Fonction pour démarrer le marquee
    const startMarquee = () => {
        if (!tagHolderWrapper._originalContent) {
            tagHolderWrapper._originalContent = tagHolder.innerHTML;
        }

        // Réappliquer le style important sur le tag-holder
        tagHolder.setAttribute('style', `
            display: flex !important;
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            white-space: nowrap !important;
            min-width: 100% !important;
            visibility: visible !important;
            gap: ${GAP_VALUE} !important;
        `);

        // Afficher le marquee
        if (tagHolderWrapper._marqueeContainer) {
            tagHolderWrapper._marqueeContainer.style.display = 'flex';
        } else {
            tagHolder.innerHTML = '';
            tagHolder.appendChild(marqueeContainer);
            tagHolderWrapper._marqueeContainer = marqueeContainer;
        }
        
        const totalWidth = calculateTotalWidth(content1);
        const gap = parseFloat(getComputedStyle(content1).gap);
        
        // Vérifier si le marquee est nécessaire
        if (totalWidth <= tagHolderWrapper.offsetWidth) {
            content1.innerHTML = '';
            content2.innerHTML = '';
            cloneTags(content1);
            cloneTags(content2);
        }
        
        // Recalculer la largeur totale après la duplication
        const newTotalWidth = calculateTotalWidth(content1);
        
        // Positionner le deuxième contenu
        content2.style.position = 'absolute';
        content2.style.left = `${newTotalWidth + gap}px`;
        
        if (tagHolderWrapper._timeline) {
            tagHolderWrapper._timeline.kill();
        }

        tagHolderWrapper._timeline = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" }
        });

        const duration = Math.max((newTotalWidth + gap) / MARQUEE_SPEED, 5);

        tagHolderWrapper._timeline
            .to([content1, content2], {
                x: -(newTotalWidth + gap),
                duration: duration,
                ease: "none",
                onRepeat: () => {
                    gsap.set([content1, content2], { 
                        x: 0,
                        clearProps: "all"
                    });
                }
            });

        // Pause/Play au survol
        tagHolder.addEventListener('mouseenter', () => tagHolderWrapper._timeline?.pause());
        tagHolder.addEventListener('mouseleave', () => tagHolderWrapper._timeline?.play());
    };

    // Fonction pour arrêter le marquee
    const stopMarquee = () => {
        if (tagHolderWrapper._timeline) {
            tagHolderWrapper._timeline.kill();
            tagHolderWrapper._timeline = null;
        }
        
        // Restaurer le contenu original et réappliquer le style
        tagHolder.innerHTML = tagHolderWrapper._originalContent;
        tagHolder.setAttribute('style', `
            display: flex !important;
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            white-space: normal !important;
            min-width: 100% !important;
            visibility: visible !important;
            gap: ${GAP_VALUE} !important;
        `);

        if (tagHolderWrapper._marqueeContainer) {
            tagHolderWrapper._marqueeContainer.style.display = 'none';
        }
    };

    // Exposer les fonctions
    tagHolderWrapper.startMarquee = startMarquee;
    tagHolderWrapper.stopMarquee = stopMarquee;

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(() => {
        if (!tagHolderWrapper.classList.contains('is-open')) {
            startMarquee();
        }
    });
    resizeObserver.observe(tagHolderWrapper);

    // Démarrer le marquee initial
    startMarquee();
}

// Fonction pour initialiser les cartes
async function initCentreCards() {
    console.log('🔄 Attente du chargement des cartes...');
    
    // Attendre que le DOM soit complètement chargé
    await new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    // Attendre un peu plus pour s'assurer que la collection liste est chargée
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('🔍 Recherche des cartes...');
    
    // Utiliser Array.from pour une meilleure manipulation
    const cards = Array.from(document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow'));
    console.log('📊 Nombre de cartes trouvées:', cards.length);
    
    if (cards.length === 0) {
        console.warn('⚠️ Aucune carte trouvée. Vérifiez que la collection liste est bien chargée.');
        return;
    }

    // Vérifier que les éléments nécessaires sont présents
    const validateCard = (card, index) => {
        const requiredElements = {
            scrollWrapper: card.querySelector('.centre-card_scroll_wrapper'),
            tagHolderWrapper: card.querySelector('.tag-holder-wrapper'),
            maskGradient: card.querySelector('.mask-gradient'),
            toggleButton: card.querySelector('[data-attribute="data-card-toggle"]')
        };

        const missingElements = Object.entries(requiredElements)
            .filter(([_, element]) => !element)
            .map(([name]) => name);

        if (missingElements.length > 0) {
            console.warn(`⚠️ Carte ${index + 1} - Éléments manquants:`, missingElements);
            return false;
        }

        return true;
    };

    // Initialiser chaque carte
    cards.forEach((card, index) => {
        console.log(`🔄 Initialisation de la carte ${index + 1}`);
        
        if (!validateCard(card, index)) {
            console.warn(`❌ Carte ${index + 1} - Initialisation annulée`);
            return;
        }

        let isOpen = false;
        
        // Sélectionner les éléments avec Array.from
        const scrollWrapper = card.querySelector('.centre-card_scroll_wrapper');
        const scrollElements = Array.from(card.querySelectorAll('.centre-card_scroll_element'));
        const listElements = Array.from(card.querySelectorAll('.centre-card_list'));
        const buttonHolders = Array.from(card.querySelectorAll('.centre-card_button-holder'));
        const tagHolderWrapper = card.querySelector('.tag-holder-wrapper');
        const maskGradient = tagHolderWrapper?.querySelector('.mask-gradient');
        const arrowHolder = card.querySelector('.svg-holder.arrow');
        const toggleButton = card.querySelector('[data-attribute="data-card-toggle"]');
        
        // Initialiser le drag sur le scroll wrapper
        if (scrollWrapper) {
            initScrollDrag(scrollWrapper);
        }
        
        // Initialiser le marquee pour le tag holder wrapper
        if (tagHolderWrapper) {
            initTagHolderMarquee(tagHolderWrapper);
            tagHolderWrapper.startMarquee();
        }
        
        if (toggleButton) {
            console.log(`Carte ${index + 1} - Ajout du gestionnaire de clic`);
            
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (!scrollWrapper || !tagHolderWrapper || !maskGradient) {
                    console.warn(`Carte ${index + 1} - Éléments manquants pour l'animation`);
                    return;
                }
                
                if (isOpen) {
                    console.log(`Carte ${index + 1} - Fermeture`);
                    if (scrollWrapper) gsap.set(scrollWrapper, CARD_STATES.CLOSED.scrollWrapper);
                    if (scrollElements.length) gsap.set(scrollElements, CARD_STATES.CLOSED.scrollElement);
                    if (listElements.length) gsap.set(listElements, CARD_STATES.CLOSED.list);
                    if (buttonHolders.length) gsap.set(buttonHolders, CARD_STATES.CLOSED.buttonHolder);
                    if (tagHolderWrapper) {
                        const tagHolder = tagHolderWrapper.querySelector('.tag-holder');
                        if (tagHolder) {
                            gsap.set(tagHolderWrapper, CARD_STATES.CLOSED.tagHolderWrapper);
                            gsap.set(tagHolder, CARD_STATES.CLOSED.tagHolder);
                        }
                        tagHolderWrapper.startMarquee(); // Redémarrer le marquee
                    }
                    if (maskGradient) gsap.set(maskGradient, CARD_STATES.CLOSED.maskGradient);
                    if (arrowHolder) {
                        console.log('Rotation de la flèche vers 0°');
                        gsap.to(arrowHolder, { 
                            rotation: CARD_STATES.CLOSED.arrowHolder.rotate,
                            duration: 0.3,
                            ease: "power2.inOut",
                            transformOrigin: "center center"
                        });
                    }
                    card.classList.remove('is-open');
                } else {
                    console.log(`Carte ${index + 1} - Ouverture`);
                    if (tagHolderWrapper) {
                        tagHolderWrapper.stopMarquee(); // Arrêter le marquee
                    }
                    if (scrollWrapper) gsap.set(scrollWrapper, CARD_STATES.OPEN.scrollWrapper);
                    if (scrollElements.length) gsap.set(scrollElements, CARD_STATES.OPEN.scrollElement);
                    if (listElements.length) gsap.set(listElements, CARD_STATES.OPEN.list);
                    if (buttonHolders.length) gsap.set(buttonHolders, CARD_STATES.OPEN.buttonHolder);
                    if (tagHolderWrapper) {
                        const tagHolder = tagHolderWrapper.querySelector('.tag-holder');
                        if (tagHolder) {
                            gsap.set(tagHolderWrapper, CARD_STATES.OPEN.tagHolderWrapper);
                            gsap.set(tagHolder, CARD_STATES.OPEN.tagHolder);
                        }
                    }
                    if (maskGradient) gsap.set(maskGradient, CARD_STATES.OPEN.maskGradient);
                    if (arrowHolder) {
                        console.log('Rotation de la flèche vers 90°');
                        gsap.to(arrowHolder, { 
                            rotation: CARD_STATES.OPEN.arrowHolder.rotate,
                            duration: 0.3,
                            ease: "power2.inOut",
                            transformOrigin: "center center"
                        });
                    }
                    card.classList.add('is-open');
                }
                isOpen = !isOpen;
            });
        } else {
            console.warn(`Carte ${index + 1} - Aucun bouton toggle trouvé`);
        }
        
        // État initial (fermé)
        if (scrollWrapper) gsap.set(scrollWrapper, CARD_STATES.CLOSED.scrollWrapper);
        if (scrollElements.length) gsap.set(scrollElements, CARD_STATES.CLOSED.scrollElement);
        if (listElements.length) gsap.set(listElements, CARD_STATES.CLOSED.list);
        if (buttonHolders.length) gsap.set(buttonHolders, CARD_STATES.CLOSED.buttonHolder);
        if (tagHolderWrapper) {
            const tagHolder = tagHolderWrapper.querySelector('.tag-holder');
            if (tagHolder) {
                gsap.set(tagHolderWrapper, CARD_STATES.CLOSED.tagHolderWrapper);
                gsap.set(tagHolder, CARD_STATES.CLOSED.tagHolder);
            }
        }
        if (maskGradient) gsap.set(maskGradient, CARD_STATES.CLOSED.maskGradient);
        if (arrowHolder) {
            console.log('Initialisation de la flèche à 0°');
            gsap.set(arrowHolder, { 
                rotation: CARD_STATES.CLOSED.arrowHolder.rotate,
                transformOrigin: "center center"
            });
        }
    });

    console.log('✅ Initialisation des cartes terminée');
}

// Export de la fonction pour l'utiliser dans main_gsap.js
export { initCentreCards };
