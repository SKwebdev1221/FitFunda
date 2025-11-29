import httpx
from app.core.config import settings

async def get_weather_data(lat: float, lon: float):
    # Mock or real implementation
    if not settings.OPENWEATHER_API_KEY:
        return {"temp": 25, "condition": "Sunny (Mock)"}
    
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={settings.OPENWEATHER_API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        return {"error": "Failed to fetch weather data"}

async def get_aqi_data(lat: float, lon: float):
    if not settings.AQICN_API_KEY:
        return {"aqi": 50, "status": "Good (Mock)"}
    
    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/?token={settings.AQICN_API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.json()
        return {"error": "Failed to fetch AQI data"}

async def get_holiday_data(country: str, year: int):
    # Mock
    return [{"date": f"{year}-12-25", "name": "Christmas"}]
