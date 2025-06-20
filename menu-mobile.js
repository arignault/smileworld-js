// Version: 1.0.7 - Adaptation au build
// import { updateCardLayout } from './centre-card.js'; // Supprimé car géré globalement

// Initialise le menu mobile
export function initMenuMobile() {
    // Sélecteurs principaux
    const menuButton = document.querySelector('#hamburger-menu');
    const mainMenu = document.querySelector('#main-menu-mobile');
    const body = document.body;
    const html = document.documentElement;
    
    // Sélecteurs des boutons de sous-menu
    const parcButton = document.querySelector('#parcs-nav_button_mobile');
    const activitesButton = document.querySelector('#activites-nav_button_mobile');
    const formulesButton = document.querySelector('#formules-nav_button_mobile');
    
    // Sélecteurs des sous-menus
    const parcMenu = document.querySelector('#parc-menu-mobile');
    const activiteMenu = document.querySelector('#activite-menu-mobile');
    const offresMenu = document.querySelector('#offres-menu-mobile');
    
    // Sélecteurs des boutons close et back
    const closeButtons = document.querySelectorAll('.button-close');
    const backButtons = document.querySelectorAll('.button-back-menu');
    
    // État des menus
    let isMenuOpen = false;
    let scrollPosition = 0;
    
    // Timeline principale pour toute la navigation
    let mainTimeline = window.gsap.timeline({ paused: true });
    
    // Timeline pour l'animation du bouton hamburger
    const hamburgerTimeline = window.gsap.timeline({ paused: true });
    hamburgerTimeline.to(menuButton, {
        rotation: 90,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
        transformOrigin: "center center"
    });
    
    // Configuration initiale
    [mainMenu, parcMenu, activiteMenu, offresMenu].forEach(menu => {
        menu.style.display = 'none';
    });
    
    // Désactive le scroll
    function disableScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollPosition}px`;
    }
    
    // Réactive le scroll
    function enableScroll() {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    
    // Crée la timeline principale
    function createMainTimeline() {
        return window.gsap.timeline({ paused: true })
            .add(() => {
                mainMenu.style.display = 'flex';
                [parcMenu, activiteMenu, offresMenu].forEach(menu => {
                    menu.style.display = 'none';
                });
            }, "openMainMenu")
            .add(() => {
                mainMenu.style.display = 'none';
                parcMenu.style.display = 'flex';
            }, "openParcMenu")
            .add(() => {
                mainMenu.style.display = 'none';
                activiteMenu.style.display = 'flex';
            }, "openActiviteMenu")
            .add(() => {
                mainMenu.style.display = 'none';
                offresMenu.style.display = 'flex';
            }, "openOffresMenu");
    }
    
    // Initialisation de la timeline
    mainTimeline = createMainTimeline();
    
    // Fonction pour gérer l'état des boutons
    function updateButtonStates(activeButtonId = null) {
        const allButtons = [
            parcButton,
            activitesButton,
            formulesButton,
            document.querySelector('#parcs-nav_button'),
            document.querySelector('#activites-nav_button'),
            document.querySelector('#formules-nav_button')
        ];

        allButtons.forEach(button => {
            if (button) {
                if (activeButtonId && button.id === activeButtonId) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }
    
    // Fonction pour gérer l'animation du bouton hamburger
    function updateHamburgerState(isOpen) {
        if (isOpen) {
            hamburgerTimeline.play();
        } else {
            hamburgerTimeline.reverse();
        }
    }
    
    // Modification de la fonction handleBottomNavClick
    function handleBottomNavClick(buttonId) {
        const buttonMap = {
            'parcs-nav_button': parcMenu,
            'activites-nav_button': activiteMenu,
            'formules-nav_button': offresMenu,
            'parcs-nav_button_mobile': parcMenu,
            'activites-nav_button_mobile': activiteMenu,
            'formules-nav_button_mobile': offresMenu
        };

        const targetMenu = buttonMap[buttonId];
        if (!targetMenu) return;

        // On force le display: none sur tous les menus de manière synchrone
        mainMenu.style.display = 'none';
        parcMenu.style.display = 'none';
        activiteMenu.style.display = 'none';
        offresMenu.style.display = 'none';

        // Si le menu cible est déjà ouvert, on le ferme simplement
        if (isMenuOpen && targetMenu.style.display === 'flex') {
            isMenuOpen = false;
            enableScroll();
            updateButtonStates();
            updateHamburgerState(false);
            return;
        }

        // On s'assure que le menu cible est bien affiché
        requestAnimationFrame(() => {
            targetMenu.style.display = 'flex';
            isMenuOpen = true;
            disableScroll();
            updateButtonStates(buttonId);
            updateHamburgerState(true);

            // Mise à jour spéciale pour le menu des parcs
            if (targetMenu === parcMenu) {
                // setTimeout(() => {
                //     const cards = document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow');
                //     cards.forEach(card => {
                //         updateCardLayout(card);
                //     });
                // }, 100);
            }
        });
    }

    // Modification de la fonction resetAllMenus
    function resetAllMenus() {
        if (mainTimeline) {
            mainTimeline.kill();
        }
        isMenuOpen = false;
        [mainMenu, parcMenu, activiteMenu, offresMenu].forEach(menu => {
            menu.style.display = 'none';
        });
        enableScroll();
        updateButtonStates();
        updateHamburgerState(false);
        mainTimeline = createMainTimeline();
    }
    
    // Revient au menu principal
    function backToMainMenu() {
        [parcMenu, activiteMenu, offresMenu].forEach(menu => {
            menu.style.display = 'none';
        });
        mainMenu.style.display = 'flex';
        isMenuOpen = true;
    }
    
    // Ouvre un sous-menu
    function openSubMenu(subMenu) {
        mainMenu.style.display = 'none';
        isMenuOpen = true;
        subMenu.style.display = 'flex';

        if (subMenu === parcMenu) {
            // setTimeout(() => {
            //     const cards = document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow');
            //     cards.forEach(card => {
            //         updateCardLayout(card);
            //     });
            // }, 100);
        }
    }
    
    // Modification de la gestion du clic sur le bouton burger
    menuButton.addEventListener('click', () => {
        if (!isMenuOpen) {
            [parcMenu, activiteMenu, offresMenu].forEach(menu => {
                menu.style.display = 'none';
            });
            mainMenu.style.display = 'flex';
            isMenuOpen = true;
            disableScroll();
            updateHamburgerState(true);
        } else {
            resetAllMenus();
        }
    });
    
    // Gestion des clics sur les boutons de sous-menu
    parcButton.addEventListener('click', () => openSubMenu(parcMenu));
    activitesButton.addEventListener('click', () => openSubMenu(activiteMenu));
    formulesButton.addEventListener('click', () => openSubMenu(offresMenu));
    
    // Gestion des boutons close
    closeButtons.forEach(button => {
        button.addEventListener('click', resetAllMenus);
    });
    
    // Gestion des boutons retour
    backButtons.forEach(button => {
        button.addEventListener('click', backToMainMenu);
    });

    // Ajout des écouteurs d'événements pour tous les boutons de navigation
    document.querySelectorAll('#parcs-nav_button, #activites-nav_button, #formules-nav_button, #parcs-nav_button_mobile, #activites-nav_button_mobile, #formules-nav_button_mobile').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleBottomNavClick(button.id);
        });
    });
}
  
  
  
  