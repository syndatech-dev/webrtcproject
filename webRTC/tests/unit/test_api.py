import unittest
from backend.api.user_auth import UserAuth

class TestAPI(unittest.TestCase):
    def test_authenticate_user(self):
        auth = UserAuth()
        self.assertTrue(auth.authenticate_sip_user("webrtc_user", "webrtc_password"))
        self.assertFalse(auth.authenticate_sip_user("invalid", "user"))
