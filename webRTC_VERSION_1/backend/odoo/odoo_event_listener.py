# backend/odoo/odoo_event_listener.py
from typing import Callable, Dict, Any
import logging

logger = logging.getLogger(__name__)

class OdooEventListener:
    def __init__(self, odoo_connector: 'OdooConnector'):
        self.odoo_connector = odoo_connector
        self.event_handlers = {}
        
    def register_handler(self, event_type: str, handler: Callable):
        self.event_handlers[event_type] = handler
        
    def process_event(self, event_type: str, event_data: Dict[str, Any]):
        if event_type in self.event_handlers:
            try:
                self.event_handlers[event_type](event_data)
            except Exception as e:
                logger.error(f"Error processing Odoo event: {str(e)}")