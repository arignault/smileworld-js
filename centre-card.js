// Version: 2.4.0 - Smooth container animation.
console.log('🚀 centre-card.js v2.4.0 chargé - Animation douce du conteneur');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder'],
    ARROW: '.svg-holder.arrow'
};

const initializedCards = new WeakSet();
let isAnimating = false;

async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;

    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(elementsToAnimate, { display: 'none' });
            gsap.set(cardElement, { height: 'auto' });
            cardElement.classList.remove('is-open');
        }
    });

    const startHeight = cardElement.offsetHeight;
    gsap.set(elementsToAnimate, { display: 'none' });
    const endHeight = cardElement.offsetHeight;
    gsap.set(elementsToAnimate, { display: el => el.dataset.originalDisplay || 'block' });
    gsap.set(cardElement, { height: startHeight });

    tl.to(elementsToAnimate, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
    });

    tl.to(cardElement, {
        height: endHeight,
        duration: 0.5,
        ease: 'expo.inOut'
    }, '<');

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

    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(cardElement, { height: 'auto' });
        }
    });

    const startHeight = cardElement.offsetHeight;
    gsap.set(elementsToAnimate, { display: el => el.dataset.originalDisplay || 'block', opacity: 1 });
    const endHeight = cardElement.offsetHeight;
    gsap.set(elementsToAnimate, { opacity: 0 });
    gsap.set(cardElement, { height: startHeight });

    tl.to(cardElement, {
        height: endHeight,
        duration: 0.7,
        ease: 'expo.out'
    });

    if (arrow) {
        tl.to(arrow, {
            rotation: 180,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '<');
    }

    gsap.set(elementsToAnimate, { display: el => el.dataset.originalDisplay || 'block' });
    tl.fromTo(elementsToAnimate, {
        opacity: 0,
        y: -20,
    }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.05
    }, '<0.15');

    await tl;
}

async function toggleCard(cardElement) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = cardElement.classList.contains('is-open');
        
        if (!isOpen) {
            // Close other cards first
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

export function updateCardLayout(card) {
    if (!card) return;
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    // Mettre à jour la propriété de display originale
    elementsToToggle.forEach(el => {
        // On ne met à jour que si le style a changé et n'est pas 'none'
        const currentDisplay = window.getComputedStyle(el).display;
        if (el.dataset.originalDisplay !== currentDisplay && currentDisplay !== 'none') {
            el.dataset.originalDisplay = currentDisplay;
        }
    });

    // S'assurer que les cartes fermées restent visuellement fermées
    if (!card.classList.contains('is-open')) {
        gsap.set(elementsToToggle, { display: 'none', opacity: 0 });
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

