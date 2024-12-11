odoo.define('synda_webrtc_sip_client.webrtc_client', function(require) {
    "use strict";

    class WebRTCClient {
        constructor() {
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

        registerSIP() {
            const server = document.getElementById('sip-server').value;
            const username = document.getElementById('sip-user').value;
            const password = document.getElementById('sip-password').value;

            if (!server || !username || !password) {
                alert('Please fill all fields!');
                return;
            }

            const socket = new JsSIP.WebSocketInterface(server);
            this.sipUA = new JsSIP.UA({
                uri: `sip:${username}@${server.split('/')[2]}`,
                ws_servers: [socket],
                authorization_user: username,
                password: password,
                trace_sip: true,
            });

            this.sipUA.on('registered', () => {
                this.registered = true;
                document.getElementById('sip-status').innerText = 'Status: Registered';
            });

            this.sipUA.on('registrationFailed', (error) => {
                console.error('Registration failed:', error);
                document.getElementById('sip-status').innerText = 'Registration Failed';
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

            const target = prompt('Enter the SIP address of the callee (e.g., sip:callee@example.com)');
            if (!target) return;

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
