"""ML Predictor for Patient Load Forecasting"""
import numpy as np
import pickle
import os
from typing import Dict, Any, Optional
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor


class PatientLoadPredictor:
    """Predicts patient load using Random Forest model"""
    
    def __init__(self, model_path: Optional[str] = None):
        self.model = None
        self.feature_cols = [
            "holiday_flag", "festival_flag", "AQI", "high_AQI_flag",
            "temp", "rainfall", "epidemic_alert_level", "month", "is_weekend",
            "patients_lag1", "patients_lag2", "patients_lag7", "patients_roll7"
        ]
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        else:
            # Initialize with default model
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            )
    
    def load_model(self, model_path: str):
        """Load trained model from file"""
        try:
            with open(model_path, 'rb') as f:
                self.model = pickle.load(f)
            print(f"✓ Model loaded from {model_path}")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            # Initialize default model
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            )
    
    def save_model(self, model_path: str):
        """Save trained model to file"""
        try:
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            with open(model_path, 'wb') as f:
                pickle.dump(self.model, f)
            print(f"✓ Model saved to {model_path}")
        except Exception as e:
            print(f"❌ Error saving model: {e}")
    
    def predict_patient_load(
        self, 
        date: datetime, 
        external_data: Dict[str, Any], 
        historical_data: Dict[str, float]
    ) -> Dict[str, Any]:
        """
        Predict patient load for a given date
        
        Args:
            date: datetime for prediction
            external_data: dict with AQI, temp, rainfall, epidemic_alert_level
            historical_data: recent patient counts for lag features
        
        Returns:
            dict with prediction, confidence_interval, and features_used
        """
        # Extract features
        features = self._extract_features(date, external_data, historical_data)
        
        # Make prediction
        X_pred = np.array(features).reshape(1, -1)
        prediction = self.model.predict(X_pred)[0]
        
        # Calculate confidence interval (using tree predictions)
        if hasattr(self.model, 'estimators_'):
            tree_predictions = np.array([tree.predict(X_pred)[0] for tree in self.model.estimators_])
            std_dev = np.std(tree_predictions)
            confidence_interval = {
                'lower': max(0, prediction - 1.96 * std_dev),
                'upper': prediction + 1.96 * std_dev
            }
        else:
            # Default confidence interval if model not trained
            confidence_interval = {
                'lower': max(0, prediction * 0.8),
                'upper': prediction * 1.2
            }
        
        return {
            'prediction': float(prediction),
            'confidence_interval': confidence_interval,
            'features_used': dict(zip(self.feature_cols, features)),
            'date': date.strftime('%Y-%m-%d')
        }
    
    def _extract_features(
        self, 
        date: datetime, 
        external_data: Dict[str, Any], 
        historical_data: Dict[str, float]
    ) -> list:
        """Extract features for prediction"""
        features = []
        
        # Holiday and festival flags (simplified - you'd check actual calendar)
        features.append(external_data.get('holiday_flag', 0))
        features.append(external_data.get('festival_flag', 0))
        
        # External factors
        aqi = external_data.get('AQI', 200)
        features.append(aqi)
        features.append(1 if aqi >= 250 else 0)  # high_AQI_flag
        features.append(external_data.get('temp', 25))
        features.append(external_data.get('rainfall', 0))
        features.append(external_data.get('epidemic_alert_level', 0))
        
        # Calendar features
        features.append(date.month)
        features.append(1 if date.weekday() >= 5 else 0)  # is_weekend
        
        # Lag features
        features.append(historical_data.get('lag1', 300))
        features.append(historical_data.get('lag2', 300))
        features.append(historical_data.get('lag7', 300))
        features.append(historical_data.get('roll7', 300))
        
        return features
    
    def get_feature_importance(self) -> Dict[str, float]:
        """Get feature importance from trained model"""
        if hasattr(self.model, 'feature_importances_'):
            return dict(zip(self.feature_cols, self.model.feature_importances_))
        return {}
