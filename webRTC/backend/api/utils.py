# backend/api/utils.py
import logging
import json
from typing import Dict, Any, Optional
import hashlib
import random
import string

logger = logging.getLogger(__name__)

class ConfigManager:
    def __init__(self, config_file: str):
        self.config_file = config_file
        self.config = self.load_config()

    def load_config(self) -> Dict[str, Any]:
        try:
            with open(self.config_file, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load config: {str(e)}")
            return {}

    def get(self, key: str, default: Any = None) -> Any:
        return self.config.get(key, default)

    def set(self, key: str, value: Any) -> bool:
        try:
            self.config[key] = value
            with open(self.config_file, 'w') as f:
                json.dump(self.config, f, indent=4)
            return True
        except Exception as e:
            logger.error(f"Failed to save config: {str(e)}")
            return False

class SecurityUtils:
    @staticmethod
    def generate_token(length: int = 32) -> str:
        """Generate a random security token"""
        return ''.join(random.choices(
            string.ascii_letters + string.digits,
            k=length
        ))

    @staticmethod
    def hash_password(password: str) -> str:
        """Generate a secure hash of the password"""
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def validate_extension(extension: str) -> bool:
        """Validate SIP extension format"""
        return bool(re.match(r'^\d{3,6}$', extension))

class CallUtils:
    @staticmethod
    def format_phone_number(number: str) -> str:
        """Format phone number to E.164 format"""
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', number)
        
        # Add country code if missing
        if len(digits_only) == 10:  # US number without country code
            return f'+1{digits_only}'
        elif len(digits_only) > 10:
            return f'+{digits_only}'
        return digits_only

    @staticmethod
    def calculate_call_duration(start_time: datetime, end_time: datetime) -> int:
        """Calculate call duration in seconds"""
        if not start_time or not end_time:
            return 0
        duration = (end_time - start_time).total_seconds()
        return max(0, int(duration))

class WebRTCUtils:
    @staticmethod
    def generate_ice_servers() -> List[Dict[str, Any]]:
        """Generate ICE servers configuration"""
        return [
            {
                'urls': 'stun:stun.l.google.com:19302'
            },
            {
                'urls': 'turn:your-turn-server.com',
                'username': 'username',
                'credential': 'password'
            }
        ]

    @staticmethod
    def check_webrtc_compatibility() -> Dict[str, bool]:
        """Check WebRTC compatibility of the browser"""
        return {
            'getUserMedia': 'navigator' in globals() and 'mediaDevices' in navigator,
            'RTCPeerConnection': 'RTCPeerConnection' in globals(),
            'RTCSessionDescription': 'RTCSessionDescription' in globals()
        }

class LoggingUtils:
    @staticmethod
    def setup_logging(log_file: str, level: str = 'INFO') -> None:
        """Configure logging for the application"""
        logging.basicConfig(
            filename=log_file,
            level=getattr(logging, level.upper()),
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )

    @staticmethod
    def log_call_event(logger: logging.Logger, event_type: str, data: Dict[str, Any]) -> None:
        """Log call-related events"""
        logger.info(f"Call Event: {event_type} - {json.dumps(data)}")