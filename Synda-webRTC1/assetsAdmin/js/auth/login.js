document.getElementById('loginAdminForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la soumission du formulaire par défaut

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Validation côté client
    if (!username || !password) {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
        return;
    }

    try {
        // Envoyer une requête POST à l'API pour authentification
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);

            // Enregistrez le token dans le localStorage ou sessionStorage
            localStorage.setItem('adminToken', result.token);

            // Redirection vers le tableau de bord admin
            window.location.href = result.redirect || '/admin/dashboard.html';
        } else {
            const error = await response.json();
            alert(error.message || "Une erreur s'est produite lors de la connexion.");
        }
    } catch (err) {
        console.error("Erreur de connexion :", err);
        alert("Impossible de se connecter au serveur. Veuillez réessayer plus tard.");
    }
});
