# Registration Testing Guide

## Quick Test Steps

### 1. Check Backend is Running
- Backend should be at: http://localhost:8000
- API Docs at: http://localhost:8000/docs
- You should see "Connected to MongoDB" in terminal

### 2. Test Registration via Frontend

**Go to**: http://localhost:5173

**Click "Sign Up"** and enter:
```
Name: Test User
Email: test@fitfunda.com
Password: Test@123
Role: management
```

**Click "Sign up"**

### 3. Check Browser Console

Press F12 to open DevTools, go to Console tab.

**Look for**:
- ✅ POST request to http://localhost:8000/api/v1/auth/register
- ✅ Status 200 (success)
- ❌ Any error messages (CORS, 422, 500, etc.)

### 4. Check Network Tab

In DevTools, go to Network tab:
- Find the `/auth/register` request
- Click on it
- Check:
  - **Request Payload**: Should show your user data
  - **Response**: Should show user object with _id
  - **Status Code**: Should be 200

### 5. Verify in MongoDB Atlas

**Go to**: https://cloud.mongodb.com
- Navigate to your cluster
- Click "Browse Collections"
- Database: `fitfunda_db`
- Collection: `users`
- You should see 1 document with your user data

### Common Issues and Fixes

#### Issue 1: CORS Error
**Error**: "Access to fetch at 'http://localhost:8000' from origin 'http://localhost:5173' has been blocked by CORS policy"

**Fix**: Backend CORS is already configured, but if you see this:
1. Check backend terminal for errors
2. Restart backend
3. Clear browser cache

#### Issue 2: 422 Validation Error
**Error**: "Unprocessable Entity"

**Possible causes**:
- Missing required field
- Invalid email format
- Wrong data type

**Check**: Network tab → Request Payload should match:
```json
{
  "email": "test@fitfunda.com",
  "name": "Test User",
  "password": "Test@123",
  "role": "management"
}
```

#### Issue 3: 500 Internal Server Error
**Error**: Server error

**Check backend terminal** for error details:
- MongoDB connection error?
- Python error in code?

#### Issue 4: Network Error / Connection Refused
**Error**: "Failed to fetch" or "ERR_CONNECTION_REFUSED"

**Fix**:
- Backend is not running
- Run: `uvicorn app.main:app --reload` in backend folder

#### Issue 5: User Already Exists
**Error**: "The user with this email already exists"

**Fix**: Use a different email or delete the existing user:
```javascript
// In MongoDB Atlas or Compass
db.users.deleteOne({ email: "test@fitfunda.com" })
```

### Debug Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] MongoDB Atlas connection working
- [ ] "Connected to MongoDB" message in backend terminal
- [ ] No CORS errors in browser console
- [ ] Request reaches backend (check backend terminal logs)
- [ ] Response status is 200
- [ ] User appears in MongoDB Atlas

### Expected Flow

1. **User fills signup form** → Frontend
2. **POST /api/v1/auth/register** → API call
3. **Backend receives request** → FastAPI
4. **Validates data** → Pydantic
5. **Checks if email exists** → MongoDB query
6. **Hashes password** → bcrypt
7. **Inserts user** → MongoDB
8. **Returns user object** → Response
9. **Frontend shows success** → Redirect to login

### Test Login After Registration

After successful registration:

1. **Go to login page**
2. **Enter**:
   - Email: test@fitfunda.com
   - Password: Test@123
3. **Click "Sign in"**
4. **Should redirect to**: /management

### Verify Token

After login, check:
- localStorage should have `authToken`
- Token should be JWT format (3 parts separated by dots)
- Dashboard should load with data

## Need More Help?

If registration still fails:
1. Take screenshot of browser console (F12 → Console)
2. Take screenshot of Network tab showing the failed request
3. Copy backend terminal output
4. Check MongoDB Atlas for any connection issues
