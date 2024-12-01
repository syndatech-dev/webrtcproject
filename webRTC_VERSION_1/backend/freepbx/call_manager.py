# backend/freepbx/call_manager.py
import asterisk.manager
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class FreePBXCallManager:
    def __init__(self, host: str, port: int, username: str, password: str):
        self.manager = asterisk.manager.Manager()
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        
    def connect(self) -> bool:
        try:
            self.manager.connect(self.host)
            self.manager.login(self.username, self.password)
            return True
        except Exception as e:
            logger.error(f"Failed to connect to Asterisk AMI: {str(e)}")
            return False

    def initiate_call(self, from_extension: str, to_number: str) -> Dict[str, Any]:
        try:
            action = {
                'Action': 'Originate',
                'Channel': f'SIP/{from_extension}',
                'Context': 'from-internal',
                'Exten': to_number,
                'Priority': 1,
                'Callerid': f'"{from_extension}" <{from_extension}>'
            }
            response = self.manager.send_action(action)
            return {'success': True, 'response': response}
        except Exception as e:
            logger.error(f"Failed to initiate call: {str(e)}")
            return {'success': False, 'error': str(e)}

    def hangup_call(self, channel: str) -> Dict[str, Any]:
        try:
            action = {
                'Action': 'Hangup',
                'Channel': channel
            }
            response = self.manager.send_action(action)
            return {'success': True, 'response': response}
        except Exception as e:
            logger.error(f"Failed to hangup call: {str(e)}")
            return {'success': False, 'error': str(e)}