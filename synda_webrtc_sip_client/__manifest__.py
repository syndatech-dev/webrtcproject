
{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': 'A standalone WebRTC SIP client using JsSIP.',
    'author': 'Synda Tech',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_template.xml',
        'views/webrtc_sip_action.xml',
        'views/webrtc_sip_menu.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'views/js/webrtc_client.js',
            'views/src/js/webrtc_sip_action.js',
            'static/src/css/webrtc_client.css',
        ],
    },
    'installable': True,
    'application': True,
}
