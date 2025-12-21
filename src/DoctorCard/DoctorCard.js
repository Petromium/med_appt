import React, { useState } from 'react';
import './DoctorCard.css';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    console.log('Appointment booked:', appointmentData);
    setShowModal(false);
  };

  return (
    <>
      <div className="doctor-card-container">
        <div className="doctor-card-details-container">
          <div className="doctor-card-profile-image-container">
            <img src={profilePic} alt={name} />
          </div>
          <div className="doctor-card-details">
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">{experience}</div>
            <div className="doctor-card-detail-consultationfee">Ratings: {ratings}</div>
          </div>
        </div>
        <button className="book-appointment-btn" onClick={handleBooking}>
          <div>Book Appointment</div>
          <div>No Booking Fee</div>
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCancel}>&times;</span>
            <h2>Book Appointment with {name}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleFormSubmit({
                id: uuidv4(),
                name: formData.get('name'),
                phone: formData.get('phone'),
                date: formData.get('date'),
                time: formData.get('time')
              });
            }}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="date" name="date" required />
              <input type="time" name="time" required />
              <button type="submit">Book Now</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
