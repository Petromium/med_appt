import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './FindDoctorSearch.css';
import DoctorCardIC from '../InstantConsultationBooking/DoctorCardIC/DoctorCardIC';

const FindDoctorSearch = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Fallback doctors data if API fails
  const fallbackDoctors = [
    {
      name: "Dr. John Yang",
      speciality: "Dentist",
      experience: "8 years experience",
      ratings: 4,
      profile_photo: "./profile-pictures/doc1.jpg"
    },
    {
      name: "Dr. Denis Raj",
      speciality: "Dentist",
      experience: "24 years experience",
      ratings: 5,
      profile_photo: "./profile-pictures/doc2.jpg"
    },
    {
      name: "Dr. Lyn Christie",
      speciality: "Dentist",
      experience: "19 years experience",
      ratings: 3,
      profile_photo: "./profile-pictures/doc3.jpg"
    },
    {
      name: "Dr. Richard Pearson",
      speciality: "General Physician",
      experience: "40 years experience",
      ratings: 3,
      profile_photo: "./profile-pictures/doc4.jpg"
    },
    {
      name: "Dr. Mark D. Okusa",
      speciality: "General Physician",
      experience: "3 years experience",
      ratings: 4,
      profile_photo: "./profile-pictures/doc5.jpg"
    },
    {
      name: "Dr. Michael Smith",
      speciality: "General Physician",
      experience: "40 years experience",
      ratings: 5,
      profile_photo: "./profile-pictures/doc6.jpg"
    },
    {
      name: "Dr. Laura Taylor",
      speciality: "General Physician",
      experience: "3 years experience",
      ratings: 3,
      profile_photo: "./profile-pictures/doc7.jpg"
    },
    {
      name: "Dr. Sarah Johnson",
      speciality: "Cardiologist",
      experience: "15 years experience",
      ratings: 4.8,
      profile_photo: "./profile-pictures/doc8.jpg"
    },
    {
      name: "Dr. Michael Chen",
      speciality: "Cardiologist",
      experience: "20 years experience",
      ratings: 4.9,
      profile_photo: "./profile-pictures/doc9.jpg"
    },
    {
      name: "Dr. Emily White",
      speciality: "Dermatologist",
      experience: "12 years experience",
      ratings: 4.6,
      profile_photo: "./profile-pictures/doc10.jpg"
    }
  ];

  // Fetch doctors with fallback
  useEffect(() => {
    const getDoctorsDetails = async () => {
      try {
        const response = await fetch('https://api.npoint.io/9a5543d36f1546d1e473');

        if (!response.ok) {
          throw new Error('API failed');
        }

        const data = await response.json();
        setDoctorDetails(data);
        setFilteredDoctors(data);

        if (searchParams.get('speciality')) {
          const filtered = data.filter(doctor =>
            doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        }
      } catch (error) {
        console.log('API failed, using fallback data:', error);
        setDoctorDetails(fallbackDoctors);
        setFilteredDoctors(fallbackDoctors);

        if (searchParams.get('speciality')) {
          const filtered = fallbackDoctors.filter(doctor =>
            doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        }
      }
    };

    getDoctorsDetails();
  }, [searchParams]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredDoctors(doctorDetails);
      setIsSearched(false);
    } else {
      const filtered = doctorDetails.filter(doctor =>
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="find-doctor-search">
      <center>
        <h1>Find Doctors and Book Appointments</h1>

        <div className="home-search-container">
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors by specialty (e.g., Dentist, Cardiologist, Dermatologist)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="finddoctor-search-icon">
            <button
              className="search-doctor-btn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="search-results-section">
          <h2>{filteredDoctors.length} doctors available</h2>
          <p>Schedule appointments at your convenience with verified doctor profiles</p>

          {filteredDoctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found{searchTerm ? ` for "${searchTerm}"` : ''}</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilteredDoctors(doctorDetails);
                  setIsSearched(false);
                }}
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <div className="search-results-container">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCardIC
                  key={index}
                  name={doctor.name}
                  speciality={doctor.speciality}
                  experience={doctor.experience}
                  ratings={doctor.ratings}
                  profilePic={doctor.profile_photo}
                />
              ))}
            </div>
          )}
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;