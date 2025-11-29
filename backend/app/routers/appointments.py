from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.appointment import Appointment
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/", response_model=List[Appointment])
async def read_appointments(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    appointments = await db.appointments.find().skip(skip).limit(limit).to_list(length=limit)
    return [Appointment(**a) for a in appointments]

@router.post("/", response_model=Appointment)
async def create_appointment(
    appointment: Appointment,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_appointment = await db.appointments.insert_one(appointment.dict(by_alias=True))
    created_appointment = await db.appointments.find_one({"_id": new_appointment.inserted_id})
    return Appointment(**created_appointment)

@router.get("/{appointment_id}", response_model=Appointment)
async def read_appointment(
    appointment_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    appointment = await db.appointments.find_one({"_id": PyObjectId(appointment_id)})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return Appointment(**appointment)

@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(
    appointment_id: str,
    appointment_in: Appointment,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    appointment = await db.appointments.find_one({"_id": PyObjectId(appointment_id)})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    update_data = appointment_in.dict(exclude_unset=True)
    await db.appointments.update_one(
        {"_id": PyObjectId(appointment_id)},
        {"$set": update_data}
    )
    updated_appointment = await db.appointments.find_one({"_id": PyObjectId(appointment_id)})
    return Appointment(**updated_appointment)

@router.delete("/{appointment_id}")
async def delete_appointment(
    appointment_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.appointments.delete_one({"_id": PyObjectId(appointment_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"status": "success"}
