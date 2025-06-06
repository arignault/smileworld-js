// Version : 3.3.2 - Fix problème d'ouverture des cartes
console.log('🚀 centre-card.js v3.3.2 chargé – correction ouverture des cartes');

const SELECTORS = {
  CARD: '.centre-card_wrapper.effect-cartoon-shadow',
  CLICKABLE_WRAP: '#data-card-toggle, [data-attribute="data-card-toggle"]',
  TOGGLE_ELEMENTS: [
    '.centre-card_scroll_wrapper',
    '.centre-card_list',
    '.centre-card_button-holder',
    '.tag_holder_wrapper'
  ],
  ARROW: '.svg-holder.arrow'
};

const initializedCards = new WeakSet();
let isAnimating = false;

/**
 * Ferme une carte sans "push" les autres cartes,
 * uniquement en jouant sur opacity / translateY des contenus.
 */
async function closeCard(cardElement) {
  if (!cardElement || !cardElement.classList.contains('is-open')) return;

  const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
  const arrow = cardElement.querySelector(SELECTORS.ARROW);

  // On retire la classe « is-open » immédiatement pour que, si vous avez un CSS basé sur cette classe,
  // le layout repasse en "état fermé" (par exemple, height: auto → height: 0 en CSS).
  cardElement.classList.remove('is-open');

  // Timeline GSAP pour faire disparaître le contenu
  const tl = gsap.timeline({
    onStart: () => {
      // Au moment du départ, on s'assure que tous les kids sont bien à leur place
      elementsToAnimate.forEach(el => {
        // Ici, on part de l'état affiché (opacity: 1, y: 0)
        // donc on n'a pas besoin de setter quoi que ce soit d'autre.
      });
    },
    onComplete: () => {
      // Quand tout est fini, on cache définitivement les blocs
      gsap.set(elementsToAnimate, { display: 'none' });
      // On remet la flèche à 0° pour la fermer
      if (arrow) gsap.set(arrow, { rotation: 0 });
    }
  });

  // 1. On fait glisser les éléments du contenu vers le haut (y: -10) tout en faisant opacity→0
  tl.to(elementsToAnimate, {
    y: -10,
    opacity: 0,
    duration: 0.25,
    ease: 'power1.in'
  }, 0);

  // 2. En même temps, on fait tourner la flèche en 0°
  if (arrow) {
    tl.to(arrow, {
      rotation: 0,
      duration: 0.25,
      ease: 'power2.inOut'
    }, 0);
  }

  await tl;
}

/**
 * Ouvre une carte en affichant le contenu
 * avec un fade-in + slide léger.
 */
async function openCard(cardElement) {
  if (!cardElement || cardElement.classList.contains('is-open')) return;

  const elementsToAnimate = cardElement.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
  const arrow = cardElement.querySelector(SELECTORS.ARROW);

  // On ajoute la classe is-open pour pouvoir, si besoin, appliquer un CSS spécifique.
  cardElement.classList.add('is-open');

  // Avant d'animer, on s'assure que les éléments sont visibles (display) et en position "masquée"
  elementsToAnimate.forEach(el => {
    // On récupère le display d'origine stocké dans data-original-display (voire "block" par défaut)
    gsap.set(el, {
      display: el.dataset.originalDisplay || 'block',
      opacity: 0,
      y: -15 // position légèrement au-dessus
    });
  });

  // Timeline GSAP pour faire apparaître le contenu
  const tl = gsap.timeline({
    onStart: () => {
      // Rien de spécial au démarrage
    },
    onComplete: () => {
      // À la fin, on s'assure que tout est à y:0 et opacity:1 (normalement déjà fait)
      elementsToAnimate.forEach(el => {
        gsap.set(el, { y: 0, opacity: 1 });
      });
      // On laisse la flèche à 180° (ouverte)
      if (arrow) gsap.set(arrow, { rotation: 180 });
    }
  });

  // 1. On fait tourner la flèche à 180° (optionnel, timing très court)
  if (arrow) {
    tl.to(arrow, {
      rotation: 180,
      duration: 0.3,
      ease: 'power2.out'
    }, 0);
  }

  // 2. On fait apparaître en cascade (stagger) chaque élément : y: -15 → y:0 & opacity: 0 → 1
  tl.to(elementsToAnimate, {
    y: 0,
    opacity: 1,
    duration: 0.4,
    ease: 'power1.out',
    stagger: 0.05
  }, 0);

  await tl;
}

