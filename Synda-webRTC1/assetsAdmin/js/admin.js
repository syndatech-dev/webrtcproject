    document.addEventListener("DOMContentLoaded", () => {
        fetch('/api/admin/users')
            .then((response) => {
                if (!response.ok) throw new Error('Erreur API');
                return response.json();
            })
            .then((users) => {
                const tableBody = document.getElementById('userTableBody');
                tableBody.innerHTML = ''; // Efface les lignes existantes
                users.forEach((user) => {
                    const row = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.role}</td>
                            <td>
                                <button onclick="deleteUser('${user.id}') class="btn">Supprimer</button>
                            </td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            });
    });

    function deleteUser(userId) {
        fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
        })
            .then(() => {
                alert('Utilisateur supprimé');
                location.reload(); // Recharge la page
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            });
    }


    document.addEventListener("DOMContentLoaded", () => {
        loadUserCount();
        loadCallHistory();
    });
    
    // Charger le nombre d'utilisateurs
    function loadUserCount() {
        fetch('/api/admin/users/count')
            .then(response => {
                if (!response.ok) throw new Error('Erreur API');
                return response.json();
            })
            .then(data => {
                const userCountElement = document.getElementById('userCount');
                userCountElement.textContent = `Nombre total d'utilisateurs : ${data.count}`;
            })
            .catch(error => {
                console.error('Erreur lors du chargement du nombre d\'utilisateurs:', error);
                document.getElementById('userCount').textContent = 'Erreur de chargement.';
            });
    }
    

    document.addEventListener("DOMContentLoaded", () => {
        const updateForm = document.getElementById('updateForm');
        const updateMessage = document.getElementById('updateMessage');
    
        updateForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            fetch('/api/admin/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    updateMessage.textContent = data.message;
                    updateMessage.style.color = 'green';
                } else {
                    updateMessage.textContent = data.error;
                    updateMessage.style.color = 'red';
                }
            })
            .catch(error => {
                updateMessage.textContent = 'Erreur lors de la mise à jour.';
                updateMessage.style.color = 'red';
                console.error('Erreur:', error);
            });
        });
    });
    