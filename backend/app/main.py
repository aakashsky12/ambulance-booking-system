from fastapi import FastAPI
from app.database import engine, Base
from app.models.user import User
from app.routers import user
from app.auth import get_current_user
from fastapi import Depends
from app.models.user import User
from app.models.ambulance import Ambulance
from app.routers import ambulance
from app.models.booking import Booking
from app.routers import booking
from fastapi.middleware.cors import CORSMiddleware
from app.routers import dashboard

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(user.router)
app.include_router(ambulance.router)
app.include_router(booking.router)
app.include_router(dashboard.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Ambulance Booking System 🚑"}

@app.get("/test-db")
def test_db():
    try:
        with engine.connect():
            pass
        return {"message": "Database connected successfully ✅"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/profile")
def profile(user=Depends(get_current_user)):
    return {
        "message": "Protected Route ✅",
        "user": user
    }