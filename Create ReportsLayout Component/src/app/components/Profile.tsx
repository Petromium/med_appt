import React from 'react';
import ProfileCard from './ProfileCard';
import ReportsLayout from '../../ReportsLayout/ReportsLayout';

// Profile Page Component - Combines ProfileCard and ReportsLayout
const Profile: React.FC = () => {
  return (
    <div style={{ padding: '20px 0', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Profile Information Section */}
      <ProfileCard />
      
      {/* Medical Reports Section - Appears below ProfileCard */}
      <div style={{ marginTop: '20px' }}>
        <ReportsLayout />
      </div>
    </div>
  );
};

export default Profile;
