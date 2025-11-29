from typing import List, Any
from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/incidents")
async def get_incidents(
    current_user: User = Depends(get_current_user)
) -> Any:
    return []

@router.post("/incidents")
async def create_incident(
    current_user: User = Depends(get_current_user)
) -> Any:
    return {"status": "created"}

@router.get("/ambulances")
async def get_ambulances(
    current_user: User = Depends(get_current_user)
) -> Any:
    return []

@router.get("/protocols")
async def get_protocols(
    current_user: User = Depends(get_current_user)
) -> Any:
    return []
