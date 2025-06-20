// Version : 2.0.0 – Réintégration de la logique de `main`
console.log('🚀 faq-toggle.js v2.0.0 chargé');

const SELECTORS = {
    FAQ_ITEM: '.faq_item',
    CLICKABLE_WRAP: '.faq_wrapper',
    TOGGLE_ELEMENTS: ['.faq_respond'],
    ARROW: '.svg-holder.medium',
    INTERNAL_LINKS: '.faq_respond a, .faq_respond button'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Fonctions d'animation ---

async function closeCard(faqItem) {
    if (!faqItem || !faqItem.classList.contains('is-open')) {
        return;
    }
    
    const elementsToAnimate = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = faqItem.querySelector(SELECTORS.ARROW);
    const respondElement = faqItem.querySelector('.faq_respond');
    
    faqItem.classList.remove('is-open');
    
    window.gsap.set(elementsToAnimate, { 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
    });
    
    const tl = window.gsap.timeline({
        onStart: () => {
            window.gsap.set(elementsToAnimate, { display: 'block' });
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

    tl.to(respondElement, {
        height: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
            elementsToAnimate.forEach(el => {
                el.style.display = 'none';
            });
            respondElement.style.display = 'none';
        }
    }, 0);

    await tl;
}

async function openCard(faqItem) {
    if (!faqItem || faqItem.classList.contains('is-open')) {
        return;
    }

    faqItem.classList.add('is-open');
    const elementsToAnimate = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = faqItem.querySelector(SELECTORS.ARROW);
    const respondElement = faqItem.querySelector('.faq_respond');

    elementsToAnimate.forEach(el => {
        const display = el.dataset.originalDisplay || 'block';
        window.gsap.set(el, { 
            display: display,
            opacity: 0,
            y: -20
        });
    });
    
    const finalHeight = respondElement.scrollHeight;
    window.gsap.set(respondElement, { height: 0 });

    const tl = window.gsap.timeline();

    tl.to(respondElement, {
        height: finalHeight,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.5)'
    }, 0);

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

async function toggleCard(faqItem) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = faqItem.classList.contains('is-open');
        
        if (!isOpen) {
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.FAQ_ITEM}.is-open`);
            const closePromises = Array.from(otherOpenCards).map(card => closeCard(card));
            await Promise.all(closePromises);
            await new Promise(resolve => setTimeout(resolve, 50));
            await openCard(faqItem);
        } else {
            await closeCard(faqItem);
        }
    } catch (error) {
        console.error('❌ Erreur lors du toggle:', error);
    } finally {
        setTimeout(() => {
            isAnimating = false;
        }, 50);
    }
}

function initializeFaq(faqItem) {
    if (!faqItem || initializedCards.has(faqItem)) {
        return;
    }

    const clickableWrap = faqItem.closest(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) {
        console.warn('⚠️ Élément faq_wrapper non trouvé pour', faqItem);
        return;
    }

    const elementsToToggle = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    
    const respondElement = faqItem.querySelector('.faq_respond');
    if (respondElement) {
        window.gsap.set(respondElement, { height: 0 });
    }
    window.gsap.set(elementsToToggle, { display: 'none', opacity: 0 });

    const handleFaqToggle = (event) => {
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        toggleCard(faqItem);
    };

    clickableWrap.addEventListener('click', handleFaqToggle);

    faqItem.querySelectorAll(SELECTORS.INTERNAL_LINKS).forEach(element => {
        element.addEventListener('click', (event) => event.stopPropagation());
    });

    initializedCards.add(faqItem);
}

export function initFaqItems() {
    // Remplacé par window.gsap pour compatibilité globale
    window.gsap.registerPlugin(window.TextPlugin);
    
    const faqItems = document.querySelectorAll(SELECTORS.FAQ_ITEM);
    if (faqItems.length === 0) {
        return;
    }
    
    faqItems.forEach(initializeFaq);
    
    // Observateur pour les FAQs chargées dynamiquement (si nécessaire)
    const faqContainer = document.querySelector('.w-dyn-list');
    if (faqContainer) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            if (node.matches(SELECTORS.FAQ_ITEM)) {
                                initializeFaq(node);
                            }
                            node.querySelectorAll(SELECTORS.FAQ_ITEM).forEach(initializeFaq);
                        }
                    });
                }
            }
        });
        observer.observe(faqContainer, { childList: true, subtree: true });
    }
}

