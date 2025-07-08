// marquee-animation.js v2.1.0 - Draggable & Inertia Marquee with Hover Effects
console.log('🎠 marquee-animation.js v2.1.0 chargé');

// Assurez-vous que GSAP, Draggable et InertiaPlugin sont chargés
// gsap.registerPlugin(Draggable, InertiaPlugin);

let currentHoveredSlide = null;
let slideStates = new WeakMap();

export function initMarqueeAnimation() {
    console.log('🎬 Initialisation de l\'animation marquee draggable...');
    const sliderWrappers = document.querySelectorAll('.cms_slider_wrapper');
    if (sliderWrappers.length === 0) {
        console.log('-> Aucun élément .cms_slider_wrapper trouvé. Animation marquee ignorée.');
        return;
    }
    sliderWrappers.forEach((wrapper, i) => {
        createDraggableMarquee(wrapper, i);
    });
}

function createDraggableMarquee(wrapper, index) {
    const slides = gsap.utils.toArray(wrapper.children);
    if (slides.length === 0) {
        console.warn(`-> Wrapper ${index}: Aucun slide trouvé.`);
        return;
    }

    gsap.set(slides, {
        x: (i) => i * slides[i].offsetWidth
    });

    const loop = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        center: false, // On ne centre pas pour garder le contrôle
        speed: 0.5, // Vitesse pour une lecture automatique éventuelle
        reversed: false
    });

    // Lancer l'animation automatique si besoin (décommenter pour activer)
    // loop.play();

    // Configurer les effets de survol
    setupHoverEffects(slides, loop);

    console.log(`✅ Marquee draggable ${index} initialisé avec effets de survol.`);
}

function setupHoverEffects(slides, loop) {
    slides.forEach((slide, index) => {
        const vimeoElement = slide.querySelector('.vimeo.activity');
        const titreOriginal = slide.querySelector('#titre-original');

        // Pré-configuration des éléments
        if (vimeoElement) {
            gsap.set(vimeoElement, { display: 'none', opacity: 0 });
        }
        if (titreOriginal && !titreOriginal.dataset.originalColor) {
            titreOriginal.dataset.originalColor = window.getComputedStyle(titreOriginal).color;
        }

        slideStates.set(slide, {
            isHovered: false,
            elements: { vimeo: vimeoElement, titre: titreOriginal }
        });

        slide.addEventListener('mouseenter', () => handleMouseEnter(slide, loop));
        slide.addEventListener('mouseleave', () => handleMouseLeave(slide, loop));
    });
}

function handleMouseEnter(slide, loop) {
    const state = slideStates.get(slide);
    if (state.isHovered) return;
    state.isHovered = true;

    if (currentHoveredSlide && currentHoveredSlide !== slide) {
        resetSlide(currentHoveredSlide, loop);
    }
    currentHoveredSlide = slide;

    if (loop.draggable) loop.draggable.disable();
    // loop.pause(); // Si l'animation est en lecture automatique

    const { vimeo: vimeoElement, titre: titreOriginal } = state.elements;

    if (vimeoElement) {
        gsap.killTweensOf(vimeoElement);
        gsap.set(vimeoElement, { display: 'flex' });
        gsap.to(vimeoElement, { opacity: 1, duration: 0.3, ease: "power2.out" });

        if (titreOriginal) {
            gsap.killTweensOf(titreOriginal);
            const originalColor = titreOriginal.dataset.originalColor || '#000000';
            const invertedColor = isLightColor(originalColor) ? '#000000' : '#ffffff';
            gsap.to(titreOriginal, { color: invertedColor, duration: 0.3, ease: "power2.out" });
        }
    }
}

function handleMouseLeave(slide, loop) {
    const state = slideStates.get(slide);
    if (!state.isHovered) return;
    state.isHovered = false;

    setTimeout(() => {
        if (!slide.matches(':hover') && currentHoveredSlide === slide) {
            resetSlide(slide, loop);
            currentHoveredSlide = null;
        }
    }, 50);
}

function resetSlide(slide, loop) {
    const state = slideStates.get(slide);
    if (!state) return;

    if (loop.draggable) loop.draggable.enable();
    // loop.resume(); // Si l'animation était en lecture automatique

    const { vimeo: vimeoElement, titre: titreOriginal } = state.elements;

    if (vimeoElement) {
        gsap.killTweensOf(vimeoElement);
        gsap.to(vimeoElement, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => gsap.set(vimeoElement, { display: 'none' })
        });

        if (titreOriginal) {
            gsap.killTweensOf(titreOriginal);
            const originalColor = titreOriginal.dataset.originalColor || '#000000';
            gsap.to(titreOriginal, { color: originalColor, duration: 0.2, ease: "power2.out" });
        }
    }
    state.isHovered = false;
}

function isLightColor(color) {
    let r, g, b;
    if (color.startsWith('#')) {
        const hex = color.substring(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (color.startsWith('rgb')) {
        const values = color.match(/\d+/g);
        [r, g, b] = values.map(Number);
    } else {
        return false;
    }
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

/*
Cette fonction utilitaire crée une boucle de défilement horizontale infinie.
Source: GreenSock
Adapté pour ce projet.
*/
function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
            repeat: -1,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].x,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        populateWidths = () =>
            items.forEach((el, i) => {
                widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(
                    (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
                    gsap.getProperty(el, "xPercent")
                );
            }),
        getTotalWidth = () =>
            items[length - 1].x +
            xPercents[length - 1] / 100 * widths[length - 1] -
            startX +
            items[length - 1].offsetWidth *
            gsap.getProperty(items[length - 1], "scaleX"),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
    populateWidths();
    gsap.set(items, {
        xPercent: (i) => xPercents[i]
    });
    gsap.set(items, { x: 0 });
    totalWidth = getTotalWidth();
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.x - curX;
        distanceToLoop =
            distanceToStart + totalWidth * (curX > 0 ? -1 : 1);
        tl.to(
            item, {
                xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
                duration: distanceToLoop / pixelsPerSecond,
            },
            0
        )
        .fromTo(
            item, {
                xPercent: snap(
                    (curX - distanceToLoop + totalWidth) / widths[i] * 100
                ),
            }, {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) /
                    pixelsPerSecond,
                immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.updateIndex = () => (curIndex = Math.round(tl.progress() * items.length));
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div");
        let wrap = gsap.utils.wrap(0, 1);
        let ratio, startProgress, draggable,
            align = () => {
                let progress = wrap(startProgress + (draggable.startX - draggable.x) * ratio);
                tl.progress(progress);
            },
            syncIndex = () => tl.closestIndex(true);
        typeof InertiaPlugin === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/inertia/");
        draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",
            onPressInit() {
                gsap.killTweensOf(tl);
                startProgress = tl.progress();
                ratio = 1 / getTotalWidth();
            },
            onDrag: align,
            onThrowUpdate: align,
            inertia: true,
            onRelease() {
                syncIndex();
            },
            onThrowComplete: syncIndex
        })[0];
        
        tl.draggable = draggable;
    }
    return tl;
} 