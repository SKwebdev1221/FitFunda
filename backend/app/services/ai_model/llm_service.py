"""Ollama LLM Integration for Enhanced Reasoning"""
import requests
from typing import Dict, Any, Optional
import json


class OllamaLLMService:
    """Service for interacting with Ollama LLM server"""
    
    def __init__(self, base_url: str = "http://localhost:11434", model: str = "llama3:latest"):
        self.base_url = base_url
        self.model = model
        self.system_prompt = """You are an autonomous healthcare operations AI assistant. 
Provide concise, actionable insights for public health advisories.
Focus on practical recommendations that help people make informed decisions about their health and hospital visits."""
    
    def is_available(self) -> bool:
        """Check if Ollama server is available"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=2)
            return response.status_code == 200
        except:
            return False
    
    def generate_advisory_reasoning(
        self,
        predicted_load: float,
        load_level: str,
        external_factors: Dict[str, Any],
        advisories: list
    ) -> Optional[str]:
        """Generate enhanced reasoning for health advisories using LLM"""
        
        if not self.is_available():
            return None
        
        # Build context for LLM
        context = self._build_context(predicted_load, load_level, external_factors, advisories)
        
        try:
            response = requests.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": context}
                    ],
                    "stream": False
                },
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get('message', {}).get('content', '')
            else:
                return None
                
        except Exception as e:
            print(f"LLM reasoning error: {e}")
            return None
    
    def _build_context(
        self,
        predicted_load: float,
        load_level: str,
        external_factors: Dict[str, Any],
        advisories: list
    ) -> str:
        """Build context for LLM reasoning"""
        
        context = f"""Analyze the following healthcare situation and provide a brief public health advisory (2-3 sentences):

HOSPITAL CAPACITY:
- Expected patient load: {int(predicted_load)} patients
- Load classification: {load_level}

ENVIRONMENTAL FACTORS:
- Air Quality Index (AQI): {external_factors.get('AQI', 'N/A')}
- Temperature: {external_factors.get('temp', 'N/A')}°C
- Epidemic alert level: {external_factors.get('epidemic_alert_level', 0)}

CURRENT ADVISORIES:
"""
        
        if advisories:
            for adv in advisories:
                context += f"- [{adv['severity']}] {adv['message']}\n"
        else:
            context += "- No special advisories\n"
        
        context += """
Provide:
1. A brief risk assessment for the public
2. Key recommendations for staying healthy
3. Guidance on when to seek medical care

Keep your response concise and actionable for the general public."""
        
        return context
    
    def generate_health_tips(self, external_factors: Dict[str, Any]) -> Optional[list]:
        """Generate personalized health tips using LLM"""
        
        if not self.is_available():
            return None
        
        prompt = f"""Based on current environmental conditions, provide 3 specific health tips:

- Air Quality Index: {external_factors.get('AQI', 200)}
- Temperature: {external_factors.get('temp', 25)}°C
- Epidemic alert level: {external_factors.get('epidemic_alert_level', 0)}

Format as a simple list of actionable tips."""
        
        try:
            response = requests.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": self.system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    "stream": False
                },
                timeout=20
            )
            
            if response.status_code == 200:
                result = response.json()
                content = result.get('message', {}).get('content', '')
                # Parse tips from response
                tips = [line.strip('- ').strip() for line in content.split('\n') if line.strip().startswith('-')]
                return tips[:5]  # Return max 5 tips
            else:
                return None
                
        except Exception as e:
            print(f"Health tips generation error: {e}")
            return None
