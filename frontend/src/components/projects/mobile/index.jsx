import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

import CreateProject from './../create';

export default function ProjectSidebar({ projects, refetch, toggleRefetch }) {
  return (
    <div className="">
      <div className="hidden md:block fixed left-16 top-0 w-56 lg:w-96 h-screen pt-0 pb-6 px-10 bg-[rgb(244,245,247)] overflow-x-hidden overflow-y-auto border-r border-solid border-r-[#dfe1e6]">
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
                  {/* <Card className="py-2 px-4 cursor-pointer rounded-none bg-inherit"> */}
                  <div className="py-4 px-4 flex flex-col align-middle cursor-pointer bg-inherit rounded-md">
                    <div className="block text-xl font-normal tracking-tight">
                      {project.project.title}
                    </div>
                    <div className="flex">
                      <img src="/role/admin.svg" className="w-5" />
                      <span className="text-sm ml-2">admin</span>
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
    </div>
  );
}
