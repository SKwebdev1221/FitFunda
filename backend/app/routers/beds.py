from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.bed import Bed
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/stats")
async def get_bed_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    pipeline = [
        {
            "$group": {
                "_id": "$department",
                "total": {"$sum": 1},
                "occupied": {
                    "$sum": {
                        "$cond": [{"$eq": ["$status", "occupied"]}, 1, 0]
                    }
                }
            }
        }
    ]
    stats = await db.beds.aggregate(pipeline).to_list(length=None)
    # Format for frontend: [{name: 'Dept', total: 10, occupied: 5}, ...]
    return [{"name": s["_id"], "total": s["total"], "occupied": s["occupied"]} for s in stats]

@router.get("/", response_model=List[Bed])
async def read_beds(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    beds = await db.beds.find().skip(skip).limit(limit).to_list(length=limit)
    return [Bed(**b) for b in beds]

@router.post("/", response_model=Bed)
async def create_bed(
    bed: Bed,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_bed = await db.beds.insert_one(bed.dict(by_alias=True))
    created_bed = await db.beds.find_one({"_id": new_bed.inserted_id})
    return Bed(**created_bed)

@router.get("/{bed_id}", response_model=Bed)
async def read_bed(
    bed_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    bed = await db.beds.find_one({"_id": PyObjectId(bed_id)})
    if not bed:
        raise HTTPException(status_code=404, detail="Bed not found")
    return Bed(**bed)

@router.put("/{bed_id}", response_model=Bed)
async def update_bed(
    bed_id: str,
    bed_in: Bed,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    bed = await db.beds.find_one({"_id": PyObjectId(bed_id)})
    if not bed:
        raise HTTPException(status_code=404, detail="Bed not found")
    
    update_data = bed_in.dict(exclude_unset=True)
    await db.beds.update_one(
        {"_id": PyObjectId(bed_id)},
        {"$set": update_data}
    )
    updated_bed = await db.beds.find_one({"_id": PyObjectId(bed_id)})
    return Bed(**updated_bed)

@router.delete("/{bed_id}")
async def delete_bed(
    bed_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.beds.delete_one({"_id": PyObjectId(bed_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Bed not found")
    return {"status": "success"}
