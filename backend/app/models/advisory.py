"""Pydantic models for Public Advisory API"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class EnvironmentalFactors(BaseModel):
    """Current environmental conditions"""
    AQI: int = Field(..., description="Air Quality Index", ge=0, le=500)
    temp: float = Field(..., description="Temperature in Celsius")
    rainfall: float = Field(default=0, description="Rainfall in mm", ge=0)
    epidemic_alert_level: int = Field(default=0, description="Epidemic alert level (0-3)", ge=0, le=3)
    holiday_flag: int = Field(default=0, description="Is it a holiday? (0 or 1)")
    festival_flag: int = Field(default=0, description="Is it a festival? (0 or 1)")


class HealthAdvisory(BaseModel):
    """Health advisory message"""
    type: str = Field(..., description="Advisory type (CAPACITY_WARNING, AIR_QUALITY, EPIDEMIC_ALERT, etc.)")
    severity: str = Field(..., description="Severity level (LOW, MEDIUM, HIGH, CRITICAL)")
    message: str = Field(..., description="Advisory message")
    recommendation: str = Field(..., description="Recommended actions")
    icon: str = Field(..., description="Emoji icon for the advisory")


class PatientLoadPrediction(BaseModel):
    """Patient load prediction result"""
    prediction: float = Field(..., description="Predicted number of patients")
    load_level: str = Field(..., description="Load classification (LOW, NORMAL, HIGH, CRITICAL)")
    confidence_interval: Dict[str, float] = Field(..., description="Prediction confidence interval")
    date: str = Field(..., description="Date of prediction (YYYY-MM-DD)")


class CurrentAdvisoryResponse(BaseModel):
    """Response for current day advisory"""
    date: str = Field(..., description="Current date (YYYY-MM-DD)")
    patient_load: PatientLoadPrediction
    environmental_factors: EnvironmentalFactors
    advisories: List[HealthAdvisory]
    health_tips: List[str] = Field(default_factory=list, description="General health tips")
    llm_reasoning: Optional[str] = Field(None, description="Enhanced reasoning from LLM (if available)")
    last_updated: datetime = Field(default_factory=datetime.now, description="Last update timestamp")


class ForecastDay(BaseModel):
    """Single day forecast"""
    date: str = Field(..., description="Forecast date (YYYY-MM-DD)")
    predicted_patients: float = Field(..., description="Predicted patient count")
    load_level: str = Field(..., description="Expected load level")
    aqi: int = Field(..., description="Forecasted AQI")
    temp: float = Field(..., description="Forecasted temperature")
    epidemic_alert: int = Field(..., description="Epidemic alert level")
    key_advisory: Optional[str] = Field(None, description="Key advisory for the day")


class WeeklyForecastResponse(BaseModel):
    """7-day forecast response"""
    forecast: List[ForecastDay] = Field(..., description="7-day forecast")
    trends: Dict[str, Any] = Field(default_factory=dict, description="Trend analysis")
    generated_at: datetime = Field(default_factory=datetime.now, description="Forecast generation time")


class HealthRisksResponse(BaseModel):
    """Current health risks response"""
    current_risks: List[Dict[str, Any]] = Field(..., description="List of current health risks")
    risk_level: str = Field(..., description="Overall risk level")
    recommendations: List[str] = Field(..., description="General recommendations")


class ModelInfoResponse(BaseModel):
    """Model information and status"""
    model_loaded: bool = Field(..., description="Is the ML model loaded?")
    llm_available: bool = Field(..., description="Is LLM service available?")
    last_training_date: Optional[str] = Field(None, description="Last model training date")
    feature_importance: Dict[str, float] = Field(default_factory=dict, description="Feature importance scores")
