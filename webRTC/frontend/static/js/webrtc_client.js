// frontend/static/js/webrtc_client.js
class WebRTCClient {
    constructor(config = {}) {
        this.config = {
            iceServers: config.iceServers || [
                { urls: 'stun:stun.l.google.com:19302' }
            ],
            audioConstraints: config.audioConstraints || { 
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            },
            ...config
        };
        
        this.localStream = null;
        this.peerConnection = null;
        this.remoteStream = null;
        this.callbacks = {};
    }

    async initializeMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                audio: this.config.audioConstraints,
                video: false
            });
            
            this._triggerCallback('localStreamInitialized', this.localStream);
            return this.localStream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            this._triggerCallback('error', {
                type: 'mediaAccess',
                error: error
            });
            throw error;
        }
    }

    async createPeerConnection() {
        try {
            this.peerConnection = new RTCPeerConnection({
                iceServers: this.config.iceServers
            });

            this._setupPeerConnectionListeners();

            if (this.localStream) {
                this.localStream.getTracks().forEach(track => {
                    this.peerConnection.addTrack(track, this.localStream);
                });
            }

            return this.peerConnection;
        } catch (error) {
            console.error('Error creating peer connection:', error);
            this._triggerCallback('error', {
                type: 'peerConnection',
                error: error
            });
            throw error;
        }
    }

    _setupPeerConnectionListeners() {
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this._triggerCallback('iceCandidate', event.candidate);
            }
        };

        this.peerConnection.oniceconnectionstatechange = () => {
            this._triggerCallback('iceConnectionStateChange', 
                this.peerConnection.iceConnectionState);
        };

        this.peerConnection.ontrack = (event) => {
            this.remoteStream = event.streams[0];
            this._triggerCallback('remoteStream', this.remoteStream);
        };

        this.peerConnection.onnegotiationneeded = async () => {
            try {
                await this.createOffer();
            } catch (error) {
                console.error('Error during negotiation:', error);
            }
        };
    }

    async createOffer() {
        if (!this.peerConnection) {
            throw new Error('PeerConnection not initialized');
        }

        try {
            const offer = await this.peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: false
            });

            await this.peerConnection.setLocalDescription(offer);
            this._triggerCallback('offer', offer);
            return offer;
        } catch (error) {
            console.error('Error creating offer:', error);
            this._triggerCallback('error', {
                type: 'createOffer',
                error: error
            });
            throw error;
        }
    }

    async handleAnswer(answer) {
        if (!this.peerConnection) {
            throw new Error('PeerConnection not initialized');
        }

        try {
            await this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
            );
        } catch (error) {
            console.error('Error handling answer:', error);
            this._triggerCallback('error', {
                type: 'handleAnswer',
                error: error
            });
            throw error;
        }
    }

    async addIceCandidate(candidate) {
        if (!this.peerConnection) {
            throw new Error('PeerConnection not initialized');
        }

        try {
            await this.peerConnection.addIceCandidate(
                new RTCIceCandidate(candidate)
            );
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
            this._triggerCallback('error', {
                type: 'addIceCandidate',
                error: error
            });
            throw error;
        }
    }

    onEvent(event, callback) {
        this.callbacks[event] = callback;
    }

    _triggerCallback(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event](data);
        }
    }

    getStats() {
        if (!this.peerConnection) return Promise.resolve(null);
        return this.peerConnection.getStats();
    }

    cleanup() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }

        this.remoteStream = null;
    }

    muteAudio() {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = false;
            });
        }
    }

    unmuteAudio() {
        if (this.localStream) {
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = true;
            });
        }
    }

    isAudioMuted() {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            return audioTrack ? !audioTrack.enabled : true;
        }
        return true;
    }
}