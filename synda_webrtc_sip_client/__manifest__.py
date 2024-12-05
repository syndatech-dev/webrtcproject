
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
    ],
    'assets': {
        'web.assets_frontend': [
            
            'synda_webrtc_sip_client/static/src/js/webrtc_client.js',
            'synda_webrtc_sip_client/static/src/css/webrtc_client.css',
        ],
    },
    'installable': True,
    'application': True,
}
