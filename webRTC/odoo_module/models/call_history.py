# odoo_module/models/call_history.py
from odoo import models, fields, api
from datetime import datetime

class CallHistory(models.Model):
    _name = 'webrtc.call.history'
    _description = 'Call History'
    _order = 'start_time desc'

    name = fields.Char(compute='_compute_name', store=True)
    user_id = fields.Many2one('res.users', string='User', required=True)
    direction = fields.Selection([
        ('inbound', 'Inbound'),
        ('outbound', 'Outbound')
    ], required=True)
    phone_number = fields.Char(string='Phone Number', required=True)
    start_time = fields.Datetime(string='Start Time', default=fields.Datetime.now)
    end_time = fields.Datetime(string='End Time')
    duration = fields.Float(string='Duration (seconds)', compute='_compute_duration', store=True)
    status = fields.Selection([
        ('missed', 'Missed'),
        ('answered', 'Answered'),
        ('failed', 'Failed')
    ], default='missed')
    notes = fields.Text(string='Notes')

    @api.depends('phone_number', 'start_time', 'direction')
    def _compute_name(self):
        for record in self:
            direction_symbol = '←' if record.direction == 'inbound' else '→'
            record.name = f"{record.start_time.strftime('%Y-%m-%d %H:%M')} {direction_symbol} {record.phone_number}"

    @api.depends('start_time', 'end_time')
    def _compute_duration(self):
        for record in self:
            if record.start_time and record.end_time:
                duration = (record.end_time - record.start_time).total_seconds()
                record.duration = duration if duration > 0 else 0
            else:
                record.duration = 0