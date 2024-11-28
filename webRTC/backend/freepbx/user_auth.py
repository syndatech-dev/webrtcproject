# backend/freepbx/user_auth.py
import hashlib
from typing import Dict, Optional
import requests

class FreePBXAuth:
    def __init__(self, freepbx_url: str, api_key: str):
        self.freepbx_url = freepbx_url
        self.api_key = api_key
        
    def authenticate_user(self, username: str, password: str) -> Optional[Dict[str, Any]]:
        try:
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            response = requests.post(
                f"{self.freepbx_url}/api/auth",
                json={
                    "username": username,
                    "password_hash": password_hash
                },
                headers={"X-API-Key": self.api_key}
            )
            
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return None