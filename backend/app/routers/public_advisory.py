"""Public Advisory API Router"""
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime, timedelta
import os

from app.models.advisory import (
    CurrentAdvisoryResponse,
    WeeklyForecastResponse,
    HealthRisksResponse,
    ModelInfoResponse,
    EnvironmentalFactors,
    HealthAdvisory,
    PatientLoadPrediction,
    ForecastDay
)
from app.services.ai_model.predictor import PatientLoadPredictor
from app.services.ai_model.decision_engine import AutonomousDecisionEngine
from app.services.ai_model.llm_service import OllamaLLMService

router = APIRouter(prefix="/api/public-advisory", tags=["Public Advisory"])

# Initialize services
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../services/ai_model/models/patient_predictor.pkl")
predictor = PatientLoadPredictor(model_path=MODEL_PATH if os.path.exists(MODEL_PATH) else None)
decision_engine = AutonomousDecisionEngine()
llm_service = OllamaLLMService()


def get_mock_historical_data() -> dict:
    """Get mock historical data for lag features"""
    # In production, this would fetch from database
    return {
        'lag1': 320,
        'lag2': 315,
        'lag7': 310,
        'roll7': 318
    }


def get_current_environmental_factors() -> dict:
    """Get current environmental factors"""
    # In production, this would fetch from weather API and database
    now = datetime.now()
    
    # Mock data - replace with real API calls
    return {
        'AQI': 220,  # Would come from air quality API
        'temp': 28,  # Would come from weather API
        'rainfall': 0,
        'epidemic_alert_level': 0,  # Would come from health department database
        'holiday_flag': 0,  # Would check calendar
        'festival_flag': 0
    }


