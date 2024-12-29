// fonction qui permet de charger la liste des utilisateurs   
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
                                <button onclick="deleteUser('${user.id}')" class="btn">Supprimer</button>
                            </td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            });
    });

    // fonction qui permet de supprimer un utilisateur
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

// fonction qui compte le nombre d'utilisateur
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
                userCountElement.textContent = `Total number of users \n\n ${data.count}`;
                userCountElement.style.whiteSpace = "pre-wrap";
                // userCountElement.style.fontWeight = "bold";  
                userCountElement.style.fontSize = "20px";
            })
            .catch(error => {
                console.error('Erreur lors du chargement du nombre d\'utilisateurs:', error);
                document.getElementById('userCount').textContent = 'Erreur de chargement.';
            });
    }
    
// mise ajourt des information de l'administrateur
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
                updateMessage.textContent = 'Error while updating.';
                updateMessage.style.color = 'red';
                console.error('Erreur:', error);
            });
        });
    });
    

// un appel pour récupérer et afficher les informations de l'administrateur.
    document.addEventListener("DOMContentLoaded", () => {
        loadAdminInfo();
    });
    
    function loadAdminInfo() {
        fetch('/api/admin/info')
            .then(response => {
                if (!response.ok) throw new Error('Erreur API');
                return response.json();
            })
            .then(data => {
                const usernameElement = document.getElementById('adminUsername');
                const roleElement = document.getElementById('adminRole');
                const createdAtElement = document.getElementById('adminCreatedAt');
    
                usernameElement.textContent = data.username;
                roleElement.textContent = data.role;
                createdAtElement.textContent = new Date(data.createdAt).toLocaleDateString();
            })
            .catch(error => {
                console.error('Erreur lors du chargement des informations de l\'administrateur :', error);
            });
    }
    