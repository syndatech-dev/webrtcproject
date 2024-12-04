
class SIPClient {
    constructor(config) {
        this.ua = null;
        this.config = config;
        this.currentSession = null;
        this.callbacks = {};
        this.registrationStatus = 'disconnected';
    }

    async init() {
        try {
            const JsSIP = window.JsSIP;
            const socket = new JsSIP.WebSocketInterface(this.config.ws_uri);
            
            const configuration = {
                sockets: [socket],
                uri: this.config.sip_uri,
                password: this.config.password,
                register: true,
                register_expires: 300,
                session_timers: false,
                use_preloaded_route: false
            };

            this.ua = new JsSIP.UA(configuration);
            this._setupListeners();
            this.ua.start();
            return true;
        } catch (error) {
            console.error('SIP initialization failed:', error);
            return false;
        }
    }

    _setupListeners() {
        // Connection events
        this.ua.on('connected', () => {
            this.registrationStatus = 'connected';
            this._triggerCallback('connected');
        });

        this.ua.on('disconnected', () => {
            this.registrationStatus = 'disconnected';
            this._triggerCallback('disconnected');
        });

        // Registration events
        this.ua.on('registered', () => {
            this.registrationStatus = 'registered';
            this._triggerCallback('registered');
        });

        this.ua.on('unregistered', () => {
            this.registrationStatus = 'unregistered';
            this._triggerCallback('unregistered');
        });

        this.ua.on('registrationFailed', (data) => {
            this.registrationStatus = 'registration_failed';
            this._triggerCallback('registrationFailed', data);
        });

        // Call events
        this.ua.on('newRTCSession', (data) => {
            const session = data.session;
            if (this.currentSession) {
                this.currentSession.terminate();
            }
            this._handleSession(session);
        });
    }

    _handleSession(session) {
        this.currentSession = session;

        // Session events
        session.on('connecting', () => this._triggerCallback('callConnecting'));
        session.on('peerconnection', (data) => this._handlePeerConnection(data));
        session.on('sending', () => this._triggerCallback('callSending'));
        session.on('progress', () => this._triggerCallback('callProgress'));
        session.on('accepted', () => this._triggerCallback('callAccepted'));
        session.on('confirmed', () => this._triggerCallback('callConfirmed'));
        session.on('ended', () => {
            this._triggerCallback('callEnded');
            this.currentSession = null;
        });
        session.on('failed', (data) => {
            this._triggerCallback('callFailed', data);
            this.currentSession = null;
        });
        session.on('addstream', (e) => this._handleStream(e.stream));
    }

    _handlePeerConnection(data) {
        const peerconnection = data.peerconnection;
        
        peerconnection.onaddstream = (e) => {
            this._handleStream(e.stream);
        };

        // ICE connection monitoring
        peerconnection.oniceconnectionstatechange = () => {
            this._triggerCallback('iceConnectionStateChange', peerconnection.iceConnectionState);
        };
    }

    async call(number) {
        if (!this.ua) throw new Error('SIP client not initialized');
        
        const options = {
            mediaConstraints: { 
                audio: true, 
                video: false 
            },
            rtcOfferConstraints: {
                offerToReceiveAudio: true,
                offerToReceiveVideo: false
            },
            sessionTimersExpires: 120
        };
        
        try {
            this.ua.call(number, options);
            return true;
        } catch (error) {
            console.error('Error making call:', error);
            return false;
        }
    }

    async answer(options = {}) {
        if (!this.currentSession) throw new Error('No incoming call to answer');

        const defaultOptions = {
            mediaConstraints: { 
                audio: true, 
                video: false 
            }
        };

        try {
            await this.currentSession.answer({ ...defaultOptions, ...options });
            return true;
        } catch (error) {
            console.error('Error answering call:', error);
            return false;
        }
    }

    endCall() {
        if (this.currentSession) {
            this.currentSession.terminate();
            this.currentSession = null;
            return true;
        }
        return false;
    }

    mute() {
        if (this.currentSession) {
            this.currentSession.mute();
            return true;
        }
        return false;
    }

    unmute() {
        if (this.currentSession) {
            this.currentSession.unmute();
            return true;
        }
        return false;
    }

    hold() {
        if (this.currentSession) {
            this.currentSession.hold();
            return true;
        }
        return false;
    }

    unhold() {
        if (this.currentSession) {
            this.currentSession.unhold();
            return true;
        }
        return false;
    }

    sendDTMF(tone) {
        if (this.currentSession) {
            this.currentSession.sendDTMF(tone);
            return true;
        }
        return false;
    }

    getCallStats() {
        if (!this.currentSession) return null;
        
        return {
            startTime: this.currentSession.start_time,
            endTime: this.currentSession.end_time,
            duration: this.currentSession.start_time ? 
                     (Date.now() - this.currentSession.start_time) / 1000 : 0,
            status: this.currentSession.status
        };
    }

    onEvent(event, callback) {
        this.callbacks[event] = callback;
    }

    _triggerCallback(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event](data);
        }
    }

    async _handleStream(stream) {
        try {
            const audio = new Audio();
            audio.srcObject = stream;
            audio.id = 'remoteAudio';
            await audio.play();
        } catch (error) {
            console.error('Error handling audio stream:', error);
        }
    }

    getStatus() {
        return {
            registration: this.registrationStatus,
            session: this.currentSession ? this.currentSession.status : null
        };
    }

    isRegistered() {
        return this.registrationStatus === 'registered';
    }

    hasActiveCall() {
        return this.currentSession !== null;
    }
}