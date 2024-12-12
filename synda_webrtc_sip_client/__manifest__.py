{
    'name': 'Synda WebRTC SIP Client',
    'version': '1.0',
    'summary': 'Module pour enregistrer et gérer des clients SIP',
    'description': 'Une interface graphique pour ajouter, modifier et gérer des clients SIP.',
    'author': 'Foko',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/synda_sip_client_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'synda_webrtc_sip_client/static/src/css/style.css',
        ],
    },
    'installable': True,
    'application': True,
}
