from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field
from app.models.common import MongoBaseModel

class User(MongoBaseModel):
    email: EmailStr
    hashed_password: str
    name: str
    role: str  # management, doctor, nurse, inventory, emergency, patient
    profile: Optional[dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str
    profile: Optional[dict[str, Any]] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    profile: Optional[dict[str, Any]] = None
    last_login: Optional[datetime] = None

class UserInDB(User):
    pass
