// Following code has been commented with appropriate comments for your reference.
import React from 'react';
// Apply CSS according to your design theme or the CSS provided in week 3 lab 2

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';
import Login from './components/Login/Login';
import Sign_Up from './components/Sign_Up/Sign_Up';

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
