const reviews = {
    init: function() {
        // on récupère les checkbox
        const allCheckboxElements = document.querySelectorAll('.filter input[name="rating"]')

        // on boucle pour poser un écouteur d'événement sur chacune
        for (const currentCheckbox of allCheckboxElements) {
            currentCheckbox.addEventListener('click', reviews.handleClickOnFilterCheckbox);
        }
    },

    handleClickOnFilterCheckbox: function(event) {
        // on  récupère l'input qui a reçu le clic => et on récupère sa "value"
        const nbStars = event.currentTarget.value;
        // console.log(nbStars);

        // on récupère les commentaires qui ont ce nombre d'étoiles
        // => on va chercher les commentaires (.review) qui ont nbStars pour
        // la valeur de leur attribut data-rating
        
        // const commentsWithNbStars = document.querySelectorAll('.review[data-rating="' + nbStars + '"]');
        
        // plus pratique avec les template strings (une autre façon de faire
        // des concaténations de chaîne de caractères)
        // - on encadre par des backticks : ` => Alt Gr + 7
        // - on écrit comme d'habitude la partie qui est fixe
        // - on encadre les parties variables par ${}
        const commentsWithNbStars = document.querySelectorAll(`.review[data-rating="${nbStars}"]`);
        
        // déterminer si on veut afficher ou masquer
        // => on est sur un input de type checkbox, on peut utiliser l'attribut checked
        const inputElement = event.currentTarget;
        if (inputElement.checked) {
            // la case vient d'être cochée, on veut afficher les commentaires
            // enlever la classe review--hidden
            for (const currentComment of commentsWithNbStars) {
                currentComment.classList.remove('review--hidden');
            }
        } else {
            // la case vient d'être dé-cochée, on veut masquer les commentaires
            // ajouter la classe review--hidden
            for (const currentComment of commentsWithNbStars) {
                currentComment.classList.add('review--hidden');
            }
        }
    }
};


