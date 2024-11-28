// frontend/static/js/sip_client.js
class SIPClient {
    constructor(config) {
        this.config = config;
        this.ua = null;
        this.currentSession = null;
        this.callbacks = {};
    }

    async init() {
        try {
            this.ua = new JsSIP.UA({
                uri: `sip:${this.config.extension}@${this.config.domain}`,
                password: this.config.password,
                ws_servers: this.config.ws_servers,
                display_name: this.config.display_name
            });

            this.ua.on('connected', () => this.triggerCallback('connected'));
            this.ua.on('disconnected', () => this.triggerCallback('disconnected'));
            this.ua.on('registered', () => this.triggerCallback('registered'));
            this.ua.on('unregistered', () => this.triggerCallback('unregistered'));
            this.ua.on('registrationFailed', () => this.triggerCallback('registrationFailed'));
            
            this.ua.on('newRTCSession', (data) => {
                const session = data.session;
                this.handleNewSession(session);
            });

            this.ua.start();
            return true;
        } catch (error) {
            console.error('SIP initialization failed:', error);
            return false;
        }
    }

    handleNewSession(session) {
        this.currentSession = session;

        session.on('accepted', () => this.triggerCallback('callAccepted'));
        session.on('ended', () => this.triggerCallback('callEnded'));
        session.on('failed', () => this.triggerCallback('callFailed'));
        session.on('confirmed', () => this.triggerCallback('callConfirmed'));

        if (session.direction === 'incoming') {
            this.triggerCallback('incomingCall', session);
        }
    }

    makeCall(number) {
        if (!this.ua) {
            throw new Error('SIP client not initialized');
        }

        const options = {
            mediaConstraints: { audio: true, video: false },
            pcConfig: {
                iceServers: [
                    { urls: ['stun:stun.l.google.com:19302'] }
                ]
            }
        };

        try {
            this.ua.call(number, options);
            return true;
        } catch (error) {
            console.error('Call failed:', error);
            return false;
        }
    }

    endCall() {
        if (this.currentSession) {
            this.currentSession.terminate();
        }
    }

    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }

    triggerCallback(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => callback(data));
        }
    }
}