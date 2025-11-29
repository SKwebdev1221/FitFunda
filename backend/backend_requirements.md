# Backend Requirements for FitFunda

This document outlines all the backend components required for the FitFunda hospital management system. The backend will use MongoDB as the primary database and authentication.

## Table of Contents
1. [Authentication & Authorization](#authentication--authorization)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [Third-Party Integrations](#third-party-integrations)
5. [AI/ML Services](#aiml-services)
6. [Real-time Features](#real-time-features)
7. [Reporting & Export Options](#reporting--export-options)
8. [Deployment Considerations](#deployment-considerations)

## Authentication & Authorization

### Authentication Implementation
- User registration with email/password
- Role-based access control (RBAC) for 6 user types:
  - Management
  - Doctor
  - Nurse
  - Inventory
  - Emergency
  - Patient
- JWT token generation and validation
- Session management

### User Roles and Permissions
- Each role has specific permissions and data access levels
- Role verification middleware for protected routes
- Profile management for all user types

## Database Schema

### Core Collections (MongoDB)

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  role: String, // management, doctor, nurse, inventory, emergency, patient
  profile: Object, // Role-specific profile data
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

#### Patients Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users collection
  name: String,
  dob: Date,
  gender: String,
  contact: {
    phone: String,
    email: String,
    address: String
  },
  medicalHistory: [ObjectId], // References to Medical Records
  emergencyContact: Object,
  bloodType: String,
  allergies: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Staff Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users collection
  employeeId: String,
  name: String,
  role: String, // doctor, nurse, admin, etc.
  department: String,
  specialization: String, // For doctors
  contact: Object,
  schedule: [Object], // Work shifts
  certifications: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Beds Collection
```javascript
{
  _id: ObjectId,
  bedNumber: String,
  roomNumber: String,
  department: String,
  status: String, // available, occupied, maintenance
  patientId: ObjectId, // Reference when occupied
  assignedStaff: [ObjectId], // References to Staff
  features: Object, // Ventilator, monitoring, etc.
  createdAt: Date,
  updatedAt: Date
}
```

#### Departments Collection
```javascript
{
  _id: ObjectId,
  name: String, // Emergency, Surgery, Medical Ward, ICU, etc.
  capacity: Number,
  currentOccupancy: Number,
  headStaffId: ObjectId, // Reference to Staff
  contact: Object,
  createdAt: Date,
  updatedAt: Date
}
```

#### Medical Records Collection
```javascript
{
  _id: ObjectId,
  patientId: ObjectId, // Reference to Patients
  doctorId: ObjectId, // Reference to Staff
  diagnosis: String,
  treatment: String,
  medications: [Object],
  vitals: [Object],
  notes: String,
  attachments: [String], // File paths/URLs
  createdAt: Date,
  updatedAt: Date
}
```

#### Inventory Collection
```javascript
{
  _id: ObjectId,
  itemName: String,
  category: String, // PPE, medications, equipment, supplies
  quantity: Number,
  minThreshold: Number,
  supplier: Object,
  expiryDate: Date,
  storageLocation: String,
  costPerUnit: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Alerts Collection
```javascript
{
  _id: ObjectId,
  title: String,
  message: String,
  type: String, // emergency, warning, info, critical
  priority: String, // low, medium, high, critical
  category: String, // surge_alert, supply_alert, maintenance, etc.
  department: String,
  acknowledgedBy: ObjectId, // Reference to Staff
  resolved: Boolean,
  resolvedAt: Date,
  createdAt: Date,
  expiresAt: Date
}
```

#### Predictions Collection
```javascript
{
  _id: ObjectId,
  predictionType: String, // patient_surge, supply_demand, staffing_needs
  startDate: Date,
  endDate: Date,
  confidence: Number,
  data: Object, // Prediction details
  department: String,
  recommendations: [Object],
  createdAt: Date
}
```

#### Ambulances Collection
```javascript
{
  _id: ObjectId,
  vehicleId: String,
  status: String, // available, in_transit, at_scene, transporting
  currentLocation: Object, // GPS coordinates
  assignedTo: ObjectId, // Reference to Staff
  lastMaintenance: Date,
  nextMaintenance: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Appointments Collection
```javascript
{
  _id: ObjectId,
  patientId: ObjectId, // Reference to Patients
  doctorId: ObjectId, // Reference to Staff
  dateTime: Date,
  department: String,
  status: String, // scheduled, completed, cancelled, rescheduled
  purpose: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset
- `GET /auth/validate` - Token validation

### User Management Endpoints
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile
- `GET /users/:id` - Get specific user (role-dependent)
- `GET /users` - Get all users (admin only)

### Dashboard Data Endpoints
- `GET /dashboard/stats` - Key metrics (Total Beds, Active Staff, Current Patients, Emergency Cases)
- `GET /dashboard/predictions` - Patient surge predictions
- `GET /dashboard/beds` - Bed availability data
- `GET /dashboard/staff` - Staff readiness data
- `GET /dashboard/alerts` - Recent alerts
- `GET /dashboard/recommendations` - AI recommendations

### Bed Management Endpoints
- `GET /beds` - Get all beds
- `GET /beds/:id` - Get specific bed
- `POST /beds` - Create new bed
- `PUT /beds/:id` - Update bed
- `DELETE /beds/:id` - Delete bed
- `GET /beds/stats` - Bed statistics by department

### Staff Management Endpoints
- `GET /staff` - Get all staff
- `GET /staff/:id` - Get specific staff member
- `POST /staff` - Create new staff member
- `PUT /staff/:id` - Update staff member
- `DELETE /staff/:id` - Delete staff member
- `GET /staff/schedule` - Get staff schedules
- `GET /staff/readiness` - Get staff readiness stats

### Patient Management Endpoints
- `GET /patients` - Get all patients
- `GET /patients/:id` - Get specific patient
- `POST /patients` - Create new patient
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient
- `GET /patients/search` - Search patients

### Medical Records Endpoints
- `GET /records` - Get all medical records (filtered by role)
- `GET /records/:id` - Get specific record
- `POST /records` - Create new record
- `PUT /records/:id` - Update record
- `GET /records/patient/:patientId` - Get records for specific patient

### Inventory Management Endpoints
- `GET /inventory` - Get all inventory items
- `GET /inventory/:id` - Get specific item
- `POST /inventory` - Create new inventory item
- `PUT /inventory/:id` - Update inventory item
- `DELETE /inventory/:id` - Delete inventory item
- `GET /inventory/stats` - Inventory statistics
- `GET /inventory/alerts` - Low stock alerts

### Alerts Management Endpoints
- `GET /alerts` - Get all alerts
- `GET /alerts/:id` - Get specific alert
- `POST /alerts` - Create new alert
- `PUT /alerts/:id` - Update alert
- `DELETE /alerts/:id` - Delete alert
- `POST /alerts/acknowledge/:id` - Acknowledge alert

### Emergency Management Endpoints
- `GET /emergency/incidents` - Get active incidents
- `POST /emergency/incidents` - Create new incident
- `PUT /emergency/incidents/:id` - Update incident
- `GET /emergency/ambulances` - Get ambulance status
- `PUT /emergency/ambulances/:id` - Update ambulance status
- `GET /emergency/protocols` - Get response protocols

### Appointment Management Endpoints
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get specific appointment
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment

### Reporting Endpoints
- `GET /reports/department-performance` - Department performance metrics
- `GET /reports/staff-readiness` - Staff readiness breakdown
- `GET /reports/surge-analysis` - Patient surge analysis
- `GET /reports/inventory-forecast` - Inventory forecast
- `GET /reports/export/:type` - Export report data

## Third-Party Integrations

### Weather API Integration
- Fetch real-time weather data for patient surge predictions
- Integrate with OpenWeatherMap or similar service
- Endpoint: `GET /external/weather`
- Cache data to reduce API calls
- Using OpenWeatherMap API

### Air Quality Index (AQI) Integration
- Fetch AQI data for respiratory illness predictions
- Integrate with AQICN or EPA API
- Endpoint: `GET /external/aqi`
- Cache data to reduce API calls
- Using AQICN API

### Festival/Holiday Data Integration
- Fetch local festival/holiday data for surge predictions
- Manual entry or integration with holiday API
- Endpoint: `GET /external/events`
- Using Holiday API

### Temperature & Humidity Sensors
- Integration with IoT sensors for real-time environmental data
- WebSocket connection for live updates
- Endpoint: `WS /external/sensors`
- Using OpenMeteo API

## AI/ML Services

### Patient Surge Prediction Model
- Machine learning model to predict patient surges
- Factors: Weather, AQI, Events, Historical data
- Integration endpoint: `POST /ai/predict-surge`
- Output: Surge probability, Timing, Department impact

### Staff Reallocation Recommendations
- Algorithm to recommend optimal staff distribution
- Integration endpoint: `POST /ai/staff-recommendations`
- Factors: Surge predictions, Current staffing, Skills

### Supply Procurement Alerts
- Predictive analytics for inventory needs
- Integration endpoint: `POST /ai/supply-alerts`
- Factors: Usage patterns, Seasonal trends, Surge predictions

### Disease Forecasting
- Predict likelihood of disease outbreaks
- Integration endpoint: `POST /ai/disease-forecast`
- Factors: Environmental data, Regional trends, Historical data

## Real-time Features

### WebSocket Connections
- Real-time alert broadcasting
- Live bed status updates
- Staff location tracking
- Ambulance tracking
- Patient monitoring data streams

### Push Notifications
- Mobile push notifications for critical alerts
- Email notifications for non-critical updates
- SMS integration for emergency communications

## Reporting & Export Options

### Department Performance Reports
- Emergency Department metrics
- Surgery Department metrics
- Medical Ward metrics
- Export formats: PDF, CSV, Excel

### Surge Analysis Reports
- Historical surge data
- Prediction accuracy reports
- Resource utilization during surges
- Export formats: PDF, CSV, Excel

### Staff Readiness Reports
- Staff availability by department
- Certification tracking
- Training completion reports
- Export formats: PDF, CSV, Excel

### Inventory Reports
- Current stock levels
- Usage trends
- Supplier performance
- Forecasted needs
- Export formats: PDF, CSV, Excel

### Custom Report Builder
- Filterable reports by date range, department, category
- Scheduled report generation
- Automated report delivery

## Deployment Considerations

### Infrastructure Requirements
- MongoDB Atlas cluster for database
- Node.js server environment
- Redis for caching
- Load balancer for high availability
- SSL certificates for secure connections

### Security Measures
- HTTPS encryption for all communications
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration
- Regular security audits

### Scalability Considerations
- Horizontal scaling with load balancing
- Database indexing for performance
- Caching strategies for frequently accessed data
- CDN for static assets
- Microservices architecture for future expansion

### Monitoring & Logging
- Application performance monitoring
- Database performance monitoring
- Error tracking and alerting
- Audit logs for compliance
- Real-time dashboards for system health

### Backup & Disaster Recovery
- Automated database backups
- Point-in-time recovery
- Cross-region replication
- Backup retention policies
- Regular restore testing
