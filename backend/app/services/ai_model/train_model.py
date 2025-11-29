"""
Train the patient load prediction model using existing CSV data
Run this script to generate the model file
"""
import numpy as np
import pandas as pd
import pickle
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Get paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "..", "..", "..", "notebooks")
MODELS_DIR = os.path.join(SCRIPT_DIR, "models")

# Create models directory if it doesn't exist
os.makedirs(MODELS_DIR, exist_ok=True)


def prepare_modeling_data():
    """Load and prepare data for modeling"""
    print("Loading data...")
    
    # Load CSVs
    visits_path = os.path.join(DATA_DIR, "patient_visits.csv")
    ext_path = os.path.join(DATA_DIR, "external_factors.csv")
    
    df_visits = pd.read_csv(visits_path, parse_dates=["date"])
    df_ext = pd.read_csv(ext_path, parse_dates=["date"], keep_default_na=False)
    
    print(f"  ✓ Loaded {len(df_visits)} patient visit records")
    print(f"  ✓ Loaded {len(df_ext)} days of external factors")
    
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
    
    print(f"  ✓ Prepared {len(df_model)} days for modeling (dropped {len(df) - len(df_model)} rows with NaN)")
    
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
    
    # Train-test split (last 60 days for testing)
    test_size = 60
    train_size = len(df_model) - test_size
    
    X_train = X[:train_size]
    X_test = X[train_size:]
    y_train = y[:train_size]
    y_test = y[train_size:]
    
    train_dates = df_model["date"].iloc[:train_size]
    test_dates = df_model["date"].iloc[train_size:]
    
    print(f"\nTrain-Test Split:")
    print(f"  Train: {len(X_train)} samples ({train_dates.iloc[0].strftime('%Y-%m-%d')} to {train_dates.iloc[-1].strftime('%Y-%m-%d')})")
    print(f"  Test:  {len(X_test)} samples ({test_dates.iloc[0].strftime('%Y-%m-%d')} to {test_dates.iloc[-1].strftime('%Y-%m-%d')})")
    
    # Train model
    print("\nTraining Random Forest model...")
    model = RandomForestRegressor(
        n_estimators=100,
        max_depth=10,
        random_state=42,
        n_jobs=-1
    )
    
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
    for idx, row in feature_importance.head().iterrows():
        print(f"  {row['feature']:25s} {row['importance']:.4f}")
    
    return model


def main():
    """Main execution function"""
    print("="*70)
    print("TRAINING PATIENT LOAD PREDICTION MODEL")
    print("="*70)
    print()
    
    # Prepare data
    df_model = prepare_modeling_data()
    
    # Train model
    model = train_model(df_model)
    
    # Save model
    model_path = os.path.join(MODELS_DIR, "patient_predictor.pkl")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print(f"\n✓ Model saved to: {model_path}")
    
    print("\n" + "="*70)
    print("✓ MODEL TRAINING COMPLETE!")
    print("="*70)
    print("\nThe model is now ready to use for predictions.")
    print("Restart the backend server to load the new model.")


if __name__ == "__main__":
    main()
