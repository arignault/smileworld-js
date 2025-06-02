<!-- D'abord GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>

<!-- Ensuite vos modules -->
<script type="module">
    // Configuration du serveur HTTP local
    const PORT = 8080;  // Port HTTP standard
    const LOCAL_SERVER = `http://127.0.0.1:${PORT}`;
    
    console.log('🌐 Serveur utilisé:', LOCAL_SERVER);
    
    const loadScript = async (scriptPath) => {
        try {
            const localUrl = `${LOCAL_SERVER}/${scriptPath}`;
            console.log('🔄 Chargement du module:', scriptPath);
            
            // Options de sécurité pour l'import
            const importOptions = {
                credentials: 'same-origin',
                mode: 'cors'
            };
            
            const module = await import(localUrl, importOptions);
            console.log('✅ Module chargé:', scriptPath);
            return module;
        } catch (error) {
            console.error('❌ Erreur de chargement du module:', scriptPath);
            console.error('Détails:', error);
            return null;
        }
    };

    const loadAllModules = async () => {
        // Liste réduite aux modules essentiels uniquement
        const modules = [
            'main_gsap.js',
            'centre-card.js',
            'menu-mobile.js',
            'menu-desktop.js',
            'text-animation.js' // Ajout du module d'animation de texte
        ];

        const loadedModules = {};
        
        for (const moduleName of modules) {
            const module = await loadScript(moduleName);
            if (module) {
                loadedModules[moduleName] = module;
            }
        }

        // Vérification finale
        const missingModules = modules.filter(m => !loadedModules[m]);
        
        if (missingModules.length > 0) {
            console.error('❌ Modules manquants:', missingModules);
        } else {
            console.log('✅ Tous les modules sont chargés');
        }
    };

    if (window.gsap) {
        console.log('✅ GSAP déjà chargé');
        loadAllModules();
    } else {
        window.addEventListener('load', () => {
            console.log('⏳ Attente du chargement de GSAP...');
            loadAllModules();
        });
    }
</script> 