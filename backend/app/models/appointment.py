from datetime import datetime
from typing import Optional
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class Appointment(MongoBaseModel):
    patient_id: PyObjectId
    doctor_id: PyObjectId
    date_time: datetime
    department: str
    status: str # scheduled, completed, cancelled, rescheduled
    purpose: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
