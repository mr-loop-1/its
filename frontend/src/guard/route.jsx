import { fillUser } from '@/app/reducers/auth';
import Sidebar from '@/components/sidebar';
import { ReloadIcon } from '@radix-ui/react-icons';
import { pingUser } from 'api/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const RouteGuard = () => {
  const hasValidJwt = useOutletContext();

  return hasValidJwt ? <Outlet /> : <Navigate to="/login" />;
};

export default RouteGuard;
