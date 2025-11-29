# 🤖 Autonomous Healthcare AI Agent - Real-Time System

## Overview

This system implements a **fully autonomous AI agent** that removes humans from the loop by:

1. **Real-time data collection** from external APIs
2. **Automatic predictions** using ML models
3. **Dynamic decision-making** based on current conditions
4. **Continuous monitoring** and updates

## 🔄 How It Works (Autonomous Loop)

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTONOMOUS AI AGENT                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────┐
        │  1. REAL-TIME DATA COLLECTION        │
        │  ✓ AQI from AQICN API                │
        │  ✓ Weather from OpenWeather API      │
        │  ✓ Historical patients from Database │
        │  ✓ Holiday calendar check            │
        │  ✓ Epidemic season detection         │
        └──────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────┐
        │  2. ML PREDICTION                    │
        │  ✓ Load trained Random Forest model  │
        │  ✓ Extract features from live data   │
        │  ✓ Predict patient load              │
        │  ✓ Calculate confidence intervals    │
        └──────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────┐
        │  3. AUTONOMOUS DECISION ENGINE       │
        │  ✓ Classify load (LOW/HIGH/CRITICAL) │
        │  ✓ Generate health advisories        │
        │  ✓ Calculate staffing needs          │
        │  ✓ Determine supply requirements     │
        └──────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────┐
        │  4. LLM REASONING (Optional)         │
        │  ✓ Contextual analysis via Ollama    │
        │  ✓ Natural language explanations     │
        │  ✓ Personalized health tips          │
        └──────────────────────────────────────┘
                            ↓
        ┌──────────────────────────────────────┐
        │  5. PUBLIC API RESPONSE              │
        │  ✓ JSON response with predictions    │
        │  ✓ Advisories and recommendations    │
        │  ✓ Real-time environmental data      │
        └──────────────────────────────────────┘
```

## 🌐 Real-Time Data Sources

### 1. Air Quality (AQI)
- **API**: AQICN (World Air Quality Index)
- **Endpoint**: `https://api.waqi.info/feed/delhi/`
- **Fallback**: Month-based estimates if API unavailable
- **Update Frequency**: Every API call (real-time)

### 2. Weather Data
- **API**: OpenWeatherMap
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Data**: Temperature, rainfall
- **Fallback**: Month-based estimates if API unavailable
- **Update Frequency**: Every API call (real-time)

### 3. Historical Patient Data
- **Source**: MongoDB database
- **Collection**: `patient_visits`
- **Query**: Aggregates last 7 days of patient counts
- **Fallback**: Default values if database empty
- **Update Frequency**: Real-time from database

### 4. Holiday Detection
- **Source**: Hardcoded Indian holiday calendar
- **Holidays**: Republic Day, Holi, Independence Day, Diwali, etc.
- **Update**: Automatic based on current date

### 5. Epidemic Detection
- **Source**: Rule-based (flu season detection)
- **Logic**: Nov-Feb = Level 1 (flu season)
- **Future**: Can integrate with health department APIs

## 📊 Dynamic Predictions

### Why Predictions Change

The system provides **different predictions each time** because:

1. **Real-time AQI** changes throughout the day
2. **Weather conditions** vary (temperature, rainfall)
3. **Historical data** updates as new patient visits are recorded
4. **Date/time** affects features (weekday, month, holiday status)
5. **Epidemic levels** change based on season

### Example Scenarios

| Time | AQI | Temp | Holiday | Prediction | Load Level |
|------|-----|------|---------|------------|------------|
| Morning (Nov) | 280 | 15°C | No | ~450 | HIGH |
| Afternoon (Nov) | 260 | 20°C | No | ~420 | HIGH |
| Evening (Nov) | 300 | 18°C | No | ~480 | HIGH |
| Diwali Day | 380 | 20°C | Yes | ~650 | CRITICAL |
| Summer Day | 150 | 35°C | No | ~280 | LOW |

## 🔧 Setup for Real-Time Data

### 1. Get API Keys (Free)

#### AQI API
```bash
# Visit: https://aqicn.org/data-platform/token/
# Sign up for free API token
```

