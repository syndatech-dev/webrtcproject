// Inclusion de la bibliothèque JsSIP
import * as JsSIP from 'jssip';

// Configuration de JsSIP
const socket = new JsSIP.WebSocketInterface('wss://your.websocket.server');
const configuration = {
    sockets: [socket],
    uri: 'sip:your_sip_username@your_domain',
    password: 'your_sip_password',
    realm: 'your_domain',
    registrar_server: 'sip:your_domain',
    display_name: 'Your Display Name',
    register: true,
    session_timers: false,
};

// Création de l'UA (User Agent) JsSIP
const ua = new JsSIP.UA(configuration);

// Gestion des événements de l'UA
ua.on('registered', () => {
    console.log('SIP Registered');
});

ua.on('unregistered', () => {
    console.log('SIP Unregistered');
});

ua.on('registrationFailed', (e) => {
    console.error('SIP Registration Failed: ', e.cause);
});

ua.on('newRTCSession', (e) => {
    const session = e.session;

    session.on('progress', () => {
        console.log('Call in progress');
    });

    session.on('confirmed', () => {
        console.log('Call confirmed');
    });

    session.on('ended', () => {
        console.log('Call ended');
    });

    session.on('failed', (e) => {
        console.error('Call failed: ', e.cause);
    });
});

// Fonction pour initier un appel
function makeCall(target) {
    const eventHandlers = {
        'progress': function(e) {
            console.log('Call is in progress');
        },
        'failed': function(e) {
            console.log('Call failed with cause: ' + e.cause);
        },
        'ended': function(e) {
            console.log('Call ended with cause: ' + e.cause);
        },
        'confirmed': function(e) {
            console.log('Call confirmed');
        }
    };

    const options = {
        'eventHandlers': eventHandlers,
        'mediaConstraints': {'audio': true, 'video': false}
    };

    ua.call(target, options);
}

// Fonction pour répondre à un appel
function answerCall(session) {
    session.answer({
        'mediaConstraints': {'audio': true, 'video': false}
    });
}

// Fonction pour terminer un appel
function endCall(session) {
    session.terminate();
}

// Initialisation de l'UA
ua.start();

// Exposition des fonctions dans l'espace global
window.makeCall = makeCall;
window.answerCall = answerCall;
window.endCall = endCall;
