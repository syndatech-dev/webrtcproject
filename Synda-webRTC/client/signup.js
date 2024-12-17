document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rpassword = document.getElementById('rpassword').value;

    // Vérification des champs vides
    if (!username || !password || !rpassword) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Vérification si les mots de passe sont identiques
    if (password !== rpassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inscription réussie.');
            window.location.href = '/login.html';
        } else {
            alert(data.message || 'Erreur lors de l\'inscription.');
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Une erreur est survenue.');
    }
});
