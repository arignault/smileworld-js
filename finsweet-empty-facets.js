/**
 * Finsweet Empty Facets Handler v2.1.0
 * Correction: utilisation de window.fsAttributes (pas FinsweetAttributes)
 */

export function initializeEmptyFacetsHandler() {
  console.log('🔧 Configuration du gestionnaire de filtres vides v2.1.0...');

  // ✅ Utiliser window.fsAttributes (LA BONNE VARIABLE)
  if (!window.fsAttributes) {
    window.fsAttributes = [];
  }

  window.fsAttributes.push([
    'list',
    (listInstances) => {
      console.log('✅ Finsweet list callback déclenché!', listInstances.length, 'instances');
      
      // Maintenant que Finsweet est chargé, on peut configurer nos filtres
      setupEmptyFacets();
    },
  ]);

  console.log('📋 Callback Finsweet configuré correctement avec fsAttributes');
}

function setupEmptyFacets() {
  console.log('🎯 Configuration des filtres vides...');
  
  // Gestion de tous les inputs avec fs-list-field
  const inputs = document.querySelectorAll('input[fs-list-field]');
  console.log(`📊 ${inputs.length} inputs fs-list-field trouvés`);
  
  inputs.forEach((checkbox, index) => {
    const parentFacet = checkbox.closest('.is-list-emptyfacet');

    if (parentFacet) {
      console.log(`🔒 Input ${index+1} dans empty facet - désactivation`);
      
      // Appliquer un curseur par défaut à la checkbox elle-même
      checkbox.style.cursor = 'default';

      // Appliquer un curseur par défaut à son label si trouvé
      const label = checkbox.closest('label');
      if (label) {
        label.style.cursor = 'default';
      }
    }

    // Bloque le clic si le filtre est vide
    checkbox.addEventListener('click', (e) => {
      const isEmpty = checkbox.closest('.is-list-emptyfacet');
      if (isEmpty) {
        console.log('🚫 Clic bloqué sur filtre vide');
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    });

    // Gère la classe .is-active si le filtre est valide
    checkbox.addEventListener('change', () => {
      const isEmpty = checkbox.closest('.is-list-emptyfacet');
      if (isEmpty) return;

      const tagsContent = checkbox.closest('.tag_wrap')?.querySelector('.tags_content');
      if (!tagsContent) return;

      if (checkbox.checked) {
        tagsContent.classList.add('is-active');
      } else {
        tagsContent.classList.remove('is-active');
      }
    });
  });

  console.log('🎯 Filtres vides configurés avec succès');
} 