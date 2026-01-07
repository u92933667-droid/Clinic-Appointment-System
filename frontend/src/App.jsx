import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [stats, setStats] = useState({
    total_appointments: 0,
    total_patients: 0,
    total_doctors: 0,
    today_appointments: 0
  })
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    date: '',
    time: '',
    reason: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch appointments
  const fetchAppointments = () => {
    axios.get(`${API_BASE_URL}/appointments`)
      .then(response => {
        setAppointments(response.data)
      })
      .catch(error => console.error("Error fetching data:", error))
  }

  // Fetch dashboard statistics
  const fetchStats = () => {
    axios.get(`${API_BASE_URL}/stats`)
      .then(response => {
        setStats(response.data)
      })
      .catch(error => console.error("Error fetching stats:", error))
  }

  // Fetch patients
  const fetchPatients = () => {
    axios.get(`${API_BASE_URL}/patients`)
      .then(response => {
        setPatients(response.data)
      })
      .catch(error => console.error("Error fetching patients:", error))
  }

  // Fetch doctors
  const fetchDoctors = () => {
    axios.get(`${API_BASE_URL}/doctors`)
      .then(response => {
        setDoctors(response.data)
      })
      .catch(error => console.error("Error fetching doctors:", error))
  }

  useEffect(() => {
    fetchAppointments()
    fetchStats()
    fetchPatients()
    fetchDoctors()
  }, [])

  // Handle Input Change
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Handle Submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert IDs to integers
    const payload = {
      ...form,
      patient_id: parseInt(form.patient_id),
      doctor_id: parseInt(form.doctor_id)
    }

    if (isEditing) {
      // Update existing appointment
      axios.put(`${API_BASE_URL}/appointments/${editingId}`, payload)
        .then(() => {
          fetchAppointments()
          fetchStats()
          cancelEdit()
        })
        .catch(error => {
          console.error("Error updating appointment:", error)
          alert("Failed to update appointment! Error: " + error.message)
        })
    } else {
      // Add new appointment
      axios.post(`${API_BASE_URL}/appointments`, payload)
        .then(() => {
          fetchAppointments()
          fetchStats()
          setForm({ patient_id: '', doctor_id: '', date: '', time: '', reason: '' })
        })
        .catch(error => {
          console.error("Error adding appointment:", error)
          alert("Failed to add appointment! Error: " + error.message)
        })
    }
  }

  // Handle Edit - populate form with appointment data
  const handleEdit = (appointment) => {
    setForm({
      patient_id: appointment.patient_id.toString(),
      doctor_id: appointment.doctor_id.toString(),
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason
    })
    setEditingId(appointment.id)
    setIsEditing(true)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancel Edit
  const cancelEdit = () => {
    setForm({ patient_id: '', doctor_id: '', date: '', time: '', reason: '' })
    setEditingId(null)
    setIsEditing(false)
  }

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`${API_BASE_URL}/appointments/${id}`)
        .then(() => {
          fetchAppointments()
          fetchStats()
        })
        .catch(error => console.error("Error deleting appointment:", error))
    }
  }

  return (
    <div className="container">
      <h1 className="gradient-header">🏥 Clinic Appointment System</h1>

      {/* Dashboard Stats */}
      <div className="stats-container">
        <div className="stat-card stat-card-1">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <div className="stat-value">{stats.total_appointments}</div>
            <div className="stat-label">Total Appointments</div>
          </div>
        </div>
        <div className="stat-card stat-card-2">
          <div className="stat-icon">🧑‍⚕️</div>
          <div className="stat-info">
            <div className="stat-value">{stats.total_patients}</div>
            <div className="stat-label">Total Patients</div>
          </div>
        </div>
        <div className="stat-card stat-card-3">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-info">
            <div className="stat-value">{stats.total_doctors}</div>
            <div className="stat-label">Total Doctors</div>
          </div>
        </div>
        <div className="stat-card stat-card-4">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <div className="stat-value">{stats.today_appointments}</div>
            <div className="stat-label">Today's Appointments</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="form-container">
        <h3>{isEditing ? '✏️ Edit Appointment' : '➕ Book New Appointment'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <select
              name="patient_id"
              value={form.patient_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
            <select
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason for visit"
              value={form.reason}
              onChange={handleInputChange}
              required
              className="reason-input"
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              {isEditing ? '✔️ Update' : '➕ Book'}
            </button>
            {isEditing && (
              <button type="button" onClick={cancelEdit} className="btn-secondary">
                ✖️ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Patients and Doctors Information */}
      <div className="info-grid">
        {/* Patients List */}
        <div className="info-card">
          <h3>👥 Patients List</h3>
          <div className="info-list">
            {patients.map(patient => {
              const patientAppointments = appointments.filter(app => app.patient_id === patient.id)
              return (
                <div key={patient.id} className="info-item">
                  <div className="info-item-header">
                    <strong>{patient.name}</strong>
                    <span className="info-badge">{patient.age} years</span>
                  </div>
                  <p className="info-detail">📞 {patient.phone}</p>
                  <p className="info-detail">
                    📅 {patientAppointments.length} appointment{patientAppointments.length !== 1 ? 's' : ''}
                    {patientAppointments.length > 0 && (
                      <span className="assigned-doctors">
                        {' '}- Assigned to: {[...new Set(patientAppointments.map(a => a.doctor?.name))].join(', ')}
                      </span>
                    )}
                  </p>
                </div>
              )
            })}
            {patients.length === 0 && (
              <p className="no-data">No patients registered yet.</p>
            )}
          </div>
        </div>

        {/* Doctors List */}
        <div className="info-card">
          <h3>👨‍⚕️ Doctors & Specialties</h3>
          <div className="info-list">
            {doctors.map(doctor => {
              const doctorAppointments = appointments.filter(app => app.doctor_id === doctor.id)
              const specialtyIcon = doctor.specialty.toLowerCase().includes('cardio') ? '❤️' :
                doctor.specialty.toLowerCase().includes('dent') ? '🦷' :
                  doctor.specialty.toLowerCase().includes('neuro') ? '🧠' :
                    doctor.specialty.toLowerCase().includes('ortho') ? '🦴' :
                      doctor.specialty.toLowerCase().includes('derma') ? '✨' :
                        doctor.specialty.toLowerCase().includes('pediatr') ? '👶' :
                          doctor.specialty.toLowerCase().includes('ent') ? '👂' :
                            doctor.specialty.toLowerCase().includes('general') ? '🩺' :
                              '🩺'
              return (
                <div key={doctor.id} className="info-item doctor-item">
                  <div className="info-item-header">
                    <strong>Dr. {doctor.name}</strong>
                  </div>
                  <p className="info-detail specialty-tag">
                    {specialtyIcon} <strong>{doctor.specialty}</strong>
                  </p>
                  <p className="info-detail">
                    📊 {doctorAppointments.length} appointment{doctorAppointments.length !== 1 ? 's' : ''}
                  </p>
                  {doctorAppointments.length > 0 && (
                    <p className="info-detail patients-list">
                      Patients: {[...new Set(doctorAppointments.map(a => a.patient?.name))].join(', ')}
                    </p>
                  )}
                </div>
              )
            })}
            {doctors.length === 0 && (
              <p className="no-data">No doctors registered yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="table-container">
        <h3>📋 All Appointments ({appointments.length})</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id} className={editingId === app.id ? 'editing-row' : ''}>
                <td>{app.id}</td>
                <td>{app.patient ? app.patient.name : 'Unknown'}</td>
                <td>{app.doctor ? app.doctor.name : 'Unknown'}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>{app.reason}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEdit(app)}
                      className="btn-edit"
                      title="Edit Appointment"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="btn-delete"
                      title="Delete Appointment"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <p className="no-data">No appointments found. Book your first appointment!</p>
        )}
      </div>
    </div>
  )
}

export default App
