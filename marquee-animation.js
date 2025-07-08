// marquee-animation.js v1.4.1 - Inversion couleur conditionnelle
console.log('🎠 marquee-animation.js v1.4.1 chargé');

let currentHoveredSlide = null;
let slideStates = new WeakMap(); // Tracking d'état par slide

export function initMarqueeAnimation() {
    console.log('🎬 Initialisation de l\'animation marquee...');

    const sliderWrapper = document.querySelector('.cms_slider_wrapper');
    
    if (!sliderWrapper) {
        console.log('-> Aucun élément .cms_slider_wrapper trouvé. Animation marquee ignorée.');
        return;
    }

    // Configurer l'état initial des éléments
    setupInitialStates();

    // Créer l'animation marquee
    createMarqueeEffect(sliderWrapper);
}

function setupInitialStates() {
    console.log('⚙️ Configuration des états initiaux...');
    
    // Masquer tous les éléments .vimeo.activity initialement
    const vimeoElements = document.querySelectorAll('.vimeo.activity');
    vimeoElements.forEach(el => {
        el.style.display = 'none';
        el.style.opacity = '0';
    });

    // S'assurer que les titres originaux sont visibles avec couleur normale
    const titresOriginaux = document.querySelectorAll('#titre-original');
    titresOriginaux.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        // Sauvegarder la couleur originale si pas déjà fait
        if (!el.dataset.originalColor) {
            el.dataset.originalColor = window.getComputedStyle(el).color;
        }
    });
}

function createMarqueeEffect(wrapper) {
    console.log('🏃‍♂️ Création de l\'effet marquee...');
    
    // Obtenir tous les éléments enfants (les slides)
    const slides = wrapper.children;
    
    if (slides.length === 0) {
        console.warn('-> Aucun élément enfant trouvé dans .cms_slider_wrapper');
        return;
    }

    // Détection mobile : permettre le défilement manuel et désactiver l'animation auto
    const isMobile = window.matchMedia('(pointer:coarse)').matches || window.innerWidth <= 768;
    if (isMobile) {
        console.log('📱 Mode mobile détecté – défilement manuel activé, animation auto désactivée.');

        // Créer un conteneur horizontal si pas déjà présent
        const marqueeContainer = document.createElement('div');
        marqueeContainer.className = 'marquee-container';
        marqueeContainer.style.display = 'inline-flex';
        marqueeContainer.style.whiteSpace = 'nowrap';

        // Conserver le contenu original SANS duplication
        marqueeContainer.innerHTML = wrapper.innerHTML;

        wrapper.innerHTML = '';
        wrapper.appendChild(marqueeContainer);

        // Activer le scroll horizontal natif
        wrapper.style.overflowX = 'auto';
        wrapper.style.whiteSpace = 'nowrap';
        wrapper.style.touchAction = 'pan-x';

        return; // Fin spéciale mobile (pas d'animation GSAP)
    }

    // Configuration du conteneur
    wrapper.style.overflow = 'hidden';
    wrapper.style.whiteSpace = 'nowrap';
    
    // Créer un conteneur pour les slides en mouvement
    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = 'marquee-container';
    marqueeContainer.style.display = 'inline-flex';
    marqueeContainer.style.animation = 'none';
    
    // Dupliquer le contenu pour créer l'effet de boucle infinie
    const originalContent = wrapper.innerHTML;
    marqueeContainer.innerHTML = originalContent + originalContent;
    
    // Vider le wrapper et ajouter le conteneur marquee
    wrapper.innerHTML = '';
    wrapper.appendChild(marqueeContainer);
    
    // Reconfigurer les états initiaux après duplication
    setupInitialStates();
    
    // Calculer la largeur totale du contenu original
    const contentWidth = marqueeContainer.scrollWidth / 2;
    
    // Créer l'animation GSAP
    const marqueeTimeline = window.gsap.timeline({ repeat: -1 });
    
    marqueeTimeline.set(marqueeContainer, { x: 0 })
                   .to(marqueeContainer, {
                       x: -contentWidth,
                       duration: contentWidth / 100,
                       ease: 'none'
                   });
    
    console.log(`✅ Animation marquee créée avec une largeur de ${contentWidth}px`);
    
    // Ajouter les effets de survol robustes
    setupHoverEffects(marqueeContainer, marqueeTimeline);
}

function setupHoverEffects(container, timeline) {
    console.log('✨ Configuration des effets de survol...');
    
    // Trouver tous les éléments de slide dans le conteneur
    const slideElements = container.querySelectorAll('.w-dyn-item, .slide-item, [class*="slide"]');
    const slides = slideElements.length > 0 ? slideElements : container.children;
    
    Array.from(slides).forEach((slide, index) => {
        setupSlideHover(slide, timeline, index);
    });
}

