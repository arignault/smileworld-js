/**
 * Finsweet Empty Facets Handler v2.0.0
 * Utilise le callback pattern officiel de Finsweet
 */

export function initializeEmptyFacetsHandler() {
  console.log('🔧 Configuration du gestionnaire de filtres vides...');

  // ✅ Utiliser le callback pattern officiel de Finsweet
  if (!window.FinsweetAttributes) {
    window.FinsweetAttributes = [];
  }

  window.FinsweetAttributes.push([
    'list',
    (listInstances) => {
      console.log('✅ Finsweet chargé, configuration des filtres vides...');
      
      // Maintenant que Finsweet est chargé, on peut configurer nos filtres
      setupEmptyFacets();
    },
  ]);

  console.log('📋 Callback Finsweet configuré pour les filtres vides');
}

function setupEmptyFacets() {
  // Gestion de tous les inputs avec fs-list-field
  document.querySelectorAll('input[fs-list-field]').forEach(checkbox => {
    const parentFacet = checkbox.closest('.is-list-emptyfacet');

    if (parentFacet) {
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