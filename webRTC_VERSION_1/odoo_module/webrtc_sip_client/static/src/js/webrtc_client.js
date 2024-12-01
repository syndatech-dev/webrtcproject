// frontend/static/js/webrtc_client.js
class WebRTCClient {
    constructor() {
        this.localStream = null;
        this.remoteStream = null;
        this.peerConnection = null;
    }

    async initializeMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            return true;
        } catch (error) {
            console.error('Media initialization failed:', error);
            return false;
        }
    }

    createPeerConnection() {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };

        this.peerConnection = new RTCPeerConnection(configuration);
        
        this.peerConnection.onicecandidate = event => {
            if (event.candidate) {
                // Send candidate to signaling server
            }
        };

        this.peerConnection.ontrack = event => {
            this.remoteStream = event.streams[0];
            // Update UI with remote stream
        };

        this.localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, this.localStream);
        });
    }

    async createOffer() {
        try {
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            return offer;
        } catch (error) {
            console.error('Create offer failed:', error);
            return null;
        }
    }

    async handleAnswer(answer) {
        try {
            await this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(answer)
            );
        } catch (error) {
            console.error('Handle answer failed:', error);
        }
    }

    async handleCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(
                new RTCIceCandidate(candidate)
            );
        } catch (error) {
            console.error('Handle candidate failed:', error);
        }
    }

    cleanup() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
        }
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }
}