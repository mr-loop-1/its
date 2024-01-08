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
      console.log('here');
      try {
        if (localStorage.getItem('token')) {
          console.log('here1');
          const localUser = JSON.parse(localStorage.getItem('user'));
          if (localUser && localUser.hasOwnProperty('email')) {
            console.log('here3');
            const pingStatus = await pingUser({ email: localUser.email });
            if (pingStatus == 200) {
              console.log('here8');
              dispatch(fillUser(JSON.parse(localStorage.getItem('user'))));
              setValidUser(() => true);
              setLoading(() => false);
            } else {
              console.log('here7');
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              setValidUser(() => false);
              setLoading(() => false);
            }
          } else {
            console.log('here4');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setValidUser(() => false);
            setLoading(() => false);
          }
        } else {
          console.log('here5');
          localStorage.removeItem('user');
          setValidUser(() => false);
          setLoading(() => false);
        }
      } catch (err) {
        console.log('here2');
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
