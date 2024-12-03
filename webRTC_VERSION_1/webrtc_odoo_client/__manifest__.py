{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communications',
    'summary': 'Client SIP WebRTC pour Odoo avec intégration FreePBX',
    'description': """Module d'intégration WebRTC pour Odoo avec gestion des appels SIP et historique.""",
    'depends': ['base', 'web', 'mail'],
    'data': [
        'security/ir.model.access.csv',
        'security/webrtc_security.xml',
        'views/webrtc_sip_views.xml',
        'views/res_users_views.xml',
        'views/call_history_views.xml',
        'views/menu_items.xml',
        'data/webrtc_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'webrtc_odoo_client/static/src/js/JsSIP.js',
            'webrtc_odoo_client/static/src/js/webrtc_client.js',
            'webrtc_odoo_client/static/src/css/webrtc_client.css',
        ],
    },
    'installable': True,
    'application': True,
}
