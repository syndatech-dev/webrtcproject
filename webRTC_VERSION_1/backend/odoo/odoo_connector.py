# backend/odoo/odoo_connector.py
from xmlrpc import client
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class OdooConnector:
    def __init__(self, url: str, db: str, username: str, password: str):
        self.url = url
        self.db = db
        self.username = username
        self.password = password
        self.uid = None
        self.common = client.ServerProxy(f'{url}/xmlrpc/2/common')
        self.models = client.ServerProxy(f'{url}/xmlrpc/2/object')
        
    def connect(self) -> bool:
        try:
            self.uid = self.common.authenticate(self.db, self.username, self.password, {})
            return bool(self.uid)
        except Exception as e:
            logger.error(f"Failed to connect to Odoo: {str(e)}")
            return False
            
    def get_user_extensions(self) -> List[Dict[str, Any]]:
        try:
            return self.models.execute_kw(
                self.db, self.uid, self.password,
                'res.users', 'search_read',
                [[('sip_extension', '!=', False)]],
                {'fields': ['name', 'sip_extension', 'sip_password']}
            )
        except Exception as e:
            logger.error(f"Failed to get user extensions: {str(e)}")
            return []