# odoo_module/__manifest__.py
{
    'name': 'WebRTC SIP Client',
    'version': '1.0',
    'category': 'Communications',
    'summary': 'WebRTC-based SIP client integration for Odoo',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/call_interface_form.xml',
        'views/res_users_form.xml',
        'views/menu_items.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'webRTC/frontend/static/js/sip_client.js',
            'webRTC/frontend/static/js/webrtc_client.js',
        ],
    },
    'installable': True,
    'application': True,
}
