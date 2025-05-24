import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ProtectedRoute = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessGiven, setAccessGiven] = useState(false);
  const [loading, setLoading] = useState(true); // optional but useful

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const res = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });

        console.log(res.data);
        setLoggedInUser(res.data.user);
        setAccessGiven(true);
      } catch (err) {
        console.error('Auth failed:', err);
        setAccessGiven(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthentication();
  }, []);

  if (loading){
    return ( 
    <div className='bg-[#121212] h-screen w-full flex items-center justify-center'>
      <div className='w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin'></div>
    </div> 
    )
  } // Optional loader

  return accessGiven ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
