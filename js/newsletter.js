const newsletter = {
    // si on voit qu'une info est utile à plusieurs méthodes on peut la stocker en "propriété"
    // dans le module, mais attention si c'est un élément du DOM, bien vérifier
    // qu'au moment où le module est créé (au moment où le script est lu par JS), le
    // DOM a été chargé
    // newsletterElement: document.querySelector('aside.newsletter'),

    // liste des domaines interdits dans les adresses e-mails
    forbiddenDomains: [
        '@yopmail.com',
        '@yopmail.fr',
        '@yopmail.net',
        '@cool.fr.nf',
        '@jetable.fr.nf',
        '@courriel.fr.nf',
        '@moncourrier.fr.nf',
        '@monemail.fr.nf',
        '@monmail.fr.nf',
        '@hide.biz.st',
        '@mymail.infos.st',
    ],

    init: function() {
        // récupérer le menu pour la newsletter et écouter l'événement click
        const newsletterMenuElement = document.querySelector("#menu__newsletter");
        newsletterMenuElement.addEventListener('click', newsletter.handleClickNewsletterMenu);

        // récupérer le bouton de fermeture de l'encart newsletter et écouter
        // un clic dessus
        const closeNewsletterElement = document.querySelector('button.newsletter__close');
        closeNewsletterElement.addEventListener('click', newsletter.handleCloseNewsletter);

        // récupérer le formulaire et écouter l'événement submit
        const formElement = document.querySelector('aside.newsletter form');
        formElement.addEventListener('submit', newsletter.handleFormNewsletterSubmit);
    
        // on peut modifier les propriétés, et/ou les définir au moment du init
        // plutôt qu'au moment où le module est défini
        // si on veut stocker un élément du DOM, s'assurer qu'il sera stable au fil
        // du temps => cet élément ne sera pas supprimé de la page
        newsletter.newsletterElement = document.querySelector('aside.newsletter');
    },

    // traitement quand on clique sur le lien pour ouvrir l'encart newsletter
    handleClickNewsletterMenu: function(event) {
        // comportement par défaut d'une balise a : charger l'URL indiqué dans
        // l'attribut href. Si href est vide, on reste sur la même page, mais il
        // y a quand même un rechargement de la page
    
        // => on annule le comportement par défaut
        event.preventDefault();
    
        // on veut afficher l'encart de newsletter
        newsletter.newsletterElement.classList.add('newsletter--on');
    },

    // traitement pour faire disparaître l'encart newsletter
    handleCloseNewsletter: function() {
        const newsletterElement = document.querySelector('aside.newsletter');
        newsletterElement.classList.remove('newsletter--on');
    },

    // traitement au submit du formulaire pour s'abonner
    handleFormNewsletterSubmit: function(event) {
        event.preventDefault();
    
        // on récupère l'input
        const inputElement = document.querySelector('#subscriber-email');
        const inputValue = inputElement.value;
        
        // Objectif : valider que l'adresse e-mail n'est pas une adresse jetable
        // - vérifier avec '@yopmail.com' => ajouter un message d'erreur
        // - boucler sur le tableau pour vérifier tous les domaines
    
        // on parcourt tous les domaines
        for (const currentDomain of newsletter.forbiddenDomains) {
            // pour chaque domaine on vérifit si la valeur de l'input le contient
            if (inputValue.includes(currentDomain)) {
                // l'adresse n'est pas valide, on doit ajouter un message d'erreur
                // dans le DOM
        
                // récupérer le futur parent
                const asideElement = document.querySelector('aside.newsletter');

                newsletter.deleteMessages(asideElement);
        
                // on utilise la procédure d'ajout de message qu'on a définie
                // dans le module (la boîte à outils) messages
                messages.addMessage('Les adresses jetables ne sont pas admises', asideElement)
            }
        }
    
        // ça ne sert à rien de retourner une valeur dans un handler d'événement,
        // on ne peut pas récupérer cette valeur, et on ne sait pas quand elle sera
        // disponible (code asynchrone) ni même si elle sera disponible un jour
        // return inputValue;
    },

    deleteMessages: function(parentElement) {
        // on sélectionne les messages
        // avec querySelector on peut chercher à l'intérieur d'un élément, pas
        // forcément dans tout le document
        const messageElements = parentElement.querySelectorAll('.message');

        // on les supprime, 2 façons :
        // - remove() appliqué sur l'élément => élément complètement détruit
        // - removeChild(element) appliqué sur le parent => on détruit juste le
        // lien avec le parent, on pourrait réutiliser l'enfant dans un autre
        // endroit du DOM avec append/prepend
        for (const currentMessage of messageElements) {
            currentMessage.remove();

            // autre outil :
            // parentElement.removeChild(currentMessage);
        }
    }
};
