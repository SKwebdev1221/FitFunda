from datetime import datetime, timedelta
from typing import Optional, Union
from jose import jwt, JWTError
import bcrypt
from app.core.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash."""
    try:
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')
        if isinstance(plain_password, str):
            plain_password = plain_password.encode('utf-8')
        # bcrypt has a 72-byte limit, truncate if necessary
        if len(plain_password) > 72:
            plain_password = plain_password[:72]
        return bcrypt.checkpw(plain_password, hashed_password)
    except Exception as e:
        print(f"Password verification error: {e}")
        return False

def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt."""
    try:
        if isinstance(password, str):
            password = password.encode('utf-8')
        # bcrypt has a 72-byte limit, truncate if necessary
        if len(password) > 72:
            password = password[:72]
        # Generate salt and hash password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        return hashed.decode('utf-8')
    except Exception as e:
        print(f"Password hashing error: {e}")
        raise ValueError(f"Failed to hash password: {str(e)}")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
