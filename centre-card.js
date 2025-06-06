// Version: 2.1.0 - Refactor for performance and reliability
console.log('🚀 centre-card.js v2.1.0 chargé - Optimisé pour la performance');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder'],
    ARROW: '.svg-holder.arrow'
};

const initializedCards = new WeakSet();
let isAnimating = false;

function closeCard(cardElement) {
    return new Promise(resolve => {
        if (!cardElement || !cardElement.classList.contains('is-open')) {
            resolve();
            return;
        }

        cardElement.classList.remove('is-open');

        const arrow = cardElement.querySelector(SELECTORS.ARROW);
        const elementsToToggle = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(elementsToToggle, { display: 'none' });
                resolve();
            }
        });

        if (arrow) {
            tl.to(arrow, { rotation: 0, duration: 0.3, ease: 'power2.inOut' }, 0);
        }

        tl.to(elementsToToggle, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        }, 0);
    });
}

async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
    const closingPromises = Array.from(otherOpenCards).map(card => closeCard(card));
    await Promise.all(closingPromises);
    
    cardElement.classList.add('is-open');

    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    const elementsToToggle = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));

    // Set display to block to allow for height calculation and make it visible for animation
    gsap.set(elementsToToggle, { display: 'block', opacity: 1, height: 'auto' });

    const tl = gsap.timeline();

    if (arrow) {
        tl.to(arrow, { rotation: 180, duration: 0.3, ease: 'power2.inOut' }, 0);
    }
    
    // Animate from height 0
    tl.from(elementsToToggle, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
    }, 0);
}

async function toggleCard(cardElement) {
    if (isAnimating) return;
    isAnimating = true;
    
    try {
        if (cardElement.classList.contains('is-open')) {
            await closeCard(cardElement);
        } else {
            await openCard(cardElement);
    }
    } finally {
        isAnimating = false;
    }
}

function initializeCard(card) {
    if (!card || initializedCards.has(card)) return;
    
    const clickableWrap = card.querySelector(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) return;
    
    const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    card.classList.remove('is-open');
    gsap.set(elementsToToggle, {
        display: 'none',
        overflow: 'hidden'
    });
    
    clickableWrap.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleCard(card);
    });

    initializedCards.add(card);
}

function setupMutationObserver() {
    const cardsContainer = document.querySelector('.centre_list_wrapper');
    if (!cardsContainer) {
        console.warn('⚠️ Conteneur de cartes (.centre_list_wrapper) non trouvé pour l\'observateur.');
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
    console.log('👀 Observateur de mutations configuré pour les cartes.');
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

