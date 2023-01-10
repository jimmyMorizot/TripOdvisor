/*
Pour créer un module :
- nouveau fichier truc.js
- const truc = {} dans le fichier
- lier le fichier JS dans le fichier HTML
*/
// responsabilité du module slider : gérer tout ce qui concerne le slider
const slider = {
    // par convention on range les informations avant les méthodes
    // les informations stockées au niveau du module sont accessibles dans
    // n'importe quelle méthode du module, et aussi dans les autres modules

    // toutes les images disponibles pour le slider
    images: [
        'ocean.jpg',
        'ski.jpg',
        'city.jpg',
        'canyon.jpg',
        'road.jpg',
        'nature.jpg'
    ],

    // la position actuelle du slider. Initialement index 0, et ensuite ça
    // changera quand on appelle par exemple handleNextImage
    // => notre module peut garder des informations en mémoire et ces informations
    // sont modifiables (comme avec let). Si on définit la variable dans la
    // méthode, elle sera remise à zéro chaque fois qu'on appelle la méthode
    currentPosition: 0,

    // on crée une méthode init pour placer tout ce qui permet d'initialiser
    // le module
    init: function() {
        // on place dans cette méthode les traitements qu'il faut appliquer
        // au chargement de la page :
        // ici pour que le slider puisse s'afficher correctement, il faut commencer par
        // ajouter les images
        slider.addImagesToSlider();

        // au chargement de la page, le slider doit aller placer un écouteur
        // d'événement clic sur le bouton 'suivant'
        const nextButtonElement = document.querySelector('#slider-next');
        nextButtonElement.addEventListener('click', slider.handleNextImage);
    },

    // les fonctions qui sont dans un module s'appellent des méthodes
    // ajouter les images dans le slider (dans la section slider)
    addImagesToSlider: function() {
        // boucler sur le tableau pour ajouter chaque image
        for (const currentImage of slider.images) {
            const sliderElement = document.querySelector('section.slider');
            
            const imgElement = document.createElement('img');
            
            imgElement.classList.add('slider__img');

            imgElement.src = "img/" + currentImage;

            sliderElement.append(imgElement);
        }

        // on choisit l'image qui doit être visible dans le slider au début
        // et on lui ajoute la classe slider__img--current
        // => ici on veut afficher la première image
        const imageElement = document.querySelector('.slider__img');
        imageElement.classList.add('slider__img--current');
    },

    // méthode pour passer à l'image suivante
    handleNextImage: function() {
        // on enlève la classe 'slider__img--current' sur l'image actuellement
        // sélectionnée
        const allImageElements = document.querySelectorAll('.slider__img');
        const currentSelectedImage = allImageElements[slider.currentPosition];
        currentSelectedImage.classList.remove('slider__img--current');

        // on ajoute la classe 'slider__img--current' sur l'image suivante
        const nextIndex = slider.currentPosition + 1;
        // TODO il faudrait gérer le cas de quand on est sur la dernière image
        const nextSelectedImage = allImageElements[nextIndex];
        nextSelectedImage.classList.add('slider__img--current');

        // on met à jour l'index courant
        slider.currentPosition = nextIndex;
    },

};
