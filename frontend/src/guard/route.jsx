import { fillUser } from '@/app/reducers/auth';
import Sidebar from '@/components/sidebar';
import { ReloadIcon } from '@radix-ui/react-icons';
import { pingUser } from 'api/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  console.log('🚀 ~ file: route.jsx:11 ~ RouteGuard ~ loading:', loading);
  const [flag, setFlag] = useState(null);
  console.log('🚀 ~ file: route.jsx:13 ~ RouteGuard ~ flag:', flag);
  const dispatch = useDispatch();
  // async function hasJWT() {
  //   let flag = false;
  //   localStorage.getItem('token') ? (flag = true) : (flag = false);
  //   if (flag) {
  //     // const res = await pingUser({
  //     //   email: JSON.parse(localStorage.getItem('user')).email,
  //     // });
  //     // console.log('🚀 ~ file: route.jsx:17 ~ hasJWT ~ res:', res);
  //     // if (res.data)
  //     dispatch(fillUser(JSON.parse(localStorage.getItem('user'))));
  //     // else {
  //     //   console.log('here');
  //     //   flag = false;
  //     // }
  //   }
  //   console.log('here2', flag);
  //   return flag;
  // }

  useEffect(() => {
    (async () => {
      let flagg = false;
      try {
        localStorage.getItem('token') ? (flagg = true) : (flagg = false);
        console.log('🚀 ~ file: route.jsx:37 ~ flagg:', flagg);
        if (flagg) {
          const res = await pingUser({
            email: JSON.parse(localStorage.getItem('user'))?.email,
          });
          console.log('🚀 ~ file: route.jsx:17 ~ hasJWT ~ res:', res);
          if (res.data) {
            dispatch(fillUser(JSON.parse(localStorage.getItem('user'))));
            setFlag(() => true);
          } else {
            console.log('here');
            setFlag(() => false);
          }
        } else {
          setFlag(() => false);
        }
        setLoading(() => false);
      } catch (err) {
        console.log('🚀 ~ file: route.jsx:58 ~ err:', err);
      }
    })();
  });

  return loading ? (
    <ReloadIcon className="w-96 h-96 animate-spin" />
  ) : flag ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RouteGuard;
