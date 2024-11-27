from odoo import http
from odoo.http import request
import logging

_logger = logging.getLogger(__name__)

class SIPClientController(http.Controller):

    @http.route('/webrtc/call', type='json', auth='user')
    def make_sip_call(self, from_user, to_user):
        """
        Endpoint to handle making a SIP call.
        Simulates initiating a call between two SIP users.
        """
        _logger.info("Initiating call from %s to %s", from_user, to_user)
        try:
            if not from_user or not to_user:
                return {'status': 'error', 'message': 'Both source and target users are required'}

            # Simulate SIP call initiation logic
            # You can integrate with an actual SIP server here if needed
            # For now, we log the call and store it in the history
            request.env['sip.call.history'].create({
                'from_sip': from_user,
                'to_sip': to_user,
                'status': 'completed',  # Default status for now
                'call_date': fields.Datetime.now(),
            })

            return {
                'status': 'success',
                'message': f'Call from {from_user} to {to_user} initiated successfully!'
            }
        except Exception as e:
            _logger.error("Error initiating SIP call: %s", e)
            return {'status': 'error', 'message': str(e)}

    @http.route('/webrtc/history', type='json', auth='user')
    def get_call_history(self):
        """
        Endpoint to retrieve the call history from the database.
        Returns all call records for the current user.
        """
        _logger.info("Fetching call history for user: %s", request.env.user.name)
        try:
            # Fetch call history from the database
            history = request.env['sip.call.history'].search_read([], ['from_sip', 'to_sip', 'status', 'call_date'])
            return {'status': 'success', 'history': history}
        except Exception as e:
            _logger.error("Error fetching call history: %s", e)
            return {'status': 'error', 'message': str(e)}
