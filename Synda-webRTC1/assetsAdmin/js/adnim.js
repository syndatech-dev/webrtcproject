document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    loadCallHistory();
});

// Charger les utilisateurs
function loadUsers() {
    fetch('/api/admin/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('userTableBody');
            tableBody.innerHTML = '';

            users.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                        <td>
                            <button onclick="deleteUser('${user.id}')">Supprimer</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
}

// Charger l'historique des appels
function loadCallHistory() {
    fetch('/api/admin/calls')
        .then(response => response.json())
        .then(calls => {
            const tableBody = document.getElementById('callHistoryTableBody');
            tableBody.innerHTML = '';

            calls.forEach(call => {
                const row = `
                    <tr>
                        <td>${call.id}</td>
                        <td>${call.caller}</td>
                        <td>${call.receiver}</td>
                        <td>${call.startTime}</td>
                        <td>${call.endTime}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
}

// Supprimer un utilisateur
function deleteUser(userId) {
    fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
    }).then(() => loadUsers());
}
