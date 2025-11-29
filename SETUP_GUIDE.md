# FitFunda - Complete Setup and Testing Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.9+)
- MongoDB (v5.0+)
- Git

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd FitFunda
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit backend/.env with your settings:
# - SECRET_KEY (generate with: openssl rand -hex 32)
# - MONGODB_URL (default: mongodb://localhost:27017)
# - DATABASE_NAME (default: fitfunda)
# - API keys for weather, AQI, etc. (optional)

# Start MongoDB (if not running)
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Run the backend
uvicorn app.main:app --reload
```

Backend will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
# In a new terminal, from project root
cd FitFunda

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 🧪 Testing the Integration

### Step 1: Register a User

1. Navigate to `http://localhost:5173`
2. Click "Sign Up"
3. Fill in the form:
   - Name: Test User
   - Email: management@test.com
   - Password: password123
   - Role: Management
4. Click "Sign up"

### Step 2: Login

1. Use the credentials you just created
2. You should be redirected to `/management` dashboard
3. Verify you see:
   - Dashboard stats (beds, staff, patients)
   - Surge prediction graph
   - Bed availability chart
   - Staff readiness card
   - Weather and AQI data (if API keys configured)
   - Alerts and recommendations

### Step 3: Test Different Roles

Create accounts for each role and test:

| Role | Email | Dashboard URL |
|------|-------|---------------|
| Management | management@test.com | /management |
| Doctor | doctor@test.com | /doctor |
| Nurse | nurse@test.com | /nurse |
| Patient | patient@test.com | /patient |
| Inventory | inventory@test.com | /inventory |
| Emergency | emergency@test.com | /emergency |

### Step 4: Test API Integration

#### Management Dashboard
- ✅ View overall stats
- ✅ See patient surge predictions
- ✅ Monitor bed availability
- ✅ Check staff readiness
- ✅ View alerts and recommendations
- ✅ See weather and AQI data

#### Doctor Dashboard
- ✅ View today's patient count
- ✅ See critical cases
- ✅ Check consultation stats
- ✅ View patient surge predictions

#### Staff Allocation
- ✅ View all staff members
- ✅ Filter by department
- ✅ See staff statistics
- ✅ (Mock) Edit/Delete staff

#### Bed Management
- ✅ View all beds
- ✅ See bed statistics
- ✅ Filter by status
- ✅ (Mock) Assign/Discharge patients

## 📊 Seeding Test Data (Optional)

To populate MongoDB with test data, you can use the MongoDB shell or a GUI tool like MongoDB Compass.

### Sample Data Script

```javascript
// Connect to MongoDB
use fitfunda

// Create test users
db.users.insertMany([
  {
    email: "management@test.com",
    name: "Admin User",
    role: "management",
    hashed_password: "$2b$12$..." // Use the hash from registration
  },
  {
    email: "doctor@test.com",
    name: "Dr. Smith",
    role: "doctor",
    hashed_password: "$2b$12$..."
  }
])

// Create test staff
db.staff.insertMany([
  {
    name: "Dr. Sarah Johnson",
    role: "doctor",
    department: "Emergency",
    status: "On Duty",
    shift: "Day",
    email: "sarah.johnson@hospital.com",
    phone: "555-0101"
  },
  {
    name: "Nurse Mike Chen",
    role: "nurse",
    department: "ICU",
    status: "On Duty",
    shift: "Night",
    email: "mike.chen@hospital.com",
    phone: "555-0102"
  },
  {
    name: "Dr. Emily Davis",
    role: "doctor",
    department: "Surgery",
    status: "Available",
    shift: "Day",
    email: "emily.davis@hospital.com",
    phone: "555-0103"
  }
])

// Create test beds
db.beds.insertMany([
  {
    bed_number: "ICU-201",
    department: "Emergency",
    status: "occupied",
    patient_name: "John Smith",
    patient_id: null,
    condition: "Pneumonia",
    admission_date: new Date("2024-01-15")
  },
  {
    bed_number: "ICU-202",
    department: "Emergency",
    status: "available",
    patient_name: null,
    patient_id: null
  },
  {
    bed_number: "MED-101",
    department: "Medical",
    status: "occupied",
    patient_name: "Mary Davis",
    patient_id: null,
    condition: "Appendicitis",
    admission_date: new Date("2024-01-14")
  },
  {
    bed_number: "SUR-105",
    department: "Surgical",
    status: "occupied",
    patient_name: "Robert Brown",
    patient_id: null,
    condition: "Heart Surgery",
    admission_date: new Date("2024-01-10")
  },
  {
    bed_number: "ORTH-302",
    department: "Surgical",
    status: "available",
    patient_name: null,
    patient_id: null
  }
])

// Create test patients
db.patients.insertMany([
  {
    name: "John Smith",
    age: 45,
    gender: "Male",
    contact: "555-1001",
    email: "john.smith@email.com",
    address: "123 Main St",
    admission_date: new Date("2024-01-15"),
    status: "admitted"
  },
  {
    name: "Mary Davis",
    age: 32,
    gender: "Female",
    contact: "555-1002",
    email: "mary.davis@email.com",
    address: "456 Oak Ave",
    admission_date: new Date("2024-01-14"),
    status: "admitted"
  }
])
```

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Ensure MongoDB is running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Import Errors**
```
ModuleNotFoundError: No module named 'fastapi'
```
Solution: Activate virtual environment and reinstall
```bash
pip install -r requirements.txt
```

