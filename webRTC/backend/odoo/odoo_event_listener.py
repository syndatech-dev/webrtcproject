import asyncio
from typing import Dict, Any, Callable, List

class OdooEventListener:
    def __init__(self, odoo_connector: 'OdooConnector'):
        self.odoo = odoo_connector
        self.event_handlers: Dict[str, List[Callable]] = {}

    def register_handler(self, event_type: str, handler: Callable):
        """
        Enregistre un gestionnaire pour un type d'événement spécifique.
        :param event_type: Le type d'événement (ex. 'call_created', 'user_added').
        :param handler: Une fonction qui sera appelée avec l'événement comme argument.
        """
        if event_type not in self.event_handlers:
            self.event_handlers[event_type] = []
        self.event_handlers[event_type].append(handler)

    async def start_listening(self):
        """
        Démarre l'écoute des événements Odoo.
        Cette méthode fonctionne en boucle pour surveiller de nouveaux événements dans Odoo.
        """
        print("Starting Odoo event listener...")
        while True:
            try:
                events = await self._fetch_events()
                for event in events:
                    await self._process_event(event)
            except Exception as e:
                print(f"Error in event listener: {e}")
            await asyncio.sleep(5)  # Pause de 5 secondes avant de vérifier à nouveau.

    async def _fetch_events(self) -> List[Dict[str, Any]]:
        """
        Récupère les nouveaux événements non traités depuis Odoo.
        :return: Une liste de dictionnaires représentant les événements.
        """
        try:
            events = self.odoo.models.execute_kw(
                self.odoo.db, self.odoo.uid, self.odoo.password,
                'webrtc.event', 'search_read',
                [[['processed', '=', False]]],  # Condition pour trouver les événements non traités.
                {'fields': ['id', 'type', 'data', 'create_date']}  # Champs à récupérer.
            )
            return events
        except Exception as e:
            print(f"Failed to fetch events: {e}")
            return []

    async def _process_event(self, event: Dict[str, Any]):
        """
        Traite un événement Odoo individuel.
        :param event: Le dictionnaire contenant les données de l'événement.
        """
        event_type = event.get('type')
        event_id = event.get('id')
        print(f"Processing event {event_id} of type '{event_type}'")

        if event_type in self.event_handlers:
            for handler in self.event_handlers[event_type]:
                try:
                    await handler(event)
                except Exception as e:
                    print(f"Error handling event {event_id}: {e}")

        # Marquer l'événement comme traité dans Odoo
        self._mark_event_processed(event_id)

    def _mark_event_processed(self, event_id: int):
        """
        Marque un événement comme traité dans Odoo pour éviter les doublons.
        :param event_id: L'identifiant de l'événement à mettre à jour.
        """
        try:
            self.odoo.models.execute_kw(
                self.odoo.db, self.odoo.uid, self.odoo.password,
                'webrtc.event', 'write',
                [[event_id], {'processed': True}]
            )
            print(f"Event {event_id} marked as processed.")
        except Exception as e:
            print(f"Failed to mark event {event_id} as processed: {e}")
