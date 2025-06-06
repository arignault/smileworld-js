// Version: 1.0.3 - Nettoyage du code

import { updateCardLayout } from './centre-card.js';

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
    let mainTimeline = gsap.timeline({ paused: true });
    
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
        return gsap.timeline({ paused: true })
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
    
    // Réinitialise tous les menus
    function resetAllMenus() {
        if (mainTimeline) {
            mainTimeline.kill();
        }
        isMenuOpen = false;
        [mainMenu, parcMenu, activiteMenu, offresMenu].forEach(menu => {
            menu.style.display = 'none';
        });
        enableScroll();
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
            setTimeout(() => {
                const cards = document.querySelectorAll('.centre-card_wrapper.effect-cartoon-shadow');
                cards.forEach(card => {
                    updateCardLayout(card);
                });
            }, 100);
        }
    }
    
    // Gestion du clic sur le bouton burger
    menuButton.addEventListener('click', () => {
        if (!isMenuOpen) {
            [parcMenu, activiteMenu, offresMenu].forEach(menu => {
                menu.style.display = 'none';
            });
            mainMenu.style.display = 'flex';
            isMenuOpen = true;
            disableScroll();
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
}
  
  
  
  