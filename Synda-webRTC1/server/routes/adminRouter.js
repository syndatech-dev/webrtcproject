const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../../database/users.json');

// Middleware pour vérifier si l'utilisateur est admin
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).json({ error: 'Accès interdit : vous devez être un administrateurrr.' });
    }
}

// Routes pour les fichiers HTML
router.get('/user', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/users.html'));
});

router.get('/history', isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/history.html'));
});

// Nouvelle route pour récupérer les utilisateurs
router.get('/users', isAdmin, (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersFile));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Impossible de charger les utilisateurs.' });
    }
});

// Supprimer un utilisateur
router.delete('/users/:id', isAdmin, (req, res) => {
    try {
        let users = JSON.parse(fs.readFileSync(usersFile));
        users = users.filter((user) => user.id !== req.params.id);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
});

// Route pour obtenir le nombre d'utilisateurs
router.get('/users/count', isAdmin, (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersFile));
        res.status(200).json({ count: users.length });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du nombre d\'utilisateurs.' });
    }
});


router.put('/api/admin/update', isAdmin, (req, res) => {
    try {
        const { username, password } = req.body;

        // Valider les données
        if (!username || !password) {
            return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis.' });
        }

        const users = JSON.parse(fs.readFileSync(usersFile));
        const admin = users.find(user => user.role === 'admin');

        if (admin) {
            admin.username = username;
            admin.password = password; // Assurez-vous de hasher le mot de passe en production
            fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
            res.status(200).json({ message: 'Informations mises à jour avec succès.' });
        } else {
            res.status(404).json({ error: 'Administrateur introuvable.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour des informations.' });
    }
});


module.exports = router;
