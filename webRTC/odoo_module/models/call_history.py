# odoo_module/models/call_history.py
from odoo import models, fields, api

class CallHistory(models.Model):
    _name = 'webrtc.call.history'
    _description = 'Call History'

    user_id = fields.Many2one('res.users', string='User', required=True)
    direction = fields.Selection([
        ('outbound', 'Outbound'),
        ('inbound', 'Inbound')
    ], string='Direction', required=True)
    phone_number = fields.Char(string='Phone Number', required=True)
    duration = fields.Float(string='Duration (seconds)')
    start_time = fields.Datetime(string='Start Time')
    end_time = fields.Datetime(string='End Time')
    status = fields.Selection([
        ('answered', 'Answered'),
        ('missed', 'Missed'),
        ('failed', 'Failed')
    ]), string='Status',