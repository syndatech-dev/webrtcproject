from odoo import models, fields

class ResUsersExtension(models.Model):
    _inherit = 'res.users'

    sip_extension = fields.Char(string='SIP Extension')
    sip_password = fields.Char(string='SIP Password')
