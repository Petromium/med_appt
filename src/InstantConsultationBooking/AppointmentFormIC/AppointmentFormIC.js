import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, date, timeSlot });
    setName('');
    setPhoneNumber('');
    setDate('');
    setTimeSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="timeSlot">Time Slot:</label>
        <select
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        >
          <option value="">Select a time</option>
          <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
          <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
          <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
          <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
        </select>
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC
