from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.staff import Staff
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/readiness")
async def get_staff_readiness(
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    pipeline = [
        {
            "$group": {
                "_id": "$role",
                "total": {"$sum": 1}
            }
        }
    ]
    stats = await db.staff.aggregate(pipeline).to_list(length=None)
    # Mocking onDuty and available for now as they depend on complex scheduling logic
    result = []
    for s in stats:
        total = s["total"]
        # Mock percentages
        on_duty = int(total * 0.8)
        available = int(total * 0.6)
        result.append({
            "name": s["_id"].title(), # Capitalize role
            "total": total,
            "onDuty": on_duty,
            "available": available
        })
    return result

@router.get("/", response_model=List[Staff])
async def read_staff(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    staff_members = await db.staff.find().skip(skip).limit(limit).to_list(length=limit)
    return [Staff(**s) for s in staff_members]

@router.post("/", response_model=Staff)
async def create_staff(
    staff: Staff,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_staff = await db.staff.insert_one(staff.dict(by_alias=True))
    created_staff = await db.staff.find_one({"_id": new_staff.inserted_id})
    return Staff(**created_staff)

@router.get("/{staff_id}", response_model=Staff)
async def read_staff_member(
    staff_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    staff = await db.staff.find_one({"_id": PyObjectId(staff_id)})
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    return Staff(**staff)

@router.put("/{staff_id}", response_model=Staff)
async def update_staff(
    staff_id: str,
    staff_in: Staff,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    staff = await db.staff.find_one({"_id": PyObjectId(staff_id)})
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    
    update_data = staff_in.dict(exclude_unset=True)
    await db.staff.update_one(
        {"_id": PyObjectId(staff_id)},
        {"$set": update_data}
    )
    updated_staff = await db.staff.find_one({"_id": PyObjectId(staff_id)})
    return Staff(**updated_staff)

@router.delete("/{staff_id}")
async def delete_staff(
    staff_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.staff.delete_one({"_id": PyObjectId(staff_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Staff member not found")
    return {"status": "success"}
