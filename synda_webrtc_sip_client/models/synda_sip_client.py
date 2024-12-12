from odoo import models, fields

class SyndaSipClient(models.Model):
    _name = 'synda.sip.client'
    _description = 'SIP Client'

    name = fields.Char(string='Name', required=True)
    sip_username = fields.Char(string='SIP Username', required=True)
    sip_password = fields.Char(string='SIP Password', required=True)
    server_address = fields.Char(string='Server Address')
