class CallManager:
    def initiate_call(self, from_ext, to_ext):
        # Logic to initiate a call
        print(f"Initiating call from {from_ext} to {to_ext}")
        return {"status": "call_initiated"}

    def end_call(self, call_id):
        # Logic to end a call
        print(f"Ending call {call_id}")
        return {"status": "call_ended"}