@router.get("/current", response_model=CurrentAdvisoryResponse)
async def get_current_advisory():
    """Get current day health advisory with AI predictions"""
    try:
        current_date = datetime.now()
        
        # Get environmental factors
        env_factors = get_current_environmental_factors()
        
        # Get historical data for lag features
        historical_data = get_mock_historical_data()
        
        # Make prediction
        prediction_result = predictor.predict_patient_load(
            current_date,
            env_factors,
            historical_data
        )
        
        # Classify load
        load_level = decision_engine.classify_load(prediction_result['prediction'])
        
        # Generate advisories
        advisories = decision_engine.generate_patient_advisory(
            prediction_result['prediction'],
            env_factors
        )
        
        # Get health tips
        health_tips = decision_engine.get_health_tips(load_level, env_factors)
        
        # Try to get LLM reasoning (optional)
        llm_reasoning = None
        if llm_service.is_available():
            llm_reasoning = llm_service.generate_advisory_reasoning(
                prediction_result['prediction'],
                load_level,
                env_factors,
                advisories
            )
            
            # Get enhanced health tips from LLM
            llm_tips = llm_service.generate_health_tips(env_factors)
            if llm_tips:
                health_tips.extend(llm_tips)
        
        # Build response
        return CurrentAdvisoryResponse(
            date=current_date.strftime('%Y-%m-%d'),
            patient_load=PatientLoadPrediction(
                prediction=prediction_result['prediction'],
                load_level=load_level,
                confidence_interval=prediction_result['confidence_interval'],
                date=prediction_result['date']
            ),
            environmental_factors=EnvironmentalFactors(**env_factors),
            advisories=[HealthAdvisory(**adv) for adv in advisories],
            health_tips=health_tips[:8],  # Limit to 8 tips
            llm_reasoning=llm_reasoning
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating advisory: {str(e)}")


@router.get("/forecast", response_model=WeeklyForecastResponse)
async def get_weekly_forecast(days: int = Query(default=7, ge=1, le=14)):
    """Get multi-day forecast"""
    try:
        forecast_days = []
        current_date = datetime.now()
        
        # Get base environmental factors
        base_env = get_current_environmental_factors()
        historical_data = get_mock_historical_data()
        
        for day_offset in range(days):
            forecast_date = current_date + timedelta(days=day_offset)
            
            # Simulate environmental changes (in production, use weather forecast API)
            env_factors = base_env.copy()
            env_factors['AQI'] = base_env['AQI'] + (day_offset * 5) % 100  # Simulated variation
            env_factors['temp'] = base_env['temp'] + (day_offset % 3) - 1  # Small variation
            
            # Make prediction
            prediction = predictor.predict_patient_load(
                forecast_date,
                env_factors,
                historical_data
            )
            
            load_level = decision_engine.classify_load(prediction['prediction'])
            
            # Generate key advisory
            advisories = decision_engine.generate_patient_advisory(
                prediction['prediction'],
                env_factors
            )
            key_advisory = advisories[0]['message'] if advisories else None
            
            forecast_days.append(ForecastDay(
                date=forecast_date.strftime('%Y-%m-%d'),
                predicted_patients=prediction['prediction'],
                load_level=load_level,
                aqi=env_factors['AQI'],
                temp=env_factors['temp'],
                epidemic_alert=env_factors['epidemic_alert_level'],
                key_advisory=key_advisory
            ))
            
            # Update historical data for next prediction
            historical_data['lag7'] = historical_data['lag2']
            historical_data['lag2'] = historical_data['lag1']
            historical_data['lag1'] = prediction['prediction']
            historical_data['roll7'] = (historical_data['roll7'] * 6 + prediction['prediction']) / 7
        
        # Calculate trends
        trends = {
            'patient_load_trend': 'increasing' if forecast_days[-1].predicted_patients > forecast_days[0].predicted_patients else 'decreasing',
            'aqi_trend': 'increasing' if forecast_days[-1].aqi > forecast_days[0].aqi else 'decreasing',
            'peak_day': max(forecast_days, key=lambda x: x.predicted_patients).date,
            'lowest_day': min(forecast_days, key=lambda x: x.predicted_patients).date
        }
        
        return WeeklyForecastResponse(
            forecast=forecast_days,
            trends=trends
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {str(e)}")


@router.get("/health-risks", response_model=HealthRisksResponse)
async def get_current_health_risks():
    """Get current health risks and recommendations"""
    try:
        env_factors = get_current_environmental_factors()
        historical_data = get_mock_historical_data()
        current_date = datetime.now()
        
        # Make prediction
        prediction = predictor.predict_patient_load(current_date, env_factors, historical_data)
        load_level = decision_engine.classify_load(prediction['prediction'])
        
        # Build risk assessment
        risks = []
        
        # Hospital capacity risk
        if load_level in ['HIGH', 'CRITICAL']:
            risks.append({
                'title': 'High Hospital Capacity',
                'severity': load_level,
                'description': f'Expected {int(prediction["prediction"])} patients. Longer wait times anticipated.',
                'icon': '🏥'
            })
        
        # Air quality risk
        aqi = env_factors['AQI']
        if aqi > 200:
            severity = 'CRITICAL' if aqi > 300 else 'HIGH'
            risks.append({
                'title': 'Poor Air Quality',
                'severity': severity,
                'description': f'AQI at {aqi}. Respiratory issues may increase.',
                'icon': '🏭'
            })
        
        # Epidemic risk
        if env_factors['epidemic_alert_level'] > 0:
            risks.append({
                'title': 'Epidemic Alert',
                'severity': 'CRITICAL' if env_factors['epidemic_alert_level'] >= 2 else 'MEDIUM',
                'description': f'Alert level {env_factors["epidemic_alert_level"]}. Follow safety protocols.',
                'icon': '🦠'
            })
        
        # Determine overall risk level
        if any(r['severity'] == 'CRITICAL' for r in risks):
            overall_risk = 'CRITICAL'
        elif any(r['severity'] == 'HIGH' for r in risks):
            overall_risk = 'HIGH'
        elif risks:
            overall_risk = 'MEDIUM'
        else:
            overall_risk = 'LOW'
        
        # Get recommendations
        recommendations = decision_engine.get_health_tips(load_level, env_factors)
        
        return HealthRisksResponse(
            current_risks=risks,
            risk_level=overall_risk,
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error assessing health risks: {str(e)}")


@router.get("/model-info", response_model=ModelInfoResponse)
async def get_model_info():
    """Get AI model information and status"""
    try:
        return ModelInfoResponse(
            model_loaded=predictor.model is not None,
            llm_available=llm_service.is_available(),
            last_training_date="2024-12-31",  # Would come from model metadata
            feature_importance=predictor.get_feature_importance()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting model info: {str(e)}")


@router.get("/environmental-factors", response_model=EnvironmentalFactors)
async def get_environmental_factors():
    """Get current environmental factors"""
    try:
        env_factors = get_current_environmental_factors()
        return EnvironmentalFactors(**env_factors)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting environmental factors: {str(e)}")
