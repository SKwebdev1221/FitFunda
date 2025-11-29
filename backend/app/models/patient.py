from datetime import datetime
from typing import List, Optional
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class Contact(MongoBaseModel):
    phone: str
    email: Optional[str] = None
    address: str

class Patient(MongoBaseModel):
    user_id: Optional[PyObjectId] = None
    name: str
    dob: datetime
    gender: str
    contact: Contact
    medical_history: List[PyObjectId] = []
    emergency_contact: Optional[dict] = None
    blood_type: Optional[str] = None
    allergies: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
