/**
 * Finsweet Empty Facets Handler v1.0.0
 * Gestion des filtres vides avec désactivation et styles
 */

export function initializeEmptyFacetsHandler() {
  console.log('🔧 Initialisation du gestionnaire de filtres vides...');

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

  console.log('✅ Gestionnaire de filtres vides initialisé');
} 