// Version : 1.0.2 – Animation FAQ avec logs détaillés
console.log('🚀 faq-toggle.js v1.0.2 chargé – Système de FAQ avec animations GSAP');

const SELECTORS = {
    FAQ_ITEM: '.faq_item.effect-cartoon-shadow',
    CLICKABLE_WRAP: '.faq_wrapper',
    TOGGLE_ELEMENTS: ['.faq_respond'],
    ARROW: '.svg-holder.medium',
    INTERNAL_LINKS: '.faq_respond a, .faq_respond button'
};

const initializedCards = new WeakSet();
let isAnimating = false;

// --- Fonctions d'animation ---

/**
 * Ferme une FAQ en animant le contenu et la FAQ elle-même.
 * @param {Element} faqItem 
 */
async function closeCard(faqItem) {
    console.log('🔒 Tentative de fermeture de la FAQ:', faqItem);
    if (!faqItem || !faqItem.classList.contains('is-open')) {
        console.log('❌ FAQ invalide ou déjà fermée');
        return;
    }
    
    const elementsToAnimate = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = faqItem.querySelector(SELECTORS.ARROW);
    const respondElement = faqItem.querySelector('.faq_respond');
    
    console.log('📦 Éléments à animer trouvés:', {
        elementsCount: elementsToAnimate.length,
        hasArrow: !!arrow,
        hasRespond: !!respondElement
    });
    
    faqItem.classList.remove('is-open');
    
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(respondElement, { height: 0 });
            console.log('✅ Animation de fermeture terminée');
        }
    });

    // Animation de la hauteur (inversée)
    tl.to(respondElement, {
        height: 0,
        duration: 0.7,
        ease: 'elastic.inOut(1.2, 0.4)'
    }, 0);

    // Animation de la flèche (inversée)
    if (arrow) {
        tl.to(arrow, {
            rotation: 0,
            duration: 0.7,
            ease: 'elastic.inOut(1.2, 0.4)'
        }, 0);
    }

    // Animation de l'opacité (inversée)
    elementsToAnimate.forEach(el => {
        tl.to(el, {
            opacity: 0,
            duration: 0.7,
            ease: 'elastic.inOut(1.2, 0.4)',
            onComplete: () => {
                gsap.set(el, { display: 'none' });
            }
        }, 0);
    });

    await tl;
}

/**
 * Ouvre une FAQ en animant la FAQ, la flèche et le contenu.
 * @param {Element} faqItem 
 */
async function openCard(faqItem) {
    console.log('🔓 Tentative d\'ouverture de la FAQ:', faqItem);
    if (!faqItem || faqItem.classList.contains('is-open')) {
        console.log('❌ FAQ invalide ou déjà ouverte');
        return;
    }

    faqItem.classList.add('is-open');
    const elementsToAnimate = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    const arrow = faqItem.querySelector(SELECTORS.ARROW);
    const respondElement = faqItem.querySelector('.faq_respond');
    
    console.log('📦 Éléments à animer trouvés:', {
        elementsCount: elementsToAnimate.length,
        hasArrow: !!arrow,
        hasRespond: !!respondElement
    });

    // On prépare les éléments
    elementsToAnimate.forEach(el => {
        const display = el.dataset.originalDisplay || 'block';
        gsap.set(el, { 
            display: display,
            opacity: 0
        });
    });
    
    // On mesure la hauteur finale
    const finalHeight = respondElement.scrollHeight;
    gsap.set(respondElement, { height: 0 });

    const tl = gsap.timeline();

    // Animation de la hauteur
    tl.to(respondElement, {
        height: finalHeight * 1.05,
        duration: 0.7,
        ease: 'elastic.out(1.2, 0.4)'
    }, 0);

    // Animation de la flèche
    if (arrow) {
        tl.to(arrow, {
            rotation: 90,
            duration: 0.7,
            ease: 'elastic.out(1.2, 0.4)'
        }, 0);
    }

    // Animation de l'opacité
    elementsToAnimate.forEach(el => {
        tl.to(el, {
            opacity: 1,
            duration: 0.7,
            ease: 'elastic.out(1.2, 0.4)'
        }, 0);
    });

    // Deuxième phase : retour à la hauteur normale
    tl.to(respondElement, {
        height: finalHeight,
        duration: 0.4,
        ease: 'power2.out'
    });

    await tl;
}

/**
 * Bascule l'état ouvert/fermé d'une FAQ, en empêchant les animations simultanées.
 * Ferme toutes les autres FAQs ouvertes avant d'en ouvrir une nouvelle.
 * @param {Element} faqItem 
 */
async function toggleCard(faqItem) {
    console.log('🔄 Début du toggle de la FAQ:', faqItem);
    if (isAnimating) {
        console.log('⏳ Animation en cours, toggle ignoré');
        return;
    }
    isAnimating = true;

    try {
        const isOpen = faqItem.classList.contains('is-open');
        console.log('📊 État actuel de la FAQ:', isOpen ? 'ouverte' : 'fermée');
        
        if (!isOpen) {
            console.log('🔓 Tentative d\'ouverture de la FAQ');
            const otherOpenCards = document.querySelectorAll(`${SELECTORS.FAQ_ITEM}.is-open`);
            console.log('📦 Autres FAQ ouvertes:', otherOpenCards.length);
            await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));
            await openCard(faqItem);
        } else {
            console.log('🔒 Tentative de fermeture de la FAQ');
            await closeCard(faqItem);
        }
    } catch (error) {
        console.error('❌ Erreur lors du toggle:', error);
    } finally {
        isAnimating = false;
        console.log('✅ Toggle terminé');
    }
}

