import React from 'react';
import './ProfileAndReports.css';
import ProfileCard from '../ProfileCard/ProfileCard';
import ReportsLayout from '../ReportsLayout/ReportsLayout';

const ProfileAndReports = () => {
    return (
        <div className="profile-reports-page">
            <div className="reports-container">
                <ProfileCard embedded />

                <div id="reports">
                    <ReportsLayout embedded />
                </div>
            </div>
        </div>
    );
};

export default ProfileAndReports;
