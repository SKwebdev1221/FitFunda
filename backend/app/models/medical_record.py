from datetime import datetime
from typing import List, Optional, Any
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class MedicalRecord(MongoBaseModel):
    patient_id: PyObjectId
    doctor_id: PyObjectId
    diagnosis: str
    treatment: str
    medications: List[dict] = []
    vitals: List[dict] = []
    notes: Optional[str] = None
    attachments: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
