from odoo import models, fields, api
from datetime import timedelta

class CallHistory(models.Model):
    _name = 'webrtc.call.history'
    _description = 'Call History'

    user_id = fields.Many2one('res.users', string='User', required=True)
    direction = fields.Selection([
        ('outbound', 'Outbound'),
        ('inbound', 'Inbound')
    ], string='Direction', required=True)
    phone_number = fields.Char(string='Phone Number', required=True)
    duration = fields.Float(string='Duration (seconds)', compute='_compute_duration', store=True)
    start_time = fields.Datetime(string='Start Time', required=True)
    end_time = fields.Datetime(string='End Time')
    status = fields.Selection([
        ('answered', 'Answered'),
        ('missed', 'Missed'),
        ('failed', 'Failed')
    ], string='Status', required=True)

    @api.depends('start_time', 'end_time')
    def _compute_duration(self):
        """
        Calcule la durée de l'appel en secondes si les deux horodatages sont disponibles.
        """
        for record in self:
            if record.start_time and record.end_time:
                delta = record.end_time - record.start_time
                record.duration = delta.total_seconds()
            else:
                record.duration = 0.0

    @api.model
    def create_call_history(self, user_id, phone_number, direction, start_time, end_time=None, status='answered'):
        """
        Méthode utilitaire pour enregistrer un appel dans l'historique.
        :param user_id: ID de l'utilisateur Odoo associé
        :param phone_number: Numéro de téléphone impliqué dans l'appel
        :param direction: 'outbound' ou 'inbound'
        :param start_time: Horodatage du début de l'appel
        :param end_time: Horodatage de la fin de l'appel
        :param status: Statut de l'appel ('answered', 'missed', 'failed')
        :return: Enregistrement créé dans 'webrtc.call.history'
        """
        call_history = self.create({
            'user_id': user_id,
            'phone_number': phone_number,
            'direction': direction,
            'start_time': start_time,
            'end_time': end_time,
            'status': status,
        })
        return call_history
