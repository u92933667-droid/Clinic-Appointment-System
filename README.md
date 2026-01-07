# 🏥 Clinic Appointment System (CEP)

**Course**: Complex Engineering Problem (CEP) - Computer Programming in Python  
**Instructor**: Dr. M. Abbas Abbasi  
**Team**: Pairs (2 Students)

---

## 📋 Project Overview

A modern, full-stack web application to manage clinic appointments with an intuitive interface and comprehensive features. The system allows booking, viewing, editing, and deleting appointments while tracking patients and doctors across multiple medical specialties.

### ✨ Key Features

- **Smart Booking System** - Select patients and doctors from dropdown menus
- **10 Pre-loaded Patients** - Diverse age groups and backgrounds
- **8 Medical Specialties** - Cardiologist, Dentist, Neurologist, Orthopedic, Dermatologist, General Physician, Pediatrician, ENT Specialist
- **Visual Doctor Directory** - Specialty icons for quick identification
- **Real-time Statistics** - Dashboard showing total appointments, patients, doctors, and today's appointments
- **Full CRUD Operations** - Create, Read, Update, Delete appointments
- **Modern Dark UI** - Professional gradient design with smooth animations
- **Responsive Design** - Works on desktop and mobile devices

---

## 🛠️ Technology Stack

- **Backend**: Python 3.14, FastAPI, SQLAlchemy, SQLite
- **Frontend**: React (Vite), JavaScript, CSS
- **Database**: SQLite with relationships
- **API**: RESTful endpoints with CORS support

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.14+
- Node.js 18+
- npm

### 1. Backend Setup
```bash
# Navigate to project directory
cd "Clinick appointment system"

# Install Python dependencies (if not already installed)
pip install -r backend/requirements.txt

# Start backend server
uvicorn backend.main:app --reload
```
**Backend API**: http://localhost:8000  
**API Docs**: http://localhost:8000/docs

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```
**Application**: http://localhost:5173

### 3. Reset Database (Optional)
```bash
# If you need to reset the database to original sample data
python reset_db.py

# Then restart the backend server
```

---

## 📊 System Statistics

- **10 Patients** - Ages 8 to 55 years
- **8 Doctors** - Covering major medical specialties
- **10 Sample Appointments** - Pre-populated realistic data
- **4 Dashboard Metrics** - Real-time statistics

### Doctor Specialties

| Icon | Doctor | Specialty |
|------|--------|-----------|
| ❤️ | Dr. Smith | Cardiologist |
| 🦷 | Dr. Ayesha | Dentist |
| 🧠 | Dr. Ahmed | Neurologist |
| 🦴 | Dr. Fatima | Orthopedic Surgeon |
| ✨ | Dr. Hassan | Dermatologist |
| 🩺 | Dr. Zain | General Physician |
| 👶 | Dr. Noor | Pediatrician |
| 👂 | Dr. Usman | ENT Specialist |

---

## 📁 Project Structure

```
Clinick appointment system/
├── backend/
│   ├── main.py              # FastAPI app with all endpoints
│   ├── requirements.txt     # Python dependencies
│   └── __pycache__/
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── index.css       # Modern dark theme styles
│   │   └── main.jsx        # React entry point
│   ├── package.json        # Node dependencies
│   └── index.html
├── clinic.db               # SQLite database (auto-created)
├── reset_db.py            # Database reset utility
├── RESET_DATABASE.bat     # Windows batch script for reset
├── reset_database.ps1     # PowerShell reset script
├── README.md              # This file
└── deployment_guide.md    # Deployment instructions
```

---

## 🗄️ Database Schema

### Tables

1. **patients**
   - id (Primary Key)
   - name (String)
   - age (Integer)
   - phone (String)

2. **doctors**
   - id (Primary Key)
   - name (String)
   - specialty (String)

3. **appointments**
   - id (Primary Key)
   - patient_id (Foreign Key → patients.id)
   - doctor_id (Foreign Key → doctors.id)
   - date (String)
   - time (String)
   - reason (String)

### Relationships
- One patient → Many appointments
- One doctor → Many appointments
- Each appointment links to one patient and one doctor

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/appointments` | Get all appointments with patient/doctor info |
| POST | `/appointments` | Create new appointment |
| PUT | `/appointments/{id}` | Update appointment |
| DELETE | `/appointments/{id}` | Delete appointment |
| GET | `/patients` | Get all patients |
| GET | `/doctors` | Get all doctors |
| GET | `/stats` | Get dashboard statistics |

---

## 🎓 CLO Mapping (Course Learning Outcomes)

| CLO | Description | Implementation |
|-----|-------------|----------------|
| **CLO-1** | Python Programming | FastAPI framework, SQLAlchemy ORM, database models with inheritance, file I/O with SQLite |
| **CLO-2** | Emerging Technologies | FastAPI (modern async framework), React with Vite (latest tooling), RESTful API design |
| **CLO-3** | Development & Debugging | VS Code environment, browser DevTools, network debugging, database inspection |
| **CLO-4** | Documentation | Comprehensive README, code comments, API documentation, deployment guide |
| **CLO-5** | Project Planning | Structured development: Database → Backend API → Frontend UI → Integration → Testing |

---

## 🎨 UI/UX Highlights

- **Dark Mode Design** - Professional slate/purple gradient theme
- **Dashboard Cards** - Color-coded statistics with hover effects
- **Smart Dropdowns** - No manual ID entry required
- **Specialty Icons** - Visual identification for doctor types
- **Smooth Animations** - Card hovers, transitions, fade-ins
- **Responsive Layout** - Mobile-friendly grid system
- **Interactive Table** - Edit and delete buttons with visual feedback

---

## 🚢 Deployment

See [deployment_guide.md](./deployment_guide.md) for instructions on deploying to:
- **Backend**: Render / Railway / Heroku
- **Frontend**: Vercel / Netlify
- **Database**: PostgreSQL for production

---

## 📝 Sample Data

The system includes realistic sample data:
- **Patients**: Ali Khan (30), Sara Ahmed (25), Fatima Hassan (35), Ahmed Raza (50), etc.
- **Appointments**: Chest Pain → Cardiologist, Migraine → Neurologist, Knee Pain → Orthopedic
- **Proper matching**: Each patient assigned to appropriate specialist

---

## 🔧 Utilities

### Database Reset Script (`reset_db.py`)
```bash
python reset_db.py
```
Clears all database tables and triggers fresh data population on next server restart.

### Windows Batch Script
Double-click `RESET_DATABASE.bat` to reset database automatically (Windows only).

---

## 👥 Team Members

- [Your Name]
- [Partner Name]

---

## 📄 License

This project is created for educational purposes as part of the CEP course.

---

## 🙏 Acknowledgments

- Dr. M. Abbas Abbasi - Course Instructor
- FastAPI Documentation
- React Documentation
- SQLAlchemy Documentation

---

**Project Status**: ✅ Complete and Production-Ready
