document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Connexion réussie!');
        window.location.href = '/client/acceuil.html';
    } else {
        alert('Identifiants invalides.');
    }
});

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });

    if (response.ok) {
        alert('Inscription réussie!');
        window.location.href = '/login.html';
    } else {
        alert('Erreur lors de l\'inscription.');
    }
});
