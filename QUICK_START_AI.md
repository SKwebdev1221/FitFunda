# Quick Start Guide - AI-Powered Public Advisory

## ✅ What's Been Implemented

### Backend Components
- ✅ ML Predictor Service (Random Forest)
- ✅ Decision Engine (Health Advisory Generation)
- ✅ LLM Service (Ollama Integration)
- ✅ FastAPI Endpoints (5 endpoints)
- ✅ Pydantic Models (API schemas)

### Frontend Components
- ✅ Patient Load Indicator
- ✅ Health Advisory Cards
- ✅ Environmental Factors Display
- ✅ 7-Day Forecast Chart
- ✅ Enhanced Public Advisory Page

## 🚀 Quick Start

### 1. Start Backend (Terminal 1)

```bash
cd backend
uvicorn app.main:app --reload
```

The backend will start at `http://localhost:8000`

### 2. Start Ollama (Terminal 2) - Optional but Recommended

```bash
ollama serve
```

This enables AI-powered reasoning for richer advisories.

### 3. Start Frontend (Terminal 3)

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

### 4. Visit the Public Advisory Page

Navigate to: **http://localhost:5173/public-advisory**

## 📊 What You'll See

1. **AI-Powered Header**
   - Real-time patient load prediction
   - LLM-generated health analysis (if Ollama is running)

2. **Patient Load Indicator**
   - Visual gauge showing hospital capacity
   - Color-coded status (LOW/NORMAL/HIGH/CRITICAL)
   - Confidence intervals
   - Visit recommendations

3. **Environmental Factors**
   - Air Quality Index (AQI) with status
   - Temperature with indicators
   - Rainfall data
   - Epidemic alert levels

4. **Health Advisories**
   - Dynamic advisories based on conditions
   - Severity-based color coding
   - Actionable recommendations

5. **Health Tips**
   - AI-generated tips (if LLM available)
   - Rule-based recommendations

6. **7-Day Forecast**
   - Interactive chart
   - Trend analysis
   - Peak/lowest day indicators

## 🧪 Testing the API

### Using Swagger UI

Visit: **http://localhost:8000/docs**

Try these endpoints:
1. `/api/public-advisory/current` - Get current advisory
2. `/api/public-advisory/forecast?days=7` - Get 7-day forecast
3. `/api/public-advisory/health-risks` - Get current risks
4. `/api/public-advisory/model-info` - Check model status

### Using curl

```bash
# Get current advisory
curl http://localhost:8000/api/public-advisory/current

# Get 7-day forecast
curl http://localhost:8000/api/public-advisory/forecast?days=7

# Get health risks
curl http://localhost:8000/api/public-advisory/health-risks
```

## 🔧 Configuration

### With Ollama (Enhanced AI Reasoning)

1. Install Ollama: https://ollama.ai
2. Pull Llama3:
   ```bash
   ollama pull llama3:latest
   ```
3. Start Ollama server:
   ```bash
   ollama serve
   ```

### Without Ollama (Basic Mode)

The system works fine without Ollama! You'll get:
- ✅ ML predictions
- ✅ Rule-based advisories
- ✅ Health tips
- ❌ LLM-enhanced reasoning (optional)

## 📝 Current Data Status

**Note:** The system currently uses **mock data** for demonstration:

- **Environmental Factors**: Simulated AQI, temperature, etc.
- **Historical Data**: Mock patient counts for lag features
- **ML Model**: Trained on synthetic 2024 data

### For Production Use:

1. **Connect Real Data Sources**
   - Weather API for environmental factors
   - MongoDB for historical patient data
   - Health department for epidemic alerts

2. **Retrain Model**
   - Use real historical data
   - Implement periodic retraining
   - Add model monitoring

3. **Update Mock Functions**
   - Replace `get_mock_historical_data()` in `public_advisory.py`
   - Replace `get_current_environmental_factors()` with real API calls

## 🎨 UI Features

### Responsive Design
- ✅ Mobile-friendly
- ✅ Tablet optimized
- ✅ Desktop layouts

### Animations
- ✅ Smooth transitions
- ✅ Loading states
- ✅ Interactive elements

### Color Coding
- 🟢 Green: LOW/Good
- 🔵 Blue: NORMAL
- 🟠 Orange: HIGH/Unhealthy
- 🔴 Red: CRITICAL/Hazardous

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Install dependencies
cd backend
pip install scikit-learn numpy pandas requests fastapi uvicorn
```

### Frontend errors?
```bash
# Install dependencies
npm install recharts
```

### API returning errors?
- Check if backend is running on port 8000
- Verify CORS settings in `backend/app/main.py`
- Check browser console for details

### Charts not showing?
- Ensure recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify forecast data is being fetched

## 📈 Next Steps

1. **Test the Integration**
   - Visit the public advisory page
   - Check all components render correctly
   - Test the refresh functionality

2. **Customize Mock Data**
   - Edit `get_current_environmental_factors()` in `public_advisory.py`
   - Adjust thresholds in `decision_engine.py`
   - Modify advisory messages

3. **Connect Real Data**
   - Integrate weather API
   - Connect to MongoDB
   - Implement real-time updates

4. **Deploy**
   - Set up production environment
   - Configure Ollama server
   - Enable HTTPS
   - Add monitoring

## 📚 Documentation

- **Full Documentation**: See `AI_INTEGRATION_README.md`
- **API Docs**: http://localhost:8000/docs (when backend is running)
- **Component Docs**: Check individual component files

## 🎉 Success Indicators

You'll know it's working when you see:
- ✅ Patient load prediction with gauge
- ✅ Environmental factors with color-coded status
- ✅ Health advisories (if conditions warrant)
- ✅ 7-day forecast chart
- ✅ Health tips section
- ✅ LLM reasoning (if Ollama is running)

Enjoy your AI-powered public health advisory system! 🚀
