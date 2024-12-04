# backend/freepbx/call_manager.py
import requests
from typing import Dict, Any

class FreePBXCallManager:
    def __init__(self, host: str, port: int, username: str, password: str):
        self.base_url = f"http://{host}:{port}/admin/api"
        self.auth = (username, password)

    async def initiate_call(self, from_extension: str, to_number: str) -> Dict[str, Any]:
        """Initiate a call through FreePBX."""
        endpoint = f"{self.base_url}/originate"
        payload = {
            "channel": f"SIP/{from_extension}",
            "exten": to_number,
            "context": "from-internal",
            "priority": 1,
            "timeout": 30000
        }
        response = requests.post(endpoint, json=payload, auth=self.auth)
        return response.json()

    async def end_call(self, call_id: str) -> Dict[str, Any]:
        """End an active call."""
        endpoint = f"{self.base_url}/hangup"
        payload = {"channel": call_id}
        response = requests.post(endpoint, json=payload, auth=self.auth)
        return response.json()

# Exemple d'utilisation
# manager = CallManager("http://freepbx.local", "admin", "password")
# print(manager.initiate_call("1001", "1002"))
