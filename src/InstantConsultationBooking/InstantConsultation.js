import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const handleSearch = (searchText) => {

        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {

            const filtered = doctors.filter(
                (doctor) =>
                    // 
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())

            );

            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };
    useEffect(() => {
        const getDoctorsDetails = () => {
            fetch('https://api.npoint.io/9a5543d36f1460da2f63')
                .then(res => res.json())
                .then(data => {
                    if (searchParams.get('speciality')) {
                        const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                        setFilteredDoctors(filtered);
                        setIsSearched(true);
                    } else {
                        setFilteredDoctors([]);
                        setIsSearched(false);
                    }
                    setDoctors(data);
                })
                .catch(err => console.log(err));
        };

        getDoctorsDetails();
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
    }, [searchParams])

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                {isSearched ? (
                    <div className="search-results-section">
                        <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                        <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                        {filteredDoctors.length > 0 ? (
                            <div className="search-results-container">
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCardIC {...doctor} key={doctor.name} />
                                ))}
                            </div>
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </center>
    )
}

export default InstantConsultation