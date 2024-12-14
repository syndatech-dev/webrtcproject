{
    'name': 'WebRTC SIP Client Multiple Views',
    'version': '1.0',
    'category': 'Communication',
    'summary': 'Client SIP WebRTC pour Odoo avec plusieurs vues',
    'description': 'Module qui propose différentes vues pour simplifier la gestion du client SIP WebRTC.',
    'author': 'Synda Tech',
    'depends': ['base', 'web'],
    'data': [
        'views/sip_control_template.xml',
        'views/call_template.xml',
        'views/dashboard_template.xml',
        'views/menu.xml',
    ],
    'assets': {
            'web.assets_frontend': [
              'synda_webrtc_sip_client/static/src/css/webrtc_client.css',
        ],
    },
    'installable': True,
    'application': True,
}