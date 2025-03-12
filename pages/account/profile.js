import React from 'react';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Sidebar />
        <div className="flex-1">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 