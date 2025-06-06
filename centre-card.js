// Version : 3.2.2 – Animation beaucoup plus rapide
console.log('🚀 centre-card.js v3.2.2 chargé – Effet de soulèvement optimisé et animation des tags très rapide');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Fonctions d'animation ---

/**
 * Ferme une carte en animant le contenu et la carte elle-même.
 * @param {Element} cardElement 
 */
async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;
    
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    
    cardElement.classList.remove('is-open');
    
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(elementsToAnimate, { display: 'none' });
            gsap.set(cardElement, { boxShadow: '', scale: 1 });
        }
    });

    tl.to(cardElement, {
        y: 0,
        scale: 1,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.12)',
        duration: 0.15,
        ease: 'power2.inOut'
    }, 0);

    tl.to(elementsToAnimate, {
        y: -10,
        opacity: 0,
        duration: 0.12,
        ease: 'power1.in'
    }, '<');

    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.15,
            ease: 'power2.inOut'
        }, '<0.03');
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
    
    elementsToAnimate.forEach(el => {
        gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
                    opacity: 0,
            y: -20
        });
    });

    const tl = gsap.timeline();

    tl.to(cardElement, {
        y: -8,
        scale: 1.02,
        boxShadow: '0px 12px 24px rgba(0,0,0,0.15)',
        duration: 0.18,
        ease: 'power2.out'
    }, 0);

    if (arrow) {
        tl.to(arrow, {
            rotation: 180,
            duration: 0.25,
            ease: 'back.out(1.7)'
        }, '<');
    }

    tl.to(elementsToAnimate, {
        y: 0,
        opacity: 1,
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
    if (isAnimating) return;
    isAnimating = true;

    try {
    const isOpen = cardElement.classList.contains('is-open');
    
    if (!isOpen) {
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
            await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
            await openCard(cardElement);
        } else {
            await closeCard(cardElement);
        }
    } finally {
        isAnimating = false;
    }
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
    if (!card || initializedCards.has(card)) return;

    const clickableWrap = card.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) return;

    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -20 });

    clickableWrap.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleCard(card);
    });

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

