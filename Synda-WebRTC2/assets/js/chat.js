const socket = io('http://localhost:3000');
const discussionList = document.getElementById('discussionList');
const chatWithUser = document.getElementById('chatWithUser');
const chatWindow = document.getElementById('chatWindow');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let currentUser = null; // Utilisateur actuellement connecté
let selectedUserId = null; // Utilisateur sélectionné pour la discussion

// Charger les utilisateurs depuis le serveur
fetch('/api/users')
    .then(response => response.json())
    .then(users => {
        discussionList.innerHTML = '';
        users.forEach(user => {
            if (user.id !== currentUser.id && user.role !== 'admin') { // Exclure l'utilisateur connecté et l'admin
                const discussionElement = document.createElement('li');
                discussionElement.classList.add('list-group-item');
                discussionElement.textContent = user.username;
                discussionElement.addEventListener('click', () => openChat(user));
                discussionList.appendChild(discussionElement);
            }
        });
    })
    .catch(error => console.error('Erreur de chargement des utilisateurs:', error));

// Ouvrir la discussion avec un utilisateur
function openChat(user) {
    selectedUserId = user.id;
    chatWithUser.textContent = user.username;
    chatWindow.innerHTML = ''; // Vider les messages précédents

    // Charger l'historique des messages
    fetch(`/api/messages?userId=${selectedUserId}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                addMessage(
                    message.sender === currentUser.id ? 'Moi' : user.username,
                    message.content,
                    message.sender === currentUser.id ? 'sent' : 'received',
                    message.timestamp
                );
            });
        });
}

// Envoyer un message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && selectedUserId) {
        socket.emit('chat-message', { targetUserId: selectedUserId, message });
        addMessage('Moi', message, 'sent', new Date().toISOString());
        messageInput.value = '';
    }
});

// Recevoir un message
socket.on('chat-message', (data) => {
    if (data.senderId === selectedUserId) {
        addMessage(data.username, data.message, 'received', data.timestamp);
    }
});

// Ajouter un message à la fenêtre de chat
function addMessage(username, message, type, timestamp) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.innerHTML = `
        <strong>${username}</strong>
        <p>${message}</p>
        <span class="timestamp">${new Date(timestamp).toLocaleTimeString()}</span>
    `;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Enregistrer l'utilisateur connecté
currentUser = { id: 'USER_ID_FROM_SESSION', username: 'USERNAME_FROM_SESSION' }; // Remplace par les données de session

// Logs de connexion/déconnexion
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});