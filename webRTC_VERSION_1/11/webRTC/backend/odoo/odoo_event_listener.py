
import asyncio
from typing import Dict, Any, Callable

class OdooEventListener:
    def __init__(self, odoo_connector: 'OdooConnector'):
        self.odoo = odoo_connector
        self.event_handlers: Dict[str, List[Callable]] = {}

    def register_handler(self, event_type: str, handler: Callable):
        """Register a handler for specific Odoo events."""
        if event_type not in self.event_handlers:
            self.event_handlers[event_type] = []
        self.event_handlers[event_type].append(handler)

    async def start_listening(self):
        """Start listening for Odoo events."""
        while True:
            try:
                events = await self._fetch_events()
                for event in events:
                    await self._process_event(event)
            except Exception as e:
                print(f"Error in event listener: {e}")
            await asyncio.sleep(5)

    async def _fetch_events(self) -> List[Dict[str, Any]]:
        """Fetch new events from Odoo."""
        return self.odoo.models.execute_kw(
            self.odoo.db, self.odoo.uid, self.odoo.password,
            'webrtc.event', 'search_read',
            [[['processed', '=', False]]],
            {'fields': ['type', 'data', 'create_date']}
        )

    async def _process_event(self, event: Dict[str, Any]):
        """Process a single Odoo event."""
        event_type = event.get('type')
        if event_type in self.event_handlers:
            for handler in self.event_handlers[event_type]:
                await handler(event)