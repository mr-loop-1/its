import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

import CreateProject from './create';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function ProjectSidebar({
  projects,
  refetch,
  toggleRefetch,
  loading,
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed left-16 top-0 w-56 lg:w-72 h-screen pt-0 pb-6 px-7 bg-gray-50 overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
      <header
        className="flex items-center mt-8 mb-6 cursor-pointer"
        onClick={() => navigate('/projects')}
      >
        <img src="/rose.svg" className="w-8 md:w-12 lg:w-16" />
        <span className="ml-2 align-top">
          <span className="text-2xl font-semibold tracking-tight">
            {' '}
            all projects
          </span>
          <br />
          <span className="font-mono tracking-tight">active</span>
        </span>
      </header>

      <CreateProject refetch={refetch} toggleRefetch={toggleRefetch} />

      {loading ? (
        <ReloadIcon className="w-16 h-16 animate-spin" />
      ) : (
        <div className="">
          <ul>
            {projects.map((project) => {
              return (
                <li key={project.project.id}>
                  <NavLink
                    to={`/projects/${project.project.id}`}
                    className={({ isActive }) =>
                      [isActive ? 'text-[#8b4ea8] bg-[#ebecf0]' : ''].join(' ')
                    }
                  >
                    <div className="py-2 px-3 flex flex-col align-middle cursor-pointer bg-inherit rounded-md hover:text-[#8b4ea8]">
                      <div className="block text-xl font-normal tracking-tight break-words">
                        {project.project.title}
                      </div>
                      <div className="flex mt-2">
                        <img src="/role/admin.svg" className="w-5" />
                        <span className="text-sm ml-2">{project.role}</span>
                      </div>
                    </div>
                    {/* </Card> */}
                  </NavLink>
                  <Separator
                    className="w-[50%] mx-auto"
                    orientation="horizontal"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
