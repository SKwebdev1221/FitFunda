from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.alert import Alert
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/", response_model=List[Alert])
async def read_alerts(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    alerts = await db.alerts.find().skip(skip).limit(limit).to_list(length=limit)
    return [Alert(**a) for a in alerts]

@router.post("/", response_model=Alert)
async def create_alert(
    alert: Alert,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_alert = await db.alerts.insert_one(alert.dict(by_alias=True))
    created_alert = await db.alerts.find_one({"_id": new_alert.inserted_id})
    return Alert(**created_alert)

@router.get("/{alert_id}", response_model=Alert)
async def read_alert(
    alert_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    alert = await db.alerts.find_one({"_id": PyObjectId(alert_id)})
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return Alert(**alert)

@router.put("/{alert_id}", response_model=Alert)
async def update_alert(
    alert_id: str,
    alert_in: Alert,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    alert = await db.alerts.find_one({"_id": PyObjectId(alert_id)})
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    update_data = alert_in.dict(exclude_unset=True)
    await db.alerts.update_one(
        {"_id": PyObjectId(alert_id)},
        {"$set": update_data}
    )
    updated_alert = await db.alerts.find_one({"_id": PyObjectId(alert_id)})
    return Alert(**updated_alert)

@router.delete("/{alert_id}")
async def delete_alert(
    alert_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.alerts.delete_one({"_id": PyObjectId(alert_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"status": "success"}
