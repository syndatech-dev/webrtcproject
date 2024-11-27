odoo.define('synda_webrtc_sip_client.webrtc_client', function(require) {
    "use strict";

    const JsSIP = require('web.assets_frontend').JsSIP;

    class WebRTCClient {
        constructor() {
            this.sipServer = 'wss://your-server:5061/ws';
            this.sipUser = 'webrtc_user';
            this.sipPassword = 'webrtc_password';
            this.sipUA = null;
            this.currentCall = null; // Stocke l'appel en cours
        }

        registerSIP() {
            const socket = new JsSIP.WebSocketInterface(this.sipServer);
            this.sipUA = new JsSIP.UA({
                uri: `sip:${this.sipUser}@yourdomain.com`,
                ws_servers: [socket],
                authorization_user: this.sipUser,
                password: this.sipPassword,
                trace_sip: true
            });

            this.sipUA.on('registered', () => console.log('Registered!'));
            this.sipUA.start();
        }

        makeCall(target) {
            if (!this.sipUA || !this.sipUA.isRegistered()) {
                alert('You must register first!');
                return;
            }

            this.currentCall = this.sipUA.call(`sip:${target}@yourdomain.com`, {
                mediaConstraints: { audio: true, video: false }
            });

            this.currentCall.on('accepted', () => console.log('Call accepted'));
            this.currentCall.on('ended', () => console.log('Call ended'));
        }

        transferCall(newTarget) {
            if (!this.currentCall || this.currentCall.isEnded()) {
                alert('No active call to transfer!');
                return;
            }

            this.currentCall.refer(`sip:${newTarget}@yourdomain.com`);
            console.log(`Call transferred to ${newTarget}`);
        }
    }

    return WebRTCClient;
});

document.getElementById("register-sip").onclick = () => client.registerSIP();
document.getElementById("make-call").onclick = () => {
    const target = document.getElementById("call-target").value;
    client.makeCall(target);
};
document.getElementById("transfer-call").onclick = () => {
    const newTarget = document.getElementById("transfer-target").value;
    client.transferCall(newTarget);
};
