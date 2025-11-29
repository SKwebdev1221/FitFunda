from datetime import datetime
from typing import Optional
from pydantic import Field
from app.models.common import MongoBaseModel, PyObjectId

class Alert(MongoBaseModel):
    title: str
    message: str
    type: str # emergency, warning, info, critical
    priority: str # low, medium, high, critical
    category: str
    department: Optional[str] = None
    acknowledged_by: Optional[PyObjectId] = None
    resolved: bool = False
    resolved_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
