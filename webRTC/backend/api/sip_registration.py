# backend/api/sip_registration.py
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class SIPRegistration:
    def __init__(self, freepbx_auth):
        self.freepbx_auth = freepbx_auth
        self.registered_clients = {}
        
    def register_client(self, username: str, password: str) -> Dict[str, Any]:
        try:
            auth_result = self.freepbx_auth.authenticate_user(username, password)
            if auth_result:
                self.registered_clients[username] = {
                    'auth_token': auth_result['token'],
                    'extension': auth_result['extension']
                }
                return {
                    'success': True,
                    'extension': auth_result['extension'],
                    'ws_url': 'wss://your-server/ws'
                }
            return {'success': False, 'error': 'Authentication failed'}
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return {'success': False, 'error': str(e)}