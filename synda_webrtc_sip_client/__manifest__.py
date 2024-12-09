{
    'name': 'WebRTC SIP Client',
    'version': '1.0.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': """
        A WebRTC SIP client integrated into Odoo to register extensions and make calls via FreePBX.
        Features:
        - Register SIP accounts.
        - Make and receive calls.
        - Integration with FreePBX systems.
    """,
    'author': 'Synda Tech',
    'website': 'https://syndatech.com',
    'depends': [
        'base',  # Base Odoo module
        'web',   # Module web pour les actions frontales
    ],
    'data': [
        'views/webrtc_sip_template.xml',  # Template HTML pour l'interface utilisateur
        'views/webrtc_sip_action.xml',   # Actions pour les menus ou boutons
        'views/webrtc_sip_menu.xml',     # Menu principal
    ],
    'assets': {
        'web.assets_backend': [
            'static/src/js/webrtc_sip_action.js',  # Actions JS (enregistre les actions)
            'static/src/js/webrtc_client.js',      # Client WebRTC
            'static/src/css/webrtc_client.css',    # Styles CSS personnalisés
        ],
        'web.assets_qweb': [
            'views/webrtc_sip_template.xml',  # Inclure uniquement les templates QWeb
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,  # Important pour éviter l'installation automatique avec d'autres modules
}
