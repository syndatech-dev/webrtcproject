from odoo import http
from odoo.http import request
import logging

_logger = logging.getLogger(__name__)

class SIPClientController(http.Controller):
    @http.route('/webrtc/register', type='json', auth='user')
    def register_sip_user(self, username, password):
        """
        Endpoint to handle SIP user registration.
        This will check the provided SIP credentials.
        """
        _logger.info("Registering SIP user: %s", username)
        try:
            # Simulate a backend check or send the credentials to a SIP server
            if username and password:
                return {'status': 'success', 'message': 'User registered successfully!'}
            else:
                return {'status': 'error', 'message': 'Invalid credentials'}
        except Exception as e:
            _logger.error("Error registering SIP user: %s", e)
            return {'status': 'error', 'message': str(e)}

    @http.route('/webrtc/call', type='json', auth='user')
    def make_sip_call(self, from_user, to_user):
        """
        Endpoint to handle making a SIP call.
        """
        _logger.info("Initiating call from %s to %s", from_user, to_user)
        try:
            # Simulate calling logic (e.g., sending a SIP INVITE)
            if from_user and to_user:
                return {'status': 'success', 'message': f'Call from {from_user} to {to_user} initiated!'}
            else:
                return {'status': 'error', 'message': 'Invalid call parameters'}
        except Exception as e:
            _logger.error("Error making SIP call: %s", e)
            return {'status': 'error', 'message': str(e)}

    @http.route('/webrtc/history', type='json', auth='user')
    def get_call_history(self):
        """
        Endpoint to retrieve the call history from the database.
        """
        _logger.info("Fetching call history for user: %s", request.env.user.name)
        try:
            # Fetch call history from the database (example for a model `sip.call.history`)
            history = request.env['sip.call.history'].search_read([], ['from_sip', 'to_sip', 'status', 'call_date'])
            return {'status': 'success', 'history': history}
        except Exception as e:
            _logger.error("Error fetching call history: %s", e)
            return {'status': 'error', 'message': str(e)}
