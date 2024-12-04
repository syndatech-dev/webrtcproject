# backend/freepbx/user_auth.py
import hashlib
from typing import Optional, Dict

class FreePBXAuth:
    def __init__(self, db_connection):
        self.db = db_connection

    async def authenticate_user(self, username: str, password: str) -> Optional[Dict]:
        """Authenticate a user against FreePBX database."""
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        query = """
        SELECT id, username, extension 
        FROM users 
        WHERE username = %s AND password_hash = %s
        """
        result = await self.db.fetch_one(query, (username, hashed_password))
        return dict(result) if result else None

    async def get_user_extension(self, user_id: int) -> Optional[str]:
        """Get SIP extension for a user."""
        query = "SELECT extension FROM users WHERE id = %s"
        result = await self.db.fetch_one(query, (user_id,))
        return result['extension'] if result else None