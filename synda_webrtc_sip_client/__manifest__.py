{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': 'A WebRTC SIP client to register extensions and make calls via FreePBX.',
    'author': 'Synda Tech',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_template.xml',  # Modèle HTML
        'views/webrtc_sip_action.xml',   # Définition de l'action
        'views/webrtc_sip_menu.xml',     # Menu principal
    ],
    'assets': {
        'web.assets_backend': [
            'synda_webrtc_sip_client/static/src/js/webrtc_sip_action.js',  # Action JavaScript
            'synda_webrtc_sip_client/static/src/js/webrtc_client.js',      # Script WebRTC client
            'synda_webrtc_sip_client/static/src/css/webrtc_client.css',    # Styles CSS
        ],
    },
    'installable': True,
    'application': True,
}
