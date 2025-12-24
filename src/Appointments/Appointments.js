import React, { useState, useEffect } from 'react';
import './Appointments.css';
import GiveReviews from '../ReviewForm/GiveReviews';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(storedAppointments);
  }, []);

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    }
  };

  const handleRateVisit = (appointmentId, rating) => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, rating: rating, rated: true };
      }
      return apt;
    });
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return aptDate >= today && !apt.completed;
  });

  const pastAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return aptDate < today || apt.completed;
  });

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <h1>My Appointments</h1>

        {/* Upcoming Appointments */}
        <section className="appointments-section">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No upcoming appointments</p>
              <a href="/find-doctors" className="book-now-link">Book an appointment</a>
            </div>
          ) : (
            <div className="appointments-grid">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{appointment.doctorName}</h3>
                    <span className="appointment-type">{appointment.appointmentType || 'Scheduled'}</span>
                  </div>
                  <p className="specialty">{appointment.specialty}</p>
                  <div className="appointment-details">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot}</p>
                    <p><strong>Patient:</strong> {appointment.patientName}</p>
                    <p><strong>Phone:</strong> {appointment.phone}</p>
                  </div>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel Appointment
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Appointments */}
        <section className="appointments-section">
          <h2>Past Appointments</h2>
          {pastAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No past appointments</p>
            </div>
          ) : (
            <div className="appointments-grid">
              {pastAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-card past">
                  <div className="appointment-header">
                    <h3>{appointment.doctorName}</h3>
                  </div>
                  <p className="specialty">{appointment.specialty}</p>
                  <div className="appointment-details">
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot}</p>
                  </div>
                  {!appointment.rated ? (
                    <div className="review-section">
                      <GiveReviews />
                    </div>
                  ) : (
                    <div className="rated">
                      <p>Review submitted ✓</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Appointments;
