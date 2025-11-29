from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core import security
from app.core.config import settings
from app.core.database import get_database
from app.models.user import User, UserCreate
from app.schemas.token import Token
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    user = await db.users.find_one({"email": form_data.username})
    if not user or not security.verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user["email"], "role": user["role"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", response_model=User)
async def register_user(
    user_in: UserCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
) -> Any:
    # Validate password length (bcrypt has 72-byte limit, but we'll enforce reasonable limit)
    if len(user_in.password) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password cannot be longer than 72 characters.",
        )
    if len(user_in.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters long.",
        )
    
    user = await db.users.find_one({"email": user_in.email})
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    try:
        user_data = user_in.model_dump()
        password = user_data.pop("password")
        
        # Hash the password
        try:
            user_data["hashed_password"] = security.get_password_hash(password)
        except Exception as hash_error:
            print(f"Password hashing error: {hash_error}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to hash password: {str(hash_error)}"
            )
        
        # Create user object
        try:
            new_user = User(**user_data)
        except Exception as user_error:
            print(f"User creation error: {user_error}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to create user object: {str(user_error)}"
            )
        
        # Insert into database
        try:
            # Convert to dict for MongoDB insertion, exclude the id field as MongoDB will generate it
            user_dict = new_user.model_dump(by_alias=True)
            # Remove _id if it exists (MongoDB will generate a new one)
            if "_id" in user_dict:
                del user_dict["_id"]
            result = await db.users.insert_one(user_dict)
            # Fetch the created user to return
            created_user = await db.users.find_one({"_id": result.inserted_id})
            if created_user:
                return User(**created_user)
            else:
                raise HTTPException(
                    status_code=500,
                    detail="User created but could not be retrieved"
                )
        except Exception as db_error:
            print(f"Database insertion error: {db_error}")
            import traceback
            traceback.print_exc()
            raise HTTPException(
                status_code=500,
                detail=f"Failed to insert user into database: {str(db_error)}"
            )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in registration: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create user: {str(e)}"
        )

@router.get("/validate", response_model=User)
async def validate_token(
    current_user: User = Depends(get_current_user)
) -> Any:
    return current_user
