odoo.define('synda_webrtc_sip_client.webrtc_client', function (require) {
    "use strict";

    const { Component } = require('web.Component');
    const core = require('web.core');
    const _t = core._t;

    class WebRTCClient extends Component {
        constructor() {
            super(...arguments);

            // Configuration de base
            this.sipServer = 'wss://your-sip-server:5061'; // Remplacez par l'adresse de votre serveur FreePBX
            this.sipURI = 'sip:webrtc_user@yourdomain.com'; // Identifiant SIP
            this.sipPassword = 'your_password'; // Mot de passe SIP
            this.sipUA = null; // Instance de l'User Agent (UA)
        }

        start() {
            this.registerSIP();
        }

        registerSIP() {
            const socket = new JsSIP.WebSocketInterface(this.sipServer);
            const configuration = {
                sockets: [socket],
                uri: this.sipURI,
                password: this.sipPassword,
                trace_sip: true, // Activez pour déboguer les messages SIP
            };

            // Initialiser l'agent utilisateur SIP
            this.sipUA = new JsSIP.UA(configuration);

            // Gestion des événements
            this.sipUA.on('registered', () => {
                console.log('Registered successfully');
                document.getElementById("sip-status").textContent = "Status: Registered";
            });

            this.sipUA.on('registrationFailed', (e) => {
                console.error('Registration failed', e);
                document.getElementById("sip-status").textContent = "Status: Registration Failed";
            });

            this.sipUA.start();
        }

        makeCall(target) {
            if (!this.sipUA || !this.sipUA.isRegistered()) {
                alert("Vous devez d'abord vous enregistrer !");
                return;
            }

            const eventHandlers = {
                progress: () => console.log('Call in progress'),
                failed: (e) => console.log(`Call failed: ${e.data.cause}`),
                ended: (e) => console.log('Call ended'),
                confirmed: () => console.log('Call confirmed'),
            };

            const options = {
                eventHandlers,
                mediaConstraints: { audio: true, video: false },
            };

            this.sipUA.call(`sip:${target}@yourdomain.com`, options);
        }
    }

    // Initialisation après chargement de la page
    document.addEventListener("DOMContentLoaded", function () {
        const client = new WebRTCClient();
        client.start();

        document.getElementById("make-call").onclick = function () {
            const target = document.getElementById("call-target").value;
            client.makeCall(target);
        };
    });
});