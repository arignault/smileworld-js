<!-- D'abord GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>

<!-- Ensuite vos modules -->
<script type="module">
    // Configuration des serveurs
    const PORT = 8080;  // Port HTTP standard
    const LOCAL_SERVER = `http://127.0.0.1:${PORT}`;
    const GITHUB_BASE_URL = 'https://cdn.jsdelivr.net/gh/arignault/smileworld-js@refactored';
    const LOAD_DELAY = 100; // Délai entre chaque chargement en ms
    
    console.log('🌐 Serveurs configurés:', {
        local: LOCAL_SERVER,
        github: GITHUB_BASE_URL
    });

    // Fonction pour attendre un certain temps
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const loadScript = async (scriptPath) => {
        // Essai d'abord avec le serveur local
        try {
            const localUrl = `${LOCAL_SERVER}/${scriptPath}`;
            console.log('🔄 Tentative de chargement local:', scriptPath);
            
            const importOptions = {
                credentials: 'same-origin',
                mode: 'cors'
            };
            
            const module = await import(localUrl, importOptions);
            console.log('✅ Module chargé depuis le serveur local:', scriptPath);
            return module;
        } catch (localError) {
            console.warn('⚠️ Échec du chargement local, tentative via GitHub:', scriptPath);
            
            // Attendre un peu avant d'essayer GitHub
            await wait(LOAD_DELAY);
            
            try {
                const githubUrl = `${GITHUB_BASE_URL}/${scriptPath}`;
                console.log('🔄 Tentative de chargement GitHub:', scriptPath);
                
                const module = await import(githubUrl);
                console.log('✅ Module chargé depuis GitHub:', scriptPath);
                return module;
            } catch (githubError) {
                console.error('❌ Échec du chargement pour le module:', scriptPath);
                console.error('Erreur locale:', localError);
                console.error('Erreur GitHub:', githubError);
                return null;
            }
        }
    };

    const loadAllModules = async () => {
        // Liste réduite aux modules essentiels uniquement
        const modules = [
            'main_gsap.js',
            'centre-card.js',
            'menu-mobile.js',
            'menu-desktop.js',
            'text-animation.js'
        ];

        const loadedModules = {};
        
        // Charger les modules séquentiellement avec un délai entre chaque
        for (const moduleName of modules) {
            // Attendre un peu avant de charger le prochain module
            await wait(LOAD_DELAY);
            
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

    // Attendre que GSAP soit complètement chargé
    if (window.gsap) {
        console.log('✅ GSAP déjà chargé');
        // Attendre un peu avant de commencer le chargement des modules
        wait(LOAD_DELAY).then(() => loadAllModules());
    } else {
        window.addEventListener('load', () => {
            console.log('⏳ Attente du chargement de GSAP...');
            // Attendre un peu avant de commencer le chargement des modules
            wait(LOAD_DELAY).then(() => loadAllModules());
        });
    }
</script> 