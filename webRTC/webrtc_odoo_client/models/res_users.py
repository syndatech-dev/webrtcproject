from odoo import models, fields, api
from odoo.exceptions import ValidationError

class ResUsers(models.Model):
    _inherit = 'res.users'

    sip_extension = fields.Char(string='Extension SIP', help="Extension pour les appels SIP.")
    sip_password = fields.Char(string='Mot de passe SIP', help="Mot de passe pour l'authentification SIP.")
    sip_status = fields.Selection([
        ('offline', 'Hors ligne'),
        ('available', 'Disponible'),
        ('on_call', 'En appel'),
    ], default='offline', string='Statut SIP')
    last_call_time = fields.Datetime(string='Dernier appel')

    @api.model
    def get_sip_credentials(self):
        """Retrieve SIP credentials for the current user."""
        return {
            'extension': self.sip_extension,
            'password': self.sip_password,
            'domain': self.env['ir.config_parameter'].get_param('webrtc.sip_domain'),
            'ws_url': self.env['ir.config_parameter'].get_param('webrtc.ws_url'),
        }

    @api.constrains('sip_extension')
    def _check_sip_extension(self):
        """Ensure SIP extension is unique."""
        for record in self:
            if record.sip_extension and self.search([('sip_extension', '=', record.sip_extension), ('id', '!=', record.id)]):
                raise ValidationError("L'extension SIP doit être unique.")

    @api.model
    def create(self, vals):
        """Override create method to handle additional logic for SIP credentials."""
        if vals.get('sip_extension') and self.search([('sip_extension', '=', vals['sip_extension'])]):
            raise ValidationError("L'extension SIP doit être unique.")
        return super(ResUsers, self).create(vals)

    def write(self, vals):
        """Override write method to handle additional logic for SIP credentials."""
        if vals.get('sip_extension'):
            for record in self:
                if self.search([('sip_extension', '=', vals['sip_extension']), ('id', '!=', record.id)]):
                    raise ValidationError("L'extension SIP doit être unique.")
        return super(ResUsers, self).write(vals)

    @api.model
    def set_sip_status(self, status):
        """Set the SIP status for the current user."""
        valid_statuses = ['offline', 'available', 'on_call']
        if status not in valid_statuses:
            raise ValidationError("Statut SIP invalide.")
        self.sudo().write({'sip_status': status})
