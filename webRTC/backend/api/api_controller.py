# backend/api/api_controller.py
from flask import Flask, request, jsonify
from typing import Dict, Any

app = Flask(__name__)

class APIController:
    def __init__(self, call_manager, sip_registration):
        self.call_manager = call_manager
        self.sip_registration = sip_registration

    @app.route('/api/register', methods=['POST'])
    def register_client(self) -> Dict[str, Any]:
        data = request.json
        result = self.sip_registration.register_client(
            data.get('username'),
            data.get('password')
        )
        return jsonify(result)

    @app.route('/api/call', methods=['POST'])
    def initiate_call(self) -> Dict[str, Any]:
        data = request.json
        result = self.call_manager.initiate_call(
            data.get('from_extension'),
            data.get('to_number')
        )
        return jsonify(result)