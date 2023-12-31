import React from 'react';
import clsx from 'clsx';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userInfo);

  /**
   * w-16 initial
   * 80% hover on small screen
   * w-48 hover on large screen
   */

  return (
    <div
      className={clsx(
        ['/register', '/login'].includes(location.pathname) && 'hidden',
        'fixed z-50 left-0 top-0 w-16 hover:w-[80%] md:hover:w-48 h-screen bg-[#0747A6] overflow-x-hidden transition-all duration-[0.1s] hover:shadow-[0_0_50px_0_rgba(0,0,0,0.6)] transform translate-z-0',
      )}
    >
      <img
        src={`/profile/${user.slug}.svg`}
        alt="profile image"
        className="w-12 mt-5 ml-2"
      />
      {/* <img
        src={`/profile/${user.slug}.svg`}
        alt="profile image"
        className="w-[80%] mt-5 mx-auto"
      /> */}

      {/* <div className='flex flex-col items-center'>  */}

      <div className="mt-20 md:mt-60 py-3 rounded flex items-center w-full hover:brightness-125 cursor-pointer">
        <span className="w-16">
          <HomeIcon className="w-8 h-8 ml-4 text-white" />
        </span>
        <span className="text-white font-semibold ml-4">
          <Link to="/">Home</Link>
        </span>
      </div>
      {/* </div> */}
      {/* <Avatar className="">
        <AvatarImage src={`/profile/${user.slug}.svg`} alt="profile image" />
        <AvatarFallback>{user.name.split(' ')[0]}</AvatarFallback>
      </Avatar> */}
      {/* <img
        className="w-10  mt-8 group-hover:w-28 "
        src={`/profile/${user.slug}.svg`}
      />
      <div className="hidden p-3 group-hover:block text-white font-semibold text-center">
        {user.name}
      </div>

      <div className="group overflow-hidden text-white font-semibold">
        <HomeIcon className="w-3 group-hover:w-10 text-white" />
      </div> */}
    </div>
  );
}
