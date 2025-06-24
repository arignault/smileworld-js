// Version : 6.0.0 – Logique de centre-card-old.js réintégrée
console.log('🚀 centre-card.js v6.0.0 chargé – Logique old.js réintégrée');

const SELECTORS = {
    CARD: '.centre-card_wrapper.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.clickable_wrap[data-attribute="data-card-toggle"]',
    TOGGLE_ELEMENTS: ['.centre-card_scroll_wrapper', '.centre-card_list', '.centre-card_button-holder', '.tag_holder_wrapper'],
    ARROW: '.svg-holder.arrow',
    INTERNAL_LINKS: '.centre-card_button-holder a, .centre-card_button-holder button'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Fonctions d'animation ---

async function closeCard(cardElement) {
    if (!cardElement || !cardElement.classList.contains('is-open')) return;
    
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    
    cardElement.classList.remove('is-open');
    
    const tl = window.gsap.timeline({
        onComplete: () => {
            window.gsap.set(elementsToAnimate, { display: 'none' });
        }
    });

    tl.to(elementsToAnimate, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power1.in',
        stagger: 0.02
    }, 0);

    if (arrow) {
        tl.to(arrow, { rotation: 0, duration: 0.25, ease: 'power2.inOut' }, 0);
    }
    
    await tl;
}

async function openCard(cardElement) {
    if (!cardElement || cardElement.classList.contains('is-open')) return;

    cardElement.classList.add('is-open');
    const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = cardElement.querySelector(SELECTORS.ARROW);
    
    elementsToAnimate.forEach(el => {
        window.gsap.set(el, { 
            display: el.dataset.originalDisplay || 'block',
            opacity: 0,
            y: -20
        });
    });

    const tl = window.gsap.timeline();

    if (arrow) {
        tl.to(arrow, { rotation: 90, duration: 0.25, ease: 'back.out(1.7)' }, '<');
    }

    tl.to(elementsToAnimate, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.035
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