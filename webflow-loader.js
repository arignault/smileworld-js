<!-- D'abord GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>

<!-- Ensuite vos modules -->
<script type="module">
    // Configuration des serveurs
    const PORT = 8080;  // Port HTTP standard
    const LOCAL_SERVER = `http://127.0.0.1:${PORT}`;
    const GITHUB_BASE_URL = 'https://cdn.jsdelivr.net/gh/arignault/smileworld-js@Alex-Modif/';
    const LOAD_DELAY = 100; // Délai entre chaque chargement en ms
    
    console.log('🌐 Serveurs configurés:', {
        local: LOCAL_SERVER,
        github: GITHUB_BASE_URL
    });

    // Fonction pour attendre un certain temps
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const loadScript = async (scriptPath) => {
        console.log(`📦 Tentative de chargement du module: ${scriptPath}`);
        
        // Essai d'abord avec le serveur local
        const localUrl = `${LOCAL_SERVER}/${scriptPath}`;
        console.log('🔄 Tentative de chargement local:', localUrl);
        
        try {
            const response = await fetch(localUrl);
            if (response.ok) {
                const moduleContent = await response.text();
                console.log('✅ Module chargé depuis le serveur local:', scriptPath);
                
                // Remplacer les imports relatifs par des imports locaux
                const processedContent = moduleContent.replace(
                    /from\s+['"](\.\/[^'"]+)['"]/g,
                    (match, importPath) => {
                        const localImportPath = `${LOCAL_SERVER}/${importPath}`;
                        console.log(`🔄 Remplacement de l'import local: ${importPath} -> ${localImportPath}`);
                        return `from "${localImportPath}"`;
                    }
                );
                
                // Créer et exécuter le module
                const moduleBlob = new Blob([processedContent], { type: 'text/javascript' });
                const moduleUrl = URL.createObjectURL(moduleBlob);
                const module = await import(moduleUrl);
                URL.revokeObjectURL(moduleUrl);
                
                console.log(`✨ Module ${scriptPath} initialisé depuis local:`, {
                    exports: Object.keys(module),
                    hasInitFunction: typeof module.initFaqItems === 'function' || 
                                   typeof module.initCentreCards === 'function' ||
                                   typeof module.initMenuMobile === 'function'
                });
                
                return module;
            }
        } catch (localError) {
            console.warn('⚠️ Échec du chargement local, tentative via GitHub:', scriptPath);
        }
        
        // Si le chargement local échoue, essayer avec GitHub
        const githubUrl = `${GITHUB_BASE_URL}${scriptPath}`;
        console.log('🔄 Tentative de chargement GitHub:', githubUrl);
        
        try {
            const response = await fetch(githubUrl);
            if (!response.ok) {
                console.error(`❌ Erreur lors du chargement de ${scriptPath}:`, {
                    status: response.status,
                    statusText: response.statusText,
                    url: githubUrl
                });
                return null;
            }
            const moduleContent = await response.text();
            console.log(`✅ Module ${scriptPath} chargé depuis GitHub`);
            
            // Remplacer les imports relatifs par des imports GitHub
            const processedContent = moduleContent.replace(
                /from\s+['"](\.\/[^'"]+)['"]/g,
                (match, importPath) => {
                    const githubImportPath = `${GITHUB_BASE_URL}${importPath}`;
                    console.log(`🔄 Remplacement de l'import GitHub: ${importPath} -> ${githubImportPath}`);
                    return `from "${githubImportPath}"`;
                }
            );
            
            // Créer et exécuter le module
            const moduleBlob = new Blob([processedContent], { type: 'text/javascript' });
            const moduleUrl = URL.createObjectURL(moduleBlob);
            const module = await import(moduleUrl);
            URL.revokeObjectURL(moduleUrl);
            
            console.log(`✨ Module ${scriptPath} initialisé depuis GitHub:`, {
                exports: Object.keys(module),
                hasInitFunction: typeof module.initFaqItems === 'function' || 
                               typeof module.initCentreCards === 'function' ||
                               typeof module.initMenuMobile === 'function'
            });
            
            return module;
        } catch (error) {
            console.error(`❌ Erreur lors du chargement de ${scriptPath}:`, error);
            console.error('Stack trace:', error.stack);
            return null;
        }
    };

    const loadAllModules = async () => {
        console.log('🚀 Début du chargement des modules');
        console.log('🌐 Configuration:', {
            baseUrl: GITHUB_BASE_URL,
            loadDelay: LOAD_DELAY,
            modules: [
                'main_gsap.js',
                'centre-card.js',
                'menu-mobile.js',
                'menu-desktop.js',
                'text-animation.js',
                'faq-toggle.js'
            ]
        });
        
        // Liste réduite aux modules essentiels uniquement
        const modules = [
            'main_gsap.js',
            'centre-card.js',
            'menu-mobile.js',
            'menu-desktop.js',
            'text-animation.js',
            'faq-toggle.js'
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
            
            // Initialiser les modules
            try {
                console.log('🎬 Démarrage de l\'initialisation des modules');
                
                // Initialiser main_gsap.js qui gère l'initialisation des autres modules
                const mainModule = loadedModules['main_gsap.js'];
                if (mainModule) {
                    console.log('📦 Contenu du module main_gsap.js:', Object.keys(mainModule));
                    if (typeof mainModule.startInitialization === 'function') {
                        console.log('⚡ Appel de l\'initialisation principale');
                        mainModule.startInitialization();
                    } else {
                        console.error('❌ Fonction startInitialization non trouvée dans main_gsap.js');
                        console.log('Contenu disponible:', mainModule);
                    }
                } else {
                    console.error('❌ Module main_gsap.js non trouvé');
                }
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation:', error);
                console.error('Stack trace:', error.stack);
            }
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