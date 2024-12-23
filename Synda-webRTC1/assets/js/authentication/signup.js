document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rpassword = document.getElementById('rpassword').value;

    if (password !== rpassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        window.location.href = result.redirectUrl; // Redirection vers login.html
    } else {
        alert(result.message);
    }
});
