import asyncio
from typing import Callable, Dict, Any, List


class FreePBXEventHandler:
    def __init__(self):
        self.event_callbacks: Dict[str, List[Callable]] = {}

    def register_callback(self, event_type: str, callback: Callable):
        """
        Enregistre un callback pour un type d'événement spécifique.
        :param event_type: Type d'événement (ex: 'NewCall', 'Hangup', 'Dial').
        :param callback: Une fonction à appeler avec l'événement comme argument.
        """
        if event_type not in self.event_callbacks:
            self.event_callbacks[event_type] = []
        self.event_callbacks[event_type].append(callback)

    async def handle_event(self, event: Dict[str, Any]):
        """
        Gère un événement FreePBX entrant.
        :param event: Dictionnaire contenant les données de l'événement.
        """
        event_type = event.get('type')
        print(f"Handling event of type: {event_type}")
        if event_type in self.event_callbacks:
            for callback in self.event_callbacks[event_type]:
                try:
                    await callback(event)
                except Exception as e:
                    print(f"Error in callback for event '{event_type}': {e}")

    def process_raw_event(self, raw_event: str) -> Dict[str, Any]:
        """
        Convertit un événement brut (souvent sous forme de chaîne) en un dictionnaire Python.
        :param raw_event: Événement brut reçu, typiquement une chaîne ou des données JSON.
        :return: Dictionnaire Python représentant l'événement.
        """
        try:
            event = {}
            lines = raw_event.strip().split('\n')
            for line in lines:
                if ':' in line:
                    key, value = line.split(':', 1)
                    event[key.strip()] = value.strip()
            return event
        except Exception as e:
            print(f"Error parsing raw event: {e}")
            return {}

    async def listen_to_events(self, event_source: Callable[[], str]):
        """
        Écoute en continu les événements FreePBX depuis une source.
        :param event_source: Une fonction ou coroutine qui fournit les événements (souvent une connexion AMI).
        """
        print("Listening to FreePBX events...")
        while True:
            try:
                raw_event = await event_source()
                event = self.process_raw_event(raw_event)
                await self.handle_event(event)
            except Exception as e:
                print(f"Error while listening to events: {e}")
                await asyncio.sleep(5)  # Pause avant de réessayer en cas d'erreur.


# Exemple d'utilisation
# def handle_event(event):
#     print(f"Event received: {event}")

# handler = EventHandler("http://freepbx.local", "admin", "password")
# handler.listen_to_events(handle_event)
