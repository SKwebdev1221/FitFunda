"""
Generate synthetic healthcare data and train the prediction model
Extracted from data.ipynb notebook
"""
import numpy as np
import pandas as pd
import pickle
import os
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

# For reproducibility
RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)

# Date range for synthetic data
START_DATE = "2024-01-01"
END_DATE = "2024-12-31"

# Departments in scope
DEPARTMENTS = ["ER", "Resp_OPD"]

# Get the directory where this script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
MODELS_DIR = os.path.join(SCRIPT_DIR, "models")

# Create directories if they don't exist
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)


def add_epidemic_wave(df, start_date, length=10):
    """Adds a wave like: 0,1,2,3,2,1,... over 'length' days."""
    pattern = [0, 1, 2, 3, 2, 1]
    idxs = df.index[df["date"].between(start_date, start_date + pd.Timedelta(days=length - 1))]
    for i, idx in enumerate(idxs):
        df.at[idx, "epidemic_alert_level"] = max(
            df.at[idx, "epidemic_alert_level"],
            pattern[i % len(pattern)]
        )


def generate_external_factors(start_date=START_DATE, end_date=END_DATE, seed=42):
    np.random.seed(seed)
    
    dates = pd.date_range(start_date, end_date, freq="D")
    df = pd.DataFrame({"date": dates})
    df["day_of_week"] = df["date"].dt.day_name()
    df["month"] = df["date"].dt.month
    
    # Festivals / holidays
    festival_info = {
        "2024-01-26": "Republic_Day",
        "2024-03-25": "Holi",
        "2024-08-15": "Independence_Day",
        "2024-11-01": "Diwali",
        "2024-12-25": "Christmas",
    }
    festival_dates = pd.to_datetime(list(festival_info.keys()))
    df["holiday_flag"] = df["date"].isin(festival_dates).astype(int)
    df["festival_name"] = df["date"].map(
        lambda d: festival_info.get(d.strftime("%Y-%m-%d"), "")
    )
    
    # AQI
    month_base_aqi = {
        1: 260, 2: 220, 3: 200, 4: 180, 5: 170, 6: 150,
        7: 140, 8: 145, 9: 160, 10: 200, 11: 260, 12: 270,
    }
    df["AQI_base"] = df["month"].map(month_base_aqi)
    noise_aqi = np.random.normal(0, 25, size=len(df))
    df["AQI"] = (df["AQI_base"] + noise_aqi).clip(50, 500)
    
    # Extra pollution around Diwali
    diwali_mask = df["festival_name"] == "Diwali"
    for offset in [0, 1, 2]:
        df.loc[diwali_mask.shift(offset, fill_value=False), "AQI"] += 80
    df["AQI"] = df["AQI"].clip(50, 500).round().astype(int)
    
    # Temperature
    month_base_temp = {
        1: 15, 2: 18, 3: 24, 4: 30, 5: 34, 6: 32,
        7: 30, 8: 30, 9: 29, 10: 26, 11: 20, 12: 16,
    }
    df["temp_base"] = df["month"].map(month_base_temp)
    noise_temp = np.random.normal(0, 2, size=len(df))
    df["temp"] = (df["temp_base"] + noise_temp).round(1)
    
    # Rainfall
    df["rainfall"] = 0.0
    monsoon_mask = df["month"].isin([6, 7, 8, 9])
    df.loc[monsoon_mask, "rainfall"] = np.random.gamma(
        shape=2.5, scale=6, size=monsoon_mask.sum()
    ).round(1)
    
    non_monsoon_mask = ~monsoon_mask
    non_monsoon_idx = df.index[non_monsoon_mask]
    rain_chance = np.random.rand(non_monsoon_idx.size)
    light_rain_idx = non_monsoon_idx[rain_chance < 0.3]
    df.loc[light_rain_idx, "rainfall"] = np.random.uniform(
        0.5, 5.0, light_rain_idx.size
    ).round(1)
    
    # Epidemic alert level
    df["epidemic_alert_level"] = 0
    add_epidemic_wave(df, pd.to_datetime("2024-01-05"), length=10)
    add_epidemic_wave(df, pd.to_datetime("2024-07-10"), length=14)
    add_epidemic_wave(df, pd.to_datetime("2024-12-10"), length=12)
    rand_start = np.random.choice(df["date"].iloc[30:-30])
    add_epidemic_wave(df, rand_start, length=10)
    
    df = df[[
        "date", "day_of_week", "holiday_flag", "festival_name",
        "AQI", "temp", "rainfall", "epidemic_alert_level"
    ]]
    
    return df


