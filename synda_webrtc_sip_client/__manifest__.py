{
    'name': 'WebRTC SIP Client',
    'version': '1.0.0',
    'category': 'Communication',
    'summary': 'Interface de base pour un client WebRTC SIP dans Odoo',
    'description': """
        Ce module fournit une interface utilisateur de base pour un client WebRTC SIP sans les fonctionnalités.
    """,
    'author': 'Votre Nom',
    'website': 'https://syndatech.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_menu.xml',
        'views/webrtc_sip_template.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}
