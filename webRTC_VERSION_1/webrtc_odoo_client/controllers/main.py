from odoo import http
from odoo.http import request

class WebRTCController(http.Controller):

    @http.route('/webrtc/get_config', type='json', auth='user')
    def get_config(self):
        """Retrieve SIP configuration for the current user."""
        user = request.env.user
        return user.get_sip_credentials()

    @http.route('/webrtc/update_status', type='json', auth='user')
    def update_status(self, status):
        """Update SIP status for the current user."""
        valid_statuses = ['offline', 'available', 'on_call']
        if status not in valid_statuses:
            return {'success': False, 'error': 'Invalid status'}
        
        user = request.env.user
        user.write({'sip_status': status})
        return {'success': True}

    @http.route('/webrtc/call_history', type='json', auth='user')
    def get_call_history(self, user_id):
        """Retrieve call history for a specific user."""
        call_history = request.env['webrtc.call.history'].search([('caller_id', '=', user_id)])
        return [{'caller_id': rec.caller_id.id, 'callee_id': rec.callee_id.id, 'start_time': rec.start_time, 'end_time': rec.end_time, 'duration': rec.duration} for rec in call_history]
