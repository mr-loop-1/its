import React from 'react';
import clsx from 'clsx';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BackpackIcon,
  Crosshair2Icon,
  ExitIcon,
  HomeIcon,
} from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { setUser } from '@/app/reducers/auth';

export default function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser({ user: null, token: null }));
    // setTimeout(() => {
    //   dispatch(setUser({ user: null, token: null }));
    // }, 1000);
    navigate('/login');
  };

  return (
    <div
      className={clsx(
        ['/register', '/login'].includes(location.pathname) && 'hidden',
        'fixed flex flex-col justify-between z-50 left-0 top-0 w-16 hover:w-[80%] md:hover:w-48 h-screen bg-[#0747A6] overflow-x-hidden transition-all duration-[0.1s] hover:shadow-[0_0_50px_0_rgba(0,0,0,0.6)] transform translate-z-0',
      )}
    >
      <div>
        <img
          src={`/profile/${user.slug}.svg`}
          alt="profile image"
          className="w-12 mt-5 ml-2"
        />
      </div>
      <div>
        <Link to="/">
          <div className="py-3 rounded flex items-center w-full hover:bg-[#1a52a7] active:hover:bg-[#1a52a7] cursor-pointer">
            <span className="w-16">
              <HomeIcon className="w-8 h-8 ml-4 text-white" />
            </span>
            <span className="text-white font-semibold ml-4">Home</span>
          </div>
        </Link>
        <Link to="/projects">
          <div className="py-3 rounded flex items-center w-full hover:bg-[#1a52a7] active:bg-[#1a52a7] cursor-pointer">
            <span className="w-16">
              <BackpackIcon className="w-8 h-8 ml-4 text-white" />
            </span>
            <span className="text-white font-semibold ml-4">Projects</span>
          </div>
        </Link>
        <Link to="/bugs">
          <div className="py-3 rounded flex items-center w-full hover:bg-[#1a52a7] active:bg-[#1a52a7] cursor-pointer">
            <span className="w-16">
              <Crosshair2Icon className="w-8 h-8 ml-4 text-white" />
            </span>
            <span className="text-white font-semibold ml-4">Bugs</span>
          </div>
        </Link>
      </div>

      <div>
        {/* <Link to="/"> */}
        <div
          className="mb-10 rounded flex items-center w-full hover:bg-[#1a52a7] active:bg-[#1a52a7] cursor-pointer"
          onClick={handleLogout}
        >
          <span className="w-16">
            <ExitIcon className="w-8 h-8 ml-4 text-white" />
          </span>
          <span className="text-white font-semibold ml-4">Logout</span>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
}
