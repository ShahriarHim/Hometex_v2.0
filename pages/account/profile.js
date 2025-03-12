import React from 'react';
import UserProfile from './components/UserProfile';
import Sidebar from './components/Sidebar';

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="card">
              <div className="card-header bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white mb-2">My Profile</h2>
                <p className="text-gray-100 text-sm">Manage your personal information</p>
              </div>
              <div className="p-6">
                <UserProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 