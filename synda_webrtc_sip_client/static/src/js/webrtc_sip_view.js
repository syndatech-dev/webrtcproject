odoo.define('synda_webrtc_sip_client.webrtc_sip_view', function (require) {
    "use strict";

    const { Component } = owl;
    const { onMounted } = owl.hooks;

    class WebRTCSIPClient extends Component {
        setup() {
            this.status = "Not Registered";
            this.callStatus = "Idle";

            onMounted(() => {
                console.log("WebRTC SIP Client mounted.");
                this._bindEvents();
            });
        }

        _bindEvents() {
            document.getElementById('register-sip').addEventListener('click', () => this._registerSIP());
            document.getElementById('make-call').addEventListener('click', () => this._makeCall());
            document.getElementById('end-call').addEventListener('click', () => this._endCall());
        }

        _registerSIP() {
            console.log("Register SIP clicked.");
            //  logique pour l'enregistrement SIP via JsSIP.
            this.status = "Registered";
        }

        _makeCall() {
            console.log("Make Call clicked.");
            //  logique pour initier un appel via JsSIP.
            this.callStatus = "Active";
        }

        _endCall() {
            console.log("End Call clicked.");
            //  logique pour terminer un appel via JsSIP.
            this.callStatus = "Ended";
        }
    }

    // Initialisation de l'application
    const app = new owl.App({
        Component: WebRTCSIPClient,
        template: owl.templates.webrtc_sip_view,
    });

    app.mount(document.body);
});
