from odoo import models, fields

class WebRTCSipClient(models.Model):
    _name = 'synda.webrtc.sip.client'
    _description = 'WebRTC SIP Client'

    name = fields.Char('SIP Client Name', required=True)
    sip_extension = fields.Char('SIP Extension', required=True)
    sip_password = fields.Char('SIP Password', required=True)
    sip_server = fields.Char('SIP Server', required=True)
    user_id = fields.Many2one('res.users', string='User')
    registration_status = fields.Selection([('registered', 'Registered'), ('unregistered', 'Unregistered')], default='unregistered')

    def register_sip(self):
         Logic to register SIP extension (via JavaScript integration with JsSIP)
        pass