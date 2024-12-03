odoo.define('synda_webrtc_sip_client.webrtc_client', function(require) {
    "use strict";

    const JsSIP = require('web.assets_frontend').JsSIP;

    class WebRTCClient {
        constructor() {
            this.sipServer = 'wss://your-asterisk-server.com:5061/ws'; // WebSocket URL
            this.sipUser = 'user';        // Utilisateur SIP
            this.sipPassword = 'password'; // Mot de passe SIP
            this.sipUA = null;
            this.registered = false;
            this.currentSession = null;

            this.init();
        }

        init() {
            document.getElementById('register-sip').addEventListener('click', () => this.registerSIP());
            document.getElementById('make-call').addEventListener('click', () => this.makeCall());
            document.getElementById('end-call').addEventListener('click', () => this.endCall());
        }

        // Enregistrer le client SIP avec le serveur
        registerSIP() {
            const socket = new JsSIP.WebSocketInterface(this.sipServer);
            this.sipUA = new JsSIP.UA({
                uri: `sip:${this.sipUser}@yourdomain.com`,
                ws_servers: [socket],
                authorization_user: this.sipUser,
                password: this.sipPassword,
                trace_sip: true,
            });

            this.sipUA.on('registered', () => {
                this.registered = true;
                document.getElementById('sip-status').innerText = 'Status: Registered';
            });

            this.sipUA.on('unregistered', () => {
                this.registered = false;
                document.getElementById('sip-status').innerText = 'Status: Not Registered';
            });

            this.sipUA.on('registrationFailed', (error) => {
                console.error('Registration failed:', error);
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('error-message').innerText = `Error: ${error.cause}`;
            });

            this.sipUA.start();
        }

        // Passer un appel SIP
        makeCall() {
            if (!this.registered) {
                alert('You must register first!');
                return;
            }

            const target = 'sip:destination@yourdomain.com'; // Remplacez par votre destinataire
            this.currentSession = this.sipUA.call(target, {
                mediaConstraints: { audio: true, video: false },
            });

            this.currentSession.on('accepted', () => {
                document.getElementById('call-status').innerText = 'Call Status: Active';
            });

            this.currentSession.on('ended', () => {
                document.getElementById('call-status').innerText = 'Call Status: Ended';
            });

            this.currentSession.on('failed', (error) => {
                console.error('Call failed:', error);
                document.getElementById('call-status').innerText = 'Call Status: Failed';
            });
        }

        // Terminer l'appel
        endCall() {
            if (this.currentSession) {
                this.currentSession.terminate();
                document.getElementById('call-status').innerText = 'Call Status: Ended';
            } else {
                alert('No active call to end.');
            }
        }
    }

    new WebRTCClient();
});
