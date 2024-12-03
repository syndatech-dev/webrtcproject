odoo.define('synda_webrtc_sip_client.webrtc_client', function(require) {
    "use strict";

    const JsSIP = require('synda_webrtc_sip_client/static/src/js/JsSIP');

    class WebRTCClient {
        constructor() {
            this.sipServer = 'wss://your-asterisk-server.com:5061/ws';
            this.sipUser = 'user';
            this.sipPassword = 'password';
            this.sipUA = null;
            this.registered = false;

            this.init();
        }

        init() {
            document.getElementById('register-sip').addEventListener('click', () => this.registerSIP());
            document.getElementById('make-call').addEventListener('click', () => this.makeCall());
        }

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

            this.sipUA.start();
        }

        makeCall() {
            if (!this.registered) {
                alert('You must register first!');
                return;
            }

            const target = 'sip:destination@yourdomain.com';
            const session = this.sipUA.call(target, {
                mediaConstraints: { audio: true, video: false },
            });

            session.on('accepted', () => {
                document.getElementById('call-status').innerText = 'Call Status: Active';
            });

            session.on('ended', () => {
                document.getElementById('call-status').innerText = 'Call Status: Ended';
            });
        }
    }

    new WebRTCClient();
});