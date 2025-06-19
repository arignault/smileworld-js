// Version : 5.1.0 – Initialisation et animations robustes
console.log('🚀 centre-card.js v5.1.0 chargé – Robuste');

let isAnimating = false;

// --- Logique d'accordéon intégrée ---

async function closeCard(item, config) {
    if (!item || !item.classList.contains(config.openClass)) return;
    const content = item.querySelector(config.contentSelector);
    const icon = item.querySelector(config.iconSelector);
    
    item.classList.remove(config.openClass);
    if (config.animation && config.animation.onClose) {
        config.animation.onClose(content, icon);
    }
}

async function openCard(item, config) {
    if (!item || item.classList.contains(config.openClass)) return;
    const content = item.querySelector(config.contentSelector);
    const icon = item.querySelector(config.iconSelector);
    
    item.classList.add(config.openClass);
    if (config.animation && config.animation.onOpen) {
        config.animation.onOpen(content, icon);
    }
}

async function toggleAccordion(item, config) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = item.classList.contains(config.openClass);
        if (!isOpen) {
            const otherOpenItems = document.querySelectorAll(`${config.itemSelector}.${config.openClass}`);
            await Promise.all(Array.from(otherOpenItems).map(other => closeCard(other, config)));
            await openCard(item, config);
        } else {
            await closeCard(item, config);
        }
    } finally {
        setTimeout(() => { isAnimating = false; }, 50); // Petit délai de sécurité
    }
}

function createAccordion(config) {
    const items = document.querySelectorAll(config.itemSelector);
    if (items.length === 0) return;

    // Force la fermeture de toutes les cartes au démarrage
    items.forEach(item => {
        const content = item.querySelector(config.contentSelector);
        const icon = item.querySelector(config.iconSelector);
        item.classList.remove(config.openClass);
        if (content) window.gsap.set(content, { display: 'none', height: 0, opacity: 0 });
        if (icon) window.gsap.set(icon, { rotation: 0 });
    });

    items.forEach(item => {
        const trigger = item.querySelector(config.triggerSelector);
        if (trigger) {
             if (trigger.dataset.accordionInitialized) return;
             trigger.dataset.accordionInitialized = 'true';
             trigger.addEventListener('click', (e) => {
                e.preventDefault();
                toggleAccordion(item, config);
            });
        }
    });
}

// --- Logique des cartes (Survol, etc.) ---

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
                if (!content) return;
                window.gsap.set(content, { display: 'block', height: 'auto', opacity: 0 });
                const height = window.gsap.getProperty(content, "height");
                window.gsap.set(content, { height: 0 });

                window.gsap.to(content, { height: height, opacity: 1, duration: 0.5, ease: 'power2.out' });
                if(icon) window.gsap.to(icon, { rotation: 180, duration: 0.4, ease: 'power2.out' });
            },
            onClose: (content, icon) => {
                if (!content) return;
                window.gsap.to(content, { 
                    height: 0, 
                    opacity: 0, 
                    duration: 0.4, 
                    ease: 'power2.in',
                    onComplete: () => window.gsap.set(content, { display: 'none' })
                });
                if(icon) window.gsap.to(icon, { rotation: 0, duration: 0.4, ease: 'power2.in' });
            }
        }
    };
    
    createAccordion(cardConfig);

    const cards = document.querySelectorAll(cardConfig.itemSelector);
    cards.forEach(card => {
        if(card.dataset.hoverInitialized) return;
        card.dataset.hoverInitialized = 'true';
        
        card.addEventListener('mouseenter', (e) => handleCardEnter(e, card));
        card.addEventListener('mouseleave', () => handleCardLeave(card));
        
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const targetNode = mutation.target;
                    if (targetNode.classList.contains(cardConfig.openClass)) {
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
