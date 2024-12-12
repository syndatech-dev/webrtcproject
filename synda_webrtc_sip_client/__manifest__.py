{
    'name': 'Synda WebRTC SIP Client',
    'version': '1.0',
    'summary': 'Module for managing SIP clients in Odoo',
    'category': 'Tools',
    'author': 'Foko',
    'website': 'http://syndatech.com',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/assets.xml',
        'views/synda_sip_client_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            '/synda_webrtc_sip_client/static/src/css/style.css',
        ],
    },
    'application': True,
    'installable': True,
}
