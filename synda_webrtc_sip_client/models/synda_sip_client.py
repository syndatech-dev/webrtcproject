from odoo import models, fields

class SyndaSIPClient(models.Model):
    _name = 'synda.sip.client'
    _description = 'Client SIP'

    name = fields.Char(string="Nom", required=True)
    username = fields.Char(string="Nom d'utilisateur", required=True)
    secret = fields.Char(string="Mot de passe", required=True)
    host = fields.Char(string="Hôte", required=True)
    context = fields.Char(string="Contexte", required=True)
