import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = ({ component: Component, ...rest }) => {
  function hasJWT() {
    let flag = false;
    localStorage.getItem('token') ? (flag = true) : (flag = false);
    return flag;
  }

  return hasJWT() ? <Outlet /> : <Navigate to="/login" />;
};

export default RouteGuard;
