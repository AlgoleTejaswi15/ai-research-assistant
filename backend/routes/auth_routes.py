from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.user_model import User
from backend.auth.security import create_access_token
import bcrypt

router = APIRouter()


# DATABASE CONNECTION
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# REGISTER API
@router.post("/register")
def register_user(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Check existing email
    existing_email = db.query(User).filter(
        User.email == email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check existing username
    existing_username = db.query(User).filter(
        User.username == username
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    )

    # Create user
    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password.decode('utf-8')
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# LOGIN API
@router.post("/login")
def login_user(
    username: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Find user
    user = db.query(User).filter(
        User.username == username
    ).first()

    # Check username
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    # Check password
    if not bcrypt.checkpw(
        password.encode('utf-8'),
        user.password_hash.encode('utf-8')
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # Create JWT token
    token = create_access_token(
        {"sub": user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }