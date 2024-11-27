from odoo import models, fields, api

class SIPCallHistory(models.Model):
    _name = 'sip.call.history'
    _description = 'SIP Call History'

    from_sip = fields.Char(string="From")
    to_sip = fields.Char(string="To")
    status = fields.Selection([('completed', 'Completed'), ('missed', 'Missed')], string="Status")
    call_date = fields.Datetime(string="Call Date", default=fields.Datetime.now)
