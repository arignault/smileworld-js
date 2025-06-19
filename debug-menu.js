function logDebugInfo() {
    console.group("--- Informations de Débogage ---");
    console.log('Wrapper Menu Desktop:', document.querySelector('.desktop_menu_wrapper'));
    console.log('Boutons de menu:', {
        parcs: document.querySelector('[data-attribute="nav-link-desktop-parcs"]'),
        activites: document.querySelector('[data-attribute="nav-link-desktop-activites"]'),
        offres: document.querySelector('[data-attribute="nav-link-desktop-offres"]')
    });
    console.log('Conteneurs de menu:', {
        parcs: document.querySelector('.parc_menu_desktop'),
        activites: document.querySelector('.activites_menu_desktop'),
        offres: document.querySelector('.offres_menu_desktop')
    });
    console.groupEnd();
}

export function initDebugMenu() {
    // S'active seulement si on ajoute #debug à l'URL
    if (window.location.hash === '#debug') {
        console.log("🐛 Mode de débogage activé.");
        logDebugInfo();
    }
}
