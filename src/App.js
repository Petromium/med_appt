// Following code has been commented with appropriate comments for your reference.
import React, { useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 3 lab 2

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Sign_Up />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
