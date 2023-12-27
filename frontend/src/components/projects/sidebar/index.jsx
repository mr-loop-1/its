import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectSidebar({ projects }) {
  const navigate = useNavigate();
  return (
    <div className="fixed left-16 top-0 w-56 lg:w-96 h-screen pt-0 pb-6 px-10 bg-[rgb(244,245,247)] overflow-x-hidden overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
      <header
        className="flex items-center mt-8 mb-6"
        onClick={() => navigate('/projects')}
      >
        <img src="/proj.svg" className="w-8 md:w-12 lg:w-16" />
        <span className="ml-2 align-top">
          <span className="text-2xl"> all projects</span>
          <br />
          <span className="font-mono">active</span>
        </span>
      </header>
    </div>
  );
}
