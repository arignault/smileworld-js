// Version: 3.1.0 - Add subtle card animation.
console.log('🚀 centre-card.js v3.1.0 chargé - Animation de carte subtile');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder'],
    ARROW: '.svg-holder.arrow'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Animation Functions ---

async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;
    
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    
    cardElement.classList.remove('is-open');

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(elementsToAnimate, { display: 'none' });
        }
    });

    // Animer la carte et le contenu en même temps pour la fermeture
    tl.to(cardElement, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
    }, 0);

    tl.to(elementsToAnimate, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
    }, '<'); // '<' démarre en même temps que l'animation précédente

    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        }, '<');
    }

    await tl;
}

async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    cardElement.classList.add('is-open');
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    
    // Rendre les éléments visibles pour l'animation
    elementsToAnimate.forEach(el => {
        gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
            opacity: 0
        });
    });

    const tl = gsap.timeline();

    // 1. Animer la carte elle-même
    tl.to(cardElement, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out'
    }, 0);

    // 2. Animer la flèche en même temps que la carte
    if (arrow) {
        tl.to(arrow, {
            rotation: 180,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '<');
    }

    // 3. Animer l'apparition du contenu, légèrement décalé
    tl.fromTo(elementsToAnimate, {
        y: -20,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.05
    }, '<0.1'); // Démarrer 0.1s après le début de la timeline

    await tl;
}

// --- Main Logic ---

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

// --- Initialization Functions ---

export function updateCardLayout(card) {
    if (!card) return;
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    elementsToToggle.forEach(el => {
        const currentDisplay = window.getComputedStyle(el).display;
        if (el.dataset.originalDisplay !== currentDisplay && currentDisplay !== 'none') {
            el.dataset.originalDisplay = currentDisplay;
        }
    });

    if (!card.classList.contains('is-open')) {
        gsap.set(elementsToAnimate, { display: 'none', opacity: 0 });
    }
}

export function initializeCard(card) {
    if (!card || initializedCards.has(card)) return;

    const clickableWrap = card.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) return;

    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    gsap.set(elementsToToggle, { display: 'none', opacity: 0 });

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

