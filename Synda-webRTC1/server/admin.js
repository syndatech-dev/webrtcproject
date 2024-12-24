const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../database/users.json');
const callsFile = path.join(__dirname, '../database/calls.json');

// Récupérer les utilisateurs
router.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    res.json(users);
});

// Supprimer un utilisateur
router.delete('/users/:id', (req, res) => {
    let users = JSON.parse(fs.readFileSync(usersFile));
    users = users.filter(user => user.id !== req.params.id);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ message: 'Utilisateur supprimé avec succès' });
});

// Récupérer l'historique des appels
router.get('/calls', (req, res) => {
    const calls = JSON.parse(fs.readFileSync(callsFile));
    res.json(calls);
});

module.exports = router;
