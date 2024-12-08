odoo.define('synda_webrtc_sip_client.webrtc_actions', function (require) {
    "use strict";

    // Charger les modules nécessaires
    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');

    // Vérifier que les modules requis sont disponibles
    if (!AbstractAction || !core) {
        console.error("Les modules requis ('web.AbstractAction' ou 'web.core') sont introuvables.");
        return;
    }

    const qweb = core.qweb;

    // --- Action principale : WebRTC SIP Client ---
    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client', // Modèle défini dans webrtc_sip_template.xml

        /**
         * Démarre l'action principale.
         * @returns {Promise} Promise de l'initialisation.
         */
        start: function () {
            console.log("[WebRTCSIPClient] Chargement de l'action principale WebRTC SIP Client.");
            // Logique supplémentaire si nécessaire
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrer l'action principale
    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    // --- Action : Enregistrer SIP ---
    const RegisterSIPAction = AbstractAction.extend({
        /**
         * Démarre l'action d'enregistrement SIP.
         * @returns {Promise} Promise de l'initialisation.
         */
        start: function () {
            console.log("[RegisterSIPAction] Exécution de l'action d'enregistrement SIP.");
            // Implémenter ici la logique pour enregistrer un utilisateur SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrer l'action d'enregistrement SIP
    core.action_registry.add('webrtc.sip.register', RegisterSIPAction);

    // --- Action : Passer un appel SIP ---
    const MakeCallAction = AbstractAction.extend({
        /**
         * Démarre l'action pour passer un appel SIP.
         * @returns {Promise} Promise de l'initialisation.
         */
        start: function () {
            console.log("[MakeCallAction] Exécution de l'action pour passer un appel SIP.");
            // Implémenter ici la logique pour passer un appel SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrer l'action pour passer un appel SIP
    core.action_registry.add('webrtc.sip.call', MakeCallAction);

    // --- Action : Terminer un appel SIP ---
    const EndCallAction = AbstractAction.extend({
        /**
         * Démarre l'action pour terminer un appel SIP.
         * @returns {Promise} Promise de l'initialisation.
         */
        start: function () {
            console.log("[EndCallAction] Exécution de l'action pour terminer un appel SIP.");
            // Implémenter ici la logique pour terminer un appel SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrer l'action pour terminer un appel SIP
    core.action_registry.add('webrtc.sip.end_call', EndCallAction);

    // Retourner les actions pour usage éventuel ailleurs
    return {
        WebRTCSIPClient: WebRTCSIPClient,
        RegisterSIPAction: RegisterSIPAction,
        MakeCallAction: MakeCallAction,
        EndCallAction: EndCallAction,
    };
});
