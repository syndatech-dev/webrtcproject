odoo.define('synda_webrtc_sip_client.webrtc_sip_action', function (require) {
    "use strict";

    const AbstractAction = require('web.AbstractAction'); // Module requis pour les actions
    const core = require('web.core'); // Module pour les fonctionnalités centrales
    const qweb = core.qweb; // QWeb pour gérer les templates si nécessaire

    // Définir l'action principale
    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client', 

        start: function () {
            console.log("WebRTC SIP Client action loaded.");
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrement de l'action
    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    return WebRTCSIPClient;
});
