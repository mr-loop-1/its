import { fillUser } from '@/app/reducers/auth';
import Sidebar from '@/components/sidebar';
import { ReloadIcon } from '@radix-ui/react-icons';
import { pingUser } from 'api/auth';
import React, { useEffect, useState } from 'react';
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
    console.log('here2', flag);
    return flag;
  }

  return hasJWT() ? <Outlet /> : <Navigate to="/login" />;
};

export default RouteGuard;
