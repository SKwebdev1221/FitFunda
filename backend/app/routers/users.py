from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database
from app.models.user import User, UserUpdate
from app.dependencies import get_current_user
from app.models.common import PyObjectId

router = APIRouter()

@router.get("/profile", response_model=User)
async def read_user_profile(
    current_user: User = Depends(get_current_user),
) -> Any:
    return current_user

@router.put("/profile", response_model=User)
async def update_user_profile(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    update_data = user_in.dict(exclude_unset=True)
    if update_data:
        await db.users.update_one(
            {"_id": current_user.id},
            {"$set": update_data}
        )
        updated_user = await db.users.find_one({"_id": current_user.id})
        return User(**updated_user)
    return current_user

@router.get("/", response_model=List[User])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    # TODO: Add role check for admin
    users = await db.users.find().skip(skip).limit(limit).to_list(length=limit)
    return [User(**user) for user in users]

@router.get("/{user_id}", response_model=User)
async def read_user_by_id(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    user = await db.users.find_one({"_id": PyObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)
