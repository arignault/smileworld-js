// Version : 4.0.0 – Utilise le module accordéon et les événements custom
import { createAccordion } from './accordion.js';
import { gsap } from 'gsap';

console.log('🚀 centre-card.js v4.0.0 chargé – Refactorisé avec Accordion et Events');

const HOVER_CONFIG = {
    maxOffset: 0.1875,
    defaultVerticalOffset: 0.1875,
    shadowColor: 'var(--colors--black)',
    scaleAmount: 1.05,
    scaleDuration: 0.15,
    scaleEase: "elastic.out(1, 0.3)"
};

function calculateMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    return { x: -(x * 2 - 1) };
}

function handleCardHover(e, card) {
    if (!card || card.classList.contains('is-open')) return;
    const pos = calculateMousePosition(e, card);
    const offsetX = pos.x * HOVER_CONFIG.maxOffset;
    card.style.boxShadow = `${offsetX}rem ${HOVER_CONFIG.defaultVerticalOffset}rem 0 0 ${HOVER_CONFIG.shadowColor}`;
}

function handleCardEnter(e, card) {
    if (!card || card.classList.contains('is-open')) return;
    gsap.to(card, {
        scale: HOVER_CONFIG.scaleAmount,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase
    });
}

function handleCardLeave(card) {
    if (!card) return;
    gsap.to(card, {
        scale: 1,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase,
        onComplete: () => {
            if (!card.classList.contains('is-open')) {
                card.style.boxShadow = '';
            }
        }
    });
}

function initializeCardHover(card) {
    card.addEventListener('mouseenter', (e) => handleCardEnter(e, card));
    card.addEventListener('mousemove', (e) => handleCardHover(e, card));
    card.addEventListener('mouseleave', () => handleCardLeave(card));
}

export function initCentreCards() {
    const cardConfig = {
        itemSelector: '.centre-card_wrapper.effect-cartoon-shadow',
        triggerSelector: '.clickable_wrap[data-attribute="data-card-toggle"]',
        contentSelector: '.centre-card_scroll_wrapper',
        arrowSelector: '.svg-holder.arrow'
    };
    
    createAccordion(cardConfig);

    const cards = document.querySelectorAll(cardConfig.itemSelector);
    cards.forEach(card => {
        initializeCardHover(card);
    });

    // Écoute l'événement d'ouverture de l'accordéon
    document.addEventListener('accordion:opened', (e) => {
        const openedItem = e.detail.item;
        
        // Vérifie si l'élément ouvert est une carte de centre
        if (openedItem.matches(cardConfig.itemSelector)) {
            const placeId = openedItem.closest('.w-dyn-item')?.dataset.placeId;
            if (placeId) {
                // Émet un événement pour que la carte se concentre sur ce lieu
                document.dispatchEvent(new CustomEvent('map:focus', {
                    bubbles: true,
                    detail: { placeId }
                }));
            }
        }
    });
} 