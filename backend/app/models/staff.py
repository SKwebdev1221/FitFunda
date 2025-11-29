from datetime import datetime
from typing import List, Optional, Any
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class Staff(MongoBaseModel):
    user_id: PyObjectId
    employee_id: str
    name: str
    role: str
    department: str
    specialization: Optional[str] = None
    contact: dict
    schedule: List[dict] = []
    certifications: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
