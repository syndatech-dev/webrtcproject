# backend/api/api_controller.py
from fastapi import FastAPI, HTTPException, Depends
from typing import Dict, Any
from .sip_registration import SIPRegistration
from .utils import get_current_user

app = FastAPI()
sip_registration = SIPRegistration()

@app.post("/api/register")
async def register_client(registration_data: Dict[str, Any], current_user = Depends(get_current_user)):
    """Register a WebRTC client with SIP credentials."""
    try:
        result = await sip_registration.register(
            username=current_user['username'],
            extension=registration_data['extension']
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/call")
async def initiate_call(call_data: Dict[str, Any], current_user = Depends(get_current_user)):
    """Initiate a new call."""
    try:
        # Implement call initiation logic
        return {"status": "success", "call_id": "generated_id"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))