#### Weather API
```bash
# Visit: https://openweathermap.org/api
# Sign up for free API key
```

### 2. Configure Environment Variables

Add to `.env` file:
```env
# Air Quality API
AQICN_API_KEY=your_aqicn_token_here

# Weather API
OPENWEATHER_API_KEY=your_openweather_key_here
```

### 3. Restart Backend

```bash
cd backend
./start_backend.bat
```

## 🎯 Autonomous Features

### 1. No Manual Input Required
- ✅ Automatically fetches environmental data
- ✅ Queries database for historical patterns
- ✅ Detects holidays and special events
- ✅ Adjusts for seasonal variations

### 2. Self-Updating
- ✅ Each API call gets fresh data
- ✅ Predictions adapt to current conditions
- ✅ No human intervention needed

### 3. Intelligent Fallbacks
- ✅ Uses estimates if APIs are down
- ✅ Graceful degradation
- ✅ System always operational

### 4. Context-Aware
- ✅ Considers time of day
- ✅ Accounts for day of week
- ✅ Recognizes holidays
- ✅ Detects seasonal patterns

## 📈 Monitoring & Logs

The system logs real-time data fetching:

```
✓ Real-time AQI: 285
✓ Real-time temp: 18.5°C
Database query failed, using fallback: No patient_visits collection
```

## 🚀 Future Enhancements

### Planned Autonomous Features

1. **Scheduled Background Jobs**
   ```python
   # Run predictions every hour
   # Store results in cache
   # Send alerts if critical conditions detected
   ```

2. **Proactive Alerts**
   ```python
   # Email/SMS to hospital admin
   # Push notifications to mobile app
   # Automatic staffing adjustments
   ```

3. **Learning Loop**
   ```python
   # Compare predictions vs actual
   # Retrain model automatically
   # Improve accuracy over time
   ```

4. **Multi-Source Integration**
   ```python
   # Health department epidemic data
   # Traffic/event data for patient influx
   # Social media sentiment analysis
   ```

## 🔍 Testing Real-Time Features

### Test Current Advisory
```bash
curl http://localhost:8000/api/v1/public-advisory/current
```

**Expected Response** (changes each time):
```json
{
  "date": "2025-11-29",
  "patient_load": {
    "prediction": 425.3,  // ← Changes based on real-time data
    "load_level": "HIGH",
    "confidence_interval": {
      "lower": 380.5,
      "upper": 470.1
    }
  },
  "environmental_factors": {
    "AQI": 285,  // ← Real-time from API
    "temp": 18.5,  // ← Real-time from API
    "rainfall": 0,
    "epidemic_alert_level": 1,  // ← Auto-detected (Nov = flu season)
    "holiday_flag": 0,
    "festival_flag": 0
  },
  "advisories": [
    {
      "type": "CAPACITY_WARNING",
      "severity": "HIGH",
      "message": "Expected high patient volume (425 patients)..."
    },
    {
      "type": "AIR_QUALITY",
      "severity": "HIGH",
      "message": "Poor air quality (AQI: 285)..."
    }
  ]
}
```

### Compare Multiple Calls

```bash
# Call 1
curl http://localhost:8000/api/v1/public-advisory/current | jq '.patient_load.prediction'
# Output: 425.3

# Wait 1 hour (AQI/weather changes)

# Call 2
curl http://localhost:8000/api/v1/public-advisory/current | jq '.patient_load.prediction'
# Output: 438.7  ← Different!
```

## 📝 Summary

This is a **truly autonomous system** that:

1. ✅ **Removes humans from the loop** - No manual data entry
2. ✅ **Uses real-time data** - Not static CSV files
3. ✅ **Adapts to conditions** - Different predictions based on current state
4. ✅ **Self-sufficient** - Works 24/7 without intervention
5. ✅ **Intelligent** - ML + Rules + LLM reasoning
6. ✅ **Reliable** - Fallbacks ensure continuous operation

The CSV files from `data.ipynb` are only used for **training the model**. Once trained, the system operates autonomously with real-time data! 🎉
