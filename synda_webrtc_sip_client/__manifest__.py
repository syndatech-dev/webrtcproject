{
    'name': 'Synda WebRTC SIP Client',
    'version': '1.0',
    'summary': 'WebRTC SIP Client intégré à FreePBX et Odoo',
    'description': """
        Module Odoo pour gérer les appels WebRTC via FreePBX :
        - Gestion des utilisateurs SIP
        - Historique et journaux d’appels
        - Tableaux de bord et statistiques
    """,
    'author': 'Foko Junior',
    'category': 'Telephony',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/dashboard_view.xml',
        'views/call_history_view.xml',
        'views/log_view.xml',
        'views/user_management_view.xml',
        'views/webrtc_sip_menu.xml',
        'views/webrtc_sip_template.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'synda_webrtc_sip_client/static/src/css/webrtc_style.css',
            'synda_webrtc_sip_client/static/src/js/webrtc_client.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
