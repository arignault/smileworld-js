// menu-desktop.js v9.0.0-diag - Mode Diagnostic
console.log('🚀 menu-desktop.js v9.0.0-diag chargé - Mode Diagnostic');

class MenuDiagnostician {
    constructor() {
        this.triggerSelectors = [
            '[data-attribute="nav-link-desktop-parcs"]',
            '[data-attribute="nav-link-desktop-activites"]',
            '[data-attribute="nav-link-desktop-offres"]'
        ].join(',');

        this._addGlobalListener();
        console.log('✅ Mode Diagnostic du menu activé. Veuillez cliquer sur un lien du menu desktop.');
    }

    _addGlobalListener() {
        document.body.addEventListener('click', (e) => {
            const trigger = e.target.closest(this.triggerSelectors);

            if (!trigger) {
                return; // Ne rien faire si le clic n'est pas sur un trigger
            }
            
            e.preventDefault();
            e.stopPropagation();

            console.group(`🕵️‍♂️ DIAGNOSTIC SUITE À UN CLIC SUR LE MENU 🕵️‍♂️`);
            console.log("Cible du clic (e.target):", e.target);
            console.log("Trigger identifié ([data-attribute]):", trigger);
            
            const dropdownParent = trigger.closest('.w-dropdown');
            if (dropdownParent) {
                console.log("%c✅ SUCCÈS: Le parent .w-dropdown a été trouvé :", "color: green; font-weight: bold;", dropdownParent);
            } else {
                 console.log("%c❌ ÉCHEC: Le parent .w-dropdown n'a pas été trouvé avec .closest()", "color: red; font-weight: bold;");
            }

            console.log("--- Chemin des ancêtres depuis le trigger ---");
            let currentParent = trigger.parentElement;
            let i = 1;
            while (currentParent && currentParent.tagName !== 'BODY') {
                console.log(
                    `#${i} | Balise: ${currentParent.tagName}`, 
                    `| Classes: "${currentParent.className}"`,
                    `| ID: "${currentParent.id || 'aucun'}"`
                );
                currentParent = currentParent.parentElement;
                i++;
            }
            if (currentParent && currentParent.tagName === 'BODY') {
                 console.log(`#${i} | Balise: BODY. Fin de la recherche.`);
            } else {
                 console.log("Arrêt avant d'atteindre le BODY.");
            }
             console.log("-----------------------------------------");

            console.groupEnd();
        }, true); // Utiliser la capture pour être sûr de recevoir l'événement
    }
}

export function initMenuDesktop() {
    new MenuDiagnostician();
}
