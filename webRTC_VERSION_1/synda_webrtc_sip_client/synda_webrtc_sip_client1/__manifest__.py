{
    'name': 'WebRTC SIP Client',
    'version': '1.0.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': """
        Un module Odoo permettant l'intégration d'un client SIP basé sur WebRTC.
        - Enregistrement des comptes SIP.
        - Gestion des appels.
    """,
    'author': 'Foko Junior',
    'website': 'https://syndatech.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_action.xml',
        'views/webrtc_sip_menu.xml',
        'views/webrtc_sip_template.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'synda_webrtc_sip_client/static/src/js/webrtc_sip_action.js',
            'synda_webrtc_sip_client/static/src/css/webrtc_sip_client.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
