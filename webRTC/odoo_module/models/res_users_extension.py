# odoo_module/models/res_users_extension.py
from odoo import models, fields, api
from odoo.exceptions import ValidationError
import re

class ResUsersExtension(models.Model):
    _inherit = 'res.users'

    sip_extension = fields.Char(string='SIP Extension', copy=False)
    sip_password = fields.Char(string='SIP Password', copy=False)
    sip_status = fields.Selection([
        ('offline', 'Offline'),
        ('online', 'Online'),
        ('busy', 'Busy'),
        ('away', 'Away')
    ], default='offline', string='SIP Status')
    call_history_ids = fields.One2many('webrtc.call.history', 'user_id', string='Call History')

    @api.constrains('sip_extension')
    def _check_sip_extension(self):
        for record in self:
            if record.sip_extension:
                if not re.match(r'^\d{3,6}$', record.sip_extension):
                    raise ValidationError('SIP Extension must be between 3 and 6 digits')
                
                # Check for uniqueness
                duplicate = self.search([
                    ('sip_extension', '=', record.sip_extension),
                    ('id', '!=', record.id)
                ])
                if duplicate:
                    raise ValidationError('This SIP Extension is already in use')

    def generate_sip_credentials(self):
        """Generate random SIP extension and password for the user"""
        for record in self:
            if not record.sip_extension:
                # Generate unique extension
                while True:
                    extension = str(random.randint(100, 999))
                    if not self.search([('sip_extension', '=', extension)]):
                        break
                record.sip_extension = extension
                
                # Generate password
                record.sip_password = ''.join(
                    random.choices(string.ascii_letters + string.digits, k=12)
                )