// --- Fonctions d'initialisation ---

/**
 * Met à jour le layout des éléments FAQ pour stocker leur display d'origine
 * et, si la FAQ n'est pas ouverte, cache directement les contenus.
 * @param {Element} faqItem 
 */
export function updateFaqLayout(faqItem) {
    if (!faqItem) return;
    const elementsToToggle = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    
    elementsToToggle.forEach(el => {
        const currentDisplay = window.getComputedStyle(el).display;
        if (currentDisplay !== 'none') {
            el.dataset.originalDisplay = currentDisplay;
        }
    });

    if (!faqItem.classList.contains('is-open')) {
        gsap.set(elementsToToggle, { display: 'none', opacity: 0 });
    }
}

/**
 * Initialise une FAQ : on stocke le display initial de chaque élément à animer,
 * on les cache et on ajoute l'écouteur de clic pour toggle.
 * @param {Element} faqItem 
 */
export function initializeFaq(faqItem) {
    console.log('🎯 Début de l\'initialisation de la FAQ:', faqItem);
    
    if (!faqItem || initializedCards.has(faqItem)) {
        console.log('❌ FAQ déjà initialisée ou invalide');
        return;
    }

    // On cherche le wrapper cliquable (le faq_wrapper qui contient tout)
    const clickableWrap = faqItem.closest(SELECTORS.CLICKABLE_WRAP);
    if (!clickableWrap) {
        console.warn('⚠️ Élément faq_wrapper non trouvé');
        return;
    }
    console.log('✅ Élément faq_wrapper trouvé:', clickableWrap);

    const elementsToToggle = faqItem.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
    console.log('📦 Éléments à toggle trouvés:', elementsToToggle.length);
    
    elementsToToggle.forEach(el => {
        el.dataset.originalDisplay = window.getComputedStyle(el).display;
    });
    
    // On cache le contenu en mettant la hauteur à 0
    const respondElement = faqItem.querySelector('.faq_respond');
    if (respondElement) {
        gsap.set(respondElement, { height: 0 });
    }
    gsap.set(elementsToToggle, { display: 'none', opacity: 0 });

    // Fonction pour gérer le toggle de la FAQ
    const handleFaqToggle = (event) => {
        if (event.target.closest(SELECTORS.INTERNAL_LINKS)) {
            console.log('⏭️ Clic sur un lien/bouton interne, on laisse passer');
            return;
        }

        console.log('🔄 Toggle de la FAQ');
        event.preventDefault();
        event.stopPropagation();
        toggleCard(faqItem);
    };

    clickableWrap.addEventListener('click', handleFaqToggle);

    const internalElements = faqItem.querySelectorAll(SELECTORS.INTERNAL_LINKS);
    internalElements.forEach(element => {
        element.addEventListener('click', (event) => {
            console.log('🖱️ Clic sur un élément interne:', element);
            event.stopPropagation();
        });
    });

    console.log('✅ FAQ initialisée avec succès');
    initializedCards.add(faqItem);
}

function setupFaqMutationObserver() {
    const faqContainer = document.querySelector('.w-dyn-list');
    if (!faqContainer) {
        console.warn('⚠️ Conteneur de FAQ (.w-dyn-list) non trouvé pour l\'observateur.');
        return;
    }

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

export async function initFaqItems() {
    console.log('🚀 Démarrage de l\'initialisation des FAQ...');
    console.log('🔍 Recherche des éléments FAQ dans le DOM...');
    
    await new Promise(resolve => {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('✅ DOM déjà chargé');
            resolve();
        } else {
            console.log('⏳ Attente du chargement du DOM...');
            document.addEventListener('DOMContentLoaded', () => {
                console.log('✅ DOM chargé via event listener');
                resolve();
            }, { once: true });
        }
    });

    const faqItems = document.querySelectorAll(SELECTORS.FAQ_ITEM);
    console.log(`🔍 ${faqItems.length} FAQ trouvées dans le DOM:`, {
        selectors: SELECTORS.FAQ_ITEM,
        items: Array.from(faqItems).map(item => ({
            id: item.id,
            classes: item.className,
            hasWrapper: !!item.closest(SELECTORS.CLICKABLE_WRAP),
            hasArrow: !!item.querySelector(SELECTORS.ARROW),
            hasRespond: !!item.querySelector(SELECTORS.TOGGLE_ELEMENTS[0])
        }))
    });

    if (faqItems.length === 0) {
        console.warn('⚠️ Aucune FAQ trouvée avec le sélecteur:', SELECTORS.FAQ_ITEM);
        console.log('🔍 Vérification des éléments disponibles:', {
            faqWrappers: document.querySelectorAll('.faq_wrapper').length,
            faqItems: document.querySelectorAll('.faq_item').length,
            faqQuestions: document.querySelectorAll('.faq_question').length,
            faqResponds: document.querySelectorAll('.faq_respond').length
        });
    }

    faqItems.forEach(initializeFaq);
    setupFaqMutationObserver();
    
    console.log('✅ Initialisation des FAQ terminée');
}

