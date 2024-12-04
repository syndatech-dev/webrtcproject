# backend/freepbx/event_handler.py
import asyncio
from typing import Callable, Dict, Any

class FreePBXEventHandler:
    def __init__(self):
        self.event_callbacks: Dict[str, list[Callable]] = {}

    def register_callback(self, event_type: str, callback: Callable):
        """Register a callback for a specific event type."""
        if event_type not in self.event_callbacks:
            self.event_callbacks[event_type] = []
        self.event_callbacks[event_type].append(callback)

    async def handle_event(self, event: Dict[str, Any]):
        """Handle incoming FreePBX events."""
        event_type = event.get('type')
        if event_type in self.event_callbacks:
            for callback in self.event_callbacks[event_type]:
                await callback(event)

# Exemple d'utilisation
# def handle_event(event):
#     print(f"Event received: {event}")

# handler = EventHandler("http://freepbx.local", "admin", "password")
# handler.listen_to_events(handle_event)
