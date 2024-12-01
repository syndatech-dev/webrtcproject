from odoo import models, fields, api
from datetime import datetime

class CallHistory(models.Model):
    _name = 'webrtc.call.history'
    _description = 'Historique des appels WebRTC'
    _order = 'start_time desc'

    caller_id = fields.Many2one('res.users', string='Appelant', required=True, ondelete='cascade')
    callee_id = fields.Many2one('res.users', string='Appelé', required=True, ondelete='cascade')
    call_direction = fields.Selection([
        ('inbound', 'Entrant'),
        ('outbound', 'Sortant')
    ], required=True, string='Direction de l\'appel')
    start_time = fields.Datetime(string='Début de l\'appel', default=fields.Datetime.now, required=True)
    end_time = fields.Datetime(string='Fin de l\'appel')
    duration = fields.Float(string='Durée (secondes)', compute='_compute_duration', store=True)
    call_status = fields.Selection([
        ('completed', 'Terminé'),
        ('missed', 'Manqué'),
        ('ongoing', 'En cours')
    ], string='Statut de l\'appel', default='ongoing')

    @api.depends('start_time', 'end_time')
    def _compute_duration(self):
        """Computes the duration of the call in seconds."""
        for record in self:
            if record.start_time and record.end_time:
                duration = (record.end_time - record.start_time).total_seconds()
                record.duration = duration if duration > 0 else 0.0
            else:
                record.duration = 0.0

    @api.model
    def create_call_record(self, caller_id, callee_id, direction):
        """Creates a new call history record."""
        return self.create({
            'caller_id': caller_id,
            'callee_id': callee_id,
            'call_direction': direction,
            'start_time': datetime.now(),
        })

    def end_call(self):
        """Ends the call by setting the end_time and updating the call status."""
        self.ensure_one()
        self.end_time = datetime.now()
        self.call_status = 'completed'
        self._compute_duration()
