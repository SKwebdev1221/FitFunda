# Authentication Flow Test Guide

## How It Works

### 1. **Registration (Signup)**

When a user signs up:

```javascript
// Frontend sends (from Signup.jsx)
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "management"
}
```

**Backend Process** (`/api/v1/auth/register`):
1. Checks if email already exists in MongoDB
2. If not, hashes the password using bcrypt
3. Creates new user document:
```python
{
  "email": "test@example.com",
  "name": "Test User",
  "role": "management",
  "hashed_password": "$2b$12$..." # bcrypt hash
}
```
4. Inserts into MongoDB `users` collection
5. Returns the user object (without password)

### 2. **Login**

When a user logs in:

```javascript
// Frontend sends (from Login.jsx)
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Backend Process** (`/api/v1/auth/login`):
1. Finds user by email in MongoDB
2. Verifies password hash using bcrypt
3. If valid, creates JWT token with:
```python
{
  "sub": "test@example.com",  # user email
  "role": "management",        # user role
  "exp": <expiration_time>
}
```
4. Returns:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

**Frontend Process**:
1. Stores token in localStorage as `authToken`
2. Calls `/api/v1/auth/validate` to get full user details
3. Sets user in AuthContext
4. Navigates to role-based dashboard

### 3. **Token Validation**

Every protected API call:

**Frontend** (axios interceptor):
- Automatically adds header: `Authorization: Bearer <token>`

**Backend** (`get_current_user` dependency):
1. Extracts token from Authorization header
2. Decodes JWT to get email
3. Fetches user from MongoDB by email
4. Returns user object to the endpoint

## Testing the Flow

### Step 1: Start Backend
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Step 2: Test Registration (via API docs)
1. Go to http://localhost:8000/docs
2. Find `POST /api/v1/auth/register`
3. Click "Try it out"
4. Enter:
```json
{
  "email": "test@example.com",
  "name": "Test User",
  "password": "password123",
  "role": "management"
}
```
5. Click "Execute"
6. Should return 200 with user data

### Step 3: Verify in MongoDB
```bash
# Using MongoDB Compass or mongosh
use fitfunda
db.users.find({ email: "test@example.com" })
```

You should see:
```json
{
  "_id": ObjectId("..."),
  "email": "test@example.com",
  "name": "Test User",
  "role": "management",
  "hashed_password": "$2b$12$..."
}
```

### Step 4: Test Login (via API docs)
1. Find `POST /api/v1/auth/login`
2. Click "Try it out"
3. Enter:
```
username: test@example.com
password: password123
```
4. Click "Execute"
5. Should return:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

### Step 5: Test with Frontend
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Fill form and submit
4. Should redirect to login
5. Login with same credentials
6. Should redirect to `/management` dashboard

## Verification Checklist

- [ ] Backend running on port 8000
- [ ] MongoDB running and accessible
- [ ] Can register new user via API docs
- [ ] User appears in MongoDB users collection
- [ ] Password is hashed (starts with $2b$)
- [ ] Can login with registered credentials
- [ ] Receive JWT token
- [ ] Token validates successfully
- [ ] Frontend signup works
- [ ] Frontend login works
- [ ] Redirects to correct dashboard based on role

## Common Issues

### "User already exists"
- Email is already in database
- Use different email or delete existing user:
```javascript
db.users.deleteOne({ email: "test@example.com" })
```

### "Incorrect email or password"
- Email doesn't exist in database
- Password doesn't match hash
- Check MongoDB for user
- Try registering first

### "Could not validate credentials"
- Token is invalid or expired
- Token not sent in Authorization header
- Check axios interceptor is working
- Check token in localStorage

### MongoDB Connection Error
```bash
# Windows
net start MongoDB

# Check if running
mongosh
```

## Security Notes

1. **Passwords are NEVER stored in plain text**
   - Always hashed with bcrypt
   - Salt rounds: 12

2. **JWT Tokens contain**:
   - User email (sub)
   - User role
   - Expiration time (default: 30 days)

3. **Token is stored in**:
   - localStorage (key: 'authToken')
   - Automatically sent with every API request

4. **Protected Routes**:
   - All endpoints except /auth/* require valid token
   - Token validated on every request
   - User fetched from DB on every request

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  role: String (enum: management, doctor, nurse, patient, inventory, emergency),
  hashed_password: String (bcrypt hash)
}
```

## Next Steps

1. Test the complete flow
2. Add more users with different roles
3. Test role-based access
4. Verify dashboard data loads correctly
