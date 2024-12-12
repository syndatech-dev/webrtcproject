{
    'name': 'WebRTC SIP Client',
    'version': '1.0.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': """
        Intégration d'un client SIP WebRTC dans Odoo.
        - Permet l'enregistrement de comptes SIP.
        - Gestion des appels SIP directement dans Odoo.
    """,
    'author': 'Foko Junior',
    'website': 'https://syndatech.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_menu.xml',
        'views/webrtc_sip_template.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'synda_webrtc_sip_client/static/src/js/webrtc_sip_view.js',
            'synda_webrtc_sip_client/static/src/css/webrtc_sip_client.css',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