function setupSlideHover(slide, marqueeTimeline, index) {
    const vimeoElement = slide.querySelector('.vimeo.activity');
    const titreOriginal = slide.querySelector('#titre-original');
    
    // Initialiser l'état du slide
    slideStates.set(slide, {
        isHovered: false,
        isAnimating: false,
        elements: { vimeo: vimeoElement, titre: titreOriginal }
    });
    
    console.log(`🎯 Configuration du slide ${index}:`, {
        hasVimeo: !!vimeoElement,
        hasTitreOriginal: !!titreOriginal
    });

    slide.addEventListener('mouseenter', () => {
        const state = slideStates.get(slide);
        if (state.isHovered) return; // Déjà en état hover
        
        console.log(`🎪 Survol du slide ${index}`);
        
        // Marquer comme hover
        state.isHovered = true;
        state.isAnimating = true;
        
        // Reset propre du slide précédent
        if (currentHoveredSlide && currentHoveredSlide !== slide) {
            cleanResetSlide(currentHoveredSlide);
        }
        currentHoveredSlide = slide;
        
        // Pause de l'animation marquee
        marqueeTimeline.pause();
        
        // Kill toutes les animations en cours sur ce slide
        if (vimeoElement) window.gsap.killTweensOf(vimeoElement);
        if (titreOriginal) window.gsap.killTweensOf(titreOriginal);
        
        // Animation de l'élément vimeo
        if (vimeoElement) {
            vimeoElement.style.display = 'flex';
            window.gsap.to(vimeoElement, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    state.isAnimating = false;
                }
            });
        }
        
        // Inversion de couleur du titre SEULEMENT si le slide a une vidéo
        if (titreOriginal && vimeoElement) {
            const originalColor = titreOriginal.dataset.originalColor || '#000000';
            const invertedColor = isLightColor(originalColor) ? '#000000' : '#ffffff';
            
            window.gsap.to(titreOriginal, {
                color: invertedColor,
                duration: 0.3,
                ease: "power2.out"
            });
        }
        
        if (!vimeoElement) state.isAnimating = false;
    });

    slide.addEventListener('mouseleave', () => {
        const state = slideStates.get(slide);
        if (!state.isHovered) return; // Pas en état hover
        
        console.log(`🎪 Fin de survol du slide ${index}`);
        
        // Marquer comme pas hover
        state.isHovered = false;
        
        // Délai court pour éviter les rebonds
        setTimeout(() => {
            // Double vérification que l'élément n'est plus survolé
            if (!slide.matches(':hover') && currentHoveredSlide === slide) {
                cleanResetSlide(slide);
                currentHoveredSlide = null;
                marqueeTimeline.resume();
            }
        }, 50);
    });
}

function cleanResetSlide(slide) {
    const state = slideStates.get(slide);
    if (!state) return;
    
    const { vimeo: vimeoElement, titre: titreOriginal } = state.elements;
    
    // Kill toutes les animations en cours pour éviter les conflits
    if (vimeoElement) window.gsap.killTweensOf(vimeoElement);
    if (titreOriginal) window.gsap.killTweensOf(titreOriginal);
    
    state.isAnimating = true;
    
    // Reset vimeo avec animation fluide
    if (vimeoElement) {
        window.gsap.to(vimeoElement, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
                vimeoElement.style.display = 'none';
                state.isAnimating = false;
            }
        });
    }
    
    // Reset couleur du titre SEULEMENT si il y avait une vidéo
    if (titreOriginal && vimeoElement) {
        const originalColor = titreOriginal.dataset.originalColor || '#000000';
        window.gsap.to(titreOriginal, {
            color: originalColor,
            duration: 0.2,
            ease: "power2.out"
        });
    }
    
    // Reset l'état
    state.isHovered = false;
    if (!vimeoElement) state.isAnimating = false;
}

// Fonction utilitaire pour détecter si une couleur est claire
function isLightColor(color) {
    // Convertir la couleur en RGB si c'est un hex
    let r, g, b;
    
    if (color.startsWith('#')) {
        const hex = color.substring(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (color.startsWith('rgb')) {
        const values = color.match(/\d+/g);
        r = parseInt(values[0]);
        g = parseInt(values[1]);
        b = parseInt(values[2]);
    } else {
        return false; // Par défaut, considérer comme sombre
    }
    
    // Calculer la luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
} 