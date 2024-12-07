odoo.define('synda_webrtc_sip_client.action', function (require) {
    "use strict";

    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');
    const qweb = core.qweb;

    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client',

        start: function () {
            this._super.apply(this, arguments);
            console.log("WebRTC SIP Client action loaded.");
        },
    });

    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    return WebRTCSIPClient;
});
