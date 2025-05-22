// test github

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const closeButton = document.getElementById("button-close");
    const mainMenu = document.querySelector("#mobile-menu-wrapper nav.main_menu");
    const menuItems = mainMenu.querySelectorAll(".nav_menu_list.is-mobile");
    const parcMenu = document.querySelector("#mobile-menu-wrapper nav.parc_menu");
    const body = document.body;
    const pageMain = document.querySelector(".page_main");
  
    // Forcer état visuel initial du bouton
    hamburger.style.backgroundColor = 'transparent';
    hamburger.style.borderColor = 'transparent';
  
    let isOpen = false;
    let isAnimating = false;
  
    // Configuration initiale
    gsap.set(mainMenu, {
      height: 0,
      display: "none",
      width: "98svw",
      padding: "var(--_spacing---space--4)",
      flexShrink: 0,
      position: "absolute",
      right: 0,
      top: 0,
      x: 0
    });
  
    gsap.set(parcMenu, {
      display: "none",
      width: "0svw",
      padding: "var(--_spacing---space--4)",
      position: "absolute",
      right: 0,
      top: 0,
      flexShrink: 0,
      x: 0
    });
  
    gsap.set(menuItems, {
      y: 20,
      opacity: 0
    });
  
    // Configuration initiale du contenu des menus
    gsap.set(mainMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
      opacity: 1
    });
    gsap.set(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
      opacity: 1
    });
  
    // ✅ Timeline pour bouton (réversible)
    const btnTL = gsap.timeline({ 
      paused: true,
      onReverseComplete: () => {
        gsap.set(hamburger, {
          rotate: "0deg",
          backgroundColor: colorTransparent,
          borderColor: colorTransparent,
          clearProps: "all"
        });
      }
    });
    const colorBrand = '#ffc31e';
    const colorTransparent = 'transparent';
  
    btnTL
      .to(hamburger, {
        rotate: "-90deg",
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(hamburger, {
        backgroundColor: colorBrand,
        borderColor: '#000',
        duration: 0.2,
        ease: "none"
      }, "-=0.1");
  
    // Fonction pour gérer le scroll
    const toggleScroll = (disable) => {
      if (disable) {
        // Sauvegarder la position actuelle du scroll
        body.style.top = `-${window.scrollY}px`;
        body.style.position = 'fixed';
        body.style.width = '100%';
        // Permettre le scroll uniquement dans les menus
        if (pageMain) {
          pageMain.style.overflow = 'hidden';
        }
      } else {
        // Restaurer la position du scroll
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        if (pageMain) {
          pageMain.style.overflow = '';
        }
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  
    const openMenu = () => {
      console.log("Début openMenu");
      btnTL.play();
      toggleScroll(true); // Désactiver le scroll
  
      // Réinitialisation de la position du menu principal avant l'ouverture
      gsap.set(mainMenu, { 
        display: "flex", 
        height: 0,
        width: "98svw",
        padding: "var(--_spacing---space--4)"
      });
  
      gsap.set(menuItems, { y: 20, opacity: 0 });
  
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("Fin openMenu");
          isOpen = true;
          isAnimating = false;
          console.log("État final - isOpen:", isOpen, "isAnimating:", isAnimating);
        }
      });
  
      tl.to(mainMenu, {
        height: "100%",
        duration: 0.9,
        ease: "elastic.out(1, 0.5)"
      })
      .to(menuItems, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08
      }, "-=0.5");
    };
  
    const closeMenu = () => {
      console.log("Début closeMenu");
      if (btnTL.isActive()) {
        btnTL.kill();
      }
      
      gsap.to(hamburger, {
        backgroundColor: colorTransparent,
        borderColor: colorTransparent,
        duration: 0.1,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          btnTL.reverse();
        }
      });
  
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("Fin closeMenu");
          gsap.set(mainMenu, { 
            display: "none", 
            height: 0,
            width: "98svw",
            padding: "var(--_spacing---space--4)",
            flexShrink: 0,
            position: "absolute",
            right: 0,
            x: 0
          });
          gsap.set(parcMenu, { 
            display: "none",
            width: "0svw",
            padding: "var(--_spacing---space--4)",
            flexShrink: 0,
            position: "absolute",
            right: 0,
            x: 0
          });
          gsap.set(mainMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
            opacity: 1
          });
          gsap.set(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
            opacity: 1
          });
          isOpen = false;
          isAnimating = false;
          console.log("État final closeMenu - isOpen:", isOpen, "isAnimating:", isAnimating);
        }
      });
  
      tl.to(menuItems, {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        stagger: { each: 0.04, from: "end" }
      })
      .to(mainMenu, {
        height: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.2");
    };
  
    // ✅ Toggle hamburger
    hamburger.addEventListener("click", () => {
      console.log("Hamburger cliqué");
      console.log("État initial - isOpen:", isOpen, "isAnimating:", isAnimating);
      console.log("État du hamburger:", hamburger.style);
      console.log("État du parcMenu:", parcMenu.style.display);
  
      if (isAnimating) {
        console.log("Animation en cours, sortie");
        return;
      }
      isAnimating = true;
  
      // Si le sous-menu est visible, le fermer d'abord
      if (parcMenu.style.display === "flex") {
        console.log("Fermeture du sous-menu depuis le hamburger");
        const closeSubMenu = gsap.timeline({
          onComplete: () => {
            console.log("Sous-menu fermé, fermeture du menu principal");
            // Une fois le sous-menu fermé, fermer le menu principal
            closeMenu();
          }
        });
  
        closeSubMenu.to(parcMenu, {
          x: "100%",
          duration: 0.4,
          ease: "power2.inOut"
        })
        .to(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut"
        }, "<")
        .set(parcMenu, { 
          display: "none",
          x: 0,
          width: "0svw",
          padding: "var(--_spacing---space--4)",
          flexShrink: 0,
          position: "absolute",
          right: 0,
          opacity: 1
        });
      } else if (!isOpen) {
        console.log("Ouverture du menu");
        openMenu();
      } else {
        console.log("Fermeture du menu principal");
        closeMenu();
      }
    });
  
    // ✅ Bouton secondaire (fermer)
    closeButton.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;
      closeMenu();
    });
  
    // === Animation bento du menu vers sous-menu ===
    const menuItemParc = document.querySelector("#parcs-nav_button_mobile.clickable_button");
  
    // Gestion de tous les boutons de fermeture
    document.querySelectorAll(".button-close").forEach(button => {
      button.addEventListener("click", () => {
        console.log("Bouton close cliqué");
        console.log("État initial - isOpen:", isOpen, "isAnimating:", isAnimating);
        console.log("État du hamburger:", hamburger.style);
        console.log("État du parcMenu:", parcMenu.style.display);
  
        if (isAnimating) {
          console.log("Animation en cours, sortie");
          return;
        }
        isAnimating = true;
        toggleScroll(false);
  
        const isSubMenuVisible = parcMenu.style.display === "flex";
        console.log("Sous-menu visible:", isSubMenuVisible);
  
        if (isSubMenuVisible) {
          console.log("Fermeture du sous-menu");
          const closeSubMenu = gsap.timeline({
            onComplete: () => {
              console.log("Sous-menu fermé, fermeture du menu principal");
              closeMenu();
            }
          });
  
          closeSubMenu.to(parcMenu, {
            x: "100%",
            duration: 0.4,
            ease: "power2.inOut"
          })
          .to(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut"
          }, "<")
          .set(parcMenu, { 
            display: "none",
            x: 0,
            width: "0svw",
            padding: "var(--_spacing---space--4)",
            flexShrink: 0,
            position: "absolute",
            right: 0,
            opacity: 1
          });
        } else {
          console.log("Fermeture du menu principal");
          closeMenu();
        }
      });
    });
  
    // Gestion du bouton retour
    document.querySelectorAll(".button-back-menu").forEach(button => {
      button.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;
  
        // Configuration initiale du menu principal
        gsap.set(mainMenu, { 
          display: "flex",
          width: "98svw",
          padding: "var(--_spacing---space--4)",
          position: "absolute",
          right: 0,
          top: 0,
          flexShrink: 0,
          visibility: "visible",
          x: "-100%",
          opacity: 1
        });
  
        // Animation symétrique à l'aller
        const returnTl = gsap.timeline();
  
        returnTl.to(parcMenu, {
          x: "100%",
          duration: 0.5,
          ease: "power2.inOut",
          onStart: () => {
            gsap.to(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut"
            });
          }
        })
        .to(mainMenu, {
          x: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onStart: () => {
            gsap.to(mainMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
              opacity: 1,
              duration: 0.3,
              ease: "power2.inOut",
              delay: 0.2
            });
          },
          onComplete: () => {
            gsap.set(parcMenu, { 
              display: "none",
              flexShrink: 0,
              x: 0,
              width: "0svw",
              opacity: 1
            });
            gsap.set(mainMenu, {
              position: "static",
              x: 0,
              width: "98svw"
            });
            isAnimating = false;
          }
        }, "<")
        .to(parcMenu, {
          opacity: 0,
          duration: 0.15,
          ease: "power1.inOut"
        }, ">0.35");
      });
    });
  
    menuItemParc.addEventListener("click", () => {
      if (!isOpen || isAnimating) return;
  
      isAnimating = true;
  
      gsap.set(parcMenu, { 
        display: "flex",
        width: "0svw",
        padding: "var(--_spacing---space--4)",
        position: "absolute",
        right: 0,
        top: 0,
        flexShrink: 0,
        visibility: "visible",
        x: 0,
        opacity: 1
      });
  
      const tl = gsap.timeline();
  
      tl.to([mainMenu, parcMenu], {
        width: "98svw",
        duration: 0.5,
        ease: "power2.inOut",
        stagger: {
          each: 0,
          from: "start"
        }
      })
      .to(mainMenu, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(mainMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }, "<")
      .to(parcMenu, {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(parcMenu.querySelectorAll('*:not(.mobile-menu-wrapper)'), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
            delay: 0.2
          });
        },
        onComplete: () => {
          gsap.set(mainMenu, { 
            display: "none",
            flexShrink: 0,
            x: 0,
            opacity: 1
          });
          isAnimating = false;
        }
      }, "<")
      .to(mainMenu, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.inOut"
      }, ">0.35");
    });
  });
  
  
  
  