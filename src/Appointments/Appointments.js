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

  const handleRateVisit = (appointmentId, rating, review) => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, rating: rating, review: review, rated: true };
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
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Doctor Name</th>
                    <th>Speciality</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient Name</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAppointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <td>{index + 1}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.specialty}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.timeSlot}</td>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.phone}</td>
                      <td>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Doctor Name</th>
                    <th>Speciality</th>
                    <th>Provide Feedback</th>
                    <th>Review Given</th>
                  </tr>
                </thead>
                <tbody>
                  {pastAppointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <td>{index + 1}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.specialty}</td>
                      <td>
                        {!appointment.review ? (
                          <GiveReviews onReviewSubmit={(reviewData) => handleRateVisit(appointment.id, reviewData.rating, reviewData.review)} />
                        ) : (
                          <button className="review-btn" disabled>Reviewed</button>
                        )}
                      </td>
                      <td>
                        {appointment.review ? (
                          <>
                            <div style={{ color: '#ffc107', marginBottom: '5px' }}>
                              {'★'.repeat(appointment.rating)}
                              <span style={{ color: '#ddd' }}>{'★'.repeat(5 - appointment.rating)}</span>
                            </div>
                            <div>{appointment.review}</div>
                          </>
                        ) : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Appointments;
