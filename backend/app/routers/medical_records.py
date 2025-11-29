from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.medical_record import MedicalRecord
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/", response_model=List[MedicalRecord])
async def read_medical_records(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    records = await db.medical_records.find().skip(skip).limit(limit).to_list(length=limit)
    return [MedicalRecord(**r) for r in records]

@router.post("/", response_model=MedicalRecord)
async def create_medical_record(
    record: MedicalRecord,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_record = await db.medical_records.insert_one(record.dict(by_alias=True))
    created_record = await db.medical_records.find_one({"_id": new_record.inserted_id})
    return MedicalRecord(**created_record)

@router.get("/{record_id}", response_model=MedicalRecord)
async def read_medical_record(
    record_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    record = await db.medical_records.find_one({"_id": PyObjectId(record_id)})
    if not record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    return MedicalRecord(**record)

@router.put("/{record_id}", response_model=MedicalRecord)
async def update_medical_record(
    record_id: str,
    record_in: MedicalRecord,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    record = await db.medical_records.find_one({"_id": PyObjectId(record_id)})
    if not record:
        raise HTTPException(status_code=404, detail="Medical record not found")
    
    update_data = record_in.dict(exclude_unset=True)
    await db.medical_records.update_one(
        {"_id": PyObjectId(record_id)},
        {"$set": update_data}
    )
    updated_record = await db.medical_records.find_one({"_id": PyObjectId(record_id)})
    return MedicalRecord(**updated_record)

@router.get("/patient/{patient_id}", response_model=List[MedicalRecord])
async def read_patient_records(
    patient_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    records = await db.medical_records.find({"patient_id": PyObjectId(patient_id)}).to_list(length=100)
    return [MedicalRecord(**r) for r in records]
