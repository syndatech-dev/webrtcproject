class SipCallHistory:
    def __init__(self, call_id, source, destination, timestamp, status):
        self.call_id = call_id
        self.source = source
        self.destination = destination
        self.timestamp = timestamp
        self.status = status

    @staticmethod
    def from_dict(data):
        """Créer un objet SipCallHistory à partir d'un dictionnaire."""
        return SipCallHistory(
            call_id=data.get("call_id"),
            source=data.get("source"),
            destination=data.get("destination"),
            timestamp=data.get("timestamp"),
            status=data.get("status"),
        )
