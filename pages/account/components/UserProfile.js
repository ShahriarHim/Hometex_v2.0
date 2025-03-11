import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie('home_text_token');
        const response = await axios.get('https://htbapi.hometexbd.ltd/api/my-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
      {profile && profile.user && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">First Name</p>
              <p className="font-semibold">{profile.user.first_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Last Name</p>
              <p className="font-semibold">{profile.user.last_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{profile.user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold">{profile.user.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Member Since</p>
              <p className="font-semibold">
                {new Date(profile.user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 