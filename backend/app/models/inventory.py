from datetime import datetime
from typing import Optional, Any
from pydantic import Field
from app.models.common import MongoBaseModel

class InventoryItem(MongoBaseModel):
    item_name: str
    category: str
    quantity: int
    min_threshold: int
    supplier: dict
    expiry_date: Optional[datetime] = None
    storage_location: str
    cost_per_unit: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
