// Following code has been commented with appropriate comments for your reference.
import React from 'react';
// Apply CSS according to your design theme or the CSS provided in week 3 lab 2

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Landing_Page from './Landing_Page/LandingPage';
import Login from './Login/Login';
import Sign_Up from './Sign_Up/Sign_Up';
import InstantConsultation from './InstantConsultationBooking/InstantConsultation';
import Appointments from './Appointments/Appointments';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import Notification from './Notification/Notification';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/find-doctors" element={<FindDoctorSearch />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
