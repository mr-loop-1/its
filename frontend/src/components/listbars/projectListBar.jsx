import React from 'react';
import Dividing from './dividing';
import { Link } from 'react-router-dom';

export default function ProjectListBar({ contents }) {
  return (
    <div className="fixed bg-[rgb(244,245,247)] z-[49] h-screen w-[230px] lg:w-96 overflow-x-hidden overflow-y-auto pt-0 pb-6 px-4 border-r-[#dfe1e6] border-r border-solid left-16 top-0">
      <div className="flex mt-7 mb-5 items-center">
        <img src="/proj.svg" className="ml-3 w-10 h-10" />
        <div className="pl-2.5 pr-0 pt-[3px] pb-0">all projects</div>
      </div>
      <Dividing />
      {contents.map((con) => {
        return (
          <>
            <Link to="http://localhost:5173/projects/123">
              <h2>{con.title}</h2>
            </Link>
            <h4>{con.role}</h4>
          </>
        );
      })}
    </div>
  );
}
