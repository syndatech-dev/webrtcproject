document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault(); // Empêcher le comportement par défaut du bouton
    fetch('/logout', {
        method: 'GET'
    }).then(() => {
        // Après la déconnexion côté serveur, on redirige vers la page de connexion
        localStorage.removeItem('token'); // Supprimer le token local si vous en utilisez un
        window.location.href = '/login'; // Remplacer par l'URL correcte de votre page de connexion
    }).catch(error => {
        console.error('Erreur lors de la déconnexion:', error);
        alert('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
    });
});

// Pour éviter le retour en arrière après déconnexion
window.addEventListener('load', function() {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function(event) {
        window.history.go(1); // Empêche le retour en arrière en redirigeant à nouveau vers la page actuelle
    };
});