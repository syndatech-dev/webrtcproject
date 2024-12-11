odoo.define('webrtc_sip_action', function (require) {
    "use strict";

    // Charger les modules nécessaires
    const AbstractAction = require('web.AbstractAction');
    const core = require('web.core');
    const qweb = core.qweb;

    // Vérification des modules
    if (!AbstractAction || !core) {
        console.error("Les modules requis ('web.AbstractAction' ou 'web.core') sont introuvables.");
        return;
    }

    /**
     * Action principale : WebRTC SIP Client
     */
    const WebRTCSIPClient = AbstractAction.extend({
        template: 'webrtc_sip_client', // Correspond à l'ID défini dans webrtc_sip_template.xml

        /**
         * Démarre l'action principale.
         * @returns {Promise} Une promesse qui se résout après le chargement.
         */
        start: function () {
            console.log("[WebRTCSIPClient] Lancement de l'interface principale du WebRTC SIP Client.");
            // Ajoutez ici toute logique nécessaire au démarrage de l'interface
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrement de l'action principale
    core.action_registry.add('webrtc.sip.client', WebRTCSIPClient);

    /**
     * Action : Enregistrer un compte SIP
     */
    const RegisterSIPAction = AbstractAction.extend({
        template: false, // Pas de template spécifique pour cette action

        /**
         * Exécute l'enregistrement SIP.
         * @returns {Promise} Une promesse qui se résout après l'exécution.
         */
        start: function () {
            console.log("[RegisterSIPAction] Début de l'enregistrement SIP.");
            // Ajoutez ici votre logique d'enregistrement SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrement de l'action d'enregistrement SIP
    core.action_registry.add('webrtc.sip.register', RegisterSIPAction);

    /**
     * Action : Passer un appel SIP
     */
    const MakeCallAction = AbstractAction.extend({
        template: false, // Pas de template spécifique pour cette action

        /**
         * Exécute un appel SIP.
         * @returns {Promise} Une promesse qui se résout après l'exécution.
         */
        start: function () {
            console.log("[MakeCallAction] Début d'un appel SIP.");
            // Ajoutez ici votre logique pour initier un appel SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrement de l'action pour passer un appel SIP
    core.action_registry.add('webrtc.sip.call', MakeCallAction);

    /**
     * Action : Terminer un appel SIP
     */
    const EndCallAction = AbstractAction.extend({
        template: false, // Pas de template spécifique pour cette action

        /**
         * Termine un appel SIP.
         * @returns {Promise} Une promesse qui se résout après l'exécution.
         */
        start: function () {
            console.log("[EndCallAction] Fin d'un appel SIP.");
            // Ajoutez ici votre logique pour terminer un appel SIP
            return this._super.apply(this, arguments);
        },
    });

    // Enregistrement de l'action pour terminer un appel SIP
    core.action_registry.add('webrtc.sip.end_call', EndCallAction);

    /**
     * Retourne les actions pour usage éventuel ailleurs
     */
    return {
        WebRTCSIPClient: WebRTCSIPClient,
        RegisterSIPAction: RegisterSIPAction,
        MakeCallAction: MakeCallAction,
        EndCallAction: EndCallAction,
    };
});
