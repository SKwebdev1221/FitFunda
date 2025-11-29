# AI Agent Integration - FitFunda Healthcare System

## Overview

This system integrates an advanced AI agent (from `data.ipynb`) with the FitFunda backend to provide intelligent healthcare predictions and advisories using:

1. **Machine Learning Model**: Random Forest predictor for patient load forecasting
2. **Ollama LLM**: Advanced reasoning and contextual insights
3. **Real Data**: Historical patient visits and environmental factors

## Architecture

```
notebooks/
├── data.ipynb              # Original agent development notebook
├── external_factors.csv    # Environmental data (AQI, temp, etc.)
└── patient_visits.csv      # Historical patient visit data

app/services/ai_model/
├── predictor.py           # ML model wrapper
├── decision_engine.py     # Rule-based decision logic
├── llm_service.py         # Ollama LLM integration (ENHANCED)
├── train_model.py         # Model training script
├── models/
│   └── patient_predictor.pkl  # Trained ML model
└── data/                  # (empty - uses notebooks/ data)
```

## Setup Instructions

### 1. Train the Model

First, ensure you have the CSV data files in `backend/notebooks/`:
- `external_factors.csv`
- `patient_visits.csv`

Then train the model:

```bash
cd backend
python app/services/ai_model/train_model.py
```

This will:
- Load the CSV data
- Train a Random Forest model
- Save the model to `app/services/ai_model/models/patient_predictor.pkl`

### 2. Install Ollama (Optional but Recommended)

For enhanced LLM reasoning:

```bash
# Install Ollama from https://ollama.ai
ollama pull llama3
ollama serve
```

The system works without Ollama, but LLM features will be disabled.

### 3. Start the Backend

```bash
cd backend
./start_backend.bat
```

## Features

### 1. Patient Load Prediction

The ML model predicts daily patient load based on:
- **Environmental factors**: AQI, temperature, rainfall
- **Epidemic alerts**: 0-3 scale
- **Calendar features**: Holidays, weekends, month
- **Historical patterns**: Lag features (1, 2, 7 days), rolling averages

**Model Performance**:
- MAE: ~25-30 patients
- RMSE: ~35-40 patients
- Top features: Epidemic level (79%), AQI (10%), Festival flag (4%)

### 2. Enhanced LLM Reasoning

The Ollama integration provides:

#### Data-Driven Context
- Automatic correlation analysis
- Historical baseline comparisons
- Risk level assessments
- Environmental impact insights

#### Advanced Capabilities
- **Advisory Generation**: Contextual public health advisories
- **Health Tips**: Personalized recommendations based on conditions
- **Query System**: Ask questions about healthcare situations

### 3. API Endpoints

#### Get Current Advisory
```http
GET /api/v1/public-advisory/current
```

Returns:
- Patient load prediction
- Environmental factors
- Health advisories
- LLM-generated reasoning (if Ollama available)
- Actionable health tips

#### Get Weekly Forecast
```http
GET /api/v1/public-advisory/forecast?days=7
```

Returns 7-day forecast with:
- Daily predictions
- Load levels
- Environmental trends
- Key advisories

#### Get Health Risks
```http
GET /api/v1/public-advisory/health-risks
```

Returns current risk assessment with recommendations.

## Agent Capabilities (from data.ipynb)

The integrated agent includes these advanced features from the notebook:

### 1. Data Analysis Tools
- `get_data_summary()`: Overall statistics
- `get_correlation_insights()`: Factor correlations
- `get_high_patient_days()`: Peak load analysis
- `get_monthly_stats()`: Seasonal trends

### 2. Contextual Reasoning
- Builds rich data context for LLM
- Includes historical correlations
- Provides risk assessments
- Generates actionable insights

### 3. Decision Engine
- **Load Classification**: LOW/NORMAL/HIGH/CRITICAL
- **Staffing Recommendations**: By shift and role
- **Supply Management**: Reorder alerts
- **Patient Advisories**: Public health messages

## Example Usage

### Python Client

```python
import requests

# Get current advisory
response = requests.get('http://localhost:8000/api/v1/public-advisory/current')
data = response.json()

print(f"Predicted patients: {data['patient_load']['prediction']}")
print(f"Load level: {data['patient_load']['load_level']}")
print(f"AQI: {data['environmental_factors']['AQI']}")

# LLM reasoning (if available)
if data['llm_reasoning']:
    print(f"\nAI Analysis:\n{data['llm_reasoning']}")

# Health tips
for tip in data['health_tips']:
    print(f"• {tip}")
```

### Frontend Integration

```javascript
// Fetch current advisory
const response = await fetch('/api/v1/public-advisory/current');
const advisory = await response.json();

// Display prediction
console.log(`Expected ${advisory.patient_load.prediction} patients`);
console.log(`Load level: ${advisory.patient_load.load_level}`);

// Show advisories
advisory.advisories.forEach(adv => {
  console.log(`${adv.icon} [${adv.severity}] ${adv.message}`);
});
```

## Configuration

### Environment Variables

```env
# Ollama Configuration (optional)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3:latest
```

### Model Retraining

To retrain with new data:

1. Update CSV files in `backend/notebooks/`
2. Run training script:
   ```bash
   python app/services/ai_model/train_model.py
   ```
3. Restart backend server

## Troubleshooting

### Model Not Loading
- Ensure `patient_predictor.pkl` exists in `models/` directory
- Run `train_model.py` to generate the model
- Check file permissions

### LLM Features Not Working
- Verify Ollama is running: `curl http://localhost:11434/api/tags`
- Check model is pulled: `ollama list`
- Review timeout settings in `llm_service.py`

### Prediction Errors
- Verify CSV data format matches expected schema
- Check for missing environmental factors
- Ensure historical data is available for lag features

## Performance Optimization

### Model Inference
- Model loads once at startup
- Predictions are fast (~10-50ms)
- No database queries needed for prediction

### LLM Calls
- Timeout: 5 seconds
- Graceful fallback if unavailable
- Optional feature (system works without it)

### Caching
- Consider caching daily predictions
- Cache LLM responses for repeated queries
- Use Redis for distributed caching

## Future Enhancements

1. **Real-time Data Integration**
   - Connect to live weather APIs
   - Integrate epidemic tracking systems
   - Pull actual hospital capacity data

2. **Model Improvements**
   - Add more features (day of year, special events)
   - Try ensemble methods (XGBoost, LightGBM)
   - Implement online learning

3. **Agent Capabilities**
   - Multi-turn conversations
   - Personalized recommendations
   - Proactive alerts and notifications

4. **Advanced Analytics**
   - Anomaly detection
   - Trend forecasting
   - Resource optimization

## Credits

- **ML Model**: Trained on synthetic healthcare data
- **LLM Integration**: Ollama with Llama 3
- **Agent Design**: Based on `data.ipynb` notebook
- **Framework**: FastAPI + scikit-learn

## License

Part of the FitFunda Healthcare Management System
