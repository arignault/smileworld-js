// faq-toggle.js v2.0.0 - Logique d'accordéon intégrée
console.log('🚀 faq-toggle.js v2.0.0 chargé');

let isAnimating = false;

async function closeCard(faqItem) {
    if (!faqItem || !faqItem.classList.contains('is-open')) return;
    isAnimating = true;

    const respondElement = faqItem.querySelector('.faq_respond');
    const arrow = faqItem.querySelector('.svg-holder.medium');

    faqItem.classList.remove('is-open');

    await window.gsap.to(respondElement, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in"
    });
    
    if (arrow) {
        window.gsap.to(arrow, { rotation: 0, duration: 0.2, ease: 'power1.inOut' });
    }

    respondElement.style.display = 'none';
    isAnimating = false;
}

async function openCard(faqItem) {
    if (!faqItem || faqItem.classList.contains('is-open')) return;
    isAnimating = true;

    const respondElement = faqItem.querySelector('.faq_respond');
    const arrow = faqItem.querySelector('.svg-holder.medium');

    faqItem.classList.add('is-open');

    window.gsap.set(respondElement, { display: 'block', height: 'auto', opacity: 0 });
    const finalHeight = respondElement.scrollHeight;

    if (arrow) {
        window.gsap.to(arrow, { rotation: 90, duration: 0.3, ease: 'back.out(1.7)' });
    }

    await window.gsap.fromTo(respondElement, 
        { height: 0, opacity: 0 },
        {
            height: finalHeight,
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1.2, 0.5)'
        }
    );
    isAnimating = false;
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
    const faqItems = document.querySelectorAll('.faq_item.effect-cartoon-shadow');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq_wrapper');
        if (trigger) {
            // Empêcher les doubles attachements d'événements
            if (trigger.dataset.faqInitialized) return;
            trigger.dataset.faqInitialized = 'true';
            
            trigger.addEventListener('click', (e) => {
                // Ne pas déclencher si on clique sur un lien dans la réponse
                if (e.target.closest('.faq_respond a, .faq_respond button')) {
                    return;
                }
                e.preventDefault();
                toggleCard(item);
            });
        }
    });
}

