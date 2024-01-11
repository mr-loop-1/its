import { fillUser } from '@/app/reducers/auth';
import Sidebar from '@/components/sidebar';
import ServerLoad from '@/pages/server-load';
import { ReloadIcon } from '@radix-ui/react-icons';
import { pingServer, pingUser } from 'api/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GlobalRouteGuard = ({ component: Component, ...rest }) => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const [validUser, setValidUser] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    (async () => {
      console.log('here');
      try {
        await pingServer();
        setLoading(() => false);
      } catch (err) {
        console.log('🚀 ~ file: global.jsx:22 ~ err:', err);
        // setValidUser(() => false);
        // setLoading(() => false);
      }
    })();
  }, []);

  return loading ? <ServerLoad /> : <Outlet />;

  // return loading ? (
  //   <ServerLoad />
  // ) : validUser ? (
  //   <Outlet context={validUser} />
  // ) : (
  //   <Navigate to="/login" />
  // );
};

export default GlobalRouteGuard;
