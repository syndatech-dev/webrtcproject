const socket = io('http://localhost:3000');
const userList = document.getElementById('userList');
const startCallBtn = document.getElementById('startCall');
const endCallBtn = document.getElementById('endCall');
const statusDiv = document.getElementById('status');

let localStream;
let peerConnection;
let selectedUser;

const config = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

fetch('/api/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des utilisateurs');
        }
        return response.json();
    })
    .then(users => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '<option selected disabled>Select a user</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.username;
            userList.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
        const userList = document.getElementById('userList');
        userList.innerHTML = '<option selected disabled>Erreur de chargement</option>';
    });
// Socket events
socket.on('connect', () => {
    statusDiv.textContent = 'Connected to the server. Ready to start an audio call.';
});

socket.on('offer', async (offer) => {
    createPeerConnection();
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', { answer, targetUser: selectedUser });
});

socket.on('answer', (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('ice-candidate', (candidate) => {
    if (peerConnection) peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// User selection
userList.addEventListener('change', () => {
    selectedUser = userList.value;
    startCallBtn.disabled = !selectedUser;
});

// Start call
startCallBtn.addEventListener('click', async () => {
    if (!selectedUser) return alert('Please select a user to call.');

    createPeerConnection();
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, targetUser: selectedUser });

    startCallBtn.disabled = true;
    endCallBtn.disabled = false;
});

// End call
endCallBtn.addEventListener('click', () => {
    if (peerConnection) peerConnection.close();
    if (localStream) localStream.getTracks().forEach(track => track.stop());
    startCallBtn.disabled = false;
    endCallBtn.disabled = true;
    statusDiv.textContent = 'Call ended.';
});

// Create peer connection
function createPeerConnection() {
    peerConnection = new RTCPeerConnection(config);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice-candidate', { candidate: event.candidate, targetUser: selectedUser });
        }
    };

    peerConnection.ontrack = (event) => {
        const audioElement = new Audio();
        audioElement.srcObject = event.streams[0];
        audioElement.play();
    };
}
// Envoyer la notification
startCallBtn.addEventListener('click', async () => {
    if (!selectedUser) return alert('Please select a user to call.');

    const callerName = "Nom de l'appelant"; // Remplace par le nom de l'utilisateur actuel
    socket.emit('notify-call', { callerName, targetUser: selectedUser });

    // Démarrer l'appel WebRTC
    createPeerConnection();
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { offer, targetUser: selectedUser });

    startCallBtn.disabled = true;
    endCallBtn.disabled = false;
});

// Recevoir la notification
socket.on('incoming-call', ({ callerName }) => {
    Swal.fire({
        title: 'Appel entrant',
        text: `${callerName} vous appelle !`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Répondre',
        cancelButtonText: 'Refuser'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Répondre à l\'appel');
        } else {
            console.log('Appel refusé');
        }
    });
});
// Register user
socket.emit('register', CURRENT_USER_ID);