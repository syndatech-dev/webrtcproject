const bcrypt = require('bcrypt');
const { saveUser, findUserByUsername } = require('./utils/database');

async function registerUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Données invalides.');

    const hashedPassword = await bcrypt.hash(password, 10);
    saveUser({ username, password: hashedPassword });
    res.status(201).send('Utilisateur enregistré avec succès.');
}

async function authenticateUser(req, res) {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).send({ message: 'Connexion réussie.', userId: user.id });
    } else {
        res.status(401).send('Identifiants invalides.');
    }
}

module.exports = { registerUser, authenticateUser };
