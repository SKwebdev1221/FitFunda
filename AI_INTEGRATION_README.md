# AI Model Integration - Public Advisory System

## Overview

This integration brings the healthcare AI model from the Jupyter notebook into the FitFunda application, providing real-time public health advisories powered by machine learning and LLM reasoning.

## Features

### Backend (FastAPI)

1. **ML Prediction Service** (`backend/app/services/ai_model/predictor.py`)
   - Random Forest model for patient load forecasting
   - Confidence interval calculations
   - Feature importance analysis

2. **Decision Engine** (`backend/app/services/ai_model/decision_engine.py`)
   - Patient load classification (LOW/NORMAL/HIGH/CRITICAL)
   - Health advisory generation based on:
     - Predicted hospital capacity
     - Air Quality Index (AQI)
     - Epidemic alert levels
     - Temperature extremes
   - Staffing recommendations
   - Supply management suggestions

3. **LLM Integration** (`backend/app/services/ai_model/llm_service.py`)
   - Ollama integration for enhanced reasoning
   - Contextual health advisory generation
   - Personalized health tips

4. **API Endpoints** (`backend/app/routers/public_advisory.py`)
   - `GET /api/public-advisory/current` - Current day advisory
   - `GET /api/public-advisory/forecast` - 7-day forecast
   - `GET /api/public-advisory/health-risks` - Current health risks
   - `GET /api/public-advisory/environmental-factors` - Environmental data
   - `GET /api/public-advisory/model-info` - Model status

### Frontend (React)

1. **Patient Load Indicator** (`src/components/advisory/PatientLoadIndicator.jsx`)
   - Visual gauge showing hospital capacity
   - Color-coded load levels
   - Confidence intervals
   - Visit recommendations

2. **Health Advisory Cards** (`src/components/advisory/HealthAdvisoryCard.jsx`)
   - Severity-based styling
   - Advisory types (Capacity, Air Quality, Epidemic, etc.)
   - Actionable recommendations

3. **Environmental Factors** (`src/components/advisory/EnvironmentalFactors.jsx`)
   - AQI status with color coding
   - Temperature indicators
   - Rainfall data
   - Epidemic alert levels

4. **Forecast Chart** (`src/components/advisory/ForecastChart.jsx`)
   - 7-day patient load visualization
   - Trend analysis
   - Peak and lowest day indicators
   - Interactive tooltips

5. **Enhanced Public Advisory Page** (`src/pages/PublicAdvisory.jsx`)
   - Real-time AI predictions
   - LLM-powered insights
   - Environmental monitoring
   - Health tips and recommendations

## Setup Instructions

### Backend Setup

1. **Install Python Dependencies**
   ```bash
   cd backend
   pip install scikit-learn numpy pandas requests
   ```

2. **Set up Ollama (Optional but Recommended)**
   ```bash
   # Install Ollama from https://ollama.ai
   ollama pull llama3:latest
   ollama serve
   ```

3. **Train the Model** (First time only)
   - Run the Jupyter notebook: `backend/notebooks/data.ipynb`
   - This will generate the trained model file
   - Or use the mock model (will auto-initialize)

4. **Start Backend Server**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install recharts
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Navigate to: `http://localhost:5173/public-advisory`

## Configuration

### Environment Variables

Add to `backend/.env`:
```env
# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3:latest

# Model Configuration
ML_MODEL_PATH=app/services/ai_model/models/patient_predictor.pkl
```

### Mock Data vs Real Data

Currently, the system uses mock data for:
- Historical patient counts (lag features)
- Environmental factors (AQI, temperature, etc.)

**For Production:**
1. Connect to real weather API for environmental data
2. Fetch historical patient data from MongoDB
3. Implement periodic model retraining
4. Add model performance monitoring

## API Usage Examples

### Get Current Advisory
```javascript
import { getCurrentAdvisory } from './api/publicAdvisory';

const advisory = await getCurrentAdvisory();
console.log(advisory.patient_load.prediction); // e.g., 320
console.log(advisory.patient_load.load_level); // e.g., "NORMAL"
console.log(advisory.advisories); // Array of health advisories
```

### Get 7-Day Forecast
```javascript
import { getForecast } from './api/publicAdvisory';

const forecast = await getForecast(7);
console.log(forecast.forecast); // Array of 7 days
console.log(forecast.trends); // Trend analysis
```

## Model Information

### Features Used
1. `holiday_flag` - Is it a holiday?
2. `festival_flag` - Is it a festival?
3. `AQI` - Air Quality Index
4. `high_AQI_flag` - AQI >= 250?
5. `temp` - Temperature in Celsius
6. `rainfall` - Rainfall in mm
7. `epidemic_alert_level` - 0-3 scale
8. `month` - Month of year
9. `is_weekend` - Weekend flag
10. `patients_lag1` - Yesterday's patient count
11. `patients_lag2` - 2 days ago patient count
12. `patients_lag7` - 7 days ago patient count
13. `patients_roll7` - 7-day rolling average

### Model Performance
- **Algorithm**: Random Forest Regressor
- **Training Data**: Synthetic 2024 data (366 days)
- **Test MAE**: ~26 patients
- **Test RMSE**: ~36 patients
- **Top Features**: Epidemic alert level, AQI, Festival flag

## Troubleshooting

### Backend Issues

1. **Model not loading**
   - Check if model file exists at `backend/app/services/ai_model/models/patient_predictor.pkl`
   - Run the Jupyter notebook to generate the model
   - The system will auto-initialize a default model if not found

2. **LLM not available**
   - Ensure Ollama is running: `ollama serve`
   - Check Ollama URL in configuration
   - The system works without LLM (just without enhanced reasoning)

3. **Import errors**
   - Install missing packages: `pip install scikit-learn numpy pandas requests`

### Frontend Issues

1. **Charts not rendering**
   - Install recharts: `npm install recharts`
   - Check browser console for errors

2. **API connection failed**
   - Ensure backend is running on `http://localhost:8000`
   - Check CORS configuration
   - Verify API endpoints in `src/config.js`

## Future Enhancements

1. **Real-time Data Integration**
   - Weather API integration
   - Hospital database connection
   - Real-time patient tracking

2. **Model Improvements**
   - Periodic retraining with real data
   - A/B testing different algorithms
   - Ensemble methods

3. **Additional Features**
   - Push notifications for critical alerts
   - Personalized recommendations based on user location
   - Historical trend analysis
   - Downloadable health reports

4. **Mobile App**
   - React Native version
   - Offline support
   - Location-based advisories

## License

Part of the FitFunda Hospital Management System
