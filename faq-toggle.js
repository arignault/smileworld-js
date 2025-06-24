// faq-toggle.js v2.0.0 - Logique d'accordéon intégrée
// console.log('🚀 faq-toggle.js v2.0.0 chargé');

let isAnimating = false;

async function closeCard(faqItem) {
    if (!faqItem || !faqItem.classList.contains('is-open')) return;
    isAnimating = true;

    const respondElement = faqItem.querySelector('.faq_respond');
    const arrow = faqItem.querySelector('.svg-holder');

    faqItem.classList.remove('is-open');

    const tl = window.gsap.timeline({
        onComplete: () => {
            if (respondElement) {
                respondElement.style.display = 'none';
            }
            isAnimating = false;
        }
    });

    if (arrow) {
        tl.to(arrow, { rotation: 0, duration: 0.25, ease: 'power2.inOut' }, 0);
    }
    
    if (respondElement) {
        tl.to(respondElement, { opacity: 0, y: -10, duration: 0.2, ease: 'power1.in' }, 0);
        tl.to(respondElement, { height: 0, duration: 0.4, ease: 'back.in(1.7)' }, 0);
    }
    
    await tl;
}

async function openCard(faqItem) {
    if (!faqItem || faqItem.classList.contains('is-open')) return;
    isAnimating = true;

    const respondElement = faqItem.querySelector('.faq_respond');
    const arrow = faqItem.querySelector('.svg-holder');

    faqItem.classList.add('is-open');

    const tl = window.gsap.timeline({
        onComplete: () => {
            isAnimating = false;
        }
    });
    
    if (respondElement) {
        window.gsap.set(respondElement, { display: 'block', opacity: 0, y: -20, height: 0 });
        
        window.getComputedStyle(respondElement).height;

        window.gsap.set(respondElement, { height: 'auto' });
        const finalHeight = respondElement.scrollHeight;
        
        window.gsap.set(respondElement, { height: 0 });
        
        tl.to(respondElement, { height: finalHeight, duration: 0.6, ease: 'elastic.out(1.2, 0.5)' }, 0);
        tl.to(respondElement, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '<0.05');
    }

    if (arrow) {
        tl.to(arrow, { rotation: 90, duration: 0.25, ease: 'back.out(1.7)' }, 0);
    }

    await tl;
}


async function toggleCard(faqItem) {
    if (isAnimating) return;

    const isOpen = faqItem.classList.contains('is-open');

    if (!isOpen) {
        // Fermer les autres
        const otherOpenCards = document.querySelectorAll('.faq_item.is-open');
        await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
        await openCard(faqItem);
    } else {
        await closeCard(faqItem);
    }
}

export function initFaqItems() {
    const faqItems = document.querySelectorAll('.faq_item');
    
    if (faqItems.length === 0) {
        return;
    }
    
    faqItems.forEach((item) => {

        if (!item) {
            return;
        }

        // --- Initialisation de l'état par défaut (fermé) ---
        item.classList.remove('is-open');
        if (item.querySelector('.faq_respond')) {
            window.gsap.set(item.querySelector('.faq_respond'), { height: 0, opacity: 0, display: 'none' });
        }
        if (item.querySelector('.svg-holder')) {
            window.gsap.set(item.querySelector('.svg-holder'), { rotation: 0 });
        }
        // ---------------------------------------------------

        // Empêcher les doubles attachements d'événements
        if (item.dataset.faqInitialized) {
            return;
        }
        item.dataset.faqInitialized = 'true';
        
        item.addEventListener('click', (e) => {
            // Ne pas déclencher si on clique sur un lien dans la réponse
            if (e.target.closest('.faq_respond a, .faq_respond button')) {
                return;
            }
            e.preventDefault();
            toggleCard(item);
        });
    });
}

