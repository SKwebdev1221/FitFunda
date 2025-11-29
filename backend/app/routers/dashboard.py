from typing import Any
from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/stats")
async def dashboard_stats(
    current_user: User = Depends(get_current_user)
) -> Any:
    return {
        "total_beds": 290,
        "active_staff": 245,
        "current_patients": 187,
        "emergency_cases": 23,
        "bed_occupancy_rate": 85,
        "staff_on_duty_rate": 92,
        "icu_occupancy": 95,
        "available_beds": 44
    }

@router.get("/predictions")
async def dashboard_predictions(
    current_user: User = Depends(get_current_user)
) -> Any:
    # Mock prediction data for graph
    return [
        {"timestamp": "2023-11-28T00:00:00", "time": "00:00", "patients": 45, "reason": "Normal nighttime baseline", "insight": "Standard overnight activity", "preparation": "Maintain regular staffing"},
        {"timestamp": "2023-11-28T04:00:00", "time": "04:00", "patients": 32, "reason": "Early morning dip", "insight": "Lowest activity period", "preparation": "Minimal emergency response needed"},
        {"timestamp": "2023-11-28T08:00:00", "time": "08:00", "patients": 78, "reason": "Morning commute accidents", "insight": "Traffic-related injuries peak", "preparation": "Extra orthopedic staff on standby"},
        {"timestamp": "2023-11-28T12:00:00", "time": "12:00", "patients": 95, "reason": "Diwali pollution surge", "insight": "Fireworks causing respiratory issues", "preparation": "Stock up on inhalers"},
        {"timestamp": "2023-11-28T16:00:00", "time": "16:00", "patients": 87, "reason": "Post-lunch digestive cases", "insight": "Food-related emergencies", "preparation": "Gastroenterology team ready"},
        {"timestamp": "2023-11-28T20:00:00", "time": "20:00", "patients": 65, "reason": "Evening festivities", "insight": "Firework injuries", "preparation": "Trauma team on high alert"}
    ]

@router.get("/beds")
async def dashboard_beds(
    current_user: User = Depends(get_current_user)
) -> Any:
    return {"available": 20, "occupied": 80}

@router.get("/staff")
async def dashboard_staff(
    current_user: User = Depends(get_current_user)
) -> Any:
    return {"doctors_on_duty": 10, "nurses_on_duty": 20}

@router.get("/alerts")
async def dashboard_alerts(
    current_user: User = Depends(get_current_user)
) -> Any:
    return [
        {
            "_id": "alert1",
            "title": "High Patient Surge Expected",
            "type": "warning",
            "message": "AI predicts 40% increase in emergency admissions over next 24 hours",
            "timestamp": "2024-01-15T10:30:00",
            "priority": "high"
        },
        {
            "_id": "alert2",
            "title": "ICU Capacity Alert",
            "type": "critical",
            "message": "ICU bed occupancy at 95% - prepare contingency plans",
            "timestamp": "2024-01-15T09:15:00",
            "priority": "critical"
        },
        {
            "_id": "alert3",
            "title": "Inventory Low Stock",
            "type": "warning",
            "message": "PPE supplies running low - current stock will last 3 days",
            "timestamp": "2024-01-15T08:00:00",
            "priority": "medium"
        }
    ]

@router.get("/doctor-stats")
async def doctor_stats(
    current_user: User = Depends(get_current_user)
) -> Any:
    return {
        "todays_patients": 24,
        "critical_cases": 3,
        "completed_consultations": 16,
        "avg_consultation_time": "18m"
    }

@router.get("/recommendations")
async def dashboard_recommendations(
    current_user: User = Depends(get_current_user)
) -> Any:
    return [
        {
            "_id": "rec1",
            "title": "Staff Reallocation Recommended",
            "description": "Move 5 nurses from Medical ward to Emergency to handle expected surge",
            "priority": "high",
            "action": "Implement Plan",
            "category": "staffing"
        },
        {
            "_id": "rec2",
            "title": "Supply Procurement Alert",
            "description": "Order additional PPE supplies - current stock will last 3 days",
            "priority": "medium",
            "action": "Create Order",
            "category": "inventory"
        },
        {
            "_id": "rec3",
            "title": "Prepare Additional ICU Beds",
            "description": "Convert 3 general beds to ICU setup based on predicted critical cases",
            "priority": "high",
            "action": "Execute Plan",
            "category": "capacity"
        }
    ]
