odoo.define('webrtc_odoo_client.WebRTCClient', function (require) {
    "use strict";

    const JsSIP = require('webrtc_odoo_client/static/src/js/JsSIP');

    const WebRTCClient = {
        ua: null,
        
        init: function(config) {
            const socket = new JsSIP.WebSocketInterface(config.ws_url);
            const configuration = {
                uri: `sip:${config.extension}@${config.domain}`,
                password: config.password,
                sockets: [socket],
                register: true
            };
            this.ua = new JsSIP.UA(configuration);

            this.ua.on('connected', function() {
                console.log('WebSocket connected');
            });

            this.ua.on('disconnected', function() {
                console.log('WebSocket disconnected');
            });

            this.ua.on('registered', function() {
                console.log('SIP registered');
            });

            this.ua.on('registrationFailed', function(e) {
                console.error('SIP registration failed:', e.cause);
            });

            this.ua.on('newRTCSession', function(data) {
                const session = data.session;

                if (session.direction === 'incoming') {
                    console.log('Incoming call from:', session.remote_identity.uri.toString());
                    session.on('accepted', function() {
                        console.log('Call accepted');
                    });

                    session.on('confirmed', function() {
                        console.log('Call confirmed');
                    });

                    session.on('ended', function() {
                        console.log('Call ended');
                    });

                    session.on('failed', function(e) {
                        console.error('Call failed:', e.cause);
                    });
                }
            });

            this.ua.start();
        },

        makeCall: function(target) {
            const eventHandlers = {
                'progress': function(e) {
                    console.log('Call is in progress');
                },
                'failed': function(e) {
                    console.error('Call failed with cause:', e.cause);
                },
                'ended': function(e) {
                    console.log('Call ended with cause:', e.cause);
                },
                'confirmed': function(e) {
                    console.log('Call confirmed');
                }
            };

            const options = {
                eventHandlers: eventHandlers,
                mediaConstraints: { 'audio': true, 'video': false }
            };

            this.ua.call(target, options);
        },

        answerCall: function(session) {
            session.answer({
                mediaConstraints: { 'audio': true, 'video': false }
            });
        },

        endCall: function(session) {
            session.terminate();
        }
    };

    return WebRTCClient;
});
