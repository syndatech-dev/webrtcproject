odoo.define('synda_webrtc_sip_client.webrtc_sip_action', function (require) {
    "use strict";

    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');

    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client',

        start: function () {
            console.log("WebRTC SIP Client action loaded.");
            return this._super.apply(this, arguments);
        },
    });

    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    return WebRTCSIPClient;
});