def generate_patient_visits(df_ext):
    """Generate hourly patient visit data"""
    rows = []
    
    for _, day_row in df_ext.iterrows():
        date = day_row["date"]
        dow = day_row["day_of_week"]
        holiday = day_row["holiday_flag"]
        aqi = day_row["AQI"]
        epidemic = day_row["epidemic_alert_level"]
        
        for hour in range(24):
            for dept in DEPARTMENTS:
                # Base demand
                base = 6 if dept == "ER" else 4
                
                # Time-of-day effects
                if 9 <= hour <= 12:
                    base += 4
                if 18 <= hour <= 21:
                    base += 3
                if 0 <= hour <= 5:
                    base -= 2
                
                # Weekend effect
                if dow in ["Saturday", "Sunday"]:
                    base += 2 if dept == "ER" else -1
                
                # Holiday effect
                if holiday:
                    base += 5 if dept == "ER" else 3
                
                # Pollution effect
                if dept == "Resp_OPD":
                    if aqi > 200:
                        base += 3
                    if aqi > 300:
                        base += 5
                
                # Epidemic effect
                if epidemic >= 1:
                    base += 2
                if epidemic >= 2:
                    base += 4
                if epidemic == 3:
                    base += 6
                
                # Add noise
                mean = max(0, base)
                count = int(np.random.normal(loc=mean, scale=2))
                count = max(count, 0)
                
                rows.append([date, hour, dept, count])
    
    df_visits = pd.DataFrame(
        rows, columns=["date", "hour", "department", "patient_count"]
    )
    
    return df_visits


def prepare_modeling_data(df_visits, df_ext):
    """Prepare data for modeling with feature engineering"""
    
    # Aggregate to daily
    df_daily = (
        df_visits.groupby("date")["patient_count"]
        .sum()
        .reset_index()
        .rename(columns={"patient_count": "patients"})
    )
    
    # Merge with external factors
    df = df_daily.merge(df_ext, on="date", how="left")
    df = df.sort_values("date").reset_index(drop=True)
    
    # Feature engineering
    df["month"] = df["date"].dt.month
    df["is_weekend"] = df["day_of_week"].isin(["Saturday", "Sunday"]).astype(int)
    df["festival_flag"] = ((df["holiday_flag"] == 1) | (df["festival_name"] != "")).astype(int)
    df["high_AQI_flag"] = (df["AQI"] >= 250).astype(int)
    
    # Lag features
    df["patients_lag1"] = df["patients"].shift(1)
    df["patients_lag2"] = df["patients"].shift(2)
    df["patients_lag7"] = df["patients"].shift(7)
    
    # Rolling mean
    df["patients_roll7"] = (
        df["patients"].shift(1).rolling(window=7, min_periods=3).mean()
    )
    
    # Drop NaN rows
    df_model = df.dropna().reset_index(drop=True)
    
    return df_model


def train_model(df_model):
    """Train Random Forest model"""
    
    feature_cols = [
        "holiday_flag", "festival_flag", "AQI", "high_AQI_flag",
        "temp", "rainfall", "epidemic_alert_level", "month", "is_weekend",
        "patients_lag1", "patients_lag2", "patients_lag7", "patients_roll7"
    ]
    
    X = df_model[feature_cols].values
    y = df_model["patients"].values
    
    # Train-test split
    test_size = 60
    train_size = len(df_model) - test_size
    
    X_train = X[:train_size]
    X_test = X[train_size:]
    y_train = y[:train_size]
    y_test = y[train_size:]
    
    # Train model
    model = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        n_jobs=-1
    )
    
    print("\nTraining Random Forest model...")
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"\n✓ Model trained successfully!")
    print(f"\nTest Set Performance:")
    print(f"  MAE:  {mae:.2f} patients")
    print(f"  RMSE: {rmse:.2f} patients")
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': feature_cols,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(f"\nTop 5 Most Important Features:")
    print(feature_importance.head())
    
    return model


def main():
    """Main execution function"""
    print("="*70)
    print("GENERATING HEALTHCARE DATA AND TRAINING MODEL")
    print("="*70)
    
    # Step 1: Generate external factors
    print("\n1. Generating external factors...")
    df_ext = generate_external_factors()
    ext_path = os.path.join(DATA_DIR, "external_factors.csv")
    df_ext.to_csv(ext_path, index=False)
    print(f"   ✓ Created {ext_path} with {len(df_ext)} rows")
    
    # Step 2: Generate patient visits
    print("\n2. Generating patient visits...")
    df_visits = generate_patient_visits(df_ext)
    visits_path = os.path.join(DATA_DIR, "patient_visits.csv")
    df_visits.to_csv(visits_path, index=False)
    print(f"   ✓ Created {visits_path} with {len(df_visits)} rows")
    
    # Step 3: Prepare modeling data
    print("\n3. Preparing data for modeling...")
    df_model = prepare_modeling_data(df_visits, df_ext)
    print(f"   ✓ Prepared {len(df_model)} days of data for modeling")
    
    # Step 4: Train model
    print("\n4. Training predictive model...")
    model = train_model(df_model)
    
    # Step 5: Save model
    model_path = os.path.join(MODELS_DIR, "patient_predictor.pkl")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"\n✓ Model saved to {model_path}")
    
    print("\n" + "="*70)
    print("✓ DATA GENERATION AND MODEL TRAINING COMPLETE!")
    print("="*70)
    print(f"\nGenerated files:")
    print(f"  - {ext_path}")
    print(f"  - {visits_path}")
    print(f"  - {model_path}")


if __name__ == "__main__":
    main()
