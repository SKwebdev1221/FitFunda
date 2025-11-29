"""Decision Engine for Healthcare Advisories"""
import numpy as np
from typing import Dict, List, Any
from datetime import datetime


class AutonomousDecisionEngine:
    """Makes decisions based on predictions and thresholds"""
    
    def __init__(self):
        # Thresholds for different alert levels
        self.thresholds = {
            'low': 300,
            'normal': 400,
            'high': 500,
            'critical': 600
        }
        
        # Staffing ratios (patients per staff member)
        self.staffing_ratios = {
            'doctors': 50,      # 1 doctor per 50 patients
            'nurses': 20,       # 1 nurse per 20 patients
            'support': 40       # 1 support staff per 40 patients
        }
        
        # Supply usage rates (per patient per day)
        self.supply_rates = {
            'oxygen_cylinder': 0.08,
            'nebulizer_session': 0.05,
            'inhaler': 0.25,
            'paracetamol_strip': 0.7,
            'PPE_kit': 0.5,
            'masks': 1.5,
            'gloves': 3.0
        }
        
        # Safety stock days
        self.safety_stock_days = 7
    
    def classify_load(self, predicted_patients: float) -> str:
        """Classify predicted patient load"""
        if predicted_patients < self.thresholds['low']:
            return 'LOW'
        elif predicted_patients < self.thresholds['normal']:
            return 'NORMAL'
        elif predicted_patients < self.thresholds['high']:
            return 'HIGH'
        else:
            return 'CRITICAL'
    
    def recommend_staffing(self, predicted_patients: float) -> Dict[str, Dict[str, int]]:
        """Calculate recommended staffing levels"""
        recommendations = {}
        
        # Calculate required staff
        doctors_needed = max(4, int(np.ceil(predicted_patients / self.staffing_ratios['doctors'])))
        nurses_needed = max(8, int(np.ceil(predicted_patients / self.staffing_ratios['nurses'])))
        support_needed = max(4, int(np.ceil(predicted_patients / self.staffing_ratios['support'])))
        
        # Distribute across shifts (rough distribution)
        recommendations['morning'] = {
            'doctors': int(doctors_needed * 0.4),
            'nurses': int(nurses_needed * 0.4),
            'support': int(support_needed * 0.4)
        }
        recommendations['evening'] = {
            'doctors': int(doctors_needed * 0.35),
            'nurses': int(nurses_needed * 0.35),
            'support': int(support_needed * 0.35)
        }
        recommendations['night'] = {
            'doctors': doctors_needed - recommendations['morning']['doctors'] - recommendations['evening']['doctors'],
            'nurses': nurses_needed - recommendations['morning']['nurses'] - recommendations['evening']['nurses'],
            'support': support_needed - recommendations['morning']['support'] - recommendations['evening']['support']
        }
        
        return recommendations
    
    def generate_patient_advisory(self, predicted_patients: float, external_factors: Dict[str, Any]) -> List[Dict[str, str]]:
        """Generate patient advisory messages"""
        advisories = []
        
        load_level = self.classify_load(predicted_patients)
        
        # High load advisory
        if load_level in ['HIGH', 'CRITICAL']:
            advisories.append({
                'type': 'CAPACITY_WARNING',
                'severity': 'HIGH' if load_level == 'CRITICAL' else 'MEDIUM',
                'message': f"Expected high patient volume ({int(predicted_patients)} patients). Non-emergency cases may experience longer wait times.",
                'recommendation': "Defer non-urgent visits if possible. Call ahead to schedule appointments.",
                'icon': '⚠️'
            })
        
        # AQI advisory
        aqi = external_factors.get('AQI', 0)
        if aqi > 250:
            severity = 'CRITICAL' if aqi > 350 else 'HIGH'
            advisories.append({
                'type': 'AIR_QUALITY',
                'severity': severity,
                'message': f"Poor air quality (AQI: {aqi}). Increased respiratory cases expected.",
                'recommendation': "Avoid outdoor activities. Wear N95 masks. Vulnerable populations should stay indoors.",
                'icon': '🏭'
            })
        elif aqi > 150:
            advisories.append({
                'type': 'AIR_QUALITY',
                'severity': 'MEDIUM',
                'message': f"Moderate air quality (AQI: {aqi}). Sensitive groups may be affected.",
                'recommendation': "Limit prolonged outdoor exertion. Consider wearing masks if sensitive to air pollution.",
                'icon': '🌫️'
            })
        
        # Epidemic advisory
        epidemic_level = external_factors.get('epidemic_alert_level', 0)
        if epidemic_level >= 2:
            advisories.append({
                'type': 'EPIDEMIC_ALERT',
                'severity': 'CRITICAL',
                'message': f"Epidemic alert level {epidemic_level}. Follow safety protocols.",
                'recommendation': "Maintain social distancing. Wear masks. Get vaccinated. Seek medical attention if symptomatic.",
                'icon': '🦠'
            })
        elif epidemic_level == 1:
            advisories.append({
                'type': 'EPIDEMIC_ALERT',
                'severity': 'MEDIUM',
                'message': f"Epidemic alert level {epidemic_level}. Increased vigilance recommended.",
                'recommendation': "Practice good hygiene. Monitor for symptoms. Consider vaccination if eligible.",
                'icon': '🦠'
            })
        
        # Temperature advisory
        temp = external_factors.get('temp', 25)
        if temp > 35:
            advisories.append({
                'type': 'HEAT_WARNING',
                'severity': 'HIGH',
                'message': f"Extreme heat warning (Temperature: {temp}°C). Risk of heat-related illnesses.",
                'recommendation': "Stay hydrated. Avoid outdoor activities during peak hours. Seek cool environments.",
                'icon': '🌡️'
            })
        elif temp < 10:
            advisories.append({
                'type': 'COLD_WARNING',
                'severity': 'MEDIUM',
                'message': f"Cold weather alert (Temperature: {temp}°C). Risk of cold-related illnesses.",
                'recommendation': "Dress warmly. Protect extremities. Be aware of hypothermia symptoms.",
                'icon': '❄️'
            })
        
        return advisories
    
    def get_health_tips(self, load_level: str, external_factors: Dict[str, Any]) -> List[str]:
        """Generate general health tips based on conditions"""
        tips = []
        
        # General tips based on load
        if load_level in ['HIGH', 'CRITICAL']:
            tips.append("Consider telemedicine consultations for non-urgent issues")
            tips.append("Have your medical records ready if visiting the hospital")
        
        # AQI-based tips
        aqi = external_factors.get('AQI', 0)
        if aqi > 200:
            tips.append("Keep windows closed and use air purifiers if available")
            tips.append("Monitor children and elderly for respiratory symptoms")
        
        # Epidemic tips
        if external_factors.get('epidemic_alert_level', 0) > 0:
            tips.append("Wash hands frequently with soap and water")
            tips.append("Avoid crowded places when possible")
        
        # General wellness
        tips.append("Maintain a healthy diet and regular exercise routine")
        tips.append("Ensure adequate sleep and stress management")
        
        return tips
