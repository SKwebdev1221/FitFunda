from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.inventory import InventoryItem
from app.dependencies import get_current_user
from app.models.user import User
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/", response_model=List[InventoryItem])
async def read_inventory(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    items = await db.inventory.find().skip(skip).limit(limit).to_list(length=limit)
    return [InventoryItem(**i) for i in items]

@router.post("/", response_model=InventoryItem)
async def create_inventory_item(
    item: InventoryItem,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    new_item = await db.inventory.insert_one(item.dict(by_alias=True))
    created_item = await db.inventory.find_one({"_id": new_item.inserted_id})
    return InventoryItem(**created_item)

@router.get("/{item_id}", response_model=InventoryItem)
async def read_inventory_item(
    item_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    item = await db.inventory.find_one({"_id": PyObjectId(item_id)})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return InventoryItem(**item)

@router.put("/{item_id}", response_model=InventoryItem)
async def update_inventory_item(
    item_id: str,
    item_in: InventoryItem,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    item = await db.inventory.find_one({"_id": PyObjectId(item_id)})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item_in.dict(exclude_unset=True)
    await db.inventory.update_one(
        {"_id": PyObjectId(item_id)},
        {"$set": update_data}
    )
    updated_item = await db.inventory.find_one({"_id": PyObjectId(item_id)})
    return InventoryItem(**updated_item)

@router.delete("/{item_id}")
async def delete_inventory_item(
    item_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    result = await db.inventory.delete_one({"_id": PyObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"status": "success"}
