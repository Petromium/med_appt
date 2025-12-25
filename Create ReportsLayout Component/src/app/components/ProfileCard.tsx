import React from 'react';

// ProfileCard Component - Displays user profile information
const ProfileCard: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '16px', color: '#333' }}>Patient Profile</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        <div>
          <strong>Name:</strong> <span>John Patient</span>
        </div>
        <div>
          <strong>Email:</strong> <span>john.patient@example.com</span>
        </div>
        <div>
          <strong>Phone:</strong> <span>+1 (555) 123-4567</span>
        </div>
        <div>
          <strong>Date of Birth:</strong> <span>January 15, 1985</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
