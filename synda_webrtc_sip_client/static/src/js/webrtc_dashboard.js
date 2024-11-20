document.addEventListener('DOMContentLoaded', function () {
    const ctxCall = document.getElementById('callChart').getContext('2d');
    new Chart(ctxCall, {
        type: 'bar',
        data: {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            datasets: [{
                label: 'Appels par jour',
                data: [12, 15, 8, 10, 20],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }]
        }
    });

    const ctxUser = document.getElementById('userChart').getContext('2d');
    new Chart(ctxUser, {
        type: 'pie',
        data: {
            labels: ['Actifs', 'Inactifs'],
            datasets: [{
                data: [18, 7],
                backgroundColor: ['#28a745', '#dc3545'],
            }]
        }
    });
});
