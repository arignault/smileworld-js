// === SCRIPT DE DEBUG MANDATORY FILTER SELECTION ===
console.log('🔍 === DEBUG MANDATORY FILTER SELECTION ===');

// 1. Vérifier si le module est chargé
console.log('📦 Module chargé:', typeof window.mandatoryFilterSelection !== 'undefined');
if (window.mandatoryFilterSelection) {
    console.log('📊 Version:', window.mandatoryFilterSelection.version);
    console.log('🎯 Initialisé:', window.mandatoryFilterSelection.initialized);
}

// 2. Vérifier la page actuelle
const currentPath = window.location.pathname;
console.log('📍 Page actuelle:', currentPath);
console.log('✅ Page concernée:', ['/offres', '/anniversaires'].includes(currentPath));

// 3. Vérifier les éléments
const selectors = {
    collectionList: '[fs-list-element="list"]',
    collectionItems: '[fs-list-element="item"]',
    filterInputs: 'input[fs-list-field]',
    helperText: '#cms-slider-offres',
    mandatoryMessage: '.mandatory-filter-message'
};

console.log('\n🔍 === ÉLÉMENTS DÉTECTÉS ===');
Object.entries(selectors).forEach(([name, selector]) => {
    const elements = document.querySelectorAll(selector);
    console.log(`${name}: ${elements.length} trouvé(s)`);
    if (elements.length > 0 && name === 'helperText') {
        const element = elements[0];
        console.log(`  → Style display: "${element.style.display}"`);
        console.log(`  → Computed display: "${getComputedStyle(element).display}"`);
        console.log(`  → Visible: ${element.offsetWidth > 0 && element.offsetHeight > 0}`);
    }
});

// 4. Vérifier les filtres sélectionnés
const checkedFilters = document.querySelectorAll('input[fs-list-field]:checked');
console.log(`\n✅ Filtres actuellement sélectionnés: ${checkedFilters.length}`);
checkedFilters.forEach((filter, i) => {
    console.log(`  ${i+1}. Field: "${filter.getAttribute('fs-list-field')}", Value: "${filter.getAttribute('fs-list-value')}"`);
});

// 5. Fonction de test manuel
window.testMandatoryFilter = function() {
    console.log('\n🧪 === TEST MANUEL ===');
    
    const helperElement = document.querySelector('#cms-slider-offres');
    const messageElement = document.querySelector('.mandatory-filter-message');
    
    if (!helperElement) {
        console.log('❌ Élément #cms-slider-offres non trouvé');
        return;
    }
    
    console.log('📊 État actuel du slider CMS:');
    console.log(`  → Style display: "${helperElement.style.display}"`);
    console.log(`  → Computed display: "${getComputedStyle(helperElement).display}"`);
    
    // Test de masquage
    console.log('\n🙈 Test de masquage...');
    helperElement.style.display = 'none';
    console.log(`  → Nouveau style display: "${helperElement.style.display}"`);
    
    // Test de réaffichage
    setTimeout(() => {
        console.log('\n👁️ Test de réaffichage...');
        helperElement.style.display = '';
        console.log(`  → Nouveau style display: "${helperElement.style.display}"`);
    }, 2000);
};

// 6. Fonction pour forcer l'initialisation
window.forceInitMandatoryFilter = function() {
    console.log('\n🔄 === FORCE INITIALISATION ===');
    
    if (window.mandatoryFilterSelection) {
        console.log('🔄 Réinitialisation du module...');
        window.mandatoryFilterSelection.reset();
        window.mandatoryFilterSelection.init();
        console.log('✅ Module réinitialisé');
    } else {
        console.log('❌ Module non disponible');
    }
};

// 7. Fonction pour simuler la sélection de filtre
window.simulateFilterSelection = function() {
    console.log('\n🎭 === SIMULATION SÉLECTION FILTRE ===');
    
    const filterInputs = document.querySelectorAll('input[fs-list-field]');
    if (filterInputs.length === 0) {
        console.log('❌ Aucun input de filtre trouvé');
        return;
    }
    
    const firstFilter = filterInputs[0];
    console.log(`🎯 Sélection du premier filtre: ${firstFilter.getAttribute('fs-list-field')}`);
    
    // Simuler le clic
    firstFilter.checked = true;
    firstFilter.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log('✅ Événement change déclenché');
    
    // Vérifier l'état après 1 seconde
    setTimeout(() => {
        const helperElement = document.querySelector('#cms-slider-offres');
        if (helperElement) {
            console.log(`📊 État du slider après sélection: display="${helperElement.style.display}"`);
        }
    }, 1000);
};

// 8. Écouter les événements en temps réel
console.log('\n🎧 === ÉCOUTE DES ÉVÉNEMENTS ===');
const filterInputs = document.querySelectorAll('input[fs-list-field]');
filterInputs.forEach((input, i) => {
    input.addEventListener('change', (e) => {
        console.log(`🔄 Filtre ${i+1} changé:`, {
            field: e.target.getAttribute('fs-list-field'),
            value: e.target.getAttribute('fs-list-value'),
            checked: e.target.checked
        });
        
        // Vérifier l'état du slider
        const helperElement = document.querySelector('#cms-slider-offres');
        if (helperElement) {
            console.log(`📊 État du slider: display="${helperElement.style.display}"`);
        }
    });
});

// 9. Afficher les instructions
console.log('\n📋 === FONCTIONS DE TEST DISPONIBLES ===');
console.log('🧪 testMandatoryFilter() - Test manuel du masquage/affichage');
console.log('🔄 forceInitMandatoryFilter() - Force la réinitialisation du module');
console.log('🎭 simulateFilterSelection() - Simule la sélection d\'un filtre');

console.log('\n✅ === DEBUG TERMINÉ ===');
console.log('💡 Utilisez les fonctions ci-dessus pour tester le comportement'); 