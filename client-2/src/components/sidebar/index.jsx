import React from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon } from '@radix-ui/react-icons';

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div
      className={clsx(
        ['/register', '/login'].includes(location.pathname) && 'hidden',
        'group fixed flex flex-col items-center z-50 w-16 h-screen bg-[#0747A6] overflow-x-hidden transition-all duration-[0.1s] left-0 top-0 md:hover:w-48  hover:shadow-[0_0_50px_0_rgba(0,0,0,0.6)] transform translate-z-0',
      )}
    >
      <img
        className="w-10  mt-8 group-hover:w-28 "
        src={`/profile/${user.slug}.svg`}
      />
      {/* <div className="hidden group-hover:block group-hover:w-full text-white group-hover:mx-auto font-semibold">
        {user.name}
      </div> */}
      <div className="hidden p-3 group-hover:block text-white font-semibold text-center">
        {user.name}
      </div>

      <div className="group overflow-hidden text-white font-semibold">
        <HomeIcon className="w-3 group-hover:w-10 text-white" />
      </div>
    </div>
  );
}
