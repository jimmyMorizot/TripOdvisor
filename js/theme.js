// placer dans ce module tout ce qui concerne le theme
const theme = {
    init: function() {
        // ------- écouteur d'événement sur le bouton dark/light
        const themeSwitchElement = document.querySelector('#theme-switch');
        themeSwitchElement.addEventListener('click', theme.changeTheme);

        // ------- initialisation du darkMode par rapport au LocalStorage
        // récupérer la valeur enregistrée dans le LocalStorage pour utiliser
        // le thème qui avait été sélectionné par l'utilisateur
        const isDarkModeActivatedAsString = localStorage.getItem('isDarkMode');

        // si l'utilisateur arrive pour la première fois sur le site, cette clé n'est
        // pas définie dans le LocalStorage => getItem retourne null
        // console.log(isDarkModeActivatedAsString); // null

        // convertir l'info en booléen pour pouvoir s'en servir
        const isDarkModeActivated = JSON.parse(isDarkModeActivatedAsString);

        // on pourrait regrouper les deux lignes en une seule (pas de variable intermédiaire)
        // const isDarkModeActivated = JSON.parse(localStorage.getItem('isDarkMode'));

        // si on a lu l'info dans le LocalStorage
        if (isDarkModeActivated !== null) {
             // adapter l'affichage par rapport à l'info : si le local storage dit que le mode
            // dark doit être activé, alors on l'active
            if (isDarkModeActivated) {
                // sur le body ajouter la classe "theme-dark"
    
                // const bodyElement = document.querySelector('body');
                // bodyElement.classList.add('theme-dark');
    
                document.querySelector('body').classList.add('theme-dark');
            }
        }

        // ------- écouteurs dévénement sur les boutons de changement de couleur
        // on récupère tous les boutons de changement de couleur
        // avec querySelectorAll, on récupère un tableau
        const allColorButtonElements = document.querySelectorAll('.theme-button');

        // on ne peut pas apppeler addEventListener sur un tableau directement,
        // il faut l'appeler sur un élément du DOM => on boucle sur le tableau
        for (const colorButtonElement of allColorButtonElements) {
            colorButtonElement.addEventListener('click', theme.handleThemeColorClick)
        }

        // ----- initialisation du thème de couleur à partir du LocalStorage
        // on récupère l'éventuel thème de couleur dans le LocalStorage
        const themeColorSaved = localStorage.getItem('colorTheme');
        // ça vaut par exemple 'theme-red'
        
        // si un thème est défini, on s'en sert
        if (themeColorSaved !== null) {
            // on applique le thème de couleur
            theme.changeColorTheme(themeColorSaved);
        }
    },

    changeTheme: function() {
        // on sélectionne le body
        const bodyElement = document.querySelector('body');
        // console.log(bodyElement);
    
        // on veut "inverser" la présence de la classe "theme-dark"
    
        // on enlève ou on ajoute la classe selon le cas
        if (bodyElement.classList.contains('theme-dark')) {
            // si la classe est présente (si le thème sombre est utilisé)
            // alors on l'enlève
            bodyElement.classList.remove('theme-dark');
        } else {
            // sinon on l'ajoute sur le body
            bodyElement.classList.add('theme-dark');
        }

        // comme le thème a changé, on veut enregistrer sa nouvelle valeur dans le
        // LocalStorage
        // on détermine si le mode sombre est activé ou non
        const isDarkModeActivated = bodyElement.classList.contains('theme-dark');
        // console.log(typeof isDarkModeActivated); // boolean

        // on veut stocker ce booléen dans le localStorage, mais comme le LOcalStorage
        // accepte seulement des chaînes de caractères, on va commencer par convertir
        // en chaîne de caractères avec le format JSON
        const isDarkModeActivatedStringified = JSON.stringify(isDarkModeActivated);
        // console.log(typeof isDarkModeActivatedStringified); // string

        // on enregistre la chaîne de caractères dans le LocalStorage sous le nom
        // isDarkMode (la clé)
        localStorage.setItem('isDarkMode', isDarkModeActivatedStringified);
    },

    handleThemeColorClick: function(evt) {
        // target : l'élément précis sur lequel on a cliqué
        // currentTarget : l'élément sur lequel on a placé l'écouteur
        // console.log(evt.currentTarget);

        // ici la classe CSS à appliquer a été stockée dans l'id du bouton
        // donc si on récupère l'id du bouton qui a reçu le clic, on aura
        // le nom de classe à placer sur le body
        const buttonClicked = evt.currentTarget;
        
        // on peut aller lire les infos d'un élément du DOM, deux possibilités
        //  - element.nomDeLInfo (des fois le nom de l'info est pas pareil qu'en
        //  HTML, par exemple pour la classe CSS c'est ".className", parce que
        // "class" c'est un mot réservé en JS)
        //  - element.getAttribute('nom de l'attribut') => on pourra toujours
        // utiliser directement le nom HTML : getAttribute('class')

        // const idButtonClicked = buttonClicked.id;
        const idButtonClicked = buttonClicked.getAttribute('id');

        // la fonction a besoin d'une info pour faire son traitement => il faut
        // qu'on fournisse cette info, qu'on la donne en argument (un argument
        // c'est la valeur qu'on fournit pour un paramètre)
        theme.changeColorTheme(idButtonClicked);

        // on enregistre le nouveau thème dans le LocalStorage
        localStorage.setItem('colorTheme', idButtonClicked);
    },

    // permet de changer la couleur utilisée pour le site
    // la fonction a un paramètre (une info dont elle a besoin pour faire son
    // traitement => on donne un nom à cette info, et on utilise ce nom dans
    // le traitement)
    changeColorTheme: function(themeColor) {
        const bodyElement = document.querySelector('body');

        // on enlève toutes les classes de couleur qui pourraient être
        // présentes sur le body
        // on voit dans la doc de remove "..." => cette fonction est écrite d'une
        // façon spéciale qui permet d'envoyer dans les paramètres autant de classes
        // qu'on veut
        bodyElement.classList.remove('theme-red', 'theme-green', 'theme-blue');

         // on applique la classe CSS pour la couleur sur le body
        bodyElement.classList.add(themeColor);

        // changer la valeur de l'attribut src du logo pour avoir un logo de
        // la bonne couleur
        const logoElement = document.querySelector('.logo__image');

        // on construit le chemin de l'image en utilisant le nom du thème de couleur
        logoElement.src = 'img/logo-' + themeColor + '.png';
    }
};




