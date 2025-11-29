from datetime import datetime
from typing import List, Optional, Any
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class Bed(MongoBaseModel):
    bed_number: str
    room_number: str
    department: str
    status: str # available, occupied, maintenance
    patient_id: Optional[PyObjectId] = None
    assigned_staff: List[PyObjectId] = []
    features: dict = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
