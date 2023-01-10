// console.log('Coucou depuis le fichier app.js');

// objectif : appeler addImagesToSlider seulement quand le navigateur a fini
// de charger le DOM (événement DOMContentLoaded)
document.addEventListener('DOMContentLoaded', init);

// fonction pour initialiser notre application : faire tous les traitements
// qu'il faut faire au chargement de la page
function init() {
    // on va initialiser nos outils en appelant le traitement d'initialisation
    // de chaque outil 
    slider.init();

    theme.init();

    newsletter.init();

    reviews.init();
}
