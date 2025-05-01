import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessGiven, setAccessGiven] = useState(false);
  const [loading, setLoading] = useState(true); // optional but useful

  useEffect(() => {
    const fetchAuthentication = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/v1/users/me`, {
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

  if (loading) return <p>Loading...</p>; // Optional loader

  return accessGiven ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
