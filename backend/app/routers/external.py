from typing import Any
from fastapi import APIRouter, Depends
from app.services import external_api
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/weather")
async def get_weather(
    lat: float = 0.0,
    lon: float = 0.0,
    current_user: User = Depends(get_current_user)
) -> Any:
    return await external_api.get_weather_data(lat, lon)

@router.get("/aqi")
async def get_aqi(
    lat: float = 0.0,
    lon: float = 0.0,
    current_user: User = Depends(get_current_user)
) -> Any:
    return await external_api.get_aqi_data(lat, lon)

@router.get("/events")
async def get_events(
    country: str = "US",
    year: int = 2023,
    current_user: User = Depends(get_current_user)
) -> Any:
    return await external_api.get_holiday_data(country, year)
