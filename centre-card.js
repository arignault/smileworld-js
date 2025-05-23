// Version: 2.0.0 - Version minimaliste pour reconstruction
console.log('🚀 centre-card.js v2.0.0 chargé - Prêt pour reconstruction');

// Configuration des sélecteurs
const SELECTORS = {
    CARD: '.centre-card._wrapper',
    CLICKABLE: '.clickable_wrap, .clickable_button',
    TOGGLE_ELEMENTS: [
        '.centre-card_scroll_wrapper',
        '.tag-holder-wrapper',
        '.centre-card_button-holder'
    ]
};

// État initial des éléments à cacher
function initializeCardElements() {
    SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
        gsap.set(selector, { display: 'none' });
    });
}

// Gestion du toggle d'une carte
function toggleCard(cardElement) {
    const isOpen = cardElement.classList.contains('is-open');
    
    // Animation des éléments
    SELECTORS.TOGGLE_ELEMENTS.forEach(selector => {
        const element = cardElement.querySelector(selector);
        if (element) {
            gsap.to(element, {
                display: isOpen ? 'none' : 'flex',
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }
    });

    // Mise à jour de l'état
    cardElement.classList.toggle('is-open');
}

// Gestionnaire d'événements pour les cartes
function setupCardListeners() {
    document.querySelectorAll(SELECTORS.CLICKABLE).forEach(clickable => {
        clickable.addEventListener('click', (event) => {
            event.preventDefault();
            const card = clickable.closest(SELECTORS.CARD);
            if (card) {
                toggleCard(card);
            }
        });
    });
}

// Fonction d'initialisation principale
export function initCentreCards() {
    console.log('✅ Module centre-card.js connecté et prêt');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeCardElements();
            setupCardListeners();
        });
    } else {
        initializeCardElements();
        setupCardListeners();
    }

    // Observer les changements dans le DOM pour gérer le contenu dynamique
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                initializeCardElements();
                setupCardListeners();
            }
        });
    });

    // Observer le conteneur principal des cartes
    const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
    if (cardsContainer) {
        observer.observe(cardsContainer, {
            childList: true,
            subtree: true
        });
    }

    return Promise.resolve();
}
