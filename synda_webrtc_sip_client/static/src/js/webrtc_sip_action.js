odoo.define('synda_webrtc_sip_client.webrtc_actions', function (require) {
    "use strict";

    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');
    const qweb = core.qweb;

    // Action principale pour afficher l'interface WebRTC SIP
    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client', // Modèle défini dans webrtc_sip_template.xml

        // Méthode appelée lors du chargement de l'action
        start: function () {
            console.log("WebRTC SIP Client action loaded");
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrer l'action principale dans le registre
    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    // Autres actions à ajouter si nécessaire
    const RegisterSIPAction = AbstractAction.extend({
        start: function () {
            console.log("Register SIP action executed");
            // Ajoutez ici votre logique d'enregistrement SIP
            return this._super.apply(this, arguments);
        },
    });

    core.action_registry.add('webrtc.sip.register', RegisterSIPAction);

    const MakeCallAction = AbstractAction.extend({
        start: function () {
            console.log("Make Call action executed");
            // Ajoutez ici votre logique pour initier un appel SIP
            return this._super.apply(this, arguments);
        },
    });

    core.action_registry.add('webrtc.sip.call', MakeCallAction);

    const EndCallAction = AbstractAction.extend({
        start: function () {
            console.log("End Call action executed");
            // Ajoutez ici votre logique pour terminer un appel
            return this._super.apply(this, arguments);
        },
    });

    core.action_registry.add('webrtc.sip.end_call', EndCallAction);

    return {
        WebRTCSIPClient: WebRTCSIPClient,
        RegisterSIPAction: RegisterSIPAction,
        MakeCallAction: MakeCallAction,
        EndCallAction: EndCallAction,
    };
});
