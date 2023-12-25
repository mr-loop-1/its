import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="z-50 w-[64px] h-full bg-[#0747A6] fixed overflow-x-hidden transition-all duration-[0.1s] left-0 top-0 hover:w-[200px] hover:shadow-[0_0_50px_0_rgba(0,0,0,0.6)] transform translate-z-0">
      <a
        href="/"
        className="block relative transition-[left] duration-[0.1s] mt-5 mb-2.5 mx-0 left-0"
      >
        <span className="w-[30px]">{/* <img src="/logo.svg" /> */}</span>
      </a>
    </div>
  );
}
