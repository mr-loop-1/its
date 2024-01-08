import { fillUser } from '@/app/reducers/auth';
import Sidebar from '@/components/sidebar';
import ServerLoad from '@/pages/server-load';
import { ReloadIcon } from '@radix-ui/react-icons';
import { pingUser } from 'api/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GlobalRouteGuard = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('it ran ----------------------------------------------');

    (async () => {
      try {
        if (localStorage.getItem('token')) {
          const localUser = JSON.parse(localStorage.getItem('user'));
          if (localUser && localUser.hasOwnProperty('email')) {
            const pingStatus = await pingUser({ email: localUser.email });
            if (pingStatus == 200) {
              dispatch(fillUser(JSON.parse(localStorage.getItem('user'))));
              setValidUser(() => true);
              setLoading(() => false);
            } else {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              setValidUser(() => false);
              setLoading(() => false);
            }
          } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setValidUser(() => false);
            setLoading(() => false);
          }
        } else {
          localStorage.removeItem('user');
          setValidUser(() => false);
          setLoading(() => false);
        }
      } catch (err) {
        setValidUser(() => false);
        setLoading(() => false);
      }
    })();
  }, [location.pathname]);

  console.log('it ran ----------------------------------------------');

  return loading ? <ServerLoad /> : <Outlet context={validUser} />;

  return loading ? (
    <ServerLoad />
  ) : validUser ? (
    <Outlet context={validUser} />
  ) : (
    <Navigate to="/login" />
  );
};

export default GlobalRouteGuard;