from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.patient import Patient
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/", response_model=List[Patient])
async def read_patients(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    patients = await db.patients.find().skip(skip).limit(limit).to_list(length=limit)
    return [Patient(**p) for p in patients]

@router.post("/", response_model=Patient)
async def create_patient(
    patient: Patient,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_patient = await db.patients.insert_one(patient.dict(by_alias=True))
    created_patient = await db.patients.find_one({"_id": new_patient.inserted_id})
    return Patient(**created_patient)

@router.get("/{patient_id}", response_model=Patient)
async def read_patient(
    patient_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    patient = await db.patients.find_one({"_id": PyObjectId(patient_id)})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return Patient(**patient)

@router.put("/{patient_id}", response_model=Patient)
async def update_patient(
    patient_id: str,
    patient_in: Patient,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    patient = await db.patients.find_one({"_id": PyObjectId(patient_id)})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    update_data = patient_in.dict(exclude_unset=True)
    await db.patients.update_one(
        {"_id": PyObjectId(patient_id)},
        {"$set": update_data}
    )
    updated_patient = await db.patients.find_one({"_id": PyObjectId(patient_id)})
    return Patient(**updated_patient)

@router.delete("/{patient_id}")
async def delete_patient(
    patient_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.patients.delete_one({"_id": PyObjectId(patient_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"status": "success"}
