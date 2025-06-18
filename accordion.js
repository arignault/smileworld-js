// accordion.js
// Version : 1.0.0 – Module générique pour les animations d'accordéon

import { gsap } from 'gsap';

let isAnimating = false;

/**
 * Ferme un élément de type accordéon.
 * @param {Element} item - L'élément à fermer.
 * @param {object} config - La configuration des sélecteurs.
 */
async function closeAccordion(item, config) {
    if (!item || !item.classList.contains('is-open')) return;

    const content = item.querySelector(config.contentSelector);
    const arrow = item.querySelector(config.arrowSelector);

    item.classList.remove('is-open');

    const tl = gsap.timeline();

    tl.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
    }, 0);

    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.25,
            ease: 'power2.inOut'
        }, 0);
    }
    
    await tl;
    content.style.display = 'none';
}

/**
 * Ouvre un élément de type accordéon.
 * @param {Element} item - L'élément à ouvrir.
 * @param {object} config - La configuration des sélecteurs.
 */
async function openAccordion(item, config) {
    if (!item || item.classList.contains('is-open')) return;

    item.classList.add('is-open');
    const content = item.querySelector(config.contentSelector);
    const arrow = item.querySelector(config.arrowSelector);

    gsap.set(content, { 
        display: 'block',
        height: 'auto',
        opacity: 0
    });

    const finalHeight = content.scrollHeight;
    
    const tl = gsap.timeline();

    tl.from(content, { height: 0, opacity: 0 }, 0);
    tl.to(content, {
        height: finalHeight,
        opacity: 1,
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

    await tl;
}

/**
 * Bascule l'état d'un élément et ferme les autres.
 * @param {Element} item - L'élément cliqué.
 * @param {object} config - La configuration des sélecteurs.
 */
async function toggleAccordion(item, config) {
    if (isAnimating) return;
    isAnimating = true;

    try {
        const isOpen = item.classList.contains('is-open');
        
        if (!isOpen) {
            const otherOpenItems = document.querySelectorAll(`${config.itemSelector}.is-open`);
            await Promise.all(Array.from(otherOpenItems).map(other => closeAccordion(other, config)));
            await openAccordion(item, config);

            // Dispatch a custom event when an item is opened
            const event = new CustomEvent('accordion:opened', {
                bubbles: true,
                detail: {
                    item: item,
                    config: config
                }
            });
            item.dispatchEvent(event);

        } else {
            await closeAccordion(item, config);
        }
    } catch (error) {
        console.error('Erreur lors du toggle de l\'accordéon:', error);
    } finally {
        isAnimating = false;
    }
}


/**
 * Initialise un ensemble d'éléments accordéon.
 * @param {object} config - L'objet de configuration.
 *   - itemSelector: Le sélecteur pour chaque élément accordéon.
 *   - triggerSelector: Le sélecteur pour la zone cliquable.
 *   - contentSelector: Le sélecteur pour le contenu à afficher/masquer.
 *   - arrowSelector: (Optionnel) Le sélecteur pour l'icône de flèche.
 */
export function createAccordion(config) {
    const items = document.querySelectorAll(config.itemSelector);
    if (items.length === 0) return;

    items.forEach(item => {
        const trigger = item.querySelector(config.triggerSelector);
        const content = item.querySelector(config.contentSelector);

        if (!trigger || !content) return;

        // Set initial state
        if (!item.classList.contains('is-open')) {
            gsap.set(content, { display: 'none', height: 0 });
        }
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAccordion(item, config);
        });
    });
} 