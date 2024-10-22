// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../Global/UserContext'; 

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useUser(); // Get user from context
  const userRole = user?.role; // Take role from user object

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;//outlet to display the children.

};


export default ProtectedRoute;
