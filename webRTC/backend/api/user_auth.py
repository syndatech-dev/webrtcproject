class UserAuth:
    def authenticate_sip_user(self, username, password):
        # Logic to authenticate SIP user
        if username == "webrtc_user" and password == "webrtc_password":
            return True
        return False
