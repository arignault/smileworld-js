// Version: 1.1.0 - Simplified logic by removing unused GSAP timeline
console.log('🚀 menu-mobile.js v1.1.0 chargé');

export function initMenuMobile() {
    const menuButton = document.querySelector('#hamburger-menu');
    const mainMenu = document.querySelector('#main-menu-mobile');
    const body = document.body;

    // Early exit if essential elements are missing
    if (!menuButton || !mainMenu || !body) {
        console.error('❌ Éléments essentiels du menu mobile manquants.');
        return;
    }

    const parcButton = document.querySelector('#parcs-nav_button_mobile');
    const activitesButton = document.querySelector('#activites-nav_button_mobile');
    const formulesButton = document.querySelector('#formules-nav_button_mobile');
    
    const parcMenu = document.querySelector('#parc-menu-mobile');
    const activiteMenu = document.querySelector('#activite-menu-mobile');
    const offresMenu = document.querySelector('#offres-menu-mobile');
    
    const closeButtons = document.querySelectorAll('.button-close');
    const backButtons = document.querySelectorAll('.button-back-menu');
    
    const allMenus = [mainMenu, parcMenu, activiteMenu, offresMenu];
    
    let isMenuOpen = false;
    let scrollPosition = 0;

    // Hide all menus at start
    allMenus.forEach(menu => {
        if(menu) menu.style.display = 'none';
    });
    
    function disableScroll() {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollPosition}px`;
    }
    
    function enableScroll() {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    
    function resetAllMenus() {
        isMenuOpen = false;
        allMenus.forEach(menu => {
            if(menu) menu.style.display = 'none';
        });
        enableScroll();
    }
    
    function openSubMenu(subMenu) {
        if (!subMenu) return;
        mainMenu.style.display = 'none';
        subMenu.style.display = 'flex';
    }

    function backToMainMenu() {
        allMenus.forEach(menu => {
            if (menu !== mainMenu && menu) {
                menu.style.display = 'none';
            }
        });
        if(mainMenu) mainMenu.style.display = 'flex';
    }
    
    menuButton.addEventListener('click', () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            mainMenu.style.display = 'flex';
            disableScroll();
        } else {
            resetAllMenus();
        }
    });
    
    if (parcButton) parcButton.addEventListener('click', () => openSubMenu(parcMenu));
    if (activitesButton) activitesButton.addEventListener('click', () => openSubMenu(activiteMenu));
    if (formulesButton) formulesButton.addEventListener('click', () => openSubMenu(offresMenu));
    
    closeButtons.forEach(button => button.addEventListener('click', resetAllMenus));
    backButtons.forEach(button => button.addEventListener('click', backToMainMenu));

    console.log('✅ Menu mobile initialisé.');
}
  
  
  
  