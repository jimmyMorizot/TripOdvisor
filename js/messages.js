// dans ce module on va placer tout ce qui concerne les messages
const messages = {
    // on a deux types de choses dans un module :
    // - des informations (variables)
    // - des procédures (fonction) : fonction anonyme avec le nom indiqué
    // avant, pour respecter le format d'un tableau associatif

    // ajouter un message
    // paramètres :
    // - le texte du message
    // - l'élément dans lequel on veut ajouter un message
    addMessage: function(messageContent, parentElement) {
        // créer la balise p
        const pElement = document.createElement('p');
    
        // personnaliser la balise
        // pElement.classList.add('message');

        // quand on veut "partir de zéro" pour les classes (remplacer toutes
        // les classes par autre chose), ici ça revient au même que classList.add
        // className n'est pas une boîte à outil, c'est accéder directement à
        // l'attribut "class" de l'élément
        pElement.className = 'message';

        pElement.textContent = messageContent;

        // l'ajouter dans le parent (append / prepend)
        parentElement.append(pElement);
    },
};

