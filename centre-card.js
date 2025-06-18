// Version : 3.2.2 – Animation beaucoup plus rapide
console.log('🚀 centre-card.js v4.2.2 chargé – Alex modif Effet de soulèvement optimisé et animation des tags très rapide');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
    CARD_BUTTONS: '.centre-card_button-holder',
    INTERNAL_LINKS: '.centre-card_button-holder a, .centre-card_button-holder button'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// Configuration de l'effet de survol
const HOVER_CONFIG = {
    maxOffset: 0.1875, // Correspond à --_ui-styles---stroke--s
    defaultVerticalOffset: 0.1875, // Valeur verticale constante
    shadowColor: 'var(--colors--black)', // Utilisation de la variable de couleur
    threshold: 0.4, // Zone de transition plus large (était à 0.2)
    scaleAmount: 1.05, // Augmentation de la taille
    scaleDuration: 0.15, // Animation rapide
    scaleEase: "elastic.out(1, 0.3)" // Effet bouncy rapide
};

// --- Fonctions d'animation ---

/**
 * Ferme une carte en animant le contenu et la carte elle-même.
 * @param {Element} cardElement 
 */
async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;
    
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    const scrollWrapper = cardElement.querySelector('.centre-card_scroll_wrapper');
    
    cardElement.classList.remove('is-open');
    
    const tl = gsap.timeline({
        onStart: () => {
            // On s'assure que la hauteur est correcte avant l'animation
            if (scrollWrapper) {
                gsap.set(scrollWrapper, { height: '10rem' });
            }
        },
        onComplete: () => {
            gsap.set(elementsToAnimate, { display: 'none' });
            // On réinitialise la hauteur à 0 après l'animation
            if (scrollWrapper) {
                gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

    // Animation de l'opacité d'abord (plus rapide)
    tl.to(elementsToAnimate, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power1.in',
        stagger: {
            each: 0.02,
            from: 'start'
        }
    }, 0);

    // Animation de la flèche en même temps
    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.25,
            ease: 'power2.inOut'
        }, 0);
    }

    // Animation de la hauteur avec un effet bouncy au début et rapide à la fin
    if (scrollWrapper) {
        tl.to(scrollWrapper, {
            height: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        }, 0);
    }

    await tl;
}

/**
 * Ouvre une carte en animant la carte, la flèche et le contenu.
 * @param {Element} cardElement 
 */
