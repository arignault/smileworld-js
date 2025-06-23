// Version : 7.0.1 – Forçage du commit
console.log('🚀 centre-card.js v7.0.1 chargé – Intégration animations rapides (force commit)');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
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
    
    const tl = window.gsap.timeline({
        onStart: () => {
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: '10rem' });
            }
        },
        onComplete: () => {
            window.gsap.set(elementsToAnimate, { display: 'none' });
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

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

    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.25,
            ease: 'power2.inOut'
        }, 0);
    }

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
        window.gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
            opacity: 0,
            y: -20
        });
    });

    const tl = window.gsap.timeline({
        onStart: () => {
            if (scrollWrapper) {
                window.gsap.set(scrollWrapper, { height: 0 });
            }
        }
    });

    if (scrollWrapper) {
        tl.to(scrollWrapper, {
            height: '10rem',
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.5)'
        }, 0);
    }

    if (arrow) {
        tl.to(arrow, {
            rotation: 90,
            duration: 0.25,
            ease: 'back.out(1.7)'
        }, '<');
    }

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

async function toggleCard(cardElement) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = cardElement.classList.contains('is-open');
        
        if (!isOpen) {
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
            await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
            await openCard(cardElement);

            /* DÉBUT DE LA MODIFICATION : Lignes supprimées
            const placeId = cardElement.closest('.w-dyn-item')?.dataset.placeId;
            if (placeId) {
                document.dispatchEvent(new CustomEvent('map:focus', { detail: { placeId } }));
            }
            */
        } else {
            await closeCard(cardElement);
            // document.dispatchEvent(new CustomEvent('map:reset')); // Ligne supprimée
        }
    } finally {
        isAnimating = false;
    }
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
    const offsetX = pos.x * HOVER_CONFIG.maxOffset;

    card.style.boxShadow = `${offsetX}rem ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
}

/**
 * Gère l'entrée de la souris sur la carte
 * @param {MouseEvent} e - L'événement de la souris
 * @param {Element} card - La carte survolée
 */
function handleCardEnter(e, card) {
    if (!card || card.classList.contains('is-open')) return;

    window.gsap.to(card, {
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

    card.style.boxShadow = `0 ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
    
    window.gsap.to(card, {
        scale: 1,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        overwrite: true
    });
}

// --- Fonctions d'initialisation ---

function initializeCard(card) {
    if (!card || initializedCards.has(card)) return;

    const clickableWrap = card.parentElement.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) return;

    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    window.gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });

    const handleCardToggle = (event) => {
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) return;
        event.preventDefault();
        event.stopPropagation();
        toggleCard(card);
    };

    clickableWrap.addEventListener('click', handleCardToggle);

    // Ajout des événements de survol sur la carte visuelle elle-même
    card.addEventListener('mousemove', (e) => handleCardHover(e, card));
    card.addEventListener('mouseleave', () => handleCardLeave(card));
    card.addEventListener('mouseenter', (e) => handleCardEnter(e, card));

    initializedCards.add(card);
}

function setupMutationObserver() {
    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (!cardsContainer) return;

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

export function initCentreCards() {
    const cards = document.querySelectorAll(SELECTORS.CARD);

    /* Lignes supprimées pour tester l'hypothèse
    // Sécurité : s'assurer qu'aucune carte n'est ouverte au chargement
    cards.forEach(card => {
        if (card.classList.contains('is-open')) {
            card.classList.remove('is-open');
        }
    });
    */

    cards.forEach(initializeCard);
    setupMutationObserver();
}
