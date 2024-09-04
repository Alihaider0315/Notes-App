// src/routes/ProtectedRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    console.log('No token found, redirecting to login...'); // Debug log
    return <Navigate to="/login" />;
  }

  console.log('Token found, allowing access to protected route.'); // Debug log
  return <Outlet />;
};

export default ProtectedRoutes;