async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    cardElement.classList.add('is-open');
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    const scrollWrapper = cardElement.querySelector('.centre-card_scroll_wrapper');
    
    elementsToAnimate.forEach(el => {
        gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
            opacity: 0,
            y: -20
        });
    });

    const tl = gsap.timeline({
        onStart: () => {
            // On s'assure que la hauteur est à 0 avant l'animation
            if (scrollWrapper) {
                gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

    // Animation de la hauteur
    if (scrollWrapper) {
        tl.to(scrollWrapper, {
            height: '10rem',
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.5)'
        }, 0);
    }

    // Animation de la flèche
    if (arrow) {
        tl.to(arrow, {
            rotation: 90,
            duration: 0.25,
            ease: 'back.out(1.7)'
        }, '<');
    }

    // Animation de l'opacité
    tl.to(elementsToAnimate, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: {
            each: 0.035,
            from: 'start'
        }
    }, '<0.05');

    await tl;
}

/**
 * Bascule l'état ouvert/fermé d'une carte, en empêchant les animations simultanées.
 * Ferme toutes les autres cartes ouvertes avant d'en ouvrir une nouvelle.
 * @param {Element} cardElement 
 */
async function toggleCard(cardElement) {
    console.log('🔄 Début du toggle de la carte');
    if (isAnimating) {
        console.log('⏳ Animation en cours, toggle ignoré');
        return;
    }
    isAnimating = true;

    try {
        const isOpen = cardElement.classList.contains('is-open');
        console.log('📊 État actuel de la carte:', isOpen ? 'ouverte' : 'fermée');
        
        if (!isOpen) {
            console.log('🔓 Tentative d\'ouverture de la carte');
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
            console.log('📦 Autres cartes ouvertes:', otherOpenCards.length);
            await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
            await openCard(cardElement);

            // On notifie la carte de zoomer sur le bon centre
            const placeId = cardElement.closest('.w-dyn-item')?.dataset.placeId;
            if (window.mapManager && placeId) {
                window.mapManager.focusOnCenter(placeId);
            }
        } else {
            console.log('🔒 Tentative de fermeture de la carte');
            await closeCard(cardElement);

            // On notifie la carte de revenir à la vue initiale
            if (window.mapManager) {
                window.mapManager.resetMapView();
            }
        }
    } catch (error) {
        console.error('❌ Erreur lors du toggle:', error);
    } finally {
        isAnimating = false;
        console.log('✅ Toggle terminé');
    }
}

/**
 * Calcule une position linéaire et fluide
 * @param {number} value - Valeur entre -1 et 1
 * @returns {number} - Valeur linéaire
 */
function amplifyPosition(value) {
    // Calcul linéaire simple sans seuil abrupt
    // Utilisation d'une courbe plus douce pour une transition plus fluide
    return value;
}

/**
 * Calcule la position relative de la souris par rapport à l'élément
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} element - L'élément survolé
 * @returns {{x: number}} - Position normalisée
 */
function calculateMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    
    // Conversion en valeurs de -1 à 1 avec une transition plus douce
    return {
        x: -(x * 2 - 1)
    };
}

/**
 * Applique l'effet de shadow et de scale en fonction de la position de la souris
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} card - La carte survolée
 */
function handleCardHover(e, card) {
    if (!card || card.classList.contains('is-open')) return;

    const pos = calculateMousePosition(e, card);
    // Application directe de la position sans amplification
    const offsetX = pos.x * HOVER_CONFIG.maxOffset;

    // Application de l'ombre avec déplacement horizontal uniquement et valeur verticale constante
    card.style.boxShadow = `${offsetX}rem ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
}

/**
 * Gère l'entrée de la souris sur la carte
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} card - La carte survolée
 */
function handleCardEnter(e, card) {
    if (!card || card.classList.contains('is-open')) return;

    // Notification de la carte pour zoomer
    const placeId = card.closest('.w-dyn-item')?.dataset.placeId;
    if (window.mapManager && placeId) {
        window.mapManager.focusOnCenter(placeId);
    }

    // Animation de scale avec effet bouncy plus prononcé
    gsap.to(card, {
        scale: HOVER_CONFIG.scaleAmount,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        overwrite: true
    });

    handleCardHover(e, card);
}

/**
 * Gère la sortie de la souris de la carte
 * @param {Element} card - La carte survolée
 */
function handleCardLeave(card) {
    if (!card || card.classList.contains('is-open')) return;

    // Notification de la carte pour réinitialiser la vue
    if (window.mapManager) {
        window.mapManager.resetMapView();
    }

    // Réinitialisation de l'ombre avec la valeur verticale par défaut
    card.style.boxShadow = `0 ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
    
    // Animation de retour à l'échelle normale avec le même effet bouncy
    gsap.to(card, {
        scale: 1,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        overwrite: true
    });
}

// --- Fonctions d'initialisation ---

/**
 * Met à jour le layout des éléments à toggle pour stocker leur display d'origine
 * et, si la carte n'est pas ouverte, cache directement les contenus.
 * @param {Element} card 
 */
export function updateCardLayout(card) {
    if (!card) return;
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    elementsToToggle.forEach(el => {
        const currentDisplay = window.getComputedStyle(el).display;
        if (currentDisplay !== 'none') {
            el.dataset.originalDisplay = currentDisplay;
        }
    });

    if (!card.classList.contains('is-open')) {
        gsap.set(elementsToToggle, { display: 'none', opacity: 0 });
    }
}

