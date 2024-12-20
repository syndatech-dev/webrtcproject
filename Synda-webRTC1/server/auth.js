const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersFile = path.join(__dirname, '../database/users.json');

// Charger les utilisateurs existants depuis le fichier JSON
let users = [];

// Fonction pour lire les utilisateurs
function getUsers() {
    return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
}

try {
    if (fs.existsSync(usersFile)) {
        const data = fs.readFileSync(usersFile);
        users = JSON.parse(data);
    } else {
        // Si le fichier n'existe pas encore, initialisez une liste vide
        users = [];
    }
} catch (err) {
    console.error('Erreur de lecture du fichier users.json :', err);
    users = []; // Si une erreur survient, utilisez une liste vide
}

// Route pour l'inscription
router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;
    const users = getUsers();

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "Nom d'utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        role: 'client', // Par défaut, le rôle est client
        createdAt: new Date().toISOString(),
        history: []
    });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));


// Création d'un admin par défaut si aucun utilisateur avec le rôle 'admin' n'existe
// const users = getUsers();
if (!users.some(user => user.role === 'admin')) {
    const hashedPassword = await bcrypt.hash('admin12', 10);
    users.push({
        id: 'admin1',
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString(),
        history: []
    });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}



    
    return res.json({ message: "Inscription réussie", redirectUrl: '/login.html' });
});

// Route pour la connexion
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Stocker l'utilisateur dans la session
    req.session.user = { id: user.id, username: user.username, role: user.role };

    // Rediriger en fonction du rôle
    if (user.role === 'admin') {
        res.json({ message: "Connexion réussie", redirect: '/admin/dashboard' });
    } else {
        res.json({ message: "Connexion réussie", redirect: '/client/accueil.html' });
    }
});



module.exports = router;