**CORS Errors**
- Check that frontend URL matches CORS settings in `backend/app/main.py`
- Default is `http://localhost:5173`

### Frontend Issues

**API Connection Failed**
- Verify backend is running on `http://localhost:8000`
- Check `src/config.js` has correct `API_BASE_URL`
- Check browser console for CORS errors

**Authentication Not Working**
- Clear browser localStorage
- Check that JWT token is being stored
- Verify backend `/api/v1/auth/login` endpoint works

**Charts Not Displaying**
- Check browser console for errors
- Verify data is being fetched from backend
- Check that `DataContext` is wrapping the app

## 📝 API Endpoints Reference

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/validate` - Validate token

### Dashboard
- GET `/api/v1/dashboard/stats` - Overall statistics
- GET `/api/v1/dashboard/predictions` - Patient surge predictions
- GET `/api/v1/dashboard/alerts` - Active alerts
- GET `/api/v1/dashboard/recommendations` - AI recommendations
- GET `/api/v1/dashboard/doctor-stats` - Doctor-specific stats

### Resources
- GET `/api/v1/staff` - List all staff
- GET `/api/v1/staff/readiness` - Staff readiness stats
- GET `/api/v1/beds` - List all beds
- GET `/api/v1/beds/stats` - Bed statistics by department
- GET `/api/v1/patients` - List all patients
- GET `/api/v1/inventory` - List inventory items
- GET `/api/v1/appointments` - List appointments

### External APIs
- GET `/api/v1/external/weather?city=Delhi` - Weather data
- GET `/api/v1/external/aqi?city=Delhi` - Air quality data
- GET `/api/v1/external/events?country=IN&year=2024` - Events/holidays

## 🎯 What's Integrated

### ✅ Fully Integrated
- Authentication (login, register, token validation)
- Management Dashboard (stats, charts, alerts, recommendations)
- Doctor Dashboard (stats, predictions)
- Staff Allocation (list, stats, CRUD operations)
- Bed Management (list, stats, CRUD operations)
- Real-time data refresh (every 30 seconds)
- Weather and AQI integration
- Role-based navigation

### 🔄 Partially Integrated
- Patient management (API ready, UI uses mock data)
- Inventory management (API ready, UI uses mock data)
- Appointments (API ready, UI uses mock data)
- Medical records (API ready, UI uses mock data)

### ⏳ To Be Implemented
- WebSocket real-time updates
- File uploads for medical records
- Report generation and export
- Email notifications
- Advanced search and filtering

## 🚢 Production Deployment

### Backend (Render/Railway/Heroku)

1. Set environment variables:
```
SECRET_KEY=<your-secret-key>
MONGODB_URL=<your-mongodb-atlas-url>
DATABASE_NAME=fitfunda
OPENWEATHER_API_KEY=<optional>
AQICN_API_KEY=<optional>
```

2. Update CORS origins in `backend/app/main.py`

3. Deploy using platform-specific instructions

### Frontend (Vercel/Netlify)

1. Update `src/config.js` with production API URL

2. Build the project:
```bash
npm run build
```

3. Deploy `dist` folder

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/docs`
3. Check browser console for errors
4. Review backend logs

## 🎉 Success Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard displays data
- [ ] Charts render correctly
- [ ] Navigation works for all roles
- [ ] API calls succeed (check Network tab)
- [ ] No console errors