/**
 * Bascule l'état ouvert/fermé de la carte en empêchant
 * les animations simultanées (isAnimating).
 */
async function toggleCard(cardElement) {
  if (isAnimating) return;
  isAnimating = true;

  try {
    const isOpen = cardElement.classList.contains('is-open');

    if (!isOpen) {
      // On ferme d'abord toutes les autres cartes ouvertes
      const otherOpenCards = document.querySelectorAll(`${SELECTORS.CARD}.is-open`);
      await Promise.all(Array.from(otherOpenCards).map(card => closeCard(card)));

      // Puis on ouvre celle-ci
      await openCard(cardElement);
    } else {
      // Si déjà ouverte, on ferme simplement
      await closeCard(cardElement);
    }
  } finally {
    isAnimating = false;
  }
}

/**
 * Met à jour le layout des éléments (stocke leur display d'origine),
 * et si la carte n'est pas ouverte, on cache d'emblée le contenu.
 */
export function updateCardLayout(card) {
  if (!card) return;
  const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));

  elementsToToggle.forEach(el => {
    const currentDisplay = window.getComputedStyle(el).display;
    if (currentDisplay !== 'none') {
      el.dataset.originalDisplay = currentDisplay;
    }
  });

  if (!card.classList.contains('is-open')) {
    gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -15 });
  }
}

/**
 * Initialise une carte : on mémorise le display initial de chaque enfant,
 * on les cache, et on ajoute l'écouteur de clic pour toggle.
 */
export function initializeCard(card) {
  if (!card || initializedCards.has(card)) return;

  const clickableWrap = card.querySelector(SELECTORS.CLICKABLE_WRAP);
  if (!clickableWrap) return;

  const elementsToToggle = card.querySelectorAll(SELECTORS.TOGGLE_ELEMENTS.join(','));
  
  // Stocker le display initial, même si c'est souvent "block"
  elementsToToggle.forEach(el => {
    el.dataset.originalDisplay = window.getComputedStyle(el).display;
  });
  
  // On cache tout dès l'initialisation
  gsap.set(elementsToToggle, { display: 'none', opacity: 0, y: -15 });

  // Empêcher les boutons de propager les clics à la carte parent
  const buttons = card.querySelectorAll('a.button, button, .centre-card_button-holder a, .tag_holder a');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.stopPropagation();
    });
  });

  // L'écouteur principal pour ouvrir/fermer la carte
  clickableWrap.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    toggleCard(card);
  });

  initializedCards.add(card);
}

/**
 * Observe les ajouts dynamiques de cartes dans le DOM
 * pour initialiser automatiquement celles qui arrivent après.
 */
function setupMutationObserver() {
  const cardsContainer = document.querySelector('.collection-list-centre-wrapper');
  if (!cardsContainer) {
    console.warn('⚠️ Conteneur de cartes (.collection-list-centre-wrapper) non trouvé pour l\'observateur.');
    return;
  }

  const observer = new MutationObserver(mutationsList => {
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

/**
 * Entrée principale : on attend le DOM, on initialise
 * les cartes existantes et on déclenche le MutationObserver.
 */
export async function initCentreCards() {
  // On s'assure que le DOM est prêt
  await new Promise(resolve => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve, { once: true });
    }
  });

  // Initialisation des cartes présentes
  const cards = document.querySelectorAll(SELECTORS.CARD);
  cards.forEach(initializeCard);

  // Observer pour les cartes ajoutées dynamiquement
  setupMutationObserver();
}