/**
 * Initialise une carte : on stocke le display initial de chaque élément à animer,
 * on les cache et on ajoute l'écouteur de clic pour toggle.
 * @param {Element} card 
 */
export function initializeCard(card) {
    console.log('🎯 Début de l\'initialisation de la carte:', card);
    
    if (!card || initializedCards.has(card)) {
        console.log('❌ Carte déjà initialisée ou invalide');
        return;
    }

    // On cherche le wrapper cliquable principal
    const clickableWrap = card.parentElement.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) {
        console.warn('⚠️ Élément clickableWrap principal non trouvé');
        return;
    }
    console.log('✅ Élément clickableWrap principal trouvé:', clickableWrap);

    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    console.log('📦 Éléments à toggle trouvés:', elementsToToggle.length);
    
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });

    // Fonction pour gérer le toggle de la carte
    const handleCardToggle = (event) => {
        // Si on clique sur un lien ou un bouton interne, on ne fait rien
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) {
            console.log('⏭️ Clic sur un lien/bouton interne, on laisse passer');
            return;
        }

        // Si la carte est ouverte et qu'on clique en dehors des boutons, on ferme
        if (card.classList.contains('is-open')) {
            const isClickingOutsideButtons = !event.target.closest(SELECTORS.CARD_BUTTONS);
            if (isClickingOutsideButtons) {
                console.log('🔒 Fermeture de la carte (clic en dehors des boutons)');
                event.preventDefault();
                event.stopPropagation();
                toggleCard(card);
            }
            return;
        }

        // Si on arrive ici, on ouvre la carte
        console.log('🔄 Ouverture de la carte');
        event.preventDefault();
        event.stopPropagation();
        toggleCard(card);
    };

    // On ajoute l'événement sur le wrapper principal uniquement
    clickableWrap.addEventListener('click', handleCardToggle);

    // On s'assure que les liens et boutons internes fonctionnent correctement
    const internalElements = card.querySelectorAll(SELECTORS.INTERNAL_LINKS);
    internalElements.forEach(element => {
        element.addEventListener('click', (event) => {
            console.log('🖱️ Clic sur un élément interne:', element);
            // On laisse l'événement se propager normalement
            event.stopPropagation(); // On empêche juste la propagation vers le wrapper
        });
    });

    // Ajout des événements de survol sur la carte visuelle elle-même
    card.addEventListener('mousemove', (e) => handleCardEnter(e, card));
    card.addEventListener('mouseleave', () => handleCardLeave(card));
    card.addEventListener('mouseenter', () => {
        // Réinitialisation directe au survol initial
        card.style.boxShadow = 'var(--_ui-styles---stroke--s) var(--_ui-styles---stroke--s) 0 0 var(--colors--black)';
    });

    console.log('✅ Carte initialisée avec succès');
    initializedCards.add(card);
}

function setupMutationObserver() {
    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (!cardsContainer) {
        console.warn('⚠️ Conteneur de cartes (.collection-list-centre-wrapper) non trouvé pour l\'observateur.');
        return;
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.matches(SELECTORS.CARD)) {
                            initializeCard(node);
                        }
                        node.querySelectorAll(SELECTORS.CARD).forEach(initializeCard);
                    }
                });
            }
        }
    });

    observer.observe(cardsContainer, { childList: true, subtree: true });
}

export async function initCentreCards() {
    console.log('🚀 Démarrage de l\'initialisation des cartes...');
    
        await new Promise(resolve => {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
                resolve();
    } else {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        }
    });

    const cards = document.querySelectorAll(SELECTORS.CARD);
    console.log(`🔍 ${cards.length} cartes trouvées, initialisation...`);
    cards.forEach(initializeCard);

    setupMutationObserver();
    
    console.log('✅ Initialisation des cartes terminée.');
}

