# odoo_module/__manifest__.py
{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communications',
    'summary': 'Integrate WebRTC-based SIP client with Odoo',
    'depends': ['base', 'web'],
    'data': [
        'views/res_users_form.xml',
        'views/call_interface_form.xml',
        'views/menu_items.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'webrtc_sip_client/static/src/js/sip_client.js',
            'webrtc_sip_client/static/src/js/webrtc_client.js',
            'webrtc_sip_client/static/src/css/styles.css',
        ],
    },
    'installable': True,
    'application': True,
}