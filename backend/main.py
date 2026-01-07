from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship, joinedload
import os

# --- Database Setup ---
DATABASE_URL = "sqlite:///./clinic.db"
# connect_args is needed for SQLite to work with multiple threads
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Models ---
class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    phone = Column(String)

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialty = Column(String)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    date = Column(String) # Keeping it simple as String for now
    time = Column(String)
    reason = Column(String)
    
    patient = relationship("Patient")
    doctor = relationship("Doctor")

# --- FastAPI App ---
app = FastAPI()

# Enable CORS for React Frontend
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", "*") # Allow Render backend to trust your Vercel frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Startup Event (Populate Data) ---
@app.on_event("startup")
def startup_event():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    # Check if we have data
    if db.query(Patient).count() == 0:
        print("Populating database with sample data...")
        
        # Sample Patients - Expanded List
        p1 = Patient(name="Ali Khan", age=30, phone="0300-1234567")
        p2 = Patient(name="Sara Ahmed", age=25, phone="0321-9876543")
        p3 = Patient(name="John Doe", age=40, phone="0333-5555555")
        p4 = Patient(name="Fatima Hassan", age=35, phone="0345-1122334")
        p5 = Patient(name="Ahmed Raza", age=50, phone="0311-9988776")
        p6 = Patient(name="Zainab Ali", age=28, phone="0301-2233445")
        p7 = Patient(name="Hassan Mahmood", age=45, phone="0322-6677889")
        p8 = Patient(name="Ayesha Malik", age=8, phone="0333-4455667")
        p9 = Patient(name="Omar Farooq", age=55, phone="0300-7788990")
        p10 = Patient(name="Maria Khan", age=32, phone="0321-5566778")
        db.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
        db.commit()
        
        # Sample Doctors - Multiple Specialties
        d1 = Doctor(name="Smith", specialty="Cardiologist")
        d2 = Doctor(name="Ayesha", specialty="Dentist")
        d3 = Doctor(name="Ahmed", specialty="Neurologist")
        d4 = Doctor(name="Fatima", specialty="Orthopedic Surgeon")
        d5 = Doctor(name="Hassan", specialty="Dermatologist")
        d6 = Doctor(name="Zain", specialty="General Physician")
        d7 = Doctor(name="Noor", specialty="Pediatrician")
        d8 = Doctor(name="Usman", specialty="ENT Specialist")
        db.add_all([d1, d2, d3, d4, d5, d6, d7, d8])
        db.commit()
        
        # Sample Appointments
        a1 = Appointment(patient_id=p1.id, doctor_id=d1.id, date="2024-01-15", time="10:00 AM", reason="Chest Pain")
        a2 = Appointment(patient_id=p2.id, doctor_id=d2.id, date="2024-01-16", time="11:30 AM", reason="Root Canal")
        a3 = Appointment(patient_id=p3.id, doctor_id=d6.id, date="2024-01-17", time="09:00 AM", reason="Regular Checkup")
        a4 = Appointment(patient_id=p4.id, doctor_id=d5.id, date="2024-01-18", time="02:00 PM", reason="Skin Rash")
        a5 = Appointment(patient_id=p5.id, doctor_id=d3.id, date="2024-01-19", time="10:30 AM", reason="Migraine")
        a6 = Appointment(patient_id=p6.id, doctor_id=d2.id, date="2024-01-20", time="03:00 PM", reason="Tooth Cleaning")
        a7 = Appointment(patient_id=p7.id, doctor_id=d4.id, date="2024-01-21", time="11:00 AM", reason="Knee Pain")
        a8 = Appointment(patient_id=p8.id, doctor_id=d7.id, date="2024-01-22", time="01:00 PM", reason="Vaccination")
        a9 = Appointment(patient_id=p9.id, doctor_id=d1.id, date="2024-01-23", time="09:30 AM", reason="Blood Pressure Check")
        a10 = Appointment(patient_id=p10.id, doctor_id=d8.id, date="2024-01-24", time="04:00 PM", reason="Ear Infection")
        db.add_all([a1, a2, a3, a4, a5, a6, a7, a8, a9, a10])
        db.commit()
        print("Database populated with 10 patients, 8 doctors, and 10 appointments!")
    else:
        print("Database already has data.")
    db.close()

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the Clinic Appointment System API"}

@app.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    # Use joinedload to fetch the related Patient and Doctor data in the same query
    appointments = db.query(Appointment).options(
        joinedload(Appointment.patient),
        joinedload(Appointment.doctor)
    ).all()
    return appointments

@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()

@app.get("/doctors")
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

# --- Week 4: Add & Delete Endpoints ---

from pydantic import BaseModel

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: str
    time: str
    reason: str

@app.post("/appointments")
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = Appointment(
        patient_id=appointment.patient_id,
        doctor_id=appointment.doctor_id,
        date=appointment.date,
        time=appointment.time,
        reason=appointment.reason
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if db_appointment:
        db.delete(db_appointment)
        db.commit()
        return {"message": "Appointment deleted"}
    return {"error": "Appointment not found"}

@app.put("/appointments/{appointment_id}")
def update_appointment(appointment_id: int, appointment: AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if db_appointment:
        db_appointment.patient_id = appointment.patient_id
        db_appointment.doctor_id = appointment.doctor_id
        db_appointment.date = appointment.date
        db_appointment.time = appointment.time
        db_appointment.reason = appointment.reason
        db.commit()
        db.refresh(db_appointment)
        return db_appointment
    return {"error": "Appointment not found"}

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    from datetime import date
    today = str(date.today())
    
    total_appointments = db.query(Appointment).count()
    total_patients = db.query(Patient).count()
    total_doctors = db.query(Doctor).count()
    today_appointments = db.query(Appointment).filter(Appointment.date == today).count()
    
    return {
        "total_appointments": total_appointments,
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "today_appointments": today_appointments
    }
