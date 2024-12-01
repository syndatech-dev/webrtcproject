# backend/freepbx/event_handler.py
from typing import Callable, Dict, Any
import logging

logger = logging.getLogger(__name__)

class FreePBXEventHandler:
    def __init__(self):
        self.event_callbacks = {}
        
    def register_callback(self, event_type: str, callback: Callable):
        if event_type not in self.event_callbacks:
            self.event_callbacks[event_type] = []
        self.event_callbacks[event_type].append(callback)
        
    def handle_event(self, event: Dict[str, Any]):
        event_type = event.get('Event')
        if event_type in self.event_callbacks:
            for callback in self.event_callbacks[event_type]:
                try:
                    callback(event)
                except Exception as e:
                    logger.error(f"Error in event callback: {str(e)}")