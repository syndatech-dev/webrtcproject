from odoo import models, fields

class SIPUser(models.Model):
    _name = 'sip.user'
    name = fields.Char(string="Name")
    sip_username = fields.Char(string="SIP Username")
    sip_password = fields.Char(string="SIP Password")
