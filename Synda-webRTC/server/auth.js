const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../database/users.json');

// Charger les utilisateurs existants depuis le fichier JSON
let users = [];
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

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Vérification si l'utilisateur existe déjà
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }

        // Hashage du mot de passe avant stockage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        // Sauvegarder les utilisateurs dans le fichier JSON
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'Utilisateur inscrit avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Rechercher l'utilisateur dans la base
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }

        // Comparer les mots de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        res.status(200).json({ message: 'Connexion réussie.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;
