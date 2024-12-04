import requests

class SipClientController:
    BASE_URL = "http://localhost:5000/api"  # Remplacez par l'URL de votre backend

    @staticmethod
    def register_user(username, password):
        """Inscription d'un utilisateur SIP."""
        payload = {"username": username, "password": password}
        response = requests.post(f"{SipClientController.BASE_URL}/register", json=payload)
        return response.json()

    @staticmethod
    def make_call(source, destination):
        """Passer un appel SIP."""
        payload = {"source": source, "destination": destination}
        response = requests.post(f"{SipClientController.BASE_URL}/call", json=payload)
        return response.json()

    @staticmethod
    def get_call_history(username):
        """Récupérer l'historique des appels d'un utilisateur."""
        response = requests.get(f"{SipClientController.BASE_URL}/history/{username}")
        return response.json()

    @staticmethod
    def end_call(call_id):
        """Terminer un appel actif."""
        payload = {"call_id": call_id}
        response = requests.post(f"{SipClientController.BASE_URL}/end_call", json=payload)
        return response.json()
