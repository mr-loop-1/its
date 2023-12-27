import { fillUser } from '@/app/reducers/auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  function hasJWT() {
    let flag = false;
    localStorage.getItem('token') ? (flag = true) : (flag = false);
    if (flag) {
      dispatch(fillUser(JSON.parse(localStorage.getItem('user'))));
    }
    return flag;
  }

  return hasJWT() ? <Outlet /> : <Navigate to="/login" />;
};

export default RouteGuard;
