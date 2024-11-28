# backend/odoo/odoo_connector.py
from xmlrpc import client
from typing import Dict, Any, List

class OdooConnector:
    def __init__(self, url: str, db: str, username: str, password: str):
        self.url = url
        self.db = db
        self.username = username
        self.password = password
        self.uid = None
        self.common = client.ServerProxy(f'{url}/xmlrpc/2/common')
        self.models = client.ServerProxy(f'{url}/xmlrpc/2/object')

    def connect(self):
        """Establish connection with Odoo server."""
        self.uid = self.common.authenticate(self.db, self.username, self.password, {})
        return self.uid is not None

    def sync_users(self) -> List[Dict[str, Any]]:
        """Synchronize users between Odoo and FreePBX."""
        if not self.uid:
            raise Exception("Not connected to Odoo")

        users = self.models.execute_kw(self.db, self.uid, self.password,
            'res.users', 'search_read',
            [[['active', '=', True]]],
            {'fields': ['name', 'login', 'sip_extension']}
        )
        return users