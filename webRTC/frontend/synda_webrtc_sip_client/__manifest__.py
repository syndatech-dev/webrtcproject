{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communication',
    'summary': 'WebRTC SIP Client for Odoo',
    'description': 'A WebRTC SIP client to register extensions and make calls via FreePBX.',
    'author': 'Synda Tech',
    'depends': ['base', 'web'],
    'data': [
        'views/webrtc_sip_template.xml',
        'views/call_interface.xml'
    ],
    'assets': {
        'web.assets_frontend': [
            'synda_webrtc_sip_client/static/src/js/JsSIP.js',
            'synda_webrtc_sip_client/static/src/js/webrtc_client.js'
        ],
    },
    'installable': True,
    'application': True,
    'web.assets_frontend': [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'synda_webrtc_sip_client/static/src/js/webrtc_client.js'
],

}
