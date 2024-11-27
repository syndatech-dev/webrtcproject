import unittest
from backend.api.call_manager import CallManager

class TestSIPClient(unittest.TestCase):
    def test_initiate_call(self):
        manager = CallManager()
        result = manager.initiate_call("1000", "1001")
        self.assertEqual(result["status"], "call_initiated")
