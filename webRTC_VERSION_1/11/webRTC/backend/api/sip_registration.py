# backend/api/sip_registration.py
from typing import Dict, Any

class SIPRegistration:
    def __init__(self):
        self.registrations = {}

    async def register(self, username: str, extension: str) -> Dict[str, Any]:
        """Register a SIP client."""
        # Implementation for SIP registration
        registration_data = {
            "username": username,
            "extension": extension,
            "ws_url": "wss://your-server/ws",
            "sip_uri": f"sip:{extension}@your-server"
        }
        self.registrations[username] = registration_data
        return registration_data

    async def unregister(self, username: str):
        """Unregister a SIP client."""
        if username in self.registrations:
            del self.registrations[username]