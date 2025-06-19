// Version : 4.1.0 – Utilise window.gsap
// import { gsap } from 'gsap';
import { createAccordion } from './accordion.js';

console.log('🚀 centre-card.js v4.1.0 chargé – Refactorisé avec Accordion et Events');

const HOVER_CONFIG = {
    scaleDuration: 0.4,
    scaleAmount: 1.05,
    scaleEase: 'power2.out',
    shadow: '0px 10px 30px rgba(0, 0, 0, 0.1)'
};

function handleCardEnter(e, card) {
    if (!card || card.classList.contains('is-open')) return;
    window.gsap.to(card, {
        scale: HOVER_CONFIG.scaleAmount,
        duration: HOVER_CONFIG.scaleDuration,
        ease: HOVER_CONFIG.scaleEase
    });
}

function handleCardLeave(card) {
    if (!card) return;
    window.gsap.to(card, {
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

export function initCentreCards() {
    const cardConfig = {
        itemSelector: '.card-offre-h-s',
        triggerSelector: '.accordion_head',
        contentSelector: '.accordion_content',
        iconSelector: '.accordion_icon',
        openClass: 'is-open',
        animation: {
            onOpen: (content, icon) => {
                window.gsap.set(content, { height: 'auto', opacity: 1 });
                window.gsap.from(content, { height: 0, opacity: 0, duration: 0.5, ease: 'power2.out' });
                window.gsap.to(icon, { rotation: '+=180', duration: 0.4, ease: 'power2.out' });
            },
            onClose: (content, icon) => {
                window.gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.in' });
                window.gsap.to(icon, { rotation: '+=180', duration: 0.4, ease: 'power2.in' });
            }
        }
    };
    
    createAccordion(cardConfig);

    const cards = document.querySelectorAll(cardConfig.itemSelector);
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => handleCardEnter(e, card));
        card.addEventListener('mouseleave', () => handleCardLeave(card));
        
        // Ajout d'un observateur pour gérer le style de l'ombre
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const targetNode = mutation.target;
                    if (targetNode.classList.contains('is-open')) {
                        targetNode.style.boxShadow = HOVER_CONFIG.shadow;
                    } else {
                        targetNode.style.boxShadow = '';
                    }
                }
            });
        });

        observer.observe(card, { attributes: true });
    